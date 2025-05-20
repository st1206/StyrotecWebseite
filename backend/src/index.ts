// src/index.ts
import type { Core, UID } from "@strapi/strapi";
import { algoliasearch, type SearchClient } from "algoliasearch";

export default {
  async register({ strapi }: { strapi: Core.Strapi }) {},
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    strapi.log.info(
      "Bootstrap: Initializing dynamic Algolia configuration and sync..."
    );

    const algoliaAppId = process.env.ALGOLIA_APP_ID;
    const algoliaApiKey = process.env.ALGOLIA_API_KEY;

    if (!algoliaAppId || !algoliaApiKey) {
      strapi.log.error(
        "Bootstrap: ALGOLIA_APP_ID or ALGOLIA_API_KEY (Admin) missing. Algolia sync will be skipped."
      );
    }
    const algoliaClient: SearchClient | null =
      algoliaAppId && algoliaApiKey
        ? algoliasearch(algoliaAppId, algoliaApiKey)
        : null;

    let generatedContentTypes: Array<{
      uid: UID.ContentType;
      index: string;
      populate: any;
      strapiContentTypeSchema: any;
      transform: (entity: any) => Partial<any> | null;
    }> = [];
    const allStrapiContentTypes = strapi.contentTypes;

    async function handleSyncEntries(
      event: any,
      isCreateOrUpdate: boolean
    ): Promise<void> {
      if (!algoliaClient || generatedContentTypes.length === 0) {
        if (generatedContentTypes.length > 0 && !algoliaClient) {
          strapi.log.error(
            "Algolia Lifecycle: Algolia client not configured. Skipping sync."
          );
        }
        return;
      }

      const { model, result, params } = event;
      const uid = model.uid as UID.ContentType;

      const contentType = generatedContentTypes.find((ct) => ct.uid === uid);

      if (!contentType) {
        strapi.log.warn(
          `Algolia Lifecycle: No configuration found for UID ${uid}. Skipping sync.`
        );
        return;
      }

      let entriesToProcess: any[] = [];

      if (isCreateOrUpdate) {
        entriesToProcess = Array.isArray(result)
          ? result
          : result
            ? [result]
            : [];
      } else {
        if (contentType.strapiContentTypeSchema.kind !== "singleType") {
          if (Array.isArray(result)) {
            entriesToProcess = result;
          } else if (result && result.id) {
            entriesToProcess = [result];
          } else if (params?.where?.id) {
            entriesToProcess = [{ id: params.where.id }];
          } else if (params?.where?.id_in) {
            entriesToProcess = params.where.id_in.map(
              (id: number | string) => ({ id })
            );
          }
        }
      }

      const isSingleTypeDelete =
        !isCreateOrUpdate &&
        contentType.strapiContentTypeSchema.kind === "singleType";
      const isSingleTypeCreateUpdateWithResult =
        isCreateOrUpdate &&
        contentType.strapiContentTypeSchema.kind === "singleType" &&
        result;

      if (
        entriesToProcess.length === 0 &&
        !isSingleTypeDelete &&
        !isSingleTypeCreateUpdateWithResult
      ) {
        strapi.log.info(
          `Algolia Lifecycle: No entries to process for ${uid} in ${event.action} event.`
        );
        return;
      }

      if (isCreateOrUpdate) {
        const recordsToSave: any[] = [];
        const items =
          contentType.strapiContentTypeSchema.kind === "singleType" && result
            ? [result]
            : entriesToProcess;

        for (const rawEntry of items) {
          if (
            !rawEntry &&
            contentType.strapiContentTypeSchema.kind !== "singleType"
          ) {
            strapi.log.warn(
              `Algolia Lifecycle: Null or undefined entry found in batch for ${uid}. Skipping.`
            );
            continue;
          }

          let entryToSync = rawEntry;
          let populatedEntry;

          try {
            if (contentType.strapiContentTypeSchema.kind === "singleType") {
              populatedEntry = await strapi.entityService.findMany(
                contentType.uid,
                {
                  populate: contentType.populate || {},
                }
              );
            } else if (rawEntry && rawEntry.id) {
              populatedEntry = await strapi.entityService.findMany(
                rawEntry.id,
                {
                  populate: contentType.populate || {},
                }
              );
            } else if (
              contentType.strapiContentTypeSchema.kind !== "singleType"
            ) {
              strapi.log.warn(
                `Algolia Lifecycle: Skipping entry for ${uid} due to missing ID in event result for collection type. Entry: ${JSON.stringify(rawEntry)}`
              );
              continue;
            }

            if (populatedEntry) {
              entryToSync = populatedEntry;
            } else if (rawEntry) {
              strapi.log.warn(
                `Algolia Lifecycle: Could not fully re-fetch entity for ${uid}${rawEntry?.id ? "#" + rawEntry.id : contentType.strapiContentTypeSchema.kind === "singleType" ? " (single type)" : ""}. Using event result.`
              );
            } else {
              strapi.log.warn(
                `Algolia Lifecycle: No entity data for ${uid} (ID: ${rawEntry?.id}) after fetch attempt, and raw entry is not suitable. Skipping.`
              );
              continue;
            }
          } catch (fetchError: any) {
            strapi.log.error(
              `Algolia Lifecycle: Error re-fetching entity for ${uid}${rawEntry?.id ? "#" + rawEntry.id : ""}: ${fetchError.message}. Using event result if available.`
            );
            if (!rawEntry) {
              strapi.log.error(
                `Algolia Lifecycle: No rawEntry available for ${uid} after fetch error. Skipping.`
              );
              continue;
            }
          }

          if (!entryToSync) {
            strapi.log.warn(
              `Algolia Lifecycle: No valid entry data to sync for ${uid}. Skipping.`
            );
            continue;
          }

          const transformedRecord = contentType.transform(entryToSync);

          if (transformedRecord) {
            recordsToSave.push(transformedRecord);
          } else {
            strapi.log.warn(
              `Algolia Lifecycle: Transformation of entry for ${uid} (ID: ${entryToSync?.id}) resulted in null. Skipping.`
            );
          }
        }

        if (recordsToSave.length > 0) {
          try {
            const response = await algoliaClient.saveObjects({
              indexName: contentType.index,
              objects: recordsToSave,
            });

            if (Array.isArray(response)) {
              response.forEach((task: any) => {
                strapi.log.info(
                  `Algolia Lifecycle: Synced ${recordsToSave.length} record(s) (Task ID: ${task.taskID}) for ${uid} to index ${contentType.index}.`
                );
              });
            } else if (response && (response as any).taskID) {
              strapi.log.info(
                `Algolia Lifecycle: Synced ${recordsToSave.length} record(s) (Task ID: ${(response as any).taskID}) for ${uid} to index ${contentType.index}. ObjectIDs: ${((response as any).objectIDs || []).join(", ")}`
              );
            } else {
              strapi.log.warn(
                `Algolia Lifecycle: Sync for ${uid} to ${contentType.index} completed, but response format was unexpected.`
              );
            }
          } catch (error: any) {
            strapi.log.error(
              `Algolia Lifecycle: Error saving records for ${uid} to ${contentType.index}: ${error.message}`
            );
          }
        }
      } else {
        let objectIDsToDelete: string[] = [];
        if (contentType.strapiContentTypeSchema.kind === "singleType") {
          objectIDsToDelete.push(String(contentType.uid));
        } else {
          objectIDsToDelete = entriesToProcess
            .map((entry) => entry.id)
            .filter((id) => id !== null && id !== undefined)
            .map(String);
        }

        if (objectIDsToDelete.length > 0) {
          try {
            const response = await algoliaClient.deleteObjects({
              indexName: contentType.index,
              objectIDs: objectIDsToDelete,
            });
            if (Array.isArray(response)) {
              response.forEach((task: any) => {
                strapi.log.info(
                  `Algolia Lifecycle: Deleted ${objectIDsToDelete.length} record(s) (Task ID: ${task.taskID}) for ${uid} from index ${contentType.index}.`
                );
              });
            } else if (response && (response as any).taskID) {
              strapi.log.info(
                `Algolia Lifecycle: Deleted ${objectIDsToDelete.length} record(s) (Task ID: ${(response as any).taskID}) for ${uid} from index ${contentType.index}.`
              );
            } else {
              strapi.log.warn(
                `Algolia Lifecycle: Deletion for ${uid} from ${contentType.index} completed, but response format was unexpected.`
              );
            }
          } catch (error: any) {
            strapi.log.error(
              `Algolia Lifecycle: Error deleting records for ${uid} from ${contentType.index}: ${error.message}`
            );
          }
        }
      }
    }

    const createDefaultPopulateStrategy = (contentTypeSchema: any): any => {
      const populateStrategy: { [key: string]: any } = {};
      if (!contentTypeSchema || !contentTypeSchema.attributes) {
        return populateStrategy;
      }
      for (const attrName in contentTypeSchema.attributes) {
        const attr = contentTypeSchema.attributes[attrName];
        if (attr.type === "component" || attr.type === "dynamiczone") {
          populateStrategy[attrName] = { populate: "*" };
        } else if (attr.type === "relation" || attr.type === "media") {
          populateStrategy[attrName] = true;
        }
      }
      return populateStrategy;
    };

    for (const uidStr in allStrapiContentTypes) {
      const uid = uidStr as UID.ContentType;
      if (uid.startsWith("api::")) {
        const contentTypeSchema = allStrapiContentTypes[uid];
        if (!contentTypeSchema) continue;

        const ctUidForTransform = uid;
        const ctKindForTransform = contentTypeSchema.kind;
        const indexPrefix = "";

        let indexName: string;
        if (contentTypeSchema.kind === "singleType") {
          indexName = "pages";
        } else {
          indexName =
            indexPrefix +
            (contentTypeSchema.collectionName ||
              uid.split(".").pop()?.replace(/-/g, "_") ||
              uid.replace(/::|\./g, "_"));
        }

        const contentTypeEntry: (typeof generatedContentTypes)[0] = {
          uid: uid,
          strapiContentTypeSchema: contentTypeSchema,
          populate: createDefaultPopulateStrategy(contentTypeSchema),
          transform: (entity: any): Partial<any> | null => {
            if (!entity) return null;
            const record: { [key: string]: any } = { ...entity };
            const entityIdForObjectID = entity.id;

            delete record.id;
            delete record.documentId;
            delete record.createdAt;
            delete record.updatedAt;
            delete record.publishedAt;
            delete record.createdBy;
            delete record.updatedBy;
            delete record.localizations;

            let objectIDValue: string | undefined;
            if (ctKindForTransform === "singleType") {
              objectIDValue = String(ctUidForTransform);
            } else {
              if (
                entityIdForObjectID === undefined ||
                entityIdForObjectID === null
              ) {
                strapi.log.error(
                  `Algolia Transform: entity.id is missing for collectionType ${ctUidForTransform}. Cannot create valid Algolia record. Entity: ${JSON.stringify(entity)}`
                );
                return null;
              }
              objectIDValue = String(entityIdForObjectID);
            }
            record.objectID = objectIDValue;
            return record;
          },
          index: indexName,
        };
        generatedContentTypes.push(contentTypeEntry);
      }
    }

    if (generatedContentTypes.length > 0 && algoliaClient) {
      strapi.log.info(
        `Bootstrap: Starting initial Algolia sync for ${generatedContentTypes.length} content type(s)...`
      );
      for (const ctConfig of generatedContentTypes) {
        const {
          uid,
          populate,
          strapiContentTypeSchema,
          index: algoliaIndexName,
        } = ctConfig;

        try {
          strapi.log.info(
            `Bootstrap Sync: Fetching for ${uid} (Kind: ${strapiContentTypeSchema.kind}) to index ${algoliaIndexName} with populate: ${JSON.stringify(populate)}`
          );
          let entries: any[];
          if (strapiContentTypeSchema.kind === "singleType") {
            const singleEntry = await strapi.entityService.findMany(uid, {
              populate: populate || {},
            });
            entries = singleEntry ? [singleEntry] : [];
          } else {
            const result = await strapi.entityService.findMany(uid, {
              populate: populate || {},
            });
            entries = Array.isArray(result) ? result : result ? [result] : [];
          }

          if (entries && entries.length > 0) {
            const recordsToSave = entries
              .map((entry) => ctConfig.transform(entry))
              .filter(
                (record): record is Partial<any> =>
                  record !== null && record.objectID !== undefined
              );

            if (recordsToSave.length > 0) {
              strapi.log.info(
                `Bootstrap Sync: Saving ${recordsToSave.length} records for ${uid} to Algolia index: ${algoliaIndexName}. ObjectIDs: [${recordsToSave.map((r: any) => r.objectID).join(", ")}]`
              );
              const response = await algoliaClient.saveObjects({
                indexName: algoliaIndexName,
                objects: recordsToSave,
              });

              if (Array.isArray(response)) {
                response.forEach((task: any) => {
                  strapi.log.info(
                    `Bootstrap Direct Sync: Task ${task.taskID} for ${uid} in ${algoliaIndexName} processed ${task.objectIDs ? task.objectIDs.length : "some"} records.`
                  );
                });
              } else if (response && (response as any).taskID) {
                strapi.log.info(
                  `Bootstrap Direct Sync: Task ${(response as any).taskID} for ${uid} in ${algoliaIndexName} processed ${((response as any).objectIDs || []).length} records.`
                );
              } else {
                strapi.log.warn(
                  `Bootstrap Direct Sync: Save for ${uid} to ${algoliaIndexName} completed, but response format was unexpected.`
                );
              }
            } else {
              strapi.log.info(
                `Bootstrap Sync: No valid records to save for ${uid} after transformation.`
              );
            }
          } else {
            strapi.log.info(
              `Bootstrap Sync: No entries for ${uid} to sync to ${algoliaIndexName}.`
            );
          }
        } catch (error: any) {
          strapi.log.error(
            `Bootstrap Sync: Error for ${uid} to index ${algoliaIndexName}: ${error.message}`,
            error.stack
          );
          if (error.transporterStackTrace) {
            strapi.log.error(
              "Bootstrap Sync: Algolia Transporter Stack Trace:",
              error.transporterStackTrace
            );
          }
        }
      }
      strapi.log.info("Bootstrap: Direct initial Algolia sync finished.");

      strapi.log.info(
        "Bootstrap: Registering dynamic Algolia lifecycle hooks..."
      );
      for (const ctConfig of generatedContentTypes) {
        strapi.db.lifecycles.subscribe({
          models: [ctConfig.uid],
          async afterCreate(event) {
            await handleSyncEntries(event, true);
          },
          async afterCreateMany(event) {
            await handleSyncEntries(event, true);
          },
          async afterUpdate(event) {
            await handleSyncEntries(event, true);
          },
          async afterUpdateMany(event) {
            await handleSyncEntries(event, true);
          },
          async afterDelete(event) {
            await handleSyncEntries(event, false);
          },
          async afterDeleteMany(event) {
            await handleSyncEntries(event, false);
          },
        });
      }
      strapi.log.info("Bootstrap: Dynamic Algolia lifecycle hooks registered.");
    } else {
      if (!algoliaClient) {
        strapi.log.warn(
          "Bootstrap: Algolia sync and lifecycle hooks skipped due to missing API keys."
        );
      } else if (generatedContentTypes.length === 0) {
        strapi.log.info(
          "Bootstrap: No content types configured for Algolia. No sync or hooks registered."
        );
      }
    }
    strapi.log.info("Bootstrap: Algolia dynamic setup and sync complete.");
  },
};

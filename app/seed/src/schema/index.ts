import { machineCollections } from './collections/machines.js';
import { dataCollections } from './collections/data.js';
import { blockCollections } from './collections/blocks.js';
import { childCollections } from './collections/children.js';
import { singletonCollections } from './collections/singletons.js';
import type { CollectionDef } from './types.js';

export const allCollections: CollectionDef[] = [
  ...dataCollections,
  ...machineCollections,
  ...childCollections,
  ...blockCollections,
  ...singletonCollections,
];

export const allCollectionNames = allCollections.map((c) => c.name);

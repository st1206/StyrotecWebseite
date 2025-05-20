export default ({ env }) => ({
  "preview-button": {
    config: {
      contentTypes: [
        {
          uid: "api::home.home",
          draft: {
            url: "http://localhost:3000/api/preview",
            query: {
              type: "page",
              slug: "{slug}",
              test: "YO",
              locale: "{locale}",
            },
          },
          published: {
            url: "http://localhost:3000/{slug}",
          },
        },
      ],
    },
  },
  "strapi-algolia": {
    enabled: true,
    config: {
      apiKey: env("ALGOLIA_API_KEY"),
      applicationId: env("ALGOLIA_APP_ID"),
      contentTypes: [],
    },
  },
});

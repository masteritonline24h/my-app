import { bindings, defineConfig, defineWorker } from "cf/config";
import { createWorkersResponseStoreSelfContainedConfig } from "@vinext/cloudflare/cache/config";

const cache = await createWorkersResponseStoreSelfContainedConfig({
  worker: "my-app",
  bucket: "my-app-response-store-cache-bodies",
});

export default defineConfig({
  worker: defineWorker({
    ...cache,
    name: "my-app",
    entrypoint: "vinext/server/fetch-handler",
    compatibilityDate: "2026-11-13",
    assets: {
      htmlHandling: "none",
      notFoundHandling: "none",
      runWorkerFirst: ["/*", "!/_next/static/*", "!/*/_next/static/*"],
    },
    env: {
      ...cache.env,
      ASSETS: bindings.assets(),
      IMAGES: bindings.images(),
    },
  }),
});

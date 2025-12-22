import { defineConfig } from "vitest/config"
import { defineWorkersProject } from "@cloudflare/vitest-pool-workers/config"

export default defineConfig({
  test: {
    coverage: {
      provider: "istanbul", // v8 is not supported due for cf workers
      reporter: ["text", "json-summary", "html", "json"],
    },
    projects: [
      defineWorkersProject({
        test: {
          name: "Workers",
          include: ["worker/test/**/*.spec.ts"],
          coverage: {
            provider: "istanbul", // v8 is not supported due for cf workers
            reporter: ["text", "json-summary", "html", "json"],
          },
          poolOptions: {
            workers: {
              wrangler: {
                configPath: "./wrangler.toml",
              },
            },
          },
        },
      }),
      {
        extends: "frontend/vite.config.js",
        test: {
          include: ["frontend/test/**/*.spec.{ts,tsx}"],
          name: "Frontend",
          environment: "jsdom",
          coverage: {
            provider: "istanbul",
            reporter: ["text", "json-summary", "html", "json"],
          },
        },
      },
    ],
  },
})

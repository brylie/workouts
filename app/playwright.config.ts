import { defineConfig } from "@playwright/test";

export default defineConfig({
  webServer: {
    command: "pnpm build && pnpm preview --port 4174",
    port: 4174,
    reuseExistingServer: true,
  },

  testDir: "e2e",

  timeout: 5000,
});

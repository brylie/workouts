import tailwindcss from "@tailwindcss/vite";
import { svelteTesting } from "@testing-library/svelte/vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [sveltekit(), tailwindcss()],

  test: {
    workspace: [
      {
        extends: "./vite.config.ts",
        plugins: [svelteTesting()],

        test: {
          name: "client",
          environment: "jsdom",
          clearMocks: true,
          include: [
            "src/**/*.svelte.{test,spec}.{js,ts}",
            "src/**/database.{test,spec}.{js,ts}", // Include database tests in client env
          ],
          exclude: ["src/lib/server/**"],
          setupFiles: [
            "./vitest-setup-client.ts",
            "./vitest-setup-indexeddb.ts",
          ],
        },
      },
      {
        extends: "./vite.config.ts",

        test: {
          name: "server",
          environment: "node",
          include: ["src/**/*.{test,spec}.{js,ts}"],
          exclude: [
            "src/**/*.svelte.{test,spec}.{js,ts}",
            "src/**/database.{test,spec}.{js,ts}", // Exclude database tests from server env
          ],
        },
      },
    ],
  },
});

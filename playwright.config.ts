import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,

  use: {
    baseURL: "http://localhost:5173", // frontend dev server
    trace: "on-first-retry",
  },

  // Start frontend AND backend before tests
  webServer: [
    {
      command: "cd backend && npm run dev",
      url: "http://localhost:8000/api/health",
      timeout: 40_000,
      reuseExistingServer: !process.env.CI,
    },
    {
      command: "cd frontend && npm run dev",
      url: "http://localhost:5173",
      timeout: 40_000,
      reuseExistingServer: !process.env.CI,
    },
  ],

  projects: [
    {
      name: "chromium",
      use: devices["Desktop Chrome"],
    },
  ],
});

// #ddev-generated
import { defineConfig, devices } from "@playwright/test";

const baseURL = process.env.PLAYWRIGHT_BASE_URL || `https://${process.env.VIRTUAL_HOST.split(',')[0]}`;

// Set PLAYWRIGHT_SUITE=e2e or PLAYWRIGHT_SUITE=a11y to run only that suite.
// Defaults to running all tests under Tests/Playwright/.
const suite = process.env.PLAYWRIGHT_SUITE;
const testDir = suite ? `Tests/Playwright/${suite}` : "Tests/Playwright";
console.log(`Testing against: ${baseURL} | suite: ${suite ?? "all"} (${testDir})`);

export default defineConfig({
  testDir,
  timeout: 30 * 1000,
  forbidOnly: !!process.env.CI,
  fullyParallel: false,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: process.env.CI
    ? [["list"], ["html", { open: "never" }], ["junit", { outputFile: "Tests/Playwright/test-results/junit.xml" }]]
    : [["list"], ["html", { open: "never", outputFolder: "Tests/Playwright/playwright-report" }]],
  use: {
    baseURL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    ignoreHTTPSErrors: true
  },

  expect: {
    toHaveScreenshot: {
      animations: "disabled",
      fullPage: true,
      maxDiffPixels: 100,
      maxDiffPixelRatio: 0.01,
      threshold: 0.2
    }
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] }
    }
  ]
});

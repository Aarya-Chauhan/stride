import { test, expect, Page } from "@playwright/test";

/**
 * Helper: sign up a new user via the UI and land on /dashboard.
 * Returns the credentials so we can log in again later.
 */
async function signupAndGoToDashboard(page: Page) {
  const uniqueSuffix = Date.now();
  const name = `Playwright User ${uniqueSuffix}`;
  const email = `playwright_user_${uniqueSuffix}@example.com`;
  const password = "Secret123!";

  await page.goto("/signup");

  await page.getByTestId("signup-name-input").fill(name);
  await page.getByTestId("signup-email-input").fill(email);
  await page.getByTestId("signup-password-input").fill(password);

  // profession/timezone are optional
  await page.getByTestId("signup-submit-btn").click();

  await expect(page).toHaveURL(/\/dashboard$/);
  await expect(page.getByTestId("dashboard-welcome-heading")).toBeVisible();

  return { name, email, password };
}

test.describe("Stride Auth & Routing E2E (stable testids)", () => {
  test("Landing page renders and navigates to Signup via Get Started", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(page.getByTestId("landing-page")).toBeVisible();
    await expect(page.getByTestId("landing-hero-heading-main")).toBeVisible();

    // Click hero CTA → /signup
    const getStartedButton = page.getByTestId(
      "landing-hero-get-started-btn"
    );
    await expect(getStartedButton).toBeVisible();
    await getStartedButton.click();

    await expect(page).toHaveURL(/\/signup$/);
    await expect(page.getByTestId("signup-page")).toBeVisible();
  });

  test("Signup flow → lands on Dashboard and shows welcome", async ({ page }) => {
    await signupAndGoToDashboard(page);
  });

  test("Unauthenticated user visiting /dashboard is redirected to /", async ({
    page,
  }) => {
    await page.goto("/dashboard");

    // ProtectedRoute sends them to "/"
    await expect(page).toHaveURL("/");
    await expect(page.getByTestId("landing-page")).toBeVisible();
  });

  test("Logout returns to Landing Page and protects /dashboard", async ({
    page,
  }) => {
    await signupAndGoToDashboard(page);

    await page.getByTestId("dashboard-logout-btn").click();

    await expect(page).toHaveURL("/");
    await expect(page.getByTestId("landing-page")).toBeVisible();

    await page.goto("/dashboard");
    await expect(page).toHaveURL("/");
  });

  test("Existing user can log in and reach Dashboard", async ({ page }) => {
    const { email, password } = await signupAndGoToDashboard(page);

    // Logout
    await page.getByTestId("dashboard-logout-btn").click();
    await expect(page).toHaveURL("/");

    // Go to login page from landing
    await page.getByTestId("landing-signin-btn").click();
    await expect(page).toHaveURL(/\/login$/);

    // Fill login form (make sure your LoginPage has these testids)
    await page.getByTestId("login-email-input").fill(email);
    await page.getByTestId("login-password-input").fill(password);
    await page.getByTestId("login-submit-btn").click();

    // Back on dashboard
    await expect(page).toHaveURL(/\/dashboard$/);
    await expect(page.getByTestId("dashboard-welcome-heading")).toBeVisible();
  });

  test("Logged-in user visiting / is redirected to /dashboard", async ({
    page,
  }) => {
    await signupAndGoToDashboard(page);

    await page.goto("/");

    await expect(page).toHaveURL(/\/dashboard$/);
    await expect(page.getByTestId("dashboard-page")).toBeVisible();
  });
});

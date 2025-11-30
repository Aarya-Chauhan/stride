import { test, expect } from "@playwright/test";

test("signup, logout, and login to dashboard", async ({ page }) => {
  const uniqueSuffix = Date.now();
  const name = "Playwright User";
  const email = `playwright_user_${uniqueSuffix}@example.com`;
  const password = "Secret123!";
  const profession = "Student";

  // 1. Go to signup page
  await page.goto("/signup");

  // 2. Fill signup form
  await page.getByLabel("Name").fill(name);
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Profession").fill(profession);
  await page.getByLabel("Timezone").selectOption("Asia/Kolkata");
  await page.getByLabel("Password").fill(password);

  // 3. Submit signup form
  await page.getByRole("button", { name: "Sign up" }).click();

  // 4. Expect to be on dashboard
  await expect(
    page.getByRole("heading", { name: /welcome/i })
  ).toBeVisible();

  await expect(page.getByText(email)).toBeVisible();

  // 5. Logout
  await page.getByRole("button", { name: "Logout" }).click();

  // 6. Expect to be on login page
  await expect(
    page.getByRole("heading", { name: /study planner login/i })
  ).toBeVisible();

  // 7. Login with same credentials
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password").fill(password);
  await page.getByRole("button", { name: "Login" }).click();

  // 8. Expect to be back on dashboard
  await expect(
    page.getByRole("heading", { name: /welcome/i })
  ).toBeVisible();
  await expect(page.getByText(email)).toBeVisible();
});

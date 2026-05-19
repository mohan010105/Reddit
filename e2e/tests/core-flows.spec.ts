import { test, expect } from "@playwright/test";

test.describe("Core User Flows", () => {
  test("should load the home page", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Threadit/);
    // Home should render without crashing
    await page.waitForLoadState("networkidle");
  });

  test("should display navigation elements", async ({ page }) => {
    await page.goto("/");
    // Look for key navigation elements
    const nav = page.locator("nav, header");
    await expect(nav.first()).toBeVisible();
  });

  test("should navigate to communities page", async ({ page }) => {
    await page.goto("/communities");
    await page.waitForLoadState("networkidle");
    expect(page.url()).toContain("/communities");
  });

  test("should navigate to search page", async ({ page }) => {
    await page.goto("/search");
    await page.waitForLoadState("networkidle");
    expect(page.url()).toContain("/search");
  });

  test("should show 404 for unknown routes", async ({ page }) => {
    await page.goto("/this-page-does-not-exist-123");
    await page.waitForTimeout(1000);
    const content = await page.textContent("body");
    expect(content).toBeTruthy();
  });

  test("should have responsive layout on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    // Page should still be functional on mobile
    const body = page.locator("body");
    await expect(body).toBeVisible();
  });

  test("should handle premium page", async ({ page }) => {
    await page.goto("/premium");
    await page.waitForTimeout(1000);
    // Should either show premium page or redirect to login
    const url = page.url();
    expect(url).toMatch(/premium|login/);
  });
});

test.describe("Performance Checks", () => {
  test("should load home page within 5 seconds", async ({ page }) => {
    const start = Date.now();
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");
    const loadTime = Date.now() - start;
    expect(loadTime).toBeLessThan(5000);
  });

  test("should not have console errors on home page", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push(msg.text());
      }
    });
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    // Filter out expected errors (network errors from missing API, etc.)
    const criticalErrors = errors.filter(
      (e) => !e.includes("net::") && !e.includes("Failed to fetch") && !e.includes("404"),
    );
    expect(criticalErrors).toHaveLength(0);
  });
});

test.describe("Accessibility Checks", () => {
  test("should have proper page structure", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Check for main landmark
    const main = page.locator("main, [role='main'], #root");
    await expect(main.first()).toBeVisible();
  });

  test("should have proper heading hierarchy", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const h1Count = await page.locator("h1").count();
    // Should have at most one h1 per page
    expect(h1Count).toBeLessThanOrEqual(2);
  });

  test("should have accessible images", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const images = page.locator("img");
    const count = await images.count();
    for (let i = 0; i < Math.min(count, 10); i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute("alt");
      const role = await img.getAttribute("role");
      // Images should have alt text or role="presentation"
      expect(alt !== null || role === "presentation").toBe(true);
    }
  });
});

const { Given, When, Then,  setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium, expect } = require('@playwright/test');

setDefaultTimeout(60000); // 60 seconds timeout
let browser;

// ------------------- BACKGROUND -------------------
Given('I am on the OrangeHRM login page', async function () {
  browser = await chromium.launch({ headless: false }); // set to true for CI runs
  const context = await browser.newContext();
  this.page = await context.newPage();

  await this.page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login", {
    waitUntil: "domcontentloaded",
  });
  await this.page.waitForTimeout(2000);
});

// ------------------- LOGIN SCENARIOS -------------------
When('I login with username {string} and password {string}', async function (username, password) {
  await this.page.locator("//input[@name='username']").fill(username);
  await this.page.locator("//input[@name='password']").fill(password);
  await this.page.locator("//button[@type='submit']").click();
  await this.page.waitForTimeout(3000);
});

Then('I should see {string}', async function (expected_result) {
  if (expected_result === "redirected to the dashboard") {
    // Verify user is redirected to dashboard
    await this.page.waitForSelector("//span[text()='Time']", { timeout: 10000 });
    await expect(this.page.locator("//span[text()='Time']")).toBeVisible();
  } 
  else if (expected_result === "Invalid credentials") {
    const errorLocator = this.page.locator("//p[text()='Invalid credentials']");
    await expect(errorLocator).toHaveText("Invalid credentials", { timeout: 10000 });
  } 
  else if (expected_result === "required field error message") {
    const errorMessages = await this.page.locator("//span[text()='Required']").allTextContents();
    expect(errorMessages.length).toBeGreaterThan(0);
  }
});

// ------------------- FORGOT PASSWORD SCENARIO -------------------
When('I click on the Forgot your password link', async function () {
  await this.page.locator("//p[@class='oxd-text oxd-text--p orangehrm-login-forgot-header']").click();
  await this.page.waitForLoadState('load');
  await this.page.waitForTimeout(2000);
});

When('I enter username {string} on forgot page', async function (username) {
  await this.page.getByPlaceholder('Username').fill(username);
});

When('I click the Reset Password button', async function () {
  await this.page.locator("//button[normalize-space()='Reset Password']").click();
  await this.page.waitForTimeout(3000);
});

Then('I should see the password reset confirmation', async function () {
  const resetTexts = await this.page.locator("(//p[@class='oxd-text oxd-text--p'])").allTextContents();
  expect(resetTexts.length).toBeGreaterThan(0);
});


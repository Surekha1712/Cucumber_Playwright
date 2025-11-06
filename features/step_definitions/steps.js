// const { Given, When, Then } = require('@cucumber/cucumber');
// const { expect } = require('@playwright/test');
// const { chromium } = require('playwright');


// let browser, page;

// Given('I am on the OrangeHRM login page', {timeout:5000},async () => {
//   browser = await chromium.launch({ headless: false });
//   const context = await browser.newContext();
//   this.page = await context.newPage();
//   await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
//   await this.page.waitForLoadState('domcontentloaded');
  
// });

// When('I login with username {string} and password {string}', async (username, password) => {
//   await this.page.locator("//input[@name='username']").fill(username);
//   await this.page.locator("//input[@name='password']").fill(password);
//   await this.page.locator("//button[@type='submit']").click();
//   await this.page.waitForTimeout(3000);
// });

// Then('I should be redirected to the dashboard', async () => {
//   await expect(this.page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
//   await browser.close();
// });

// Then('I should see an error message {string}', async (errorMessage) => {
//   const errorLocator =this. page.locator(`//p[text()='${errorMessage}']`);
//   await expect(errorLocator).toBeVisible();
//   console.log('Displayed error:', await errorLocator.textContent());
//   await browser.close();
// });

// When('I click the login button without entering details', async () => {
//   await this.page.locator("//button[@type='submit']").click();
//   await this.page.waitForTimeout(3000);
// });

// Then('I should see the required field error message', async () => {
//   const errors = await this.page.locator("//span[text()='Required']").allTextContents();
//   console.log('Required field errors:', errors);
//   await this.page.waitForTimeout(3000);
//   await expect(errors.length).toBeGreaterThan(0);
//   await browser.close();
// });

// When('I click on the Forgot your password link', async () => {
//   await this.page.locator("//p[contains(@class,'orangehrm-login-forgot-header')]").click();
//   await this.page.waitForLoadState('domcontentloaded');
// });

// When('I enter username {string} on forgot page', async (username) => {
//   await this.page.getByPlaceholder('Username').fill(username);
// });

// When('I click the Reset Password button', async () => {
//   await this.page.locator("//button[normalize-space()='Reset Password']").click();
//   await this.page.waitForTimeout(3000);
// });

// Then('I should see the password reset confirmation', async () => {
//   const messages = await this.page.locator("(//p[@class='oxd-text oxd-text--p'])").allTextContents();
//   console.log('Password reset messages:', messages);
//   await expect(messages.length).toBeGreaterThan(0);
//   await browser.close();
// });
// const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
// const { expect } = require('@playwright/test');

// setDefaultTimeout(60000); // 60 seconds timeout for all steps

// Given('I am on the OrangeHRM login page', async function () {
//   await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login', { waitUntil: 'domcontentloaded' });
//   await this.page.waitForSelector('input[name="username"]', { timeout: 10000 });
// });

// When('I login with username {string} and password {string}', async function (username, password) {
//   await this.page.locator("//input[@name='username']").fill(username);
//   await this.page.locator("//input[@name='password']").fill(password);
//   await this.page.locator("//button[@type='submit']").click();
//   await this.page.waitForLoadState('networkidle');
// });

// Then('I should be redirected to the dashboard', async function () {
//   await expect(this.page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
// });

// Then('I should see an error message {string}', async function (errorMessage) {
//   const errorLocator = this.page.locator(`//p[text()='${errorMessage}']`);
//   await expect(errorLocator).toBeVisible();
//   console.log('Displayed error:', await errorLocator.textContent());
// });

// When('I click the login button without entering details', async function () {
//   await this.page.locator("//button[@type='submit']").click();
//   await this.page.waitForTimeout(2000);
// });

// Then('I should see the required field error message', async function () {
//   const errors = await this.page.locator("//span[text()='Required']").allTextContents();
//   console.log('Required field errors:', errors);
//   expect(errors.length).toBeGreaterThan(0);
// });

// When('I click on the Forgot your password link', async function () {
//   await this.page.locator("//p[contains(@class,'orangehrm-login-forgot-header')]").click();
//   await this.page.waitForSelector('input[placeholder="Username"]');
// });

// When('I enter username {string} on forgot page', async function (username) {
//   await this.page.getByPlaceholder('Username').fill(username);
// });

// When('I click the Reset Password button', async function () {
//   await this.page.locator("//button[normalize-space()='Reset Password']").click();
//   await this.page.waitForLoadState('networkidle');
// });

// Then('I should see the password reset confirmation', async function () {
//   const messages = await this.page.locator("(//p[@class='oxd-text oxd-text--p'])").allTextContents();
//   console.log('Password reset messages:', messages);
//   expect(messages.length).toBeGreaterThan(2);
// });


const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

setDefaultTimeout(60000); // 60 seconds timeout for all steps

// --------------------
// Background Step
// --------------------
Given('I am on the OrangeHRM login page', async function () {
  await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login', { waitUntil: 'domcontentloaded' });
  await this.page.waitForSelector('input[name="username"]', { timeout: 10000 });
});

// --------------------
// Scenario Outline Step
// --------------------
When('I login with username {string} and password {string}', async function (username, password) {
  await this.page.locator('//input[@name="username"]').fill(username);
  await this.page.locator('//input[@name="password"]').fill(password);
  await this.page.locator('//button[@type="submit"]').click();
  await this.page.waitForLoadState('networkidle');
});

// --------------------
// Dynamic Result Step (Handles all outcomes)
// --------------------
Then('I should see {string}', async function (expectedResult) {
  if (expectedResult.includes('dashboard')) {
    await expect(this.page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
    console.log('Successfully redirected to dashboard');
  } 
  else if (expectedResult.includes('Invalid credentials')) {
    const error = this.page.locator("//p[text()='Invalid credentials']");
    await expect(error).toBeVisible();
    console.log('Invalid credentials message displayed');
  } 
  else if (expectedResult.includes('required field')) {
    const requiredErrors = await this.page.locator("//span[text()='Required']").allTextContents();
    expect(requiredErrors.length).toBeGreaterThan(0);
    console.log('Required field validation triggered');
  }
});

// --------------------
// Forgot Password Flow
// --------------------
When('I click on the Forgot your password link', async function () {
  await this.page.locator("//p[contains(@class,'orangehrm-login-forgot-header')]").click();
  await this.page.waitForSelector('input[placeholder="Username"]');
});

When('I enter username {string} on forgot page', async function (username) {
  await this.page.getByPlaceholder('Username').fill(username);
});

When('I click the Reset Password button', async function () {
  await this.page.locator("//button[normalize-space()='Reset Password']").click();
  await this.page.waitForLoadState('networkidle');
});

Then('I should see the password reset confirmation', async function () {
  const messages = await this.page.locator("(//p[@class='oxd-text oxd-text--p'])").allTextContents();
  console.log('Password reset messages:', messages);
  expect(messages.length).toBeGreaterThan(2);
});

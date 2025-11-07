const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

setDefaultTimeout(60000); // 60 seconds for each step

Given('I am logged into the OrangeHRM dashboard', async function () {
  await this.page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login", { waitUntil: 'domcontentloaded' });

  await this.page.locator("//input[@name='username']").fill("Admin");
  await this.page.locator("//input[@name='password']").fill("admin123");
  await this.page.locator("//button[@type='submit']").click();

  // Wait for dashboard to load
 // await this.page.locator("//span[text()='Time']").clear();
  await this.page.waitForSelector("//span[text()='Time']", { timeout: 10000 });
  console.log("Successfully logged into OrangeHRM dashboard");
});

When('I open the Time at Work widget', async function () {
  const timeWidgetButton = this.page.locator('//button[@class="oxd-icon-button oxd-icon-button--solid-main orangehrm-attendance-card-action"]');
  //await this.page.locator('//button[@class="oxd-icon-button oxd-icon-button--solid-main orangehrm-attendance-card-action"]').clear();
  await timeWidgetButton.click();
  await this.page.waitForTimeout(5000);
  
});

When('I select the date {string}', async function (dateValue) {
  const dateInput = this.page.locator("(//input[@placeholder='yyyy-dd-mm'])");
  await dateInput.click();
  await dateInput.fill(dateValue);
  
});

When('I enter the time {string}', async function (timeValue) {
  const timeInput = this.page.locator("(//input[@placeholder='hh:mm'])");
  await timeInput.click();
  await timeInput.fill(timeValue);
  
});

When('I add a note {string}', async function (noteText) {
  const noteLocator = this.page.locator('//textarea[@placeholder="Type here"]');
  await noteLocator.fill(noteText);
  const noteValue = await noteLocator.inputValue();
  await expect(noteValue).toContain(noteText);
  //console.log(`📝 Note Added: ${noteText}`);
});

Then('I should see the note saved successfully', async function () {
  const noteLocator = this.page.locator('//textarea[@placeholder="Type here"]');
  const currentNote = await noteLocator.inputValue();
  expect(currentNote).not.toBe('');
  console.log('Note verified successfully:', currentNote);
  const fs = require('fs');
fs.appendFileSync('artifacts/note_log.txt', `\n${new Date().toISOString()} - ${currentNote}`);

});

Then('I click on the In button', async function () {
  const inButton = this.page.locator("//button[normalize-space()='In']");
  //await this.page.locator("//button[normalize-space()='In']").clear();
  await inButton.click();
  console.log('Clicked on the In button');
  await this.page.waitForTimeout(2000);
});

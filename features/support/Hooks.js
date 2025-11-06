// const { Before, AfterAll } = require("@cucumber/cucumber");
// let browser, page;
// const { chromium } = require('playwright');



// Before(async function () {
//       browser = await chromium.launch({ headless: false });
//       const context = await browser.newContext();
//       page = await context.newPage();
// });
// // AfterAll(async function () {
     
// //       console.log("Browser closed successfully");
// //        await browser.close();
// // });

const { Before, After, AfterStep,Status } = require('@cucumber/cucumber');
const { chromium } = require('playwright');

Before(async function () {
  this.browser = await chromium.launch({ headless: false, slowMo: 50 });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
});
AfterStep(async function ({ result }) {
  if (result.status === Status.FAILED) {
   
    await this.page.screenshot({ path: 'login1.png', fullPage: true });

  }
});


After(async function () {
  await this.page.close();
  await this.context.close();
  await this.browser.close();
});

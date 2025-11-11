const report = require("multiple-cucumber-html-reporter");
const fs = require("fs-extra");

// Ensure output folder exists
fs.ensureDirSync("report-results");

report.generate({
  // JSON report from cucumber-js (you already have it here)
  jsonDir: "report-results/html",

  // Folder where the final HTML report will be created
  reportPath: "./",
  reportNmae:"Playwright Automation Report",
  pageTitle:"OrangeHRM Login,Dashboard Test Report",
  displayDuration :false,

  metadata: {
    browser: {
      name: "chrome",
      version: "latest",
    },
    device: "SAILS-DM548 - PC",
    platform: {
      name: "Windows",
      version: "10",
    },
  },

  customData: {
    title: "Execution Info",
    data: [
      { label: "Project", value: "Playwright + Cucumber Framework" },
      { label: "Release", value: "1.0.0" },
      { label: "Test Cycle", value: "Regression Build #12" },
      { label: "Executed By", value: "Surekha" },
      { label: "Execution Date", value: new Date().toLocaleString() },
    ],
  },
});

console.log("HTML report successfully generated at: report-results/HTML/index.html");

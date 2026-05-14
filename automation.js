const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const FORM_URL = 'https://test.netlify.app/';
const SCREENSHOT_PATH = 'screenshots/before-submit.png';

const formData = {
  name: 'Arielle Farhi',
  email: 'arielle1812@gmail.com',
  phone: '+972505770337',
  company: 'Jones',
  website: 'https://example.com',
  employees: '51-500',
};

async function fillLeadForm(page) {
  await page.goto(FORM_URL, { waitUntil: 'domcontentloaded' });

  await page.locator('#name').fill(formData.name);
  await page.locator('#email').fill(formData.email);
  await page.locator('#phone').fill(formData.phone);
  await page.locator('#company').fill(formData.company);
  await page.locator('#website').fill(formData.website);

  // Bonus
  await page.locator('#employees').selectOption({ label: formData.employees });
}

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await fillLeadForm(page);
    fs.mkdirSync(path.dirname(SCREENSHOT_PATH), { recursive: true });
    await page.screenshot({ path: SCREENSHOT_PATH, fullPage: true });

    await Promise.all([
      page.waitForURL(/thank-you\.html/, { waitUntil: 'domcontentloaded' }),
      page.getByRole('button', { name: /request a call back/i }).click(),
    ]);

    console.log(`Reached thank you page: ${page.url()}`);
  } finally {
    await browser.close();
  }
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

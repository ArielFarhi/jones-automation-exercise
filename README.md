# Jones Automation Exercise

This is the code-only Playwright solution for the automation exercise.

## What It Does

- Opens `https://test.netlify.app/`
- Fills Name, Email, Phone, Company, and Website
- Changes Number of Employees to `51-500` for the bonus part
- Saves a screenshot before submitting to `screenshots/before-submit.png`
- Clicks `Request a call back`
- Logs when the thank-you page is reached

## Run

```bash
npm install
npm start
```

If Playwright asks for browsers, run:

```bash
npx playwright install chromium
```

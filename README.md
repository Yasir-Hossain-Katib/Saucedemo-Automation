# SauceDemo Checkout Automation

Playwright + Page Object Model automation for the SauceDemo (saucedemo.com) checkout flow.

## What's covered

- **Positive Case** (`tests/checkout.positive.spec.js`): login → add product to cart → checkout → verify order confirmation.
- **Negative case** (`tests/checkout.negative.spec.js`): checkout is blocked when a required field (postal code) is missing, and the correct validation error is shown. Chosen over an "empty cart" case because it tests the checkout form's own validation logic — the kind of thing that actually breaks in production.

## Structure

```
pages/          Page Object classes (one per screen, plus a BasePage with shared helpers)
tests/          Test specs — no locators live here, only page object calls + assertions
fixtures/       Shared test data (credentials, product name, customer info)
playwright.config.js
.github/workflows/tests.yml   CI: runs tests on every push/PR
```

**Why POM:** locators live in one place per page. If SauceDemo changes a button ID or class name, exactly one file needs to change — not every test that touches that element.

## Setup

```bash
npm install
npx playwright install --with-deps chromium
```

## Running tests

```bash
npm test              # headless
npm run test:headed   # see the browser
npm run report        # open the last HTML report
```

## CI

`.github/workflows/tests.yml` runs the suite on every push/PR to `master` using GitHub Actions, and uploads the HTML report as a build artifact.
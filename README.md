# MultiBank QA Automation Challenge

Playwright + TypeScript test automation for the public [mb.io](https://mb.io/en-AE) marketing and explore experience.

**Repository:** https://github.com/WaseySaeed/multibank-qa-automation-challenge

---

## Quick start (single command)

```bash
npm install && npm run install:browsers && npm test
```

**Prerequisites:** Node.js 18+, npm 9+

---

## What this covers (Task 1)

| Challenge area | Spec file | Scenarios |
|----------------|-----------|-----------|
| **Navigation & Layout** | `navigation.spec.ts` | Top nav visible; each item navigates to the correct destination (incl. `$MBG` new tab) |
| **Trading Functionality** | `trading.spec.ts` | Spot section renders; pairs visible; Hot/Gainers/Losers tabs; symbol/price/% fields; API-backed category check |
| **Content & Links** | `contentLinks.spec.ts` | Marketing copy; app download link; Play Store / App Store redirect `@api`; Why MultiBank via Company nav |
| **Negative & Edge** | `negative.spec.ts` | Invalid route; broken nav hrefs; nav HTTP 200 checks; mobile viewport overflow |

**Scope:** Public pages only. No login, trading execution, or fund movement.

Task 2 written deliverables (QA strategy, test plan, risk matrix, release checklist) are in the [`Task 2/`](Task%202/) folder.

---

## Framework approach

| Decision | Why |
|----------|-----|
| **Page Object Model** | Locators and page actions live in `pages/`; specs stay readable |
| **Externalized test data** | Routes and expected copy in `test-data/`, easy to update without touching tests |
| **Role & text locators** | `getByRole`, `getByText`, resilient and close to how users see the app |
| **Scoped sections** | e.g. spot trading scoped to the "Spot market" section, not the whole page |
| **Small utilities** | `linkChecker.ts` and `marketWidget.ts` for HTTP checks using MultiBank's own APIs |
| **Cross-browser** | Chromium + Firefox in CI and locally |
| **GitHub Actions** | Matrix runs on every push/PR (Chromium + Firefox) |

---

## Project structure

```
multibank-qa-automation-challenge/
├── .github/workflows/playwright.yml   # CI pipeline
├── pages/                             # Page objects (Home, Explore, Company, Navigation)
├── tests/                             # Specs grouped by feature area
├── test-data/                         # Routes, expected content strings
├── utils/                             # Link checker, market widget API helper
├── Task 2/                            # Written QA deliverables (PDF)
├── docs/sample-test-report/           # Playwright built-in HTML report (use npm run show:sample-report)
├── playwright.config.ts
└── package.json
```

---

## Run tests

```bash
npm test                    # full suite (Chromium + Firefox)
npm run test:firefox        # Firefox only
npm run test:navigation
npm run test:trading
npm run test:content-links
npm run test:negative
npm run test:headed         # watch the browser
npm run test:report         # open HTML report after a run
```

---

## Configuration

| Variable | Default | Purpose |
|----------|---------|---------|
| `BASE_URL` | `https://mb.io/en-AE` | Target environment and locale |

```bash
BASE_URL=https://mb.io/en-AE npm test
```

---

## Assumptions

- The assignment URL (`https://trade.mb.io`) redirected to the login page, so tests target the public locale site [`https://mb.io/en-AE`](https://mb.io/en-AE) (found by following the logo link from the assignment landing page)
- Locale prefix is `/en-AE` (e.g. `/en-AE/explore`, `/en-AE/company`)
- Spot trading data is validated on the **Explore** page
- Market data loads asynchronously (`expect` timeout is 10s)
- Category tabs are **Hot**, **Gainers**, **Losers** (not "Top Gainers" etc.)
- `$MBG` opens an external tab to `token.multibankgroup.com`
- Why MultiBank content is reached via **Company** navigation → `/company`

---

## Reports & CI

- **Sample report (committed):** Playwright's built-in HTML report from a full Chromium run (15/15 passed)
  ```bash
  npm run show:sample-report
  ```
  Or after a fresh run: `npm run test:sample-report` then `npm run show:sample-report`
- **Local report after any run:** `npm run test` → `npm run test:report`
- **CI:** GitHub Actions runs Chromium + Firefox; HTML report uploaded per browser as an artifact

> Open the sample report with `show:sample-report`.

---

## Author

Wasey Saeed: [GitHub](https://github.com/WaseySaeed)

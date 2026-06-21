# MultiBank QA Automation Challenge

Playwright + TypeScript automation for [mb.io](https://mb.io/en-AE).

## Quick start

```bash
npm install && npm run install:browsers && npm test
```

## Prerequisites

- Node.js 18+
- npm 9+

## Project structure

```
├── pages/           # Page Object Model
├── tests/           # Spec files by feature area
├── test-data/       # Routes and expected content
├── utils/           # API and link helpers
└── playwright.config.ts
```

## Run tests

```bash
npm test
npm run test:navigation
npm run test:content-links
npm run test:negative
npm run test:trading
npm run test:headed
npm run test:report
```

## Environment

| Variable | Default |
|----------|---------|
| `BASE_URL` | `https://mb.io/en-AE` |

```bash
BASE_URL=https://mb.io/en-AE npm test
```

## Test coverage

| Spec | Area |
|------|------|
| `navigation.spec.ts` | Top nav visibility and link destinations |
| `trading.spec.ts` | Spot market UI, categories, API checks |
| `contentLinks.spec.ts` | Marketing content, download link, Why MultiBank |
| `negative.spec.ts` | Invalid routes, nav hrefs, HTTP status, mobile viewport |

## Reports

After a run:

- HTML: `playwright-report/index.html` → `npm run test:report`

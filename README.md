# Gambit Cloud Inventory

A small client-side React application for browsing cloud resources and grouping them into logical Applications. It was built as a focused product exercise with attention to clear security context, efficient bulk workflows, and useful empty and filtered states. The interface uses Fluent UI v9 components, themes, design tokens, and Griffel styling.

## Run locally

Requires Node.js 20.19+ or 22.12+.

```bash
npm install && npm run dev
```

Open the local URL printed by Vite (typically `http://localhost:5173`).

## What I built

- A typed inventory of 12 cloud resources across AWS, GCP, and Azure
- Search by resource name and filters for provider, environment, and criticality
- Individual and select-all-visible resource selection
- An application creation drawer with validation and a selection summary
- An applications workspace with metadata, issue counts, and provider coverage
- A lazy-loaded React Flow relationship graph with draggable Fluent nodes and pan/zoom controls
- Client-side persistence through `localStorage`, so created applications survive a refresh
- Responsive Fluent UI layouts, keyboard focus management, semantic controls, and reduced-motion support

The sample data intentionally mixes production and non-production workloads, global and regional resources, resource categories, owners, and risk levels. Related payments resources make a natural first grouping, while unrelated identity, platform, data, and communication resources make filtering and alternative application boundaries meaningful.

## Project structure

- `src/data.ts` — sample cloud inventory
- `src/types.ts` — domain model and filter types
- `src/main.tsx` — Fluent provider, light theme, and application root
- `src/styles/` — shared component Griffel styles, global reset, and graph dimensions
- `src/components/AppHeader.tsx` — primary navigation, notifications, and account identity
- `src/components/ApplicationsPage.tsx` — application list, details, statistics, and lazy graph boundary
- `src/components/ResourceMetrics.tsx` — resource overview grid and metric composition
- `src/components/MetricCard.tsx` — reusable resource overview metric
- `src/components/FilterSelect.tsx` — reusable labeled inventory filter
- `src/components/ResourceTable.tsx` — semantic inventory table with Fluent selection controls
- `src/components/CreateApplicationDialog.tsx` — Fluent overlay drawer creation workflow
- `src/components/ApplicationGraph.tsx` — React Flow topology with custom Fluent UI v9 nodes
- `src/App.tsx` — application state, Fluent surfaces and controls, filtering, navigation, and orchestration
- `src/App.styles.ts` — colocated app-shell layout and presentation

## Validation

```bash
npm run lint
npm run build
```

## Deployment

Pushes to `main` deploy the production build to GitHub Pages through the
`Deploy to GitHub Pages` workflow. The Vite base path is configured for the
`gambit-cloud-inventory` repository.

## What I would do next

- Add focused component tests for filtering, selection, persistence, and graph edge cases
- Add sort controls, saved views, pagination or virtualization for production-scale inventories
- Add editing and resource membership management for existing applications
- Validate persisted data with a runtime schema and version migrations
- Add resource detail panels and deep links while preserving filter state
- Replace the local store with optimistic API operations and server-side authorization

## AI usage

I used AI as an implementation partner to accelerate project scaffolding, generate the varied sample inventory, refine the UI system, and review workflow edge cases. I kept the scope and state model intentionally small, reviewed the generated TypeScript and interaction patterns, and validated the result with the linter, production build, and browser-based workflow checks.

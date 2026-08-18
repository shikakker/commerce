# commerce — Modernization Roadmap

The repository is a Svelte application with Tailwind and both npm and pnpm lockfiles. The current README is too small to establish product scope.

## 10 tasks

1. Trace `src/` and document verified catalog/cart/checkout behavior only where implemented.
2. Choose one package manager and remove lockfile ambiguity after confirming the canonical workflow.
3. Define typed product, price, cart and inventory models at data boundaries.
4. Add loading, empty, unavailable-product and failed-action states.
5. Validate quantity, price and checkout-related inputs; never trust client-calculated totals for real transactions.
6. Add tests for cart math, state transitions and core shopping flows that exist.
7. Add CI for formatting, lint/type checks, tests and production build.
8. Audit accessibility for product cards, quantity controls, cart and checkout interactions.
9. Upgrade Svelte/Tailwind dependencies incrementally and measure bundle/performance impact.
10. Replace the minimal README with a verified commerce case study, clearly distinguishing prototype UI from real payment/order infrastructure.

## Portfolio value

Potentially useful for demonstrating commerce UX and Svelte implementation if the difference between prototype and production transaction logic is explicit.
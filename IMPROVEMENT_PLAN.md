# Completion plan

1. Expand the 331-byte README only from behavior verified in the existing SvelteKit `src` implementation.
2. Inventory product/catalog/cart/checkout flows actually present and distinguish static demo data from live commerce integrations.
3. Define typed money/product/cart models and avoid floating-point arithmetic for monetary totals.
4. Validate quantities, variants, inventory assumptions and totals at trusted boundaries before any real checkout integration.
5. Add loading, empty catalog/cart, unavailable item, checkout failure and retry/recovery states.
6. Audit accessibility and responsive behavior for product grids, cart controls and checkout forms that exist.
7. Standardize package management: both npm and pnpm lockfiles are tracked.
8. Add unit tests for cart/price calculations and interaction tests for browse-to-cart flows.
9. Add CI for formatting/lint/type-check, tests and production SvelteKit build.
10. Rewrite README as concise portfolio documentation with verified features, data/payment status, architecture, setup and limitations.

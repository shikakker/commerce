# Completion plan

1. Replace the 331-byte README with documentation derived from the actual SvelteKit storefront: home/catalog grids, collection/search routes, product detail, cart endpoint/store and `ShoppingCart` UI.
2. Audit `src/utils/shopify.js`, `components/utils/api.js/models.js` and every route loader to establish whether Shopify is live, which Storefront API operations are used and which product/cart values are fixtures.
3. Move all Shopify credentials/tokens to server-only configuration, expose only public Storefront credentials when explicitly safe, validate upstream GraphQL responses and normalize provider errors before UI consumption.
4. Define typed money/product/variant/cart models and use currency-aware decimal/minor-unit handling; never sum formatted strings or JS floating-point values for checkout totals.
5. Make variant/quantity/cart semantics deterministic: unavailable variants, zero/negative quantities, stale inventory, duplicate lines and cart refresh must have explicit behavior before any checkout handoff.
6. Add loading, empty collection/search/cart, product-not-found, unavailable variant, Shopify/network failure and retry states while preserving cart state across recoverable failures.
7. Audit `Header`, `SearchBar`, product carousel/grid and `ShoppingCart` for keyboard/focus/labels, responsive overflow and accessible price/variant announcements.
8. Select npm or pnpm as the canonical package manager, remove the competing lockfile and pin a compatible Node version for this older SvelteKit routing structure.
9. Add unit tests for product normalization/cart totals and mocked Shopify route tests for browse -> product -> add/update/remove cart, plus CI for formatting/lint/typecheck/tests/build.
10. Rewrite README as a verified Shopify/SvelteKit storefront case study with implemented commerce flows, exact live/demo/payment status, architecture, setup, screenshots and limitations.

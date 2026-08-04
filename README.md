# SvelteKit Commerce

SvelteKit storefront prototype backed by the Shopify Storefront API.

## Features

- Product and collection browsing.
- Search and responsive product grids.
- Product carousel and description UI.
- Client-side shopping cart with Shopify cart loading and checkout URL support.
- Reusable header, footer, icons, and cart components.

## Tech stack

- Svelte and SvelteKit
- Shopify Storefront API
- Tailwind CSS
- PostCSS and Sass

## Environment

Create `.env` with Shopify Storefront API credentials:

```env
VITE_SHOPIFY_API_ENDPOINT=https://your-store.myshopify.com/api/2022-07/graphql.json
VITE_SHOPIFY_STOREFRONT_API_TOKEN=your_storefront_token
```

## Getting started

```bash
npm install
npm run dev
```

## Scripts

- `npm run dev` — start SvelteKit.
- `npm run build` — create a production build.
- `npm run preview` — preview the build.
- `npm run lint` — check formatting.
- `npm run format` — format the project.

## Status

Storefront prototype. A real deployment requires valid Shopify configuration and production checkout testing.

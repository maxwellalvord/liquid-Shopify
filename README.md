# Inkwell

A Shopify theme for an independent bookstore, built on [Dawn](https://github.com/Shopify/dawn) 15.5.0. The demo store is **Quillmere Press**, a made-up small press that publishes four books a year.

This is a test and portfolio project. It isn't running on a live store.

## What's custom

**Book hero section** (`sections/hero-book.liquid`)
A homepage hero for a single title. Pick a product and it fills in the cover, title, author line ("by" plus the vendor), the formats with their prices, and the button link. Every field can be overridden in the theme editor. When the theme setting "Reveal sections on scroll" is on, the cover tips forward off the shelf and the text rises in. At the top of the page this is a CSS-only animation on load (the cover image is never hidden behind JavaScript). Further down, it uses Dawn's own scroll-trigger. Visitors with reduced motion turned on see no animation.

**Signed-copy option** (`snippets/signed-copy-option.liquid`, `assets/signed-copy.js`)
A product-page block that adds a "Signed copy" checkbox. When it's ticked, the order line item gets the property `Signed copy: Yes`, which shows in the cart, at checkout and in the admin. Signing can be limited to one option value (by default, Hardcover). The checkbox switches on and off as the customer changes variants, and the note under it explains why.

> Note: the hardcover-only rule is checked in the browser only. Check the format before signing a copy.

**Quillmere styling** (`assets/quillmere.css`, `config/settings_data.json`)
Besley headings with Instrument Sans body text, a navy, gold and oxblood palette, and squared-off buttons and inputs.

## Running it locally

You need the [Shopify CLI](https://shopify.dev/docs/storefronts/themes/tools/cli) and a development store.

```bash
shopify theme dev --store <your-store>.myshopify.com
```

The homepage hero expects a product with the handle `the-signal-at-gull-rock`. Create one, or choose a different book in the theme editor.

## License

Based on Shopify's Dawn theme and released under its license, which allows use only for building Shopify themes. See [LICENSE.md](LICENSE.md).

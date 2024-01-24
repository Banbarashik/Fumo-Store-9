# Fumo Store №9

An E-Commerce Website. Integrated with Shopify. Built upon the Next.js Commerce template.

## Running locally

You will need to use the environment variables [defined in `.env.example`](.env.example) to run Next.js Commerce. It's recommended you use [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables) for this, but a `.env` file is all that is necessary.

> Note: You should not commit your `.env` file or it will expose secrets that will allow others to control your Shopify store.

1. Install Vercel CLI: `npm i -g vercel`
2. Link local instance with Vercel and GitHub accounts (creates `.vercel` directory): `vercel link`
3. Download your environment variables: `vercel env pull`

```bash
pnpm install
pnpm dev
```

Your app should now be running on [localhost:3000](http://localhost:3000/).

## Vercel, Next.js Commerce, and Shopify Integration Guide

You can use this comprehensive [integration guide](http://vercel.com/docs/integrations/shopify) with step-by-step instructions on how to configure Shopify as a headless CMS using Next.js Commerce as your headless Shopify storefront on Vercel.

If you want to use this project for your own Store, you can follow Vercel's intergration guide [integration guide](http://vercel.com/docs/integrations/shopify).

> Note: Additionaly to the steps described in Vercel's integration guide, you need to do some extra actions to integrate with Shopify's Customer Account API

First, you need to follow Shopify's [Getting started with the Customer Account API](https://shopify.dev/docs/custom-storefronts/building-with-the-customer-account-api/getting-started) guide. After you've completed all the steps, you need to add the following environment variables to your project

| Key                | Value                              |
| ------------------ | ---------------------------------- |
| LOGIN_REDIRECT_URI | (URL of your ngrok HTTPS endpoint) |
| SHOP_ID            | (your shop id)                     |

Once you've deployed your store, you should set the value of LOGIN_REDIRECT_URI in Production Environment to your deployment's URL.

To get your shop's ID, you can add "/shop.json" to the end of your store URL (e.g., "test-store.myshopify.com/shop.json") which will display store info in JSON format. On this page you can search for "shopId" and you should find the store ID as a string.

Finally, you need to create a webhook for "Order creation" event the same way as described in [Step 5](https://vercel.com/docs/integrations/shopify#configure-shopify-webhooks) of Vercel's guide.

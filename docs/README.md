![Site logo](logo.svg)

This project contains the code behind my demo [store](https://fumo-store-9.vercel.app/). Basically, this is an extended version of the [Next.js Commerce template](https://github.com/vercel/commerce). You can see a list of improvements and extensions (with gifs for demonstration) here.

## Project setup

### Setting up the local environment

1. Clone the repository.
2. Rename .env.example to .env.local.

Run the following commands (in the folder of your cloned repository):

```bash
pnpm install
pnpm dev
```

Your app should now be running on [localhost:3000](http://localhost:3000/). To shut down the app click Ctrl + C while in terminal.

> The storefront won't work just yet. You'll have to populate your .env.local file with environment variables values to which you'll get while following the Shopify Integration instruction.

### Shopify integration

1. Follow this [video](https://youtu.be/CcLopj8zVJc) to create a development store.
2. Set the value of the "SHOPIFY_STORE_DOMAIN" environment variable to the URL of your development store (can be seen in [Settings](https://admin.shopify.com/store/store-for-instruction/settings)).
3. Install the [Headless app](https://apps.shopify.com/headless) and create a storefront ([instruction](https://vercel.com/docs/integrations/shopify#install-the-shopify-headless-app)).
4. Set the value of the "SHOPIFY_STOREFRONT_ACCESS_TOKEN" environment variable to the Public access token from the previous step.
5. Configure Shopify webhooks using this [instruction](https://vercel.com/docs/integrations/shopify#configure-shopify-webhooks).
6. Create a webhook for the "Order creation" event the same way.
7. Set the value of the "SHOPIFY_REVALIDATION_SECRET" environment variable to the revalidation secret you created in Step 5.
8. In your Shopify store's [Settings](https://admin.shopify.com/store/store-for-instruction/settings), go to [Customer accounts](https://admin.shopify.com/store/store-for-instruction/settings/customer_accounts), click "Edit" in "Accounts in online store and checkout", checkout "Show login link in the header of online store and at checkout" and choose "New customer accounts". Save the settings.
9. Follow Steps 1-3 of Shopify's [Getting started with the Customer Account API](https://shopify.dev/docs/custom-storefronts/building-with-the-customer-account-api/getting-started) guide (this storefront uses the confidential type of a client, so you can ignore info related to public clients).
10. Set the values of the "CLIENT_ID" and "CLIENT_SECRET" environment variables to the client ID and client secret from the previous step.
11. Set the value of the "LOGIN_REDIRECT_URI" environment variable to the ngrok endpoint you used in Step 8 and 5.
12. Set the value of the "SHOP_ID" environment variable to your Shopify store's shop ID.
    To get the shop ID, you can add "/shop.json" to the end of your store URL (e.g., "test-store.myshopify.com/shop.json") which will display store info in JSON format. On this page you can search for "shopId".

After completing these steps your storefront will be able to display information from your Shopify store, store products in the cart, create orders and authorize users.

For more detailed guide on Shopify (and Vercel) intergration you can refer this [guide](https://vercel.com/docs/integrations/shopify).

## Technology stack

- Main
  - Next.js - a full-stack web framework.
  - TypeScript - a superset of JavaScript with strong types.
  - TailwindCSS - a utility-first CSS framework.
- Auxiliary
  - shadcn/ui - a collection of components.
  - Lucide-react - a collection of icons.
  - Keen-slider - a slider library.
- Dev
  - ESlint
  - Prettier

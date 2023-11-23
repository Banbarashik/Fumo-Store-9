import { redirect } from 'next/navigation';

const shopId = process.env.SHOP_ID;
const clientId = process.env.CLIENT_ID;
const redirectURI = process.env.LOGIN_REDIRECT_URI;

if (
  typeof shopId === 'undefined' ||
  typeof clientId === 'undefined' ||
  typeof redirectURI === 'undefined'
)
  throw new Error('shopId, clientId and redirectURI must be defined');

const authorizationRequestUrl = new URL(`https://shopify.com/${shopId}/auth/oauth/authorize`);

authorizationRequestUrl.searchParams.append(
  'scope',
  'openid email https://api.customers.com/auth/customer.graphql'
);
authorizationRequestUrl.searchParams.append('client_id', clientId);
authorizationRequestUrl.searchParams.append('response_type', 'code');
authorizationRequestUrl.searchParams.append('redirect_uri', redirectURI);

export async function GET() {
  redirect(authorizationRequestUrl.href);
}

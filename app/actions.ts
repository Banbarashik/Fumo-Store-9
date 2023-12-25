'use server';

import { cookies } from 'next/headers';

// TODO: handle cases when retrieval of tokens fails
// CASES:
// [] retrieval of one of the tokens failed AND there's no an access token in the cookies
// [] retrieval of one of the tokens failed BUT there's an access token in the cookies
//* I CAN CHECK FOR THE PRESENCE OF THE ACCESS TOKEN (COOKIES().GET('ACCESS_TOKEN'))
export async function authenticate(code: string | null) {
  const isAuthenticated = cookies().get('access_token') !== undefined;

  if (isAuthenticated) return true;
  if (isAuthenticated && code === null) return true;
  if (!isAuthenticated && code === null) return false;

  if (process.env.CLIENT_ID === undefined) throw new Error('CLIENT_ID not found');
  if (process.env.LOGIN_REDIRECT_URI === undefined) throw new Error('LOGIN_REDIRECT_URI not found');

  const credentials = btoa(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`);
  credentials.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');

  const headers = {
    'content-type': 'application/x-www-form-urlencoded',
    Authorization: `Basic ${credentials}`
  };

  const intermediateAccessTokenReqBody = new URLSearchParams();
  intermediateAccessTokenReqBody.append('grant_type', 'authorization_code');
  intermediateAccessTokenReqBody.append('client_id', process.env.CLIENT_ID);
  intermediateAccessTokenReqBody.append('redirect_uri', process.env.LOGIN_REDIRECT_URI);
  intermediateAccessTokenReqBody.append('code', code!);

  try {
    const intermediateAccessTokenRes = await fetch(
      `https://shopify.com/${process.env.SHOP_ID}/auth/oauth/token`,
      {
        method: 'POST',
        headers,
        body: intermediateAccessTokenReqBody
      }
    );

    console.log(intermediateAccessTokenRes.status, intermediateAccessTokenRes.statusText);
    if (intermediateAccessTokenRes.status !== 200) return false;

    const {
      access_token: intermediateAccessToken,
      expires_in,
      id_token,
      refresh_token
    } = await intermediateAccessTokenRes.json();

    const finalAccessTokenReqBody = new URLSearchParams();
    finalAccessTokenReqBody.append('grant_type', 'urn:ietf:params:oauth:grant-type:token-exchange');
    finalAccessTokenReqBody.append('client_id', process.env.CLIENT_ID);
    finalAccessTokenReqBody.append('audience', '30243aa5-17c1-465a-8493-944bcc4e88aa');
    finalAccessTokenReqBody.append('subject_token', intermediateAccessToken);
    finalAccessTokenReqBody.append(
      'subject_token_type',
      'urn:ietf:params:oauth:token-type:access_token'
    );
    finalAccessTokenReqBody.append('scopes', 'https://api.customers.com/auth/customer.graphql');

    const finalAccessTokenRes = await fetch(
      `https://shopify.com/${process.env.SHOP_ID}/auth/oauth/token`,
      {
        method: 'POST',
        headers,
        body: finalAccessTokenReqBody
      }
    );

    const { access_token: finalAccessToken } = await finalAccessTokenRes.json();

    console.log({ intermediateAccessToken, finalAccessToken });

    cookies().set('access_token', finalAccessToken);

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

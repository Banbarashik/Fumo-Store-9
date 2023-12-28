'use server';

import { cookies } from 'next/headers';

interface accessTokenResponse {
  access_token: string;
}
interface intermediateAccessTokenResponse extends accessTokenResponse {
  refresh_token: string;
}
interface finalAccessTokenResponse extends accessTokenResponse {
  expires_in: number;
}

// TODO: handle cases when retrieval of tokens fails
// CASES:
// [] retrieval of one of the tokens failed AND there's no an access token in the cookies
// [] retrieval of one of the tokens failed BUT there's an access token in the cookies
export async function authenticate(code: string | null): Promise<boolean> {
  const isAuthenticated = cookies().get('access_token') !== undefined;

  if (isAuthenticated) return true;

  const refreshToken = cookies().get('refresh_token');

  if (refreshToken === undefined && code === null) return false; //* both ways of authentication aren't available

  if (process.env.CLIENT_ID === undefined) throw new Error('CLIENT_ID not found');
  if (process.env.LOGIN_REDIRECT_URI === undefined) throw new Error('LOGIN_REDIRECT_URI not found');

  const credentials = btoa(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`);
  credentials.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');

  const headers = {
    'content-type': 'application/x-www-form-urlencoded',
    Authorization: `Basic ${credentials}`
  };

  const intermediateAccessTokenReqBody = new URLSearchParams();

  if (refreshToken) {
    intermediateAccessTokenReqBody.append('grant_type', 'refresh_token');
    intermediateAccessTokenReqBody.append('client_id', process.env.CLIENT_ID);
    intermediateAccessTokenReqBody.append('refresh_token', refreshToken.value);
  } else if (code) {
    intermediateAccessTokenReqBody.append('grant_type', 'authorization_code');
    intermediateAccessTokenReqBody.append('client_id', process.env.CLIENT_ID);
    intermediateAccessTokenReqBody.append('redirect_uri', process.env.LOGIN_REDIRECT_URI);
    intermediateAccessTokenReqBody.append('code', code);
  }

  try {
    const intermediateAccessTokenRes = await fetch(
      `https://shopify.com/${process.env.SHOP_ID}/auth/oauth/token`,
      {
        method: 'POST',
        headers,
        body: intermediateAccessTokenReqBody
      }
    );

    if (intermediateAccessTokenRes.status !== 200) return false;

    const {
      access_token: intermediateAccessToken,
      refresh_token
    }: intermediateAccessTokenResponse = await intermediateAccessTokenRes.json();

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

    const { access_token, expires_in } = await finalAccessTokenRes.json();

    cookies().set({
      name: 'access_token',
      value: access_token,
      secure: true,
      httpOnly: true,
      // expires: Date.now() + expires_in * 1000
      expires: Date.now() + 15000
    });
    cookies().set({
      name: 'refresh_token',
      value: refresh_token,
      secure: true,
      httpOnly: true
    });

    console.log({ access_token, intermediateAccessToken, refreshToken });

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

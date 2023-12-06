import Link from 'next/link';
import { Suspense } from 'react';

import Footer from 'components/layout/footer';

import { buttonVariants } from '@/components/ui/button';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

import CollectionsList from '@/components/layout/collections-list';

export const runtime = 'edge';

export const metadata = {
  description: 'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
  openGraph: {
    type: 'website'
  }
};

export default async function HomePage({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  if (searchParams.code && !Array.isArray(searchParams.code)) {
    try {
      if (process.env.CLIENT_ID === undefined) throw new Error('CLIENT_ID not found');
      if (process.env.LOGIN_REDIRECT_URI === undefined)
        throw new Error('LOGIN_REDIRECT_URI not found');

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
      intermediateAccessTokenReqBody.append('code', searchParams.code);

      const intermediateAccessTokenRes = await fetch(
        `https://shopify.com/${process.env.SHOP_ID}/auth/oauth/token`,
        {
          method: 'POST',
          headers,
          body: intermediateAccessTokenReqBody
        }
      );

      const {
        access_token: intermediateAccessToken,
        expires_in,
        id_token,
        refresh_token
      } = await intermediateAccessTokenRes.json();

      const finalAccessTokenReqBody = new URLSearchParams();
      finalAccessTokenReqBody.append(
        'grant_type',
        'urn:ietf:params:oauth:grant-type:token-exchange'
      );
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

      console.log(finalAccessToken);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <Suspense>
        <div className="mx-auto max-w-screen-xl px-4 py-4 text-center">
          <CollectionsList />
          <Link href="/search" className={buttonVariants({ size: 'lg', className: 'gap-1' })}>
            <span className="text-base">See all our collections</span>
            <ChevronRightIcon className="h-5 w-5" />
          </Link>
        </div>
        <Footer />
      </Suspense>
    </>
  );
}

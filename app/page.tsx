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

      console.log(searchParams.code);

      const body = new URLSearchParams();

      body.append('grant_type', 'authorization_code');
      body.append('client_id', process.env.CLIENT_ID);
      body.append('redirect_uri', process.env.LOGIN_REDIRECT_URI);
      body.append('code', searchParams.code);

      const credentials = btoa(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`);
      credentials.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');

      const headers = {
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${credentials}`
      };

      const response = await fetch(`https://shopify.com/${process.env.SHOP_ID}/auth/oauth/token`, {
        method: 'POST',
        headers: headers,
        body
      });

      const data = await response.json();

      console.log(data);
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

import Link from 'next/link';
import { Suspense } from 'react';

import { getCollections } from 'lib/shopify';

import Grid from 'components/grid';
import CollectionGridItems from 'components/layout/collection-grid-items';
import Footer from 'components/layout/footer';
import Logo from 'components/logo';

import { buttonVariants } from '@/components/ui/button';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

export const runtime = 'edge';

export const metadata = {
  description: 'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
  openGraph: {
    type: 'website'
  }
};

export default async function HomePage() {
  const collections = await getCollections();

  return (
    <>
      <Suspense>
        <div className="mx-auto max-w-screen-xl px-4 py-4 text-center">
          <Logo className="mx-auto mb-8 w-2/3 max-w-md" /> {/* //TODO change mb */}
          <Grid className="mb-10 grid-cols-1">
            <CollectionGridItems collections={collections} />
          </Grid>
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

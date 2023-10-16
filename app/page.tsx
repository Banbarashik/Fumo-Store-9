import Grid from 'components/grid';
import Footer from 'components/layout/footer';
import { Suspense } from 'react';

import CollectionGridItems from 'components/layout/collection-grid-items';
import { getCollections } from 'lib/shopify';

import Logo from 'components/logo';

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
        <div className="mx-auto max-w-screen-xl px-4 py-4">
          <Logo className="mx-auto mb-8 w-2/3 max-w-md" /> {/* //TODO change mb */}
          <Grid className="grid-cols-1">
            <CollectionGridItems collections={collections} />
          </Grid>
        </div>
        <Footer />
      </Suspense>
    </>
  );
}

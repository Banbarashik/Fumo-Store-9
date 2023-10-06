import Grid from 'components/grid';
import Footer from 'components/layout/footer';
import { Suspense } from 'react';

import CollectionGridItems from 'components/layout/collection-grid-items';
import { getCollections } from 'lib/shopify';

export const runtime = 'edge';

export const metadata = {
  description: 'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
  openGraph: {
    type: 'website'
  }
};

export default async function HomePage() {
  const collections = await getCollections();

  console.log(collections);

  return (
    <>
      <Suspense>
        <div className="mx-auto max-w-screen-xl px-4">
          <Grid className="grid-cols-1">
            <CollectionGridItems collections={collections} />
          </Grid>
        </div>
        <Footer />
      </Suspense>
    </>
  );
}

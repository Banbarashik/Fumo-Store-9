import Link from 'next/link';
import { Suspense } from 'react';

import FooterMenu from '@/components/layout/footer/menu';
import Logo from '@/components/logo';
import { getMenu } from '@/lib/shopify';

const { COMPANY_NAME, SITE_NAME } = process.env;

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : '');
  const skeleton = 'w-full h-6 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700';
  const menu = await getMenu('nextjs');
  const copyrightName = COMPANY_NAME || SITE_NAME || '';

  return (
    <footer className="text-sm text-neutral-500 dark:text-neutral-400">
      <div className="mx-auto flex w-full max-w-7xl flex-row items-center justify-center gap-6 border-t border-neutral-200 py-6 text-sm sm:py-10 min-[1320px]:px-0 dark:border-neutral-700">
        <div>
          <Link className="block w-28 sm:w-32" href="/">
            <Logo />
          </Link>
        </div>
        <Suspense
          fallback={
            <div className="flex h-[188px] w-[200px] flex-col gap-2">
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
            </div>
          }
        >
          <FooterMenu menu={menu} />
        </Suspense>
      </div>
      <div className="border-t border-neutral-200 py-6 text-sm dark:border-neutral-700">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-1 px-4 md:flex-row md:gap-0 md:px-4 min-[1320px]:px-0">
          <p>
            &copy; {copyrightDate} {copyrightName}
            {copyrightName.length && !copyrightName.endsWith('.') ? '.' : ''}
          </p>
          <p className="md:ml-auto">
            Crafted by{' '}
            <a
              href="https://github.com/Banbarashik"
              target="_blank"
              className="text-black dark:text-white"
            >
              Banbarashik
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

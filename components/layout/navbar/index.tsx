import Cart from '@/components/cart';
import OpenCart from '@/components/cart/open-cart';
import MobileMenu from '@/components/layout/navbar/mobile-menu';
import Search from '@/components/layout/navbar/search';
import Logo from '@/components/logo';
import { getMenu } from '@/lib/shopify';
import { Menu } from '@/lib/shopify/types';
import Link from 'next/link';
import { Suspense } from 'react';

import Login from '@/components/layout/navbar/login';

export default async function Navbar() {
  const menu = await getMenu('main-menu');

  return (
    <nav className="relative flex items-center justify-between border-b border-blue-100 p-4 lg:px-6">
      <div className="block flex-none md:hidden">
        <MobileMenu menu={menu} />
      </div>
      <div className="flex w-full items-center">
        <div className="flex w-full md:w-5/12 lg:w-1/3">
          <Link href="/" className="mx-auto w-32 md:mx-0 md:mr-6">
            <Logo />
          </Link>
          {menu.length ? (
            <ul className="hidden gap-6 text-sm md:flex md:items-center">
              {menu.map((item: Menu) => (
                <li key={item.title}>
                  <Link
                    href={item.path}
                    className="text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className="hidden justify-center md:flex md:w-1/3">
          <Search />
        </div>
        <div className="ml-auto flex items-center justify-end gap-1 sm:gap-2">
          <Login />
          <Suspense fallback={<OpenCart />}>
            <Cart />
          </Suspense>
        </div>
      </div>
    </nav>
  );
}

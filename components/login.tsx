'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { authenticate } from '@/app/actions';

export default function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const searchParams = useSearchParams();

  useEffect(function () {
    const code = searchParams.get('code');

    const logIn = async function () {
      const isAccessTokenStored = await authenticate(code);
      setIsLoggedIn(isAccessTokenStored);
    };

    logIn();
  }, []);

  return isLoggedIn ? <Link href="/account">Account</Link> : <Link href="/login">Login</Link>;
}

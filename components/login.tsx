'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { authenticate } from '@/app/actions';

export default function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const searchParams = useSearchParams();

  const code = searchParams.get('code');

  useEffect(function () {
    if (!code) return;

    const logIn = async function () {
      const isAccessTokenStored = await authenticate(code);
      setIsLoggedIn(isAccessTokenStored);
    };

    logIn();
  }, []);

  return isLoggedIn ? <Link href="/account">Account</Link> : <Link href="/login">Login</Link>;
}

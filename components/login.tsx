'use client';

import { storeAccessToken } from '@/app/actions';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Login() {
  const [isLogged, setIsLogged] = useState(false);

  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  useEffect(() => {
    if (code && !Array.isArray(code) && !isLogged) {
      console.log('useEffect executed', 'code: ', code);
      const authenticate = async function () {
        console.log('code: ', code);
        const log = (await storeAccessToken(code)) || false;
        setIsLogged(log);
      };

      authenticate();
    }
  }, [isLogged]);

  console.log({ isLogged });

  return isLogged ? <Link href="/account">Account</Link> : <Link href="/login">Login</Link>;
}

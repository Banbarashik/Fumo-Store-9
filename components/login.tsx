'use client';

import { storeAccessToken } from '@/app/actions';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function Login() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  useEffect(() => {
    if (code && !Array.isArray(code)) {
      console.log('useEffect executed', 'code: ', code);
      const authenticate = async () => {
        console.log('code: ', code);
        await storeAccessToken(code);
      };

      authenticate();
    }
  }, []);

  return <Link href="/login">Login</Link>;
}

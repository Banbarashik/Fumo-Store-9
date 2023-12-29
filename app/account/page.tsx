import { cookies } from 'next/headers';

export default function Account() {
  const accessToken = cookies().get('access_token');

  return accessToken ? <p>Account info</p> : <p>You must log in</p>;
}

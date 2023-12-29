import { getCustomer } from '@/lib/shopify';
import { cookies } from 'next/headers';

export default async function Account() {
  const accessToken = cookies().get('access_token');

  if (!accessToken) return <p>You must log in</p>;

  const customer = await getCustomer(accessToken.value);

  console.log(customer.orders);

  return (
    <div>
      <h1>Account info</h1>
      <p>{customer.displayName}</p>
    </div>
  );
}

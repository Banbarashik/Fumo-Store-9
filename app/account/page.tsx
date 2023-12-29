import { getCustomerQuery } from '@/lib/shopify/queries/customer';
import { cookies } from 'next/headers';

export default async function Account() {
  const accessToken = cookies().get('access_token');

  if (!accessToken) return <p>You must log in</p>;

  const getCustomerRes = await fetch(
    `https://shopify.com/${process.env.SHOP_ID}/account/customer/api/unstable/graphql`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken.value
      },
      body: JSON.stringify({
        operationName: 'getUserName',
        query: getCustomerQuery,
        variables: {}
      })
    }
  );

  const { data } = await getCustomerRes.json();

  console.log(data.customer.orders.edges);

  return (
    <div>
      <h1>Account info</h1>
      <p>{data.customer.displayName}</p>
    </div>
  );
}

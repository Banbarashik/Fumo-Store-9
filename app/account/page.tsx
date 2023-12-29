import { cookies } from 'next/headers';

export default async function Account() {
  const accessToken = cookies().get('access_token');

  if (!accessToken) return <p>You must log in</p>;

  const getUserNameQuery = `
    query getUserName {
      customer {
        firstName
      }
    }
  `;

  const getUserNameRes = await fetch(
    `https://shopify.com/${process.env.SHOP_ID}/account/customer/api/unstable/graphql`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken.value
      },
      body: JSON.stringify({
        operationName: 'getUserName',
        query: getUserNameQuery,
        variables: {}
      })
    }
  );

  const data = await getUserNameRes.json();

  console.log(data.data.customer.firstName);

  return (
    <div>
      <h1>Account info</h1>
      <p>{data.data.customer.firstName}</p>
    </div>
  );
}

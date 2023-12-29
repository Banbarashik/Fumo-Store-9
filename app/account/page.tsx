import { getCustomer } from '@/lib/shopify';
import { cookies } from 'next/headers';

export default async function Account() {
  const accessToken = cookies().get('access_token');

  if (!accessToken) return <p>You must log in</p>;

  const customer = await getCustomer(accessToken.value);

  return (
    <div>
      <h1>Account info</h1>
      <p>{customer.displayName}</p>
      <p>Orders</p>
      <ul>
        {customer.orders.map(function (order) {
          return (
            <li key={order.name}>
              <p>Order: {order.name}</p>
              <p>Total price: {order.totalPrice.amount}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

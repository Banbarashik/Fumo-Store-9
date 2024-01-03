import { getCustomer } from '@/lib/shopify';
import { cookies } from 'next/headers';

export default async function Account() {
  const accessToken = cookies().get('access_token');

  if (!accessToken) return <p>You must log in</p>;

  const customer = await getCustomer(accessToken.value);

  console.log(customer);

  return (
    <div className="mx-auto max-w-screen-md py-4">
      <h1 className="pb-6 text-center text-3xl">Customer Information</h1>
      <div className="grid grid-cols-2 gap-4">
        <p>Full name: {customer.displayName}</p>
        <p className="col-start-1 row-start-2">
          Address: {customer.defaultAddress?.formatted.join(', ')}
        </p>
        <p className="col-start-2 row-start-1">E-mail: {customer.emailAddress?.emailAddress}</p>
        <p>Phone number: {customer.phoneNumber?.phoneNumber}</p>
      </div>
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

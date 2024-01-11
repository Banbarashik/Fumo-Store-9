import CustomerInfo from '@/components/account/info';
import CustomerOrders from '@/components/account/orders';
import { getCustomer } from '@/lib/shopify';
import { cookies } from 'next/headers';

export default async function Account() {
  const accessToken = cookies().get('access_token');

  if (!accessToken) return <p>You must log in</p>;

  const customer = await getCustomer(accessToken.value);

  return (
    //* 92px in max-h-[calc(100vh-92px)] is the calculated height of the navbar
    // TODO find a more dynamic way to calculate the max height of the div
    <div className="mx-auto flex max-h-[calc(100vh-92px)] max-w-screen-md flex-col py-4">
      <h1 className="pb-6 text-center text-3xl">Customer Information</h1>
      <CustomerInfo
        displayName={customer.displayName}
        address={customer.defaultAddress?.formatted.join(', ')}
        email={customer.emailAddress?.emailAddress}
        phone={customer.phoneNumber?.phoneNumber}
      />
      <h2 className="text-center text-2xl">Orders</h2>
      <CustomerOrders orders={customer.orders} />
    </div>
  );
}

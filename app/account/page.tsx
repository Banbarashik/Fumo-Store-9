import CustomerInfo from '@/components/account/info';
import Price from '@/components/ui/price';
import { getCustomer } from '@/lib/shopify';
import clsx from 'clsx';
import { cookies } from 'next/headers';
import Image from 'next/image';

export default async function Account() {
  const accessToken = cookies().get('access_token');

  if (!accessToken) return <p>You must log in</p>;

  const customer = await getCustomer(accessToken.value);

  console.log(customer);

  return (
    <div className="mx-auto max-w-screen-md py-4">
      <h1 className="pb-6 text-center text-3xl">Customer Information</h1>
      <CustomerInfo
        displayName={customer.displayName}
        address={customer.defaultAddress?.formatted.join(', ')}
        email={customer.emailAddress?.emailAddress}
        phone={customer.phoneNumber?.phoneNumber}
      />
      <h2 className="text-center text-2xl">Orders</h2>
      <ul className="rounded-sm border border-neutral-200 px-3 py-4 dark:border-neutral-800">
        {customer.orders.map((order, i, arr) => (
          <li
            key={order.name}
            className={clsx(
              'rounded-sm border border-neutral-200 px-3 py-4 dark:border-neutral-800',
              {
                'mb-6': i + 1 < arr.length // don't add a margin to the last element of the list
              }
            )}
          >
            <div className="mb-3 flex justify-between">
              <p>
                Order {order.name}
                {', '}
                {new Date(order.processedAt).toLocaleString(undefined, {
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric'
                })}
              </p>
              <div>
                <span>Total: </span>
                <Price
                  className="inline-block text-right text-base font-semibold text-black dark:text-white"
                  amount={order.totalPrice.amount}
                  currencyCode={order.totalPrice.currencyCode}
                />
              </div>
            </div>
            <ul>
              {order.lineItems.map((item, i, arr) => (
                <li
                  className={clsx(
                    'flex gap-6 rounded-sm border border-neutral-200 bg-neutral-100 px-3 py-4 dark:border-neutral-800 dark:bg-neutral-900',
                    {
                      'mb-4': i + 1 < arr.length // don't add a margin to the last element of the list
                    }
                  )}
                >
                  <div className="flex flex-col justify-between">
                    <p>{item.name}</p>
                    <Price
                      className="w-fit rounded-full bg-blue-600 p-2 text-white"
                      amount={item.price.amount}
                      currencyCode={item.price.currencyCode}
                    />
                  </div>
                  <div className="ml-auto flex flex-col justify-between text-right">
                    <div>
                      <Price
                        className="inline text-right text-base font-medium text-black dark:text-white"
                        amount={item.totalPrice.amount}
                        currencyCode={item.totalPrice.currencyCode}
                      />
                    </div>
                    <p className="text-sm">Quantity: {item.quantity}</p>
                  </div>
                  <Image
                    className="order-first h-20 w-20 rounded-sm object-cover"
                    src={item.image.url}
                    alt={item.image.altText || ''}
                    width={80}
                    height={80}
                  />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

import Price from '@/components/ui/price';
import { LineItem, Order } from '@/lib/shopify/types';
import clsx from 'clsx';
import Image from 'next/image';

export default function CustomerOrders({ orders }: { orders: Order[] }) {
  return (
    <ul className="overflow-y-scroll rounded-sm border border-neutral-200 px-3 py-4 dark:border-neutral-800">
      {orders.map((order, i, arr) => (
        <CustomerOrder order={order} isLast={arr.length === i + 1} />
      ))}
    </ul>
  );
}

function CustomerOrder({ order, isLast }: { order: Order; isLast: boolean }) {
  return (
    <li
      key={order.name}
      className={clsx(
        'rounded-sm border border-neutral-200 px-3 py-4 dark:border-neutral-700 dark:bg-neutral-900',
        {
          'mb-6': !isLast // don't add a margin to the last element of the list
        }
      )}
    >
      <div className="mb-3 flex justify-between">
        <p>
          Order {order.name}
          {', '}
          {new Date(order.createdAt).toLocaleString(undefined, {
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
          <CustomerOrderItem item={item} isLast={arr.length === i + 1} />
        ))}
      </ul>
    </li>
  );
}

function CustomerOrderItem({ item, isLast }: { item: LineItem; isLast: boolean }) {
  return (
    <li
      className={clsx(
        'flex flex-wrap gap-6 rounded-sm border border-neutral-200 bg-neutral-100 px-3 py-4 dark:border-neutral-800 dark:bg-neutral-800',
        {
          'mb-4': !isLast // don't add a margin to the last element of the list
        }
      )}
    >
      <div className="flex grow basis-0 flex-col justify-between gap-2">
        <p>{item.name}</p>
        <Price
          className="w-fit rounded-full bg-blue-600 p-2 text-sm text-white"
          amount={item.price.amount}
          currencyCode={item.price.currencyCode}
        />
      </div>
      <div className="flex w-full items-center justify-between text-right sm:ml-auto sm:w-auto sm:flex-col sm:items-end">
        <Price
          className="inline-block text-right text-base font-medium text-black dark:text-white"
          amount={item.totalPrice.amount}
          currencyCode={item.totalPrice.currencyCode}
        />
        <p className="order-first text-sm sm:order-last">Quantity: {item.quantity}</p>
      </div>
      <Image
        className="order-first h-20 w-20 self-center rounded-sm object-cover sm:self-start"
        //TODO: gracefully regress the product image to a dummy image if there's no url
        src={item.image?.url || ''}
        alt={item.image?.altText || item.name}
        width={80}
        height={80}
      />
    </li>
  );
}

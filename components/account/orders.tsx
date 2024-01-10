import Price from '@/components/ui/price';
import { LineItem, Order } from '@/lib/shopify/types';
import clsx from 'clsx';
import Image from 'next/image';

export default function CustomerOrders({ orders }: { orders: Order[] }) {
  return (
    <ul className="rounded-sm border border-neutral-200 px-3 py-4 dark:border-neutral-800">
      {orders.map((order, i, arr) => (
        <CustomerOrder order={order} isLast={i + 1 < arr.length} />
      ))}
    </ul>
  );
}

function CustomerOrder({ order, isLast }: { order: Order; isLast: boolean }) {
  return (
    <li
      key={order.name}
      className={clsx('rounded-sm border border-neutral-200 px-3 py-4 dark:border-neutral-800', {
        'mb-6': !isLast // don't add a margin to the last element of the list
      })}
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
          <CustomerOrderItem item={item} isLast={i + 1 < arr.length} />
        ))}
      </ul>
    </li>
  );
}

function CustomerOrderItem({ item, isLast }: { item: LineItem; isLast: boolean }) {
  return (
    <li
      className={clsx(
        'flex gap-6 rounded-sm border border-neutral-200 bg-neutral-100 px-3 py-4 dark:border-neutral-800 dark:bg-neutral-900',
        {
          'mb-4': !isLast // don't add a margin to the last element of the list
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
  );
}

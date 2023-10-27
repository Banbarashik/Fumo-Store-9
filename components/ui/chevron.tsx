import clsx from 'clsx';
import { ChevronUp } from 'lucide-react';

export default function Chevron({
  direction = 'up',
  disabled,
  ...props
}: {
  direction?: 'up' | 'right' | 'down' | 'left';
  disabled?: boolean;
} & React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <ChevronUp
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={clsx({
        'opacity-50': disabled,
        'rotate-0': direction === 'up',
        'rotate-90': direction === 'right',
        'rotate-180': direction === 'down',
        '-rotate-90': direction === 'left'
      })}
    />
  );
}

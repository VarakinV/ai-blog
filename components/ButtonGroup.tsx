'use client';
import { ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Children, cloneElement, ReactElement } from 'react';

interface ButtonGroupProps {
  className?: string;
  children: ReactElement<ButtonProps>[];
}

export function ButtonGroup({ className, children }: ButtonGroupProps) {
  const totalButtons = Children.count(children);
  return (
    <div className={cn('flex w-full', className)}>
      {children.map((child, index) => {
        const isFirst = index === 0;
        const isLast = index === totalButtons - 1;

        return cloneElement(child, {
          className: cn(
            {
              'rounded-l-none': !isFirst,
              'rounded-r-none': !isLast,
              'border-l-0': !isFirst,
            },
            child.props.className
          ),
        });
      })}
    </div>
  );
}

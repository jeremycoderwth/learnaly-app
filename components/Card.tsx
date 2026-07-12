import React from "react";
import { cn } from '@/lib/utils';
import { CardProps } from '@/lib/types';

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-xl border bg-white text-gray-900 shadow-sm transition-all duration-200',
          {
            'border-gray-200': variant === 'default',
            'border-blue-500 bg-blue-50 shadow-md': variant === 'highlighted',
            'border-gray-200 hover:border-gray-300 hover:shadow-md cursor-pointer': variant === 'interactive',
          },
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';

// CARD HEADER
export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1.5 p-6 pb-4', className)}
      {...props}
    />
  )
);

CardHeader.displayName = 'CardHeader';

// CARD TITLE
export const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('font-semibold leading-none tracking-tight text-gray-900', className)}
      {...props}
    />
  )
);

CardTitle.displayName = 'CardTitle';

// CARD CONTENT
export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0 text-sm text-gray-600', className)} {...props} />
  )
);

CardContent.displayName = 'CardContent';

// CARD FOOTER
export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center p-6 pt-0', className)}
      {...props}
    />
  )
);

CardFooter.displayName = 'CardFooter';
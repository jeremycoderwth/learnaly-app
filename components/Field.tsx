import React, { useId } from "react";
import { cn } from "@/lib/utils";
import { InputProps } from "@/lib/types";

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      inputSize = 'md',
      id,
      icon,
      ...props
    },
    ref
  ) => {
    // Generates a unique ID automatically if one isn't explicitly provided
    const generatedId = useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    return (
      <div className="flex w-full flex-col space-y-1.5">
        {label && (
          <label 
            htmlFor={inputId} 
            className="text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          {icon && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              {icon}
            </div>
          )}
          
          <input
            id={inputId}
            ref={ref}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : helperText ? helperId : undefined}
            className={cn(
              'flex w-full rounded-lg border bg-white px-3 py-2 text-sm transition-colors placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50',
              {
                'border-red-500 focus-visible:ring-red-500 focus-visible:border-red-500': error,
                'border-gray-300 focus-visible:ring-blue-500 focus-visible:border-blue-500': !error,
              },
              {
                'h-8 text-sm': inputSize === 'sm',
                'h-10 text-base': inputSize === 'md',
                'h-12 text-lg': inputSize === 'lg',
              },
              {
                'pl-10': icon,
              },
              className
            )}
            {...props}
          />
        </div>

        {error ? (
          <p id={errorId} className="text-sm text-red-500" role="alert">
            {error}
          </p>
        ) : helperText ? (
          <p id={helperId} className="text-sm text-gray-500">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
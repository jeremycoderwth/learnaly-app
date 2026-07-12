import { SpinnerProps } from '@/lib/types';

export default function Spinner({ 
    children,
    fillColor = 'none'
}: SpinnerProps) {
    return (
        <svg 
            className="mr-2 h-4 w-4 animate-spin" 
            xmlns="http://www.w3.org/2000/svg" 
            fill={fillColor} 
            viewBox="0 0 24 24"
        >
            {children}
        </svg>
    );
}
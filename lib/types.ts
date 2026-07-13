import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
}

export interface SpinnerProps extends React.SVGAttributes<SVGAElement> {
    fillColor?: string;
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'highlighted' | 'interactive';
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
    inputSize?: 'sm' | 'md' | 'lg';
    breakpoint?: 'sm' | 'md' | 'lg';
    icon?: React.ReactNode;
}


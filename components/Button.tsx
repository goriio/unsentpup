import clsx from 'clsx';
import { ButtonHTMLAttributes, forwardRef, Ref } from 'react';

type Variant = 'primary' | 'secondary' | 'outline' | 'subtle';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  variant?: Variant;
  children?: string;
}

const base =
  'flex items-center px-4 py-2 text-slate-200 text-sm font-semibold rounded-md border border-blue-500 hover:border-blue-600 active:border-blue-700 active:translate-y-0.5 ease-in-out duration-200';

const variants: Record<Variant, string> = {
  primary: 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700',
  secondary: 'border-gray-500 bg-gray-500 hover:bg-gray-600 active:bg-gray-700',
  outline:
    'text-blue-500 hover:text-white hover:bg-blue-600 active:bg-blue-700',
  subtle: 'border-none text-gray-300 hover:text-gray-400 active:text-gray-500',
};

export const Button = forwardRef(
  (
    { icon, variant = 'primary', children, ...rest }: ButtonProps,
    ref: Ref<HTMLButtonElement>
  ) => {
    return (
      <button ref={ref} className={clsx([base, variants[variant]])} {...rest}>
        {icon && <span className="mr-2">{icon}</span>}
        <span>{children}</span>
      </button>
    );
  }
);

Button.displayName = 'Button';

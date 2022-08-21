import clsx from 'clsx';

interface SpinnerProps {
  color?: 'dark' | 'light';
  size?: 'sm' | 'lg';
}

const base = 'mx-auto rounded-full animate-spin';

const variants = {
  color: {
    dark: 'border-slate-800 border-t-slate-600',
    light: 'border-slate-400 border-t-slate-200',
  },
  size: {
    sm: 'w-3 h-3 my-1 border-2',
    lg: 'w-7 h-7 my-4 border-4',
  },
};

export function Spinner({ color = 'dark', size = 'lg' }: SpinnerProps) {
  return (
    <div
      className={clsx(base, variants.color[color], variants.size[size])}
    ></div>
  );
}

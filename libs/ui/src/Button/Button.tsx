import clsx from 'clsx';
import { forwardRef } from 'react';
import { PolymorphicComponentPropsWithRef, PolymorphicRef } from './types';

const buttonStyles = {
  primary:
    'rounded-full bg-primary py-3 px-4 text-sm font-semibold text-white hover:opacity-80 active:opacity-80 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300/50',
  secondary:
    'rounded-full bg-slate-800 py-3 px-4 text-sm font-semibold text-white hover:bg-slate-700 active:text-slate-400 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50',
  link: 'py-3 px-4 text-sm font-semibold text-primary text-white active:text-slate-400 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50',
};

interface Props {
  variant?: keyof typeof buttonStyles;
  fullWidth?: boolean;
}

export type ButtonProps<C extends React.ElementType> =
  PolymorphicComponentPropsWithRef<C, Props>;

export const Button = forwardRef(
  <Tag extends React.ElementType = 'button'>(
    {
      as,
      children,
      className,
      variant = 'primary',
      fullWidth = false,
      loading,
      disabled,
      ...rest
    }: ButtonProps<Tag>,
    ref?: PolymorphicRef<Tag>
  ) => {
    const Component = as || 'button';

    return (
      <Component
        ref={ref}
        disabled={disabled}
        className={clsx(buttonStyles[variant], className, {
          'w-full': fullWidth,
          'cursor-not-allowed opacity-60': disabled,
        })}
        {...rest}
      >
        {children}
      </Component>
    );
  }
);

Button.displayName = 'Button';

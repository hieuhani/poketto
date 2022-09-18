import { forwardRef } from 'react';

interface Props {
  label?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLDivElement, Props>(
  ({ label, helperText, ...props }, ref) => (
    <div ref={ref}>
      {label && <label>{label}</label>}

      <input
        className="block w-full rounded-full border-slate-200 focus:border-primary focus:ring-primary dark:text-slate-500"
        {...props}
      />
      {helperText && <h3>{helperText}</h3>}
    </div>
  )
);

Input.displayName = 'Input';

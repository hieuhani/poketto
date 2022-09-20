import { forwardRef, InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: boolean;
}

// TODO: error chua code xong
export const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, helperText, ...props }, ref) => (
    <div ref={ref} className="space-y-2">
      {label && <label>{label}</label>}

      <input
        className="block w-full rounded-lg border-slate-200 focus:border-primary focus:ring-primary dark:text-slate-500"
        {...props}
      />
      {helperText && <h3>{helperText}</h3>}
    </div>
  )
);

Input.displayName = 'Input';

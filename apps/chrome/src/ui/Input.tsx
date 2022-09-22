import { forwardRef, InputHTMLAttributes } from 'react';

interface Props
  extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: boolean;
  multiline?: boolean;
}

// TODO: error chua code xong
export const Input = forwardRef<HTMLDivElement, Props>(
  ({ label, helperText, multiline, error, ...props }, ref) => {
    const Tag = multiline ? 'textarea' : 'input';
    return (
      <div ref={ref} className="space-y-2">
        {label && <label>{label}</label>}

        <Tag
          className="block w-full rounded-lg border-slate-200 focus:border-primary focus:ring-primary dark:text-slate-500"
          {...props}
        />
        {helperText && <h3>{helperText}</h3>}
      </div>
    );
  }
);

Input.displayName = 'Input';

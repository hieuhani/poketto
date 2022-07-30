import React from 'react';
import { Toaster, ToastOptions } from 'react-hot-toast';

export const HotToast: React.FC<ToastOptions> = (props) => {
  return <Toaster {...props} />;
};

export { toast, type ToastOptions } from 'react-hot-toast';

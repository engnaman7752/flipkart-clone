import React from 'react';
import useCartStore from '../store/cartStore';

const Toast = () => {
  const toast = useCartStore((state) => state.toast);

  if (!toast) return null;

  const bgColor = {
    success: 'bg-[#388e3c]',
    info: 'bg-[#2874f0]',
    error: 'bg-[#d32f2f]',
  }[toast.type] || 'bg-[#333]';

  return (
    <div className="fixed bottom-10 right-10 z-50 toast-enter">
      <div className={`${bgColor} text-white px-6 py-3 rounded-sm shadow-lg text-sm font-medium flex items-center gap-2 min-w-[200px]`}>
        {toast.type === 'success' && <span>✓</span>}
        {toast.type === 'info' && <span>ℹ</span>}
        {toast.type === 'error' && <span>⚠</span>}
        {toast.message}
      </div>
    </div>
  );
};

export default Toast;

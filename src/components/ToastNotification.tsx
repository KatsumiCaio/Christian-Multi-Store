import React from 'react';
import { CheckCircle, ShoppingBag, X } from 'lucide-react';

interface ToastProps {
  message: string;
  subMessage?: string;
  isOpen: boolean;
  onClose: () => void;
  onOpenCart?: () => void;
}

export const ToastNotification: React.FC<ToastProps> = ({
  message,
  subMessage,
  isOpen,
  onClose,
  onOpenCart,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 sm:left-auto sm:right-6 sm:translate-x-0 z-50 max-w-sm w-full px-4 sm:px-0">
      <div className="bg-[#131726] border border-cyan-400 text-white p-4 rounded-2xl shadow-[0_0_30px_rgba(0,229,255,0.35)] flex items-center justify-between gap-3 animate-fadeIn">
        <div className="flex items-center gap-3 min-w-0">
          <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-300 shrink-0">
            <CheckCircle className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="min-w-0">
            <h4 className="text-xs font-bold text-white truncate">{message}</h4>
            {subMessage && (
              <p className="text-[11px] text-slate-300 truncate">{subMessage}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {onOpenCart && (
            <button
              onClick={() => {
                onClose();
                onOpenCart();
              }}
              className="px-3 py-1.5 rounded-lg bg-cyan-400 text-black font-extrabold text-xs hover:bg-cyan-300 transition-colors flex items-center gap-1"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Ver</span>
            </button>
          )}

          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white"
            aria-label="Fechar notificação"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

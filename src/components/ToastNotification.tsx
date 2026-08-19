import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 sm:left-auto sm:right-6 sm:translate-x-0 z-50 max-w-sm w-full px-4 sm:px-0 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -8, scale: 0.95, filter: 'blur(2px)' }}
            transition={{ type: 'spring', stiffness: 140, damping: 18 }}
            className="bg-[#131726]/95 border border-[#00E5FF]/40 text-white p-4 rounded-2xl shadow-[0_0_35px_rgba(0,229,255,0.3)] flex items-center justify-between gap-3 backdrop-blur-xl pointer-events-auto glass"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-2 rounded-xl bg-[#00E5FF]/15 text-[#00E5FF] shrink-0">
                <CheckCircle className="w-5 h-5 text-[#00E5FF]" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-black text-white truncate">{message}</h4>
                {subMessage && (
                  <p className="text-[11px] text-slate-300 truncate font-medium">{subMessage}</p>
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
                  className="px-3.5 py-1.5 rounded-xl bg-[#00E5FF] text-black font-black text-xs uppercase tracking-wider hover:brightness-110 active:scale-[0.97] transition-all flex items-center gap-1 cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Ver</span>
                </button>
              )}

              <button
                onClick={onClose}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer active:scale-[0.95]"
                aria-label="Fechar notificação"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};


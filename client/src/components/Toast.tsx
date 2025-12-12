import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { useEffect } from 'react';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
    message: string;
    type: ToastType;
    onClose: () => void;
    duration?: number;
}

const Toast = ({ message, type, onClose, duration = 3000 }: ToastProps) => {
    useEffect(() => {
        const timer = setTimeout(onClose, duration);
        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const icons = {
        success: <CheckCircle size={20} />,
        error: <AlertCircle size={20} />,
        info: <Info size={20} />
    };

    const colors = {
        success: 'from-green-500 to-emerald-600',
        error: 'from-red-500 to-rose-600',
        info: 'from-blue-500 to-cyan-600'
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl bg-gradient-to-r ${colors[type]} text-white min-w-[300px] max-w-md`}
        >
            <div className="flex-shrink-0">{icons[type]}</div>
            <p className="flex-1 text-sm font-medium">{message}</p>
            <button
                onClick={onClose}
                className="flex-shrink-0 hover:bg-white/20 rounded-full p-1 transition-colors"
            >
                <X size={16} />
            </button>
        </motion.div>
    );
};

interface ToastContainerProps {
    toasts: Array<{ id: string; message: string; type: ToastType }>;
    removeToast: (id: string) => void;
}

export const ToastContainer = ({ toasts, removeToast }: ToastContainerProps) => {
    return (
        <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
            <AnimatePresence>
                {toasts.map((toast) => (
                    <Toast
                        key={toast.id}
                        message={toast.message}
                        type={toast.type}
                        onClose={() => removeToast(toast.id)}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
};

export default Toast;

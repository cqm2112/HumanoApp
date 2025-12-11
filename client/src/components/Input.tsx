import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';

interface InputProps extends HTMLMotionProps<"input"> {
    label: string;
}

const Input = ({ label, ...props }: InputProps) => {
    return (
        <div className="mb-4 relative">
            <label className="block text-sm font-medium text-slate-600 mb-1 ml-1">{label}</label>
            <motion.input
                whileFocus={{ scale: 1.02, borderColor: '#19ABE3', boxShadow: '0 0 8px rgba(25, 171, 227, 0.3)' }}
                className="w-full px-4 py-2 bg-white/80 border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-accent-primary focus:border-accent-primary transition-all duration-300 backdrop-blur-sm"
                {...props}
            />
        </div>
    );
};

export default Input;

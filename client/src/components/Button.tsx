import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<"button"> {
    children: React.ReactNode;
    variant?: 'primary' | 'danger' | 'secondary';
    isLoading?: boolean;
}

const Button = ({ children, variant = 'primary', isLoading, ...props }: ButtonProps) => {
    const baseStyle = "w-full py-2 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden";
    const variants = {
        primary: "bg-gradient-to-r from-[#19ABE3] to-[#464C5E] text-white hover:from-[#1593c4] hover:to-[#3e4454] shadow-lg shadow-[#19ABE3]/30",
        danger: "bg-gradient-to-r from-red-600 to-pink-600 text-white hover:from-red-500 hover:to-pink-500 shadow-lg shadow-red-500/30",
        secondary: "bg-slate-700 text-white hover:bg-slate-600",
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`${baseStyle} ${variants[variant]} ${props.disabled || isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={props.disabled || isLoading}
            {...props}
        >
            {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
                children
            )}
        </motion.button>
    );
};

export default Button;

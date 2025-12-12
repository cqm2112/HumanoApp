import React, { useState } from 'react';
import { motion } from 'framer-motion';

const AmbientBackground = () => {
  
    const colors = [
        'bg-[#19ABE3]/30', 
        'bg-[#FFA500]/20', 
        'bg-[#464C5E]/10', 
        'bg-[#19ABE3]/20',
        'bg-cyan-400/20'   
    ];

    const [orbs] = useState(() => Array.from({ length: 8 }).map((_, i) => ({
        id: i,
        color: colors[i % colors.length],
        size: Math.random() * 300 + 400, 
        initialX: Math.random() * 100,
        initialY: Math.random() * 100,
        duration: Math.random() * 10 + 15,
        moveX1: (Math.random() - 0.5) * 400,
        moveX2: (Math.random() - 0.5) * 400,
        moveY1: (Math.random() - 0.5) * 400,
        moveY2: (Math.random() - 0.5) * 400,
    })));

    return (
        <div className="fixed inset-0 overflow-hidden -z-0 bg-white">
            {orbs.map((orb) => (
                <motion.div
                    key={orb.id}
                    className={`absolute rounded-full mix-blend-multiply filter blur-[80px] opacity-70 ${orb.color}`}
                    style={{
                        width: orb.size,
                        height: orb.size,
                        top: `${orb.initialY}%`,
                        left: `${orb.initialX}%`,
                    }}
                    animate={{
                        x: [
                            0,
                            orb.moveX1,
                            orb.moveX2,
                            0
                        ],
                        y: [
                            0,
                            orb.moveY1,
                            orb.moveY2,
                            0
                        ],
                        scale: [1, 1.2, 0.9, 1],
                    }}
                    transition={{
                        duration: orb.duration,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
};

export default AmbientBackground;

import React from 'react';
import { motion } from 'framer-motion';

const AmbientBackground = () => {
    // Definir colores específicos de Humano
    const colors = [
        'bg-[#19ABE3]/30', // Azul Humano (más visible)
        'bg-[#FFA500]/20', // Naranja Humano
        'bg-[#464C5E]/10', // Gris Humano
        'bg-[#19ABE3]/20', // Azul suave
        'bg-cyan-400/20'   // Cyan complementar
    ];

    // Generar un set de orbes con propiedades aleatorias pero controladas para asegurar movimiento visible
    const orbs = Array.from({ length: 8 }).map((_, i) => ({
        id: i,
        color: colors[i % colors.length],
        size: Math.random() * 300 + 400, // Entre 400px y 700px
        initialX: Math.random() * 100,
        initialY: Math.random() * 100,
        duration: Math.random() * 10 + 15, // Entre 15 y 25 segundos (lento pero visible)
    }));

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
                            (Math.random() - 0.5) * 400,
                            (Math.random() - 0.5) * 400,
                            0
                        ],
                        y: [
                            0,
                            (Math.random() - 0.5) * 400,
                            (Math.random() - 0.5) * 400,
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

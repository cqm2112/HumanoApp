import React, { useEffect, useRef } from 'react';

interface WeatherAnimationProps {
    type: 'cold' | 'cool' | 'hot';
}

const WeatherAnimation: React.FC<WeatherAnimationProps> = ({ type }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;
        let animationFrameId: number;

        class Particle {
            x: number;
            y: number;
            speedX: number;
            speedY: number;
            size: number;
            color: string;

            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;

                if (type === 'cold') {
                    this.size = Math.random() * 3 + 1;
                    this.speedY = Math.random() * 1 + 0.5;
                    this.speedX = (Math.random() - 0.5) * 0.5;
                    this.color = `rgba(200, 230, 255, ${Math.random() * 0.5 + 0.3})`;
                } else if (type === 'cool') {
                    this.size = Math.random() * 40 + 20;
                    this.speedX = Math.random() * 0.5 + 0.1;
                    this.speedY = 0;
                    this.color = `rgba(255, 255, 255, ${Math.random() * 0.1})`;
                } else {
                    this.size = Math.random() * 5 + 2;
                    this.speedY = Math.random() * -1 - 0.5;
                    this.speedX = (Math.random() - 0.5) * 0.5;
                    this.color = `rgba(255, 200, 50, ${Math.random() * 0.3 + 0.1})`;
                }
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                this.y += this.speedY;
                if (type === 'cold') {
                    if (this.y > height) {
                        this.y = 0;
                        this.x = Math.random() * width;
                    }
                } else if (type === 'cool') {
                    if (this.x > width) {
                        this.x = -this.size;
                    }
                } else {
                    if (this.y < 0) {
                        this.y = height;
                        this.x = Math.random() * width;
                    }
                }

                this.draw();
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
        }

        const particles: Particle[] = [];
        const init = () => {
            particles.length = 0;
            const count = type === 'cool' ? 15 : 100;
            for (let i = 0; i < count; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, width, height);

            if (type === 'cold') {
                ctx.fillStyle = 'rgba(230, 240, 255, 0.2)';
            } else if (type === 'cool') {
                ctx.fillStyle = 'rgba(240, 255, 240, 0.1)';
            } else {
                ctx.fillStyle = 'rgba(255, 250, 230, 0.2)';
            }
            ctx.fillRect(0, 0, width, height);

            particles.forEach(p => p.update());
            animationFrameId = requestAnimationFrame(animate);
        };

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            init();
        };

        window.addEventListener('resize', handleResize);

        init();
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [type]);

    return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none -z-0" />;
};

export default WeatherAnimation;

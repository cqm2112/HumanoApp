import React, { useEffect, useRef } from 'react';

const GravityBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        // Mouse state
        const mouse = { x: -1000, y: -1000 };

        const resize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            initParticles();
        };

        class Particle {
            x: number;
            y: number;
            originX: number;
            originY: number;
            vx: number;
            vy: number;
            size: number;
            color: string;

            constructor(x: number, y: number) {
                this.x = x;
                this.y = y;
                this.originX = x;
                this.originY = y;
                this.vx = 0;
                this.vy = 0;
                this.size = Math.random() * 2;
                // Premium colors: Humano Blue/Orange + Neutral Grey for white bg
                const colors = ['#19ABE3', '#464C5E', '#FFA500', '#94a3b8'];
                this.color = colors[Math.floor(Math.random() * colors.length)];
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }

            update() {
                // Physics parameters
                const friction = 0.9; // Damping
                const ease = 0.1; // Return speed

                // Distance to mouse
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // Interaction radius
                const radius = 150;

                if (distance < radius) {
                    // Repulsion/Gravity effect
                    // Calculate angle
                    const angle = Math.atan2(dy, dx);
                    // Force is stronger when closer
                    const force = (radius - distance) / radius;
                    const pushX = Math.cos(angle) * force * 20; // Push strength
                    const pushY = Math.sin(angle) * force * 20;

                    this.vx -= pushX; // Move AWAY from mouse
                    this.vy -= pushY;
                }

                // Spring back to origin
                this.vx += (this.originX - this.x) * ease;
                this.vy += (this.originY - this.y) * ease;

                // Apply velocity and friction
                this.x += this.vx;
                this.y += this.vy;
                this.vx *= friction;
                this.vy *= friction;

                this.draw();
            }
        }

        const initParticles = () => {
            particles = [];
            // Grid of particles for structure, or random?
            // "Antigravity" often implies a grid being distorted. 
            // Let's do a dense grid.
            const spacing = 30;
            for (let y = 0; y < height; y += spacing) {
                for (let x = 0; x < width; x += spacing) {
                    particles.push(new Particle(x, y));
                }
            }
        };

        const animate = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, width, height);

            // Draw connections first (optional, can be expensive with too many particles)
            // For grid, only connect neighbors? Complexity O(N^2) otherwise.
            // Let's just draw particles for performance unless N is small.
            // With spacing 30 on 1920x1080 -> ~2000 particles. Connecting all is slow.
            // We just render particles interacting heavily.

            particles.forEach(p => p.update());

            animationFrameId = requestAnimationFrame(animate);
        };

        initParticles();
        animate();

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none -z-0" />;
};

export default GravityBackground;

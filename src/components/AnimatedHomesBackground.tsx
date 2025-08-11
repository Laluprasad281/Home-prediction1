import React from "react";

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

interface HouseParticle {
  x: number; y: number; size: number; speed: number; hue: number; alpha: number;
}

const drawHouse = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, alpha: number) => {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  ctx.lineWidth = Math.max(1, size * 0.06);

  // Base rectangle
  ctx.beginPath();
  ctx.rect(x - size * 0.5, y - size * 0.35, size, size * 0.6);
  ctx.fill();

  // Roof (triangle)
  ctx.beginPath();
  ctx.moveTo(x - size * 0.6, y - size * 0.35);
  ctx.lineTo(x, y - size * 0.9);
  ctx.lineTo(x + size * 0.6, y - size * 0.35);
  ctx.closePath();
  ctx.fill();

  // Door
  ctx.fillStyle = 'hsl(222 84% 4.9% / 0.85)';
  ctx.beginPath();
  ctx.rect(x - size * 0.12, y + size * 0.1, size * 0.24, size * 0.2);
  ctx.fill();

  ctx.restore();
};

const AnimatedHomesBackground: React.FC<{ className?: string }> = ({ className }) => {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const particlesRef = React.useRef<HouseParticle[]>([]);
  const rafRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    const onResize = () => {
      // Reset transform before resizing to avoid compounding scales
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      resize();
    };
    window.addEventListener('resize', onResize);

    const createParticles = () => {
      const count = Math.floor((canvas.clientWidth * canvas.clientHeight) / 20000);
      particlesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.clientWidth,
        y: Math.random() * canvas.clientHeight,
        size: 18 + Math.random() * 22,
        speed: 0.15 + Math.random() * 0.35,
        hue: 25 + Math.random() * 8, // around saffron
        alpha: 0.12 + Math.random() * 0.2,
      }));
    };

    createParticles();

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

      for (const p of particlesRef.current) {
        const color = `hsl(${p.hue} 95% 55%)`;
        drawHouse(ctx, p.x, p.y, p.size, color, p.alpha);
        // Drift upwards and slightly right
        p.y -= p.speed;
        p.x += p.speed * 0.3;
        if (p.y < -40) {
          p.y = canvas.clientHeight + 40;
          p.x = Math.random() * canvas.clientWidth;
        }
        if (p.x > canvas.clientWidth + 40) p.x = -40;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    if (!prefersReducedMotion()) {
      rafRef.current = requestAnimationFrame(animate);
    } else {
      // Static background for reduced motion
      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
      for (const p of particlesRef.current) {
        const color = `hsl(${p.hue} 95% 55%)`;
        drawHouse(ctx, p.x, p.y, p.size, color, p.alpha);
      }
    }

    return () => {
      window.removeEventListener('resize', onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
      role="img"
    />
  );
};

export default AnimatedHomesBackground;

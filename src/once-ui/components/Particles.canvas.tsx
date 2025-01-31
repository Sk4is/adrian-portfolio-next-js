import React, { useEffect, useRef } from "react";

const ParticlesCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const pointPos = useRef({ x: 0, y: 0 }); // Posición del punto con retraso
  const pointSpeed = 0.05; // Velocidad de seguimiento del ratón

  // Evento para capturar la posición del mouse
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const particles: Particle[] = [];
    const numParticles = 150; // Número de partículas

    class Particle {
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      life: number; // Tiempo de vida restante
      maxLife: number; // Tiempo de vida máximo
      opacity: number; // Opacidad para el fade in / fade out
    
      constructor() {
        const canvas = canvasRef.current;
        if (!canvas) return;  // Verifica si canvas es null
        
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 3 + 1;  // Tamaño aleatorio de las partículas
        this.vx = (Math.random() * 0.2 - 0.1);  // Velocidad reducida (más lenta)
        this.vy = (Math.random() * 0.2 - 0.1);  // Velocidad reducida (más lenta)
        this.maxLife = Math.random() * 10000 + 10000; // Tiempo de vida entre 10 y 20 segundos (en milisegundos)
        this.life = 0; // Comienza con 0 de vida para el fade-in
        this.opacity = 0; // Opacidad inicial en 0 (fade-in)
      }
    
      draw() {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (!ctx || !canvas) return; // Verifica si ctx o canvas son null
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        // Usamos un color más claro (gris más claro) para las partículas
        ctx.fillStyle = `rgba(200, 200, 200, ${this.opacity})`; 
        ctx.fill();
        ctx.closePath();
      }
    
      update() {
        const canvas = canvasRef.current;
        if (!canvas) return; // Verifica si canvas es null
    
        // Mover las partículas de manera aleatoria
        this.x += this.vx;
        this.y += this.vy;
    
        // Efecto de repulsión suave cuando el mouse se acerca a la partícula
        const dx = this.x - mousePos.current.x;
        const dy = this.y - mousePos.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const repulsionStrength = 1000; // Fuerza de repulsión más suave (ajustada para un movimiento más fluido)
    
        if (distance < 100) {
          // Asegurarse de que el movimiento no sea demasiado brusco
          const angle = Math.atan2(dy, dx);
          const force = (100 - distance) / repulsionStrength;
    
          // Mover la partícula ligeramente en la dirección opuesta al cursor
          this.vx += Math.cos(angle) * force;
          this.vy += Math.sin(angle) * force;
        }
    
        // Incrementar la vida para el fade-in
        if (this.life < this.maxLife) {
          this.life++; // Aumentamos la vida
          this.opacity = this.life / this.maxLife; // Aumenta la opacidad para fade-in
        } else {
          // Reducir la vida para el fade-out
          this.opacity = 1 - (this.life - this.maxLife) / this.maxLife; // Disminuye la opacidad para fade-out
        }
    
        // Si la partícula se ha salido del canvas, hacerla reaparecer en el otro lado
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0 || 
            this.y + this.radius > canvas.height || this.y - this.radius < 0) {
          this.resetParticle();
        }
    
        this.draw();
      }
    
      // Reiniciar la partícula con una nueva posición, velocidad y opacidad
      resetParticle() {
        const canvas = canvasRef.current;
        if (!canvas) return; // Verifica si canvas es null
        
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() * 0.2 - 0.1);  // Velocidad reducida
        this.vy = (Math.random() * 0.2 - 0.1);  // Velocidad reducida
        this.life = 0; // Resetear el contador de vida para el fade-in
        this.opacity = 0; // Reiniciar la opacidad para el fade-in
        this.maxLife = Math.random() * 10000 + 10000; // Tiempo de vida aleatorio entre 10 y 20 segundos
      }
    }

    // Función para dibujar el círculo con gradiente que sigue al cursor
    const drawFollowCursor = () => {
      // Aplicar retraso en el movimiento del punto
      pointPos.current.x += (mousePos.current.x - pointPos.current.x) * pointSpeed;
      pointPos.current.y += (mousePos.current.y - pointPos.current.y) * pointSpeed;

      // Crear gradiente radial con la forma elíptica y la transparencia
      const gradient = ctx.createRadialGradient(
        pointPos.current.x, pointPos.current.y, 0,
        pointPos.current.x, pointPos.current.y, 800 // Aumentamos el radio del gradiente
      );
      gradient.addColorStop(0, "rgba(47, 11, 252, 0.59)"); // Color sólido en el centro
      gradient.addColorStop(0.4, "rgba(0, 1, 80, 0.11)"); // Color intermedio con opacidad
      gradient.addColorStop(1, "transparent"); // Transparente en los bordes

      ctx.beginPath();
      ctx.ellipse(pointPos.current.x, pointPos.current.y, 1000, 1000, 0, 0, Math.PI * 2); // Forma elíptica gigante
      ctx.fillStyle = gradient;
      ctx.fill();
      ctx.closePath();
    };

    const initializeParticles = () => {
      particles.length = 0;
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => particle.update());

      // Dibuja el círculo con gradiente que sigue al cursor
      drawFollowCursor();

      animationFrameId = requestAnimationFrame(animate);
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initializeParticles();
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0, zIndex: -1 }} />;
};

export default ParticlesCanvas;

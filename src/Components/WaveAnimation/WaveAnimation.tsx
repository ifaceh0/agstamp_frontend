import React, { useEffect, useRef } from "react";

const WaveAnimation: React.FC<{ imageUrl: string }> = ({ imageUrl }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const animationIdRef = useRef<number>(0);
  const timeRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Load image
  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      imageRef.current = img;
      setupCanvas();
      startAnimation();
    };
    img.onerror = (error) => console.error("Failed to load image:", error);

    return () => {
      if (img) {
        img.onload = null;
        img.onerror = null;
      }
    };
  }, [imageUrl]);

  // Canvas setup for hero section
  const setupCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas || !imageRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    // Calculate dimensions to fill container while maintaining aspect ratio
    const image = imageRef.current;
    const imageAspectRatio = (image.width / image.height)*1.2;
    const containerAspectRatio = containerWidth / containerHeight;

    let canvasWidth, canvasHeight;

    if (containerAspectRatio > imageAspectRatio) {
      // Container is wider than image - fill height
      canvasHeight = containerHeight;
      canvasWidth = canvasHeight * imageAspectRatio;
    } else {
      // Container is taller than image - fill width
      canvasWidth = containerWidth;
      canvasHeight = canvasWidth / imageAspectRatio;
    }

    // Set canvas dimensions (scaled for sharpness on high DPI displays)
    const scale = window.devicePixelRatio || 1;
    canvas.width = canvasWidth * scale;
    canvas.height = canvasHeight * scale;
    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;

    // Adjust context for high DPI
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(scale, scale);
    }
  };

  // Original animation loop (unchanged)
  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas || !imageRef.current) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const image = imageRef.current;
    const isMobile = window.innerWidth < 768;
    const speedFactor = isMobile ? 0.02 : 0.05;
    const stepSize = isMobile ? 2 : 1;

    const canvasDisplayWidth = parseInt(canvas.style.width);
    const canvasDisplayHeight = parseInt(canvas.style.height);

    for (let x = 0; x < canvasDisplayWidth; x += stepSize) {
      const waveOffset1 = Math.sin(x * 0.02 + timeRef.current) * 10;
      const waveOffset2 = Math.sin(x * 0.05 + timeRef.current * 0.7) * 5;
      const waveOffset = waveOffset1 + waveOffset2;

      const sourceX = x * (image.width / canvasDisplayWidth);
      const sourceWidth = image.width / canvasDisplayWidth;

      ctx.drawImage(
        image,
        sourceX,
        0,
        sourceWidth * stepSize,
        image.height,
        x,
        waveOffset,
        stepSize,
        canvasDisplayHeight
      );
    }

    timeRef.current += speedFactor;
    animationIdRef.current = requestAnimationFrame(animate);
  };

  const startAnimation = () => {
    if (animationIdRef.current) {
      cancelAnimationFrame(animationIdRef.current);
    }
    animationIdRef.current = requestAnimationFrame(animate);
  };

  // Resize handling
  useEffect(() => {
    const handleResize = () => {
      setupCanvas();
    };

    const resizeObserver = new ResizeObserver(handleResize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    window.addEventListener('resize', handleResize);

    // Initial setup with small delay to ensure parent is ready
    const initTimeout = setTimeout(handleResize, 50);

    return () => {
      clearTimeout(initTimeout);
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationIdRef.current);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="w-full relative h-40 sm:h-60 md:h-72 lg:h-[400px] xl:h-[500px] mb-10" // h-screen makes it full viewport height
      style={{
        overflow: 'hidden', // Hide overflow but still scrollable in document flow
      }}
    >
      <canvas 
        ref={canvasRef} 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );
};

export default WaveAnimation;
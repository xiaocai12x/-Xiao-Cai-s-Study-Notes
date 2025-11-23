import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth springs for "silky" movement
  const springConfig = { damping: 25, stiffness: 300, mass: 0.2 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Rotation based on movement to give it weight
  const velocityX = useMotionValue(0);
  const rotateX = useTransform(velocityX, [-1000, 1000], [-30, 30]);

  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let lastX = 0;
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      const vel = e.clientX - lastX;
      velocityX.set(vel);
      lastX = e.clientX;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractable = target.closest('button') || target.closest('a') || target.closest('[data-hoverable="true"]');
      
      if (cursorRef.current) {
        if (isInteractable) {
           cursorRef.current.setAttribute('data-hover', 'true');
        } else {
           cursorRef.current.setAttribute('data-hover', 'false');
        }
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY, velocityX]);

  return (
    <motion.div
      ref={cursorRef}
      className="fixed top-0 left-0 z-[100] pointer-events-none mix-blend-exclusion hidden md:block"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        rotate: rotateX,
        translateX: "-50%",
        translateY: "-50%"
      }}
    >
      {/* Target Reticle - Adapted for new style */}
      <div className="relative flex items-center justify-center w-16 h-16 group">
        
        {/* Crosshair Lines */}
        <div className="absolute w-full h-[2px] bg-soviet-paper transition-all duration-300 group-data-[hover=true]:bg-soviet-cyan group-data-[hover=true]:h-[4px]"></div>
        <div className="absolute h-full w-[2px] bg-soviet-paper transition-all duration-300 group-data-[hover=true]:bg-soviet-cyan group-data-[hover=true]:w-[4px]"></div>
        
        {/* Outer Ring */}
        <div className="absolute border-2 border-soviet-paper w-10 h-10 rounded-full opacity-70 transition-all duration-300 group-data-[hover=true]:scale-150 group-data-[hover=true]:border-soviet-red group-data-[hover=true]:rounded-none"></div>
        
        {/* Floating Text */}
        <div className="absolute -top-8 -right-12 text-[10px] font-black font-sans text-soviet-red tracking-tighter opacity-0 group-data-[hover=true]:opacity-100 transition-opacity bg-soviet-paper px-1">
          LOCK_ON
        </div>
      </div>
    </motion.div>
  );
};

export default CustomCursor;
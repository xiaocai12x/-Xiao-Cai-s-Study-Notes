import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Page } from '../types';

interface CustomCursorProps {
  currentPage: Page;
}

const CustomCursor: React.FC<CustomCursorProps> = ({ currentPage }) => {
  // Mouse Position Sources
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const [isClicked, setIsClicked] = useState(false);

  // 1. THE CORE (Main Pointer - Extremely Stiff, instant response)
  // High stiffness, low mass ensures it sticks to the mouse cursor
  const dotSpringConfig = { damping: 50, stiffness: 1500, mass: 0.1 };
  const dotX = useSpring(mouseX, dotSpringConfig);
  const dotY = useSpring(mouseY, dotSpringConfig);

  // 2. THE FRAME (Follower - Tight Inertia)
  // Increased stiffness and reduced mass to ensure the frame keeps up with the core
  // and keeps the core "contained" within its visual bounds even during fast movement.
  const frameSpringConfig = { damping: 35, stiffness: 350, mass: 0.5 };
  const frameX = useSpring(mouseX, frameSpringConfig);
  const frameY = useSpring(mouseY, frameSpringConfig);

  // Determine Color based on Page
  const getDotColor = () => {
    switch (currentPage) {
      case Page.HOME: return 'bg-soviet-red';
      case Page.NOTES: return 'bg-soviet-cyan';
      case Page.PORTFOLIO: return 'bg-soviet-darkRed';
      case Page.GUESTBOOK: return 'bg-soviet-yellow';
      default: return 'bg-soviet-red';
    }
  };

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    
    // Logic to determine cursor visual state
    const handleMouseOver = (e: MouseEvent) => {
       const target = e.target as HTMLElement;
       const frame = document.getElementById('cursor-frame-visual');
       
       if (!frame) return;

       const isInteractable = target.closest('button') || target.closest('a') || target.closest('[data-hoverable="true"]') || target.onclick;
       const isText = 
          target.tagName === 'INPUT' || 
          target.tagName === 'TEXTAREA' || 
          target.isContentEditable ||
          target.closest('p') || 
          target.closest('span') || 
          target.tagName.startsWith('H');

       if (isInteractable) {
          frame.setAttribute('data-state', 'hover');
       } else if (isText) {
          frame.setAttribute('data-state', 'text');
       } else {
          frame.setAttribute('data-state', 'default');
       }
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* THE FRAME: Open Square / Brackets (Follows with inertia) */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none hidden md:block mix-blend-difference"
        style={{ x: frameX, y: frameY, translateX: "-50%", translateY: "-50%" }}
      >
        <div 
          id="cursor-frame-visual"
          className="relative transition-all duration-300 ease-out group"
        >
          {/* 
            VISUAL STATES LOGIC:
            Default: w-8 h-8 square
            Hover: w-6 h-6 rotated square (Target Lock)
            Text: w-3 h-8 vertical rect (I-Beam)
          */}
          <style>{`
            #cursor-frame-visual { width: 2rem; height: 2rem; }
            #cursor-frame-visual[data-state="hover"] { width: 1.5rem; height: 1.5rem; transform: rotate(45deg); }
            #cursor-frame-visual[data-state="text"] { width: 0.8rem; height: 2.5rem; transform: rotate(0deg); border-radius: 4px; }
          `}</style>

          {/* Corners/Borders */}
          {/* Top Left */}
          <div className="absolute top-0 left-0 w-2.5 h-2.5 border-l-[3px] border-t-[3px] border-white transition-all duration-300"></div>
          {/* Top Right */}
          <div className="absolute top-0 right-0 w-2.5 h-2.5 border-r-[3px] border-t-[3px] border-white transition-all duration-300"></div>
          {/* Bottom Left */}
          <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-l-[3px] border-b-[3px] border-white transition-all duration-300"></div>
          {/* Bottom Right */}
          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-r-[3px] border-b-[3px] border-white transition-all duration-300"></div>
        </div>
      </motion.div>

      {/* THE CORE: Inertia Dot (Main Pointer) */}
      <motion.div
        className={`fixed top-0 left-0 z-[9999] pointer-events-none hidden md:block w-2 h-2 rounded-full shadow-sm ${getDotColor()} transition-colors duration-500`}
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
        // Expand core on click
        animate={{ scale: isClicked ? 1.8 : 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </>
  );
};

export default CustomCursor;
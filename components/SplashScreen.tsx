
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BOOT_LOGS } from '../constants';
import { useAudioSystem } from '../hooks/useAudioSystem';
import { SoundType } from '../types';

interface SplashScreenProps {
  onEnter: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onEnter }) => {
  const [counter, setCounter] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [isReady, setIsReady] = useState(false);
  const { playSound } = useAudioSystem();

  // Count up effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsReady(true); // System is ready
          return 100;
        }
        return prev + Math.floor(Math.random() * 5) + 1;
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Log scrolling effect
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < BOOT_LOGS.length) {
        setLogs((prev) => [...prev, BOOT_LOGS[index]]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 200);
    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    if (isReady) {
      playSound(SoundType.SUCCESS);
      onEnter();
    }
  };

  return (
    <motion.div
      className={`fixed inset-0 z-[10000] bg-soviet-paper flex items-center justify-center overflow-hidden ${isReady ? 'cursor-pointer' : 'cursor-wait'}`}
      onClick={handleClick}
      data-hoverable={isReady ? "true" : undefined}
      exit={{ 
        clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
      }}
    >
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none"></div>

      {/* Central Composition */}
      <div className="relative z-10 w-full max-w-4xl p-8 flex flex-col items-center">
        
        {/* Giant Rotating Cross */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[600px] md:h-[600px] border border-soviet-black/5 rounded-full flex items-center justify-center"
        >
           <div className="w-full h-[1px] bg-soviet-black/10"></div>
           <div className="h-full w-[1px] bg-soviet-black/10 absolute top-0"></div>
        </motion.div>

        {/* Counter Block */}
        <div className="flex flex-col items-center mb-12 relative">
            <h1 className="text-[12rem] md:text-[16rem] font-black text-soviet-black leading-none tracking-tighter mix-blend-multiply">
               {counter < 10 ? `00${counter}` : counter < 100 ? `0${counter}` : counter}
            </h1>
            <div className="absolute top-0 left-0 w-full h-full bg-soviet-red mix-blend-multiply opacity-0 animate-pulse"></div>
            
            <div className="w-full h-4 bg-soviet-black/10 mt-4 relative overflow-hidden">
                <motion.div 
                   className="h-full bg-soviet-red"
                   initial={{ width: "0%" }}
                   animate={{ width: `${counter}%` }}
                ></motion.div>
            </div>
        </div>

        {/* System Logs */}
        <div className="w-full max-w-md font-mono text-xs md:text-sm font-bold text-soviet-black uppercase tracking-wider h-32 overflow-hidden relative border-l-4 border-soviet-red pl-4 flex flex-col justify-end">
            <div className="absolute top-0 left-0 bg-gradient-to-b from-soviet-paper to-transparent w-full h-8 z-10"></div>
            {logs.map((log, i) => (
               <motion.div 
                 key={i} 
                 initial={{ opacity: 0, x: -10 }} 
                 animate={{ opacity: 1, x: 0 }}
                 className="mb-1"
               >
                 {'>'} {log}
               </motion.div>
            ))}
        </div>

        {/* Click to Enter Prompt */}
        <AnimatePresence>
            {isReady && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 font-black text-xl md:text-2xl text-soviet-red uppercase tracking-[0.2em] animate-pulse border-2 border-soviet-red px-6 py-2 bg-soviet-paper"
                >
                    系统就绪 // 点击进入
                </motion.div>
            )}
        </AnimatePresence>

      </div>

      {/* Decorative Corners */}
      <div className="absolute top-8 left-8 w-16 h-16 border-t-4 border-l-4 border-soviet-black"></div>
      <div className="absolute bottom-8 right-8 w-16 h-16 border-b-4 border-r-4 border-soviet-black"></div>
      
      {/* Version Tag */}
      <div className="absolute bottom-8 left-8 font-mono text-xs font-bold text-soviet-black/50">
         SYSTEM_VER: 1.0.4 RC
      </div>

    </motion.div>
  );
};

export default SplashScreen;

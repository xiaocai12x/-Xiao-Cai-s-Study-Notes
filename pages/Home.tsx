import React from 'react';
import { motion } from 'framer-motion';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';
import { ArrowUpRight, Layers, Box, Cpu } from 'lucide-react';

interface HomeProps {
  language: Language;
}

const Home: React.FC<HomeProps> = ({ language }) => {
  const t = TRANSLATIONS[language];

  return (
    <div className="min-h-screen pl-64 bg-soviet-paper dark:bg-soviet-black overflow-x-hidden relative">
      
      {/* ================= BACKGROUND LAYERS ================= */}
      <div className="fixed top-0 left-64 right-0 bottom-0 z-0 pointer-events-none overflow-hidden select-none">
        
        {/* 1. GIANT RUSSIAN TYPOGRAPHY (Base Layer) */}
        <div className="absolute top-[-5%] left-[5%] font-black text-[18vw] leading-[0.8] text-soviet-black opacity-[0.03] dark:opacity-[0.1] tracking-tighter uppercase mix-blend-multiply dark:mix-blend-overlay">
          Кровь
        </div>
        <div className="absolute top-[35%] right-[-10%] font-black text-[16vw] leading-[0.8] text-soviet-red opacity-[0.05] tracking-tighter uppercase vertical-text">
          мясо
        </div>
        <div className="absolute bottom-[-5%] left-[20%] font-black text-[18vw] leading-[0.8] text-soviet-black opacity-[0.04] dark:opacity-[0.1] tracking-tighter uppercase mix-blend-multiply dark:mix-blend-overlay">
          бетон
        </div>

        {/* 2. GEOMETRIC SHAPES */}
        {/* Cyan Halftone Circle (Bottom Left) */}
        <div className="absolute bottom-[5%] left-[5%] w-[400px] h-[400px] rounded-full bg-halftone-cyan opacity-80 z-0 mix-blend-multiply dark:mix-blend-screen animate-spin-slow"></div>
        
        {/* Concrete Strip (Vertical) */}
        <div className="absolute top-0 left-[35%] w-[15%] h-full bg-soviet-black opacity-[0.03] bg-concrete mix-blend-multiply dark:bg-soviet-paper dark:opacity-[0.05]"></div>

        {/* 3. DIAGONAL LINES (The "X") */}
        <div className="absolute top-0 left-0 w-full h-full z-10">
           {/* Black Line from Top-Left to Bottom-Right */}
           <div className="absolute top-[10%] left-[-10%] w-[150%] h-[2px] bg-soviet-black dark:bg-soviet-paper transform rotate-[35deg] origin-top-left"></div>
           
           {/* Red Line crossing it */}
           <div className="absolute bottom-[20%] left-[-10%] w-[150%] h-[8px] bg-soviet-red transform -rotate-[25deg] origin-bottom-left mix-blend-multiply dark:mix-blend-normal"></div>
        </div>
      </div>

      {/* ================= FOREGROUND CONTENT ================= */}
      <div className="relative z-20 p-8 md:p-12 max-w-[1800px] mx-auto min-h-screen flex flex-col justify-center">
        
        {/* HEADER BLOCK - "Collage" style */}
        <div className="relative mb-32 flex flex-col items-start">
          
          {/* Main Title - Stacked and Misaligned */}
          <motion.div 
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="relative"
          >
             <div className="bg-soviet-red text-soviet-paper px-6 py-2 inline-block transform -rotate-2 mb-2 shadow-[8px_8px_0px_#1A1A1A]">
               <span className="font-mono text-xs font-bold tracking-widest uppercase">Unity / Shader / Art</span>
             </div>
             <h1 className="text-8xl md:text-[10rem] font-black uppercase leading-[0.8] tracking-tighter text-soviet-black dark:text-soviet-paper mix-blend-darken dark:mix-blend-normal">
               {language === Language.CN ? "小菜" : "XIAO"}
               <span className="block ml-24 text-soviet-red mix-blend-multiply dark:mix-blend-normal">{language === Language.CN ? "笔记" : "CAI"}</span>
             </h1>
          </motion.div>

          {/* Subtext - "Newspaper Clipping" style */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="absolute top-1/2 right-0 md:right-20 w-64 bg-soviet-paper border border-soviet-black p-4 shadow-lg transform rotate-3"
          >
            <p className="font-serif text-sm italic leading-tight text-soviet-black border-b border-soviet-black pb-2 mb-2">
               "Constructing digital realities through code and logic. A manifesto of learning."
            </p>
            <div className="flex justify-between items-center">
               <span className="font-bold text-xs">VOL. 01</span>
               <div className="w-12 h-4 bg-halftone-red opacity-50"></div>
            </div>
          </motion.div>
        </div>


        {/* CONTENT GRID - "Vertical Slice" Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* COLUMN 1: VISUAL (Left - Shader) */}
          <div className="md:col-span-5 flex flex-col gap-8 mt-12">
            <motion.div 
              className="relative group cursor-none"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              data-hoverable="true"
            >
               {/* "Image" Frame */}
               <div className="h-[500px] w-full bg-soviet-black relative overflow-hidden border-4 border-soviet-black dark:border-soviet-paper">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"></div>
                  <div className="absolute inset-0 bg-halftone opacity-30"></div>
                  
                  {/* Overlay Text */}
                  <div className="absolute bottom-0 left-0 p-6 bg-soviet-red text-soviet-paper w-3/4 clip-path-polygon-slope">
                     <Layers size={48} className="mb-2" />
                     <h2 className="text-4xl font-black uppercase leading-none">{t.shaderWorks}</h2>
                     <span className="font-mono text-xs opacity-80">HLSL / COMPUTE / VFX</span>
                  </div>
               </div>
               
               {/* Decorative "Tape" */}
               <div className="absolute -top-4 left-1/2 w-32 h-8 bg-soviet-paper/80 transform -rotate-3 border-l-2 border-r-2 border-dotted border-soviet-black shadow-sm"></div>
            </motion.div>
          </div>

          {/* COLUMN 2: CENTER (Vertical Divider / Unity Projects) */}
          <div className="md:col-span-3 flex flex-col items-center relative pt-24 md:pt-0">
             {/* The "Building" Strip */}
             <div className="w-full bg-soviet-black dark:bg-zinc-900 text-soviet-paper min-h-[400px] border-x-2 border-soviet-black p-4 flex flex-col gap-4 relative">
                <div className="absolute top-0 left-0 w-full h-2 bg-soviet-red"></div>
                
                <h2 className="text-4xl font-black uppercase writing-vertical-rl text-center mx-auto border-l-2 border-soviet-paper pl-2 py-4 h-full tracking-widest">
                  {t.unityWorks}
                </h2>
                
                <div className="flex flex-col gap-2 mt-auto">
                   <Box size={32} className="mx-auto text-soviet-cyan" />
                   <span className="text-[10px] font-mono text-center">ARCHIVE_ACCESS</span>
                   <button className="w-full py-2 bg-soviet-paper text-soviet-black font-bold uppercase hover:bg-soviet-red hover:text-soviet-paper transition-colors" data-hoverable="true">
                     OPEN
                   </button>
                </div>
             </div>
          </div>

          {/* COLUMN 3: RIGHT (Text / Newspaper) */}
          <div className="md:col-span-4 flex flex-col gap-6">
             
             {/* Tech Insights Block */}
             <motion.div 
                className="bg-soviet-paper border-4 border-soviet-black p-6 relative shadow-[12px_12px_0px_rgba(179,32,32,1)] group hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                data-hoverable="true"
             >
                <div className="flex justify-between items-start mb-4">
                   <h2 className="text-3xl font-black uppercase leading-tight max-w-[70%]">{t.techInsights}</h2>
                   <div className="bg-soviet-black text-soviet-paper p-2">
                      <Cpu size={24} />
                   </div>
                </div>
                
                <div className="font-body text-sm leading-relaxed text-soviet-black text-justify mb-4 font-semibold border-t-2 border-soviet-black pt-4">
                   <span className="float-left text-4xl font-black mr-2 text-soviet-red">03</span>
                   Analysis of rendering pipelines and memory optimization. Deep dives into ECS architecture and data-oriented design patterns. 
                   <br/><br/>
                   <span className="bg-soviet-cyan/30 px-1">#Optimization</span>
                   <span className="bg-soviet-cyan/30 px-1 ml-2">#Architecture</span>
                </div>

                <div className="flex justify-end">
                   <ArrowUpRight size={32} className="group-hover:text-soviet-red transition-colors" />
                </div>
             </motion.div>

             {/* Decorative "Stamp" */}
             <div className="w-32 h-32 rounded-full border-4 border-soviet-red opacity-80 flex items-center justify-center transform -rotate-12 ml-auto mt-8 mask-grunge">
                <span className="text-soviet-red font-black text-xl uppercase border-2 border-soviet-red px-2">Approved</span>
             </div>

          </div>

        </div>

      </div>

      {/* FOOTER */}
      <footer className="absolute bottom-0 left-64 right-0 p-4 border-t border-soviet-black/20 flex justify-between items-end bg-soviet-paper/50 backdrop-blur-sm">
         <span className="font-mono text-[10px] uppercase">
            © 2024 Xiao Cai Notes / Soviet Constructivism Ver.
         </span>
         <div className="flex gap-2">
            <div className="w-2 h-12 bg-soviet-red"></div>
            <div className="w-2 h-8 bg-soviet-black"></div>
            <div className="w-2 h-4 bg-soviet-cyan"></div>
         </div>
      </footer>

    </div>
  );
};

export default Home;
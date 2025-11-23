
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';
import { ArrowLeft, FileText, Tag, Calendar, Stamp, Hash, AlertTriangle, Zap } from 'lucide-react';

interface NotesProps {
  language: Language;
}

// Mock Data
const NOTES_DATA = [
  {
    id: 1,
    title: "URP Custom Render Pass Implementation",
    titleCN: "URP自定义渲染通道深度解析",
    date: "2023.10.24",
    category: "GRAPHICS",
    desc: "Analysis of Scriptable Render Features. // 可编程管线拆解",
    content: "Content placeholder..."
  },
  {
    id: 2,
    title: "Stylized Water Shader Breakdown",
    titleCN: "风格化水体Shader完全拆解",
    date: "2023.11.05",
    category: "SHADER",
    desc: "Gerstner Waves & Depth Fade algorithms. // 波浪算法研究",
    content: "Content placeholder..."
  },
  {
    id: 3,
    title: "DOTS ECS Performance Optimization",
    titleCN: "DOTS ECS 性能优化实战",
    date: "2023.12.12",
    category: "ARCHITECTURE",
    desc: "100k entities with Job System. // 万级实体同屏方案",
    content: "Content placeholder..."
  },
  {
    id: 4,
    title: "Procedural Animation with IK",
    titleCN: "基于反向动力学的程序化动画",
    date: "2024.01.15",
    category: "ANIMATION",
    desc: "Spider robot movement controller. // 蜘蛛机甲运动控制",
    content: "Content placeholder..."
  },
  {
    id: 5,
    title: "Raymarching Volumetric Clouds",
    titleCN: "Raymarching 体积云实现",
    date: "2024.02.20",
    category: "VFX",
    desc: "Volumetric rendering in forward renderer. // 体积渲染技术",
    content: "Content placeholder..."
  }
];

const Notes: React.FC<NotesProps> = ({ language }) => {
  const t = TRANSLATIONS[language];
  const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null);

  const selectedNote = NOTES_DATA.find(n => n.id === selectedNoteId);

  return (
    <div className="min-h-screen pl-64 bg-soviet-paper dark:bg-[#0f0f0f] relative overflow-hidden flex flex-col">
      
      {/* ================= BACKGROUND CHAOS ================= */}
      <div className="fixed top-0 left-64 right-0 bottom-0 pointer-events-none select-none z-0 overflow-hidden">
        {/* Giant Cut Text */}
        <div className="absolute top-[-5%] right-[-10%] text-[25vw] font-black text-soviet-black opacity-[0.03] dark:opacity-[0.05] leading-none tracking-tighter mix-blend-multiply">
            DATA
            <br />
            LOGS
        </div>
        
        {/* Diagonal Warning Stripes */}
        <div className="absolute top-0 right-0 w-[500px] h-[800px] bg-stripes opacity-5 transform rotate-12 origin-top-right"></div>
        
        {/* Heavy Block */}
        <div className="absolute bottom-[10%] left-[10%] w-64 h-64 bg-soviet-black dark:bg-soviet-paper opacity-5 rotate-45"></div>
      </div>

      {/* ================= HEADER: BRUTALIST BAR ================= */}
      <header className="relative z-10 pt-16 pb-8 px-8 md:px-12 flex flex-col items-start gap-4">
        
        {/* Top Scroll Warning */}
        <div className="absolute top-0 left-0 w-full h-8 bg-soviet-black text-soviet-red flex items-center overflow-hidden">
           <div className="animate-marquee whitespace-nowrap font-mono text-xs font-bold tracking-[0.5em] uppercase flex items-center">
              <AlertTriangle size={10} className="mx-4" /> WARNING: RESTRICTED ACCESS // AUTHORIZED PERSONNEL ONLY // 警告：受限访问区域 <AlertTriangle size={10} className="mx-4" /> SYSTEM MONITORING ACTIVE
              <AlertTriangle size={10} className="mx-4" /> WARNING: RESTRICTED ACCESS // AUTHORIZED PERSONNEL ONLY // 警告：受限访问区域 <AlertTriangle size={10} className="mx-4" /> SYSTEM MONITORING ACTIVE
           </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-end gap-6 relative">
           {/* Huge Title Block */}
           <div className="relative">
              <h1 className="text-7xl md:text-9xl font-black text-soviet-black dark:text-soviet-paper uppercase leading-[0.8] tracking-tighter mix-blend-hard-light relative z-10">
                {language === Language.CN ? "学习" : "STUDY"}
                <br />
                <span className="text-soviet-red pl-12">{language === Language.CN ? "日志" : "LOGS"}</span>
              </h1>
              {/* Offset Stroke Version for vibration effect */}
              <h1 className="absolute top-1 left-1 text-7xl md:text-9xl font-black text-transparent stroke-black uppercase leading-[0.8] tracking-tighter opacity-30 pointer-events-none z-0">
                {language === Language.CN ? "学习" : "STUDY"}
                <br />
                <span className="pl-12">{language === Language.CN ? "日志" : "LOGS"}</span>
              </h1>
           </div>

           {/* Vertical Info Strip */}
           <div className="hidden md:flex flex-col justify-between h-32 border-l-4 border-soviet-red pl-4 py-1">
              <span className="font-mono text-xs font-bold text-soviet-red uppercase tracking-widest">
                 /// SECURE_CONNECTION
              </span>
              <div className="text-right">
                  <div className="text-2xl font-black text-soviet-black dark:text-soviet-paper">V.2.0.4</div>
                  <div className="text-xs font-serif italic opacity-60">Last Sync: 2024.03</div>
              </div>
           </div>
        </div>
      </header>

      {/* ================= MAIN CONTENT: THE LIST ================= */}
      <main className="flex-grow relative z-10 px-4 md:px-12 pb-20 overflow-y-auto">
        
        <AnimatePresence mode="wait">
          {!selectedNote ? (
            <motion.div 
              key="list"
              className="flex flex-col gap-6 max-w-6xl mx-auto mt-8"
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1 }
                }
              }}
            >
              {NOTES_DATA.map((note, index) => (
                <motion.div
                  key={note.id}
                  variants={{
                    hidden: { x: -100, opacity: 0 },
                    show: { x: 0, opacity: 1 }
                  }}
                  onClick={() => setSelectedNoteId(note.id)}
                  className="group relative w-full cursor-none perspective-1000"
                  data-hoverable="true"
                >
                  {/* The Physical Card */}
                  <div className="
                    relative bg-soviet-paper dark:bg-[#1a1a1a] 
                    border-l-[12px] border-l-soviet-black dark:border-l-soviet-paper border-y-2 border-r-2 border-soviet-black dark:border-soviet-paper
                    p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6
                    transition-all duration-200 ease-out
                    group-hover:bg-soviet-red group-hover:border-soviet-red group-hover:border-l-soviet-black
                    group-hover:translate-x-4 group-hover:-translate-y-2
                    group-hover:shadow-[10px_10px_0px_#1A1A1A] dark:group-hover:shadow-[10px_10px_0px_#EBE8E3]
                    clip-path-slant
                  ">
                    
                    {/* Background Index Number (Huge) */}
                    <div className="absolute right-10 top-1/2 -translate-y-1/2 text-8xl font-black text-soviet-black/5 dark:text-soviet-paper/5 font-mono pointer-events-none group-hover:text-soviet-black/20 transition-colors">
                      0{note.id}
                    </div>

                    {/* Left: Info */}
                    <div className="relative z-10 flex-grow group-hover:text-soviet-paper transition-colors">
                        <div className="flex items-center gap-3 mb-2">
                           <span className="bg-soviet-black text-soviet-paper px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider group-hover:bg-soviet-paper group-hover:text-soviet-red transition-colors">
                             {note.category}
                           </span>
                           <span className="font-mono text-xs opacity-60 font-bold group-hover:opacity-80">
                             // {note.date}
                           </span>
                        </div>

                        <h3 className="text-2xl md:text-4xl font-black uppercase leading-none mb-2 font-sans tracking-tight">
                          {language === Language.CN ? note.titleCN : note.title}
                        </h3>
                        
                        <p className="font-serif italic text-sm opacity-70 group-hover:opacity-90 max-w-2xl">
                          {note.desc}
                        </p>
                    </div>

                    {/* Right: Interaction Icon */}
                    <div className="relative z-10 hidden md:flex items-center justify-center">
                        <div className="w-12 h-12 border-2 border-soviet-black dark:border-soviet-paper group-hover:border-soviet-paper flex items-center justify-center transform rotate-45 group-hover:rotate-0 transition-transform duration-300">
                           <Zap size={20} className="transform -rotate-45 group-hover:rotate-0 group-hover:text-soviet-paper text-soviet-black dark:text-soviet-paper transition-all" />
                        </div>
                    </div>
                  </div>

                  {/* Glitch Overlay on Hover (Pseudo-element simulation) */}
                  <div className="absolute inset-0 bg-soviet-cyan mix-blend-exclusion opacity-0 group-hover:opacity-30 pointer-events-none translate-x-2 translate-y-2 transition-opacity duration-100 hidden md:block clip-path-slant"></div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            /* ================= DETAIL VIEW: THE FILE ================= */
            <motion.div
              key="detail"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className="fixed inset-y-0 right-0 w-full md:w-[calc(100%-16rem)] pl-0 z-50 overflow-hidden flex"
            >
               {/* Backdrop Blur */}
               <div className="absolute inset-0 bg-soviet-black/80 backdrop-blur-sm -z-10" onClick={() => setSelectedNoteId(null)}></div>

               {/* The Paper Sheet */}
               <div className="w-full h-full bg-soviet-paper relative flex flex-col overflow-y-auto shadow-[-50px_0px_100px_rgba(0,0,0,0.5)]">
                  
                  {/* Top Bar with Controls */}
                  <div className="sticky top-0 z-50 bg-soviet-black text-soviet-paper p-4 flex justify-between items-center shadow-md">
                     <button 
                        onClick={() => setSelectedNoteId(null)}
                        className="flex items-center gap-2 font-bold uppercase hover:text-soviet-red transition-colors group"
                        data-hoverable="true"
                     >
                        <div className="bg-soviet-paper text-soviet-black p-1 group-hover:bg-soviet-red group-hover:text-soviet-paper transition-colors">
                           <ArrowLeft size={16} />
                        </div>
                        <span className="tracking-widest">{t.notes.back}</span>
                     </button>
                     <div className="font-mono text-xs opacity-50">
                        READING MODE // SECURE
                     </div>
                  </div>

                  {/* Content Container */}
                  <div className="max-w-4xl mx-auto p-8 md:p-20 relative min-h-full">
                     {/* Background Watermark */}
                     <div className="absolute top-40 left-1/2 -translate-x-1/2 text-9xl font-black text-soviet-black/5 transform -rotate-45 pointer-events-none whitespace-nowrap border-4 border-soviet-black/5 p-4 mask-grunge">
                        TOP SECRET
                     </div>

                     {/* Article Header */}
                     <header className="mb-16 border-b-4 border-soviet-black pb-8">
                        <div className="flex flex-wrap gap-4 mb-6">
                           <span className="bg-soviet-red text-soviet-paper px-3 py-1 font-mono font-bold text-sm uppercase">
                              {selectedNote.category}
                           </span>
                           <span className="border border-soviet-black px-3 py-1 font-mono font-bold text-sm uppercase text-soviet-black">
                              ID: #{selectedNote.id}
                           </span>
                        </div>
                        
                        <h1 className="text-4xl md:text-6xl font-black text-soviet-black uppercase leading-[0.9] mb-6">
                           {language === Language.CN ? selectedNote.titleCN : selectedNote.title}
                        </h1>

                        <div className="flex items-start gap-4 text-soviet-black/70 font-serif italic text-lg border-l-4 border-soviet-cyan pl-4 bg-soviet-cyan/10 p-4">
                           <div className="mt-1"><Stamp size={20} className="text-soviet-cyan" /></div>
                           <p>{selectedNote.desc}</p>
                        </div>
                     </header>

                     {/* Article Body */}
                     <article className="prose prose-xl max-w-none font-body text-soviet-black prose-headings:font-sans prose-headings:uppercase prose-headings:font-black prose-strong:text-soviet-red prose-blockquote:border-l-4 prose-blockquote:border-soviet-black prose-blockquote:bg-black/5 prose-blockquote:p-4 prose-blockquote:not-italic">
                        <p className="font-mono text-sm mb-8 p-4 border border-dashed border-soviet-black text-soviet-black/60 bg-white">
                           [SYSTEM LOG]: Decrypting content block 0x{selectedNote.id}F... Success.
                           <br/>
                           [TIME]: {selectedNote.date}
                        </p>
                        
                        <h3>01. Introduction</h3>
                        <p>
                           The core challenge in this implementation was balancing performance with visual fidelity.
                           By leveraging <strong>Unity's Scriptable Render Pipeline (SRP)</strong>, we can bypass the overhead of traditional rendering methods.
                        </p>
                        <p>
                           {selectedNote.content}
                           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                           Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>

                        <div className="my-12 relative group cursor-pointer" data-hoverable="true">
                           <div className="absolute inset-0 bg-soviet-red transform translate-x-2 translate-y-2 group-hover:translate-x-4 group-hover:translate-y-4 transition-transform"></div>
                           <div className="relative bg-soviet-black h-64 flex items-center justify-center border-2 border-white">
                              <span className="text-soviet-paper font-mono animate-pulse">
                                 [ FIGURE 1.1: ARCHITECTURE DIAGRAM ]
                              </span>
                           </div>
                        </div>

                        <h3>02. Technical Approach</h3>
                        <p>
                           Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                           Excepteur sint occaecat cupidatat non proident.
                        </p>
                        <blockquote>
                           "The essence of optimization is not doing less, but doing it smarter."
                        </blockquote>
                     </article>

                     {/* Footer Stamp */}
                     <div className="mt-20 pt-10 border-t-2 border-soviet-black flex justify-between items-end opacity-50">
                        <div className="text-center transform -rotate-6 border-4 border-soviet-black p-2">
                           <div className="font-black text-xl uppercase">Verified</div>
                           <div className="text-xs font-mono">By Xiao Cai</div>
                        </div>
                        <div className="font-mono text-xs text-right">
                           END OF FILE<br/>
                           0x00000000
                        </div>
                     </div>
                  </div>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

    </div>
  );
};

export default Notes;


import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Language, SoundType } from '../types';
import { TRANSLATIONS } from '../constants';
import { ArrowLeft, FileText, Tag, Calendar, Stamp, Hash, AlertTriangle, Zap, X } from 'lucide-react';
import { useAudioSystem } from '../hooks/useAudioSystem';

interface NotesProps {
  language: Language;
}

// Mock Data
const NOTES_DATA = [
  {
    id: 1,
    title: "URP Render Pass Injection",
    titleCN: "URP渲染通道注入战术",
    date: "2023.10.24",
    category: "GRAPHICS",
    desc: "Intercepting SRP for custom effects.",
    content: "Content placeholder..."
  },
  {
    id: 2,
    title: "Stylized Water Simulation",
    titleCN: "风格化水体模拟算法",
    date: "2023.11.05",
    category: "SHADER",
    desc: "Gerstner Waves equations.",
    content: "Content placeholder..."
  },
  {
    id: 3,
    title: "ECS Performance Tuning",
    titleCN: "ECS架构性能调优",
    date: "2023.12.12",
    category: "ARCHITECTURE",
    desc: "Data-oriented design patterns.",
    content: "Content placeholder..."
  },
  {
    id: 4,
    title: "Inverse Kinematics Mech",
    titleCN: "反向动力学机甲控制",
    date: "2024.01.15",
    category: "ANIMATION",
    desc: "Procedural movement logic.",
    content: "Content placeholder..."
  },
  {
    id: 5,
    title: "Volumetric Cloud Rendering",
    titleCN: "体积云渲染技术",
    date: "2024.02.20",
    category: "VFX",
    desc: "Raymarching techniques.",
    content: "Content placeholder..."
  }
];

const Notes: React.FC<NotesProps> = ({ language }) => {
  const t = TRANSLATIONS[language];
  const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null);
  const { playSound } = useAudioSystem();

  const selectedNote = NOTES_DATA.find(n => n.id === selectedNoteId);

  const handleNoteSelect = (id: number) => {
    playSound(SoundType.OPEN);
    setSelectedNoteId(id);
  };

  const handleBack = () => {
    playSound(SoundType.CLICK);
    setSelectedNoteId(null);
  };

  return (
    <div className="min-h-screen pl-0 md:pl-64 bg-soviet-paper dark:bg-[#0f0f0f] relative overflow-hidden flex flex-col pt-16 md:pt-0 transition-colors duration-300">
      
      {/* ================= ATMOSPHERE: SCAN LINE ================= */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-5">
         <div className="w-full h-[2px] bg-soviet-cyan animate-scan absolute top-0 shadow-[0_0_20px_#7A8F95]"></div>
      </div>

      {/* ================= BACKGROUND CHAOS ================= */}
      <div className="fixed top-0 left-0 md:left-64 right-0 bottom-0 pointer-events-none select-none z-0 overflow-hidden">
        {/* Giant Cut Text */}
        <div className="absolute top-[-5%] right-[-10%] text-[25vw] font-black text-soviet-black opacity-[0.03] dark:opacity-[0.05] leading-none tracking-tighter mix-blend-multiply">
            DATA
            <br />
            ARCH
        </div>
        
        {/* Diagonal Warning Stripes - Cold */}
        <div className="absolute top-0 right-0 w-[500px] h-[800px] bg-stripes opacity-5 transform rotate-12 origin-top-right grayscale"></div>
        
        {/* Heavy Block */}
        <div className="absolute bottom-[10%] left-[10%] w-64 h-64 bg-soviet-black dark:bg-soviet-paper opacity-5 rotate-45"></div>
      </div>

      {/* ================= HEADER: BRUTALIST BAR ================= */}
      <header className="relative z-10 pt-8 md:pt-16 pb-4 md:pb-8 px-4 md:px-12 flex flex-col items-start gap-4">
        
        {/* Top Scroll Warning */}
        <div className="absolute top-0 left-0 w-full h-8 bg-soviet-black text-soviet-paper flex items-center overflow-hidden border-b border-soviet-red/50">
           <div className="animate-marquee whitespace-nowrap font-mono text-[10px] md:text-xs font-bold tracking-[0.5em] uppercase flex items-center">
              <AlertTriangle size={10} className="mx-4 text-soviet-red" /> ARCHIVE ACCESS GRANTED // 档案库访问权限已确认 <AlertTriangle size={10} className="mx-4 text-soviet-red" /> MONITORING
           </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-end gap-6 relative mt-4 md:mt-0">
           {/* Huge Title Block */}
           <div className="relative">
              <h1 className="text-6xl md:text-9xl font-black text-soviet-black dark:text-soviet-paper uppercase leading-[0.8] tracking-tighter relative z-10">
                {language === Language.CN ? "档案" : "FIELD"}
                <br />
                <span className="text-soviet-black/40 dark:text-soviet-paper/40 pl-8 md:pl-12">{language === Language.CN ? "记录" : "LOGS"}</span>
              </h1>
           </div>

           {/* Vertical Info Strip */}
           <div className="hidden md:flex flex-col justify-between h-32 border-l-4 border-soviet-black/20 dark:border-soviet-paper/20 pl-4 py-1">
              <span className="font-mono text-xs font-bold text-soviet-black dark:text-soviet-paper uppercase tracking-widest opacity-60">
                 /// CLASSIFIED
              </span>
              <div className="text-right">
                  <div className="text-2xl font-black text-soviet-black dark:text-soviet-paper">SEC-04</div>
                  <div className="text-xs font-serif italic opacity-60 text-soviet-black dark:text-soviet-paper">Status: Active</div>
              </div>
           </div>
        </div>
      </header>

      {/* ================= MAIN CONTENT: THE LIST ================= */}
      <main className="flex-grow relative z-10 px-2 md:px-12 pb-20 overflow-y-auto">
        
        <AnimatePresence mode="wait">
          {!selectedNote ? (
            <motion.div 
              key="list"
              className="flex flex-col gap-4 md:gap-6 max-w-6xl mx-auto mt-4 md:mt-8"
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
                    hidden: { x: -50, opacity: 0 },
                    show: { x: 0, opacity: 1 }
                  }}
                  onClick={() => handleNoteSelect(note.id)}
                  onMouseEnter={() => playSound(SoundType.HOVER)}
                  className="group relative w-full cursor-pointer md:cursor-none perspective-1000"
                  data-hoverable="true"
                >
                  {/* The Physical Card - COLD INDUSTRIAL STYLE */}
                  <div className="
                    relative bg-white dark:bg-[#1a1a1a] 
                    border-l-[8px] md:border-l-[12px] border-l-soviet-black dark:border-l-soviet-paper border-y border-r border-soviet-black/20 dark:border-soviet-paper/30
                    p-4 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6
                    transition-all duration-200 ease-out
                    group-hover:bg-soviet-black group-hover:border-soviet-cyan group-hover:border-l-soviet-cyan
                    md:group-hover:translate-x-4 md:group-hover:-translate-y-2
                    group-hover:shadow-[5px_5px_0px_#6B8E9B]
                    clip-path-slant shadow-sm
                  ">
                    
                    {/* Background Index Number */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-6xl md:text-8xl font-black text-black/5 dark:text-white/5 font-mono pointer-events-none group-hover:text-soviet-paper/10 transition-colors">
                      0{note.id}
                    </div>

                    {/* Left: Info */}
                    <div className="relative z-10 flex-grow group-hover:text-soviet-paper transition-colors w-full">
                        <div className="flex items-center gap-2 md:gap-3 mb-2">
                           <span className="bg-soviet-black text-soviet-paper px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider group-hover:bg-soviet-cyan group-hover:text-black transition-colors dark:bg-soviet-paper dark:text-soviet-black">
                             {note.category}
                           </span>
                           <span className="font-mono text-[10px] md:text-xs opacity-60 font-bold group-hover:opacity-80 text-soviet-black dark:text-soviet-paper group-hover:text-soviet-paper">
                             // {note.date}
                           </span>
                        </div>

                        <h3 className="text-xl md:text-4xl font-black uppercase leading-tight mb-2 font-sans tracking-tight line-clamp-2 md:line-clamp-none text-soviet-black dark:text-soviet-paper group-hover:text-soviet-paper">
                          {language === Language.CN ? note.titleCN : note.title}
                        </h3>
                        
                        <p className="font-serif italic text-xs md:text-sm opacity-70 group-hover:opacity-90 max-w-2xl line-clamp-2 text-soviet-black dark:text-soviet-paper group-hover:text-soviet-paper">
                          {note.desc}
                        </p>
                    </div>

                    {/* Right: Interaction Icon */}
                    <div className="relative z-10 hidden md:flex items-center justify-center">
                        <div className="w-12 h-12 border border-soviet-black dark:border-soviet-paper group-hover:border-soviet-cyan flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 bg-transparent group-hover:bg-soviet-cyan">
                           <Zap size={20} className="text-soviet-black dark:text-soviet-paper group-hover:text-black transition-all" />
                        </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            /* ================= DETAIL VIEW ================= */
            <motion.div
              key="detail"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className="fixed inset-y-0 right-0 w-full md:w-[calc(100%-16rem)] pl-0 z-50 overflow-hidden flex pt-16 md:pt-0"
            >
               <div className="absolute inset-0 bg-soviet-black/80 backdrop-blur-sm -z-10" onClick={handleBack}></div>

               <div className="w-full h-full bg-[#F4F4F4] relative flex flex-col overflow-y-auto shadow-[-50px_0px_100px_rgba(0,0,0,0.8)]">
                  
                  {/* Top Bar */}
                  <div className="sticky top-0 z-50 bg-soviet-black text-soviet-paper p-4 flex justify-between items-center shadow-md border-b-2 border-soviet-red">
                     <button 
                        onClick={handleBack}
                        onMouseEnter={() => playSound(SoundType.HOVER)}
                        className="flex items-center gap-2 font-bold uppercase hover:text-soviet-cyan transition-colors group"
                        data-hoverable="true"
                     >
                        <ArrowLeft size={16} />
                        <span className="tracking-widest">{t.notes.back}</span>
                     </button>
                     <div className="font-mono text-[10px] md:text-xs opacity-50 uppercase text-soviet-red animate-pulse">
                        Top Secret // Eyes Only
                     </div>
                  </div>

                  <div className="max-w-4xl mx-auto p-6 md:p-20 relative min-h-full pb-32">
                     <div className="absolute top-40 left-1/2 -translate-x-1/2 text-6xl md:text-9xl font-black text-black/5 transform -rotate-45 pointer-events-none whitespace-nowrap border-4 border-black/5 p-4 mask-grunge">
                        RESTRICTED
                     </div>

                     <header className="mb-8 md:mb-16 border-b-4 border-black pb-8">
                        <div className="flex flex-wrap gap-4 mb-6">
                           <span className="bg-soviet-black text-soviet-paper px-3 py-1 font-mono font-bold text-sm uppercase">
                              {selectedNote.category}
                           </span>
                           <span className="border border-black px-3 py-1 font-mono font-bold text-sm uppercase text-black">
                              ID: #{selectedNote.id}
                           </span>
                        </div>
                        
                        <h1 className="text-3xl md:text-6xl font-black text-black uppercase leading-[0.9] mb-6">
                           {language === Language.CN ? selectedNote.titleCN : selectedNote.title}
                        </h1>

                        <div className="flex items-start gap-4 text-black/70 font-serif italic text-sm md:text-lg border-l-4 border-soviet-black pl-4 bg-gray-200 p-4">
                           <div className="mt-1"><Stamp size={20} className="text-black" /></div>
                           <p>{selectedNote.desc}</p>
                        </div>
                     </header>

                     <article className="prose prose-lg md:prose-xl max-w-none font-body text-black prose-headings:font-sans prose-headings:uppercase prose-headings:font-black prose-strong:text-soviet-red">
                        <p className="font-mono text-xs md:text-sm mb-8 p-4 border border-dashed border-black text-black/60 bg-white break-words">
                           [SYSTEM LOG]: Decrypting content stream...
                           <br/>
                           [TIME]: {selectedNote.date}
                        </p>
                        
                        <h3>01. Tactical Analysis</h3>
                        <p>
                           Implementation required bypassing standard safety protocols. Direct memory access was authorized by Command.
                        </p>
                        <p>
                           {selectedNote.content}
                           The geometry shader pipeline was reconfigured to handle the load.
                        </p>

                        <div className="my-8 md:my-12 relative group cursor-pointer" data-hoverable="true" onMouseEnter={() => playSound(SoundType.HOVER)}>
                           <div className="absolute inset-0 bg-soviet-black transform translate-x-2 translate-y-2"></div>
                           <div className="relative bg-white h-40 md:h-64 flex items-center justify-center border-2 border-black">
                              <span className="text-black font-mono animate-pulse text-xs md:text-base">
                                 [ FIGURE 1.1: BLUEPRINT REDACTED ]
                              </span>
                           </div>
                        </div>
                     </article>
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

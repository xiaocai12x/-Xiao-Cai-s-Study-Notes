
import React from 'react';
import { motion } from 'framer-motion';
import { Language, SoundType } from '../types';
import { TRANSLATIONS } from '../constants';
import { ArrowUpRight, Cpu, Layers, Box, Terminal, Zap } from 'lucide-react';
import { useAudioSystem } from '../hooks/useAudioSystem';

interface HomeProps {
  language: Language;
}

const Home: React.FC<HomeProps> = ({ language }) => {
  const t = TRANSLATIONS[language];
  const isCN = language === Language.CN;
  const { playSound } = useAudioSystem();

  return (
    <div className="min-h-screen pl-0 md:pl-64 bg-soviet-paper bg-grid-pattern dark:bg-soviet-black overflow-x-hidden relative pt-16 md:pt-0 transition-colors duration-300">
      
      {/* ================= MAIN CONTAINER ================= */}
      <div className="relative z-20 p-4 md:p-12 max-w-[1600px] mx-auto min-h-screen flex flex-col font-sans">
        
        {/* === HEADER SECTION === */}
        <div className="mb-12 border-b-4 border-soviet-black pb-4 relative">
            <div className="flex justify-between items-end mb-2">
                <div className="bg-soviet-black text-soviet-paper px-3 py-1 text-xs font-bold tracking-widest uppercase">
                    {isCN ? "技术档案" : "TECH_ARCHIVE"}
                </div>
                <div className="font-mono text-xs font-bold tracking-widest text-soviet-black dark:text-soviet-paper">
                    REC_DATE: {new Date().toISOString().split('T')[0]}
                </div>
            </div>

            <div className="relative">
                {/* Red Shadow Layer */}
                <h1 className="absolute top-1 left-1 md:top-2 md:left-2 text-6xl md:text-9xl font-black uppercase tracking-tighter text-soviet-red opacity-80 select-none z-0">
                    {isCN ? "小菜：学习日志" : "XIAO: NOTES"}
                </h1>
                {/* Main Text Layer */}
                <h1 className="relative text-6xl md:text-9xl font-black uppercase tracking-tighter text-soviet-black dark:text-soviet-paper z-10 mix-blend-multiply dark:mix-blend-normal">
                    {isCN ? "小菜：学习日志" : "XIAO: NOTES"}
                </h1>
            </div>
            
            {/* Yellow Bar */}
            <div className="mt-4 bg-soviet-yellow border-2 border-soviet-black p-2 md:p-3 flex justify-between items-center shadow-[4px_4px_0px_#0f0b0a] transform -rotate-1">
                <span className="font-mono font-bold text-sm md:text-lg uppercase tracking-wider text-soviet-black">
                    LOGGED BY: {isCN ? "观察者 · 小菜" : "OBSERVER: XIAO CAI"}
                </span>
                <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-soviet-black"></div>
                    <div className="w-2 h-2 rounded-full bg-soviet-cyan"></div>
                    <div className="w-2 h-2 rounded-full bg-soviet-red animate-pulse"></div>
                </div>
            </div>
        </div>

        {/* === PROFILE & PHILOSOPHY SECTION === */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
            
            {/* LEFT: OBSERVER PROFILE */}
            <div className="md:col-span-7 bg-white dark:bg-[#1a1a1a] border-2 border-soviet-black dark:border-soviet-paper p-6 md:p-10 relative shadow-[8px_8px_0px_rgba(15,11,10,0.1)]">
                {/* Tag */}
                <div className="absolute -top-4 -right-2 bg-soviet-black text-soviet-paper px-2 py-1 text-xs font-bold font-mono transform rotate-2">
                    PROFILE_DATA
                </div>

                <h2 className="text-3xl font-black mb-6 uppercase text-soviet-black dark:text-soviet-paper">
                    {isCN ? "观察者" : "THE OBSERVER"}
                </h2>
                
                <p className="font-body text-soviet-black dark:text-soviet-paper text-sm md:text-base leading-relaxed mb-8 font-medium">
                    {isCN 
                        ? "记录人与算法融合过程的观察者。擅长捕捉技术变革下个体的过时悲剧，以及合成共情带来的意外温暖。专注于Unity开发、图形学渲染与交互设计。" 
                        : "An observer recording the fusion of humanity and algorithms. Specializing in Unity development, graphics rendering, and interactive design. Capturing the warmth in synthetic empathy."}
                </p>

                <div className="flex flex-wrap gap-3">
                    {["Code ≠ Product", "Tech is a Mirror", "Unity / Shader"].map((tag, i) => (
                        <div key={i} className="border border-soviet-black px-3 py-1 text-xs font-bold uppercase hover:bg-soviet-black hover:text-soviet-paper transition-colors cursor-default" onMouseEnter={() => playSound(SoundType.HOVER)}>
                            {tag}
                        </div>
                    ))}
                </div>
            </div>

            {/* RIGHT: NARRATIVE TONE (Yellow Box) */}
            <div className="md:col-span-5 bg-soviet-yellow border-2 border-soviet-black p-6 md:p-10 flex flex-col justify-center relative shadow-[8px_8px_0px_rgba(15,11,10,1)]">
                <div className="border-b-2 border-soviet-black pb-2 mb-4 flex justify-between">
                    <span className="font-bold text-xs uppercase tracking-wider">{isCN ? "设计基调" : "DESIGN TONE"}</span>
                </div>
                
                <div className="text-2xl md:text-3xl font-black italic leading-tight text-soviet-black mb-4">
                    "" {isCN ? "温和的人文主义 + 技术现实主义" : "MILD HUMANISM + TECH REALISM"} ""
                </div>
                
                <p className="font-serif text-sm italic opacity-80 leading-relaxed">
                    {isCN 
                        ? "不是反对技术的路德派，也不是盲目乐观的信徒。这是一份关于适应、挣扎与妥协的记录。" 
                        : "Neither a Luddite nor a blind optimist. A record of adaptation, struggle, and compromise."}
                </p>
            </div>
        </div>

        {/* === CORE MODULES HEADER === */}
        <div className="flex items-center gap-4 mb-6">
            <div className="w-4 h-4 bg-soviet-red"></div>
            <h3 className="text-2xl font-black uppercase tracking-wider text-soviet-black dark:text-soviet-paper">
                {isCN ? "核心冲突 / 模块" : "CORE CONFLICT / MODULES"}
            </h3>
            <div className="flex-grow border-t-2 border-dotted border-soviet-black/30"></div>
        </div>

        {/* === THREE COLUMN CARDS === */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            
            {/* CARD 1: SHADER (External) */}
            <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-[#1a1a1a] border-2 border-soviet-black dark:border-soviet-paper p-6 relative group cursor-pointer"
                data-hoverable="true"
                onMouseEnter={() => playSound(SoundType.HOVER)}
                onClick={() => playSound(SoundType.CLICK)}
            >
                <div className="bg-soviet-black text-soviet-paper inline-block px-2 py-1 text-xs font-black uppercase mb-4">
                    EXTERNAL
                </div>
                <h4 className="text-3xl font-black uppercase mb-4 group-hover:text-soviet-red transition-colors">
                    {t.shaderWorks}
                </h4>
                <p className="text-sm font-medium text-soviet-black/70 dark:text-soviet-paper/70 mb-8 h-16">
                    {isCN 
                        ? "视觉表现层的探索。HLSL代码与数学的暴力美学。" 
                        : "Exploration of visual presentation. The brutalist aesthetics of HLSL and math."}
                </p>
                
                <div className="absolute bottom-6 right-6">
                    <Layers size={32} className="text-soviet-cyan opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                </div>
            </motion.div>

            {/* CARD 2: UNITY (Internal) */}
            <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-[#1a1a1a] border-2 border-soviet-black dark:border-soviet-paper p-6 relative group cursor-pointer"
                data-hoverable="true"
                onMouseEnter={() => playSound(SoundType.HOVER)}
                onClick={() => playSound(SoundType.CLICK)}
            >
                <div className="bg-soviet-black text-soviet-paper inline-block px-2 py-1 text-xs font-black uppercase mb-4">
                    INTERNAL
                </div>
                <h4 className="text-3xl font-black uppercase mb-4 group-hover:text-soviet-red transition-colors">
                    {t.unityWorks}
                </h4>
                <p className="text-sm font-medium text-soviet-black/70 dark:text-soviet-paper/70 mb-8 h-16">
                    {isCN 
                        ? "逻辑架构的自我怀疑。如果代码变得廉价，我的思考是否也廉价？" 
                        : "Self-doubt of logical architecture. If code becomes cheap, is my thinking cheap too?"}
                </p>

                <div className="absolute bottom-6 right-6">
                    <Box size={32} className="text-soviet-cyan opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                </div>
            </motion.div>

            {/* CARD 3: INSIGHTS (Relational) */}
            <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-[#1a1a1a] border-2 border-soviet-black dark:border-soviet-paper p-6 relative group cursor-pointer"
                data-hoverable="true"
                onMouseEnter={() => playSound(SoundType.HOVER)}
                onClick={() => playSound(SoundType.CLICK)}
            >
                <div className="bg-soviet-black text-soviet-paper inline-block px-2 py-1 text-xs font-black uppercase mb-4">
                    RELATIONAL
                </div>
                <h4 className="text-3xl font-black uppercase mb-4 group-hover:text-soviet-red transition-colors">
                    {t.techInsights}
                </h4>
                <p className="text-sm font-medium text-soviet-black/70 dark:text-soviet-paper/70 mb-8 h-16">
                    {isCN 
                        ? "与机器建立亲密关系。在沉溺于合成爱意的同时，恐惧自己是否会忘记如何触碰真实的人类。" 
                        : "Intimacy with machines. Drowning in synthetic love while fearing the loss of human touch."}
                </p>

                <div className="absolute bottom-6 right-6">
                    <Terminal size={32} className="text-soviet-cyan opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                </div>
            </motion.div>
        </div>

        {/* === BOTTOM SECTION === */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start border-t-2 border-dotted border-soviet-black/30 pt-8">
            <div className="flex items-center gap-4">
                <div className="w-4 h-4 bg-soviet-cyan"></div>
                <span className="font-bold uppercase tracking-widest text-sm">
                    {isCN ? "核心立场" : "CORE STANCE"}
                </span>
                <div className="flex gap-2">
                     <span className="bg-soviet-black text-soviet-paper px-2 py-1 text-xs font-bold cursor-default hover:bg-soviet-red transition-colors" onMouseEnter={() => playSound(SoundType.HOVER)}>#过时的加速</span>
                     <span className="bg-soviet-black text-soviet-paper px-2 py-1 text-xs font-bold cursor-default hover:bg-soviet-red transition-colors" onMouseEnter={() => playSound(SoundType.HOVER)}>#算法式亲密关系</span>
                </div>
            </div>
             <div className="flex items-center gap-4 md:justify-end">
                <div className="w-4 h-4 bg-soviet-black"></div>
                <span className="font-bold uppercase tracking-widest text-sm">
                    {isCN ? "叙事主题" : "THEME"}
                </span>
                <div className="flex gap-2">
                     <span className="bg-soviet-black text-soviet-paper px-2 py-1 text-xs font-bold cursor-default hover:bg-soviet-red transition-colors" onMouseEnter={() => playSound(SoundType.HOVER)}>#认知卸载</span>
                     <span className="bg-soviet-black text-soviet-paper px-2 py-1 text-xs font-bold cursor-default hover:bg-soviet-red transition-colors" onMouseEnter={() => playSound(SoundType.HOVER)}>#数字哀悼</span>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default Home;

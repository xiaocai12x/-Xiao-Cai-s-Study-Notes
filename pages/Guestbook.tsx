
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimationControls } from 'framer-motion';
import { Language, SoundType } from '../types';
import { TRANSLATIONS } from '../constants';
import { Radio } from 'lucide-react';
import { useAudioSystem } from '../hooks/useAudioSystem';

interface GuestbookProps {
  language: Language;
}

interface Message {
  id: string;
  text: string;
  date: string;
  x: number;
  y: number;
  rotation: number;
}

const STORAGE_KEY = 'xiao_cai_guestbook_v1';
const COOLDOWN_MS = 5000;

const Guestbook: React.FC<GuestbookProps> = ({ language }) => {
  const t = TRANSLATIONS[language].guestbook;
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [mode, setMode] = useState<'WRITE' | 'CONFIG'>('WRITE');
  const [status, setStatus] = useState<'IDLE' | 'SCANNING' | 'TRANSMITTING' | 'ERROR' | 'COOLDOWN'>('IDLE');
  const [securityMsg, setSecurityMsg] = useState('');
  
  const controls = useAnimationControls();
  const containerRef = useRef<HTMLDivElement>(null);
  const lastTransmitTime = useRef<number>(0);
  
  const { playSound } = useAudioSystem();

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (e) { console.error("Failed to load", e); }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  const handleTransmit = async () => {
    const now = Date.now();
    playSound(SoundType.CLICK);
    
    if (now - lastTransmitTime.current < COOLDOWN_MS) {
       setStatus('COOLDOWN');
       setSecurityMsg(t.security.cooldown);
       playSound(SoundType.ERROR);
       setTimeout(() => { if (status === 'COOLDOWN') setStatus('IDLE'); }, 2000);
       return;
    }

    if (!inputText.trim()) return;

    setStatus('SCANNING');
    setSecurityMsg(t.security.scanning);
    await new Promise(r => setTimeout(r, 800));

    setStatus('TRANSMITTING');
    setSecurityMsg(t.security.safe);
    playSound(SoundType.TRANSMIT); // Play transmission data sound
    lastTransmitTime.current = Date.now();

    await controls.start({ y: [0, 5, -5, 0], transition: { duration: 0.2 } });

    setTimeout(() => {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputText, 
        date: new Date().toLocaleDateString(),
        // Scatter slightly higher up since machine is at bottom
        x: Math.random() * 80 - 40,
        y: Math.random() * 50 - 150, 
        rotation: Math.random() * 10 - 5
      };
      setMessages(prev => [...prev, newMessage]);
      setInputText('');
      setStatus('IDLE');
      playSound(SoundType.SUCCESS);
    }, 800);
  };

  const handleDelete = (id: string) => {
    playSound(SoundType.CLICK);
    setMessages(prev => prev.filter(m => m.id !== id));
  };

  const handleModeChange = (newMode: 'WRITE' | 'CONFIG') => {
    playSound(SoundType.SWITCH);
    setMode(newMode);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > inputText.length) {
        playSound(SoundType.TYPE);
    }
    setInputText(e.target.value);
  };

  return (
    <div className="min-h-screen pl-0 md:pl-64 bg-soviet-paper dark:bg-soviet-black relative overflow-hidden flex flex-col items-center justify-end pb-0 select-none pt-16 md:pt-0 transition-colors duration-300" ref={containerRef}>
      
      {/* ================= ATMOSPHERE: STATIC RAIN ================= */}
      <div className="absolute inset-0 pointer-events-none z-20 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay"></div>

      {/* ================= BACKGROUND TEXTURE ================= */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-10 bg-[url('https://www.transparenttextures.com/patterns/concrete-wall.png')]"></div>
      
      {/* ================= MESSAGES LAYER (Floating Behind) ================= */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-auto pb-64">
        {messages.map((msg) => (
           <MessageSlip key={msg.id} message={msg} />
        ))}
      </div>

      {/* ================= THE MACHINE (BOTTOM CENTER) ================= */}
      <motion.div 
        animate={controls}
        className="relative z-50 w-full max-w-lg px-4 md:px-0 transform translate-y-4 md:translate-y-0"
      >
        {/* Antenna */}
        <div className="absolute -top-24 right-10 w-1 h-32 bg-soviet-black/30 z-0 origin-bottom flex flex-col justify-end">
           <div className="w-2 h-2 rounded-full bg-soviet-red animate-pulse mb-auto -ml-0.5 shadow-[0_0_10px_red]"></div>
        </div>

        {/* Device Chassis - RETRO BEIGE/PAPER */}
        <div className="
           bg-soviet-paper dark:bg-[#1a1a1a] rounded-t-xl p-4 md:p-6 shadow-[0px_-10px_50px_rgba(0,0,0,0.15)]
           border-t-4 border-x-4 border-soviet-black/20 dark:border-soviet-paper/20
           relative transition-colors duration-300
        ">
           {/* Texture Overlay */}
           <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')] pointer-events-none rounded-t-xl"></div>

           {/* Brand Label */}
           <div className="flex justify-between items-center mb-4 border-b-2 border-soviet-black/10 dark:border-soviet-paper/20 pb-2">
              <div className="flex items-center gap-2">
                  <Radio size={14} className="text-soviet-black dark:text-soviet-cyan" />
                  <span className="text-[10px] font-black text-soviet-black dark:text-soviet-paper tracking-widest uppercase">Elektronika-84</span>
              </div>
              <div className="flex gap-1">
                 <div className="w-8 h-1 bg-soviet-black/50 dark:bg-soviet-cyan/50"></div>
                 <div className="w-2 h-1 bg-soviet-red/50"></div>
              </div>
           </div>

           {/* MAIN SCREEN AREA - Framed */}
           <div className={`
              relative bg-soviet-cyan/30 dark:bg-[#050505] border-4 border-soviet-black/10 dark:border-gray-700 rounded-lg mb-4 overflow-hidden h-32 md:h-40 shadow-[inset_0_0_10px_rgba(0,0,0,0.1)]
              ${status === 'ERROR' ? 'border-soviet-red' : ''}
           `}> 
              <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] pointer-events-none z-20 opacity-30"></div>
              
              <div className={`relative z-10 p-4 h-full font-mono text-xs md:text-sm overflow-hidden transition-colors duration-300 ${status === 'ERROR' ? 'text-soviet-red' : 'text-soviet-black dark:text-soviet-cyan'}`}>
                 
                 {/* Overlay Messages */}
                 <AnimatePresence>
                   {(status !== 'IDLE' && mode === 'WRITE') && (
                     <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="absolute inset-0 z-30 bg-soviet-cyan/90 dark:bg-black/90 flex flex-col items-center justify-center text-center p-4 backdrop-blur-sm"
                     >
                        <div className="font-black uppercase tracking-widest text-xs animate-pulse text-soviet-black dark:text-soviet-paper">{securityMsg}</div>
                     </motion.div>
                   )}
                 </AnimatePresence>

                 {/* WRITE MODE */}
                 {mode === 'WRITE' && (
                    <div className="h-full flex flex-col">
                       <textarea
                          value={inputText}
                          onChange={handleInputChange}
                          placeholder={t.inputPlaceholder}
                          disabled={status !== 'IDLE'}
                          maxLength={140}
                          className="w-full flex-grow bg-transparent border-none outline-none resize-none placeholder-soviet-black/40 dark:placeholder-soviet-cyan/50 font-mono uppercase leading-relaxed text-xs md:text-sm"
                          autoFocus
                       />
                       <div className="text-[10px] text-soviet-black/60 dark:text-soviet-cyan/60 text-right mt-1">{inputText.length}/140</div>
                    </div>
                 )}

                 {/* CONFIG MODE */}
                 {mode === 'CONFIG' && (
                    <div className="h-full flex flex-col overflow-y-auto custom-scrollbar">
                       <div className="text-[10px] text-soviet-black/50 dark:text-soviet-cyan/50 mb-2 uppercase border-b border-soviet-black/20 dark:border-soviet-cyan/20 pb-1">Memory Dump</div>
                       {messages.length === 0 ? (
                          <div className="text-soviet-black/70 dark:text-soviet-cyan/70 text-center mt-4">{t.empty}</div>
                       ) : (
                          <ul className="space-y-1">
                             {messages.map(msg => (
                                <li key={msg.id} className="flex justify-between items-center text-[10px] border-b border-soviet-black/10 dark:border-soviet-cyan/20 py-1">
                                   <span className="truncate w-32 opacity-70">{msg.text}</span>
                                   <button onClick={() => handleDelete(msg.id)} className="text-soviet-red hover:text-red-600">X</button>
                                </li>
                             ))}
                          </ul>
                       )}
                    </div>
                 )}
              </div>
           </div>

           {/* CONTROLS - KEYCAP STYLE */}
           <div className="grid grid-cols-4 gap-3 bg-soviet-black/5 dark:bg-[#222] p-3 rounded-md shadow-inner">
              <button 
                onClick={() => handleModeChange('WRITE')} 
                className={`
                  col-span-1 py-2 text-[10px] font-bold border-b-4 rounded-sm transition-all active:border-b-0 active:translate-y-1
                  ${mode === 'WRITE' 
                    ? 'bg-soviet-black text-soviet-paper border-soviet-black' 
                    : 'bg-soviet-paper text-soviet-black border-soviet-black/30 hover:bg-white'}
                `}
              >
                IN
              </button>
              <button 
                onClick={() => handleModeChange('CONFIG')} 
                className={`
                  col-span-1 py-2 text-[10px] font-bold border-b-4 rounded-sm transition-all active:border-b-0 active:translate-y-1
                  ${mode === 'CONFIG' 
                    ? 'bg-soviet-red text-white border-soviet-darkRed' 
                    : 'bg-soviet-paper text-soviet-black border-soviet-black/30 hover:bg-white'}
                `}
              >
                CONF
              </button>
              <button 
                onClick={handleTransmit}
                disabled={mode !== 'WRITE' || status !== 'IDLE' || !inputText.trim()}
                className="
                  col-span-2 bg-soviet-paper border-b-4 border-soviet-black/30 text-soviet-black hover:bg-white transition-all active:border-b-0 active:translate-y-1
                  flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-sm
                "
              >
                 <span className="text-xs font-black tracking-widest text-soviet-red">{t.transmit}</span>
              </button>
           </div>
           
        </div>
      </motion.div>
    </div>
  );
};

const MessageSlip: React.FC<{ message: Message }> = ({ message }) => {
   const [displayedText, setDisplayedText] = useState('');

   useEffect(() => {
      let index = 0;
      const interval = setInterval(() => {
         setDisplayedText(message.text.substring(0, index));
         index++;
         if (index > message.text.length) clearInterval(interval);
      }, 30);
      return () => clearInterval(interval);
   }, [message.text]);

   return (
      <motion.div
         initial={{ scale: 0, opacity: 0 }}
         animate={{ scale: 1, opacity: 1, x: message.x, y: message.y, rotate: message.rotation }}
         drag
         className="absolute cursor-grab active:cursor-grabbing group left-1/2 bottom-1/2"
      >
         <div className="
            w-48 bg-soviet-yellow text-soviet-black font-mono text-[10px] p-3
            shadow-[2px_2px_5px_rgba(0,0,0,0.1)] border-t-2 border-soviet-black/10 clip-path-torn
         ">
            {/* Paper Texture */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-30 pointer-events-none"></div>
            
            <div className="relative z-10 flex justify-between text-[8px] opacity-50 mb-1">
               <span>ID_{message.id.slice(-3)}</span>
               <span>{message.date}</span>
            </div>
            <div className="relative z-10 font-bold uppercase leading-tight">
               {displayedText}
            </div>
            <div className="mt-2 h-2 w-full bg-[repeating-linear-gradient(90deg,black,black_1px,transparent_1px,transparent_3px)] opacity-10"></div>
         </div>
      </motion.div>
   );
};

export default Guestbook;

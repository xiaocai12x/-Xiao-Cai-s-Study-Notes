
import React, { useState } from 'react';
import { Home, Book, FolderOpen, PenTool, Sun, Moon, Volume2, VolumeX, Languages, Coffee, Zap, Radio, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Page, Language, Theme, NavItem, SoundType } from '../types';
import { TRANSLATIONS } from '../constants';
import { useAudioSystem } from '../hooks/useAudioSystem';

interface SidebarProps {
  currentPage: Page;
  setPage: (page: Page) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  toggleTheme: () => void;
  isBgmPlaying: boolean;
  toggleBgm: () => void;
  onDonateClick: () => void; // Added prop
}

const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  setPage,
  language,
  setLanguage,
  theme,
  toggleTheme,
  isBgmPlaying,
  toggleBgm,
  onDonateClick
}) => {
  const t = TRANSLATIONS[language];
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { playSound } = useAudioSystem();

  const navItems = [
    { id: Page.HOME, label: t.nav.home, desc: t.navDesc.home, icon: Home },
    { id: Page.NOTES, label: t.nav.notes, desc: t.navDesc.notes, icon: Book },
    { id: Page.PORTFOLIO, label: t.nav.portfolio, desc: t.navDesc.portfolio, icon: FolderOpen },
    { id: Page.GUESTBOOK, label: t.nav.guestbook, desc: t.navDesc.guestbook, icon: PenTool },
  ];

  const handlePageChange = (page: Page) => {
    playSound(SoundType.CLICK);
    setPage(page);
    setIsMobileMenuOpen(false);
  };

  const handleControlClick = (action: () => void, isSwitch = true) => {
    playSound(isSwitch ? SoundType.SWITCH : SoundType.CLICK);
    action();
  };

  // ================= DESKTOP SIDEBAR =================
  const DesktopSidebar = (
    <nav className="hidden md:flex fixed left-0 top-0 h-screen w-64 bg-soviet-paper dark:bg-[#111] flex-col z-50 border-r-4 border-soviet-black dark:border-soviet-paper shadow-[5px_0px_20px_rgba(0,0,0,0.1)]">
      {/* Header Area - Construction Block */}
      <div className="w-full h-40 relative overflow-hidden border-b-4 border-soviet-black dark:border-soviet-paper bg-soviet-black p-4 group cursor-default">
        <div className="absolute top-0 left-0 w-full h-full bg-[size:3px_3px] bg-halftone-red opacity-30"></div>
        <div className="relative z-10 flex flex-col h-full justify-between">
           <div className="flex justify-between items-start">
             <h1 className="text-4xl font-black text-soviet-paper tracking-tighter leading-none group-hover:text-soviet-red transition-colors">
               XC<br/>01
             </h1>
             <div className="w-8 h-8 rounded-full border-2 border-soviet-paper flex items-center justify-center animate-spin-slow">
                <div className="w-full h-[1px] bg-soviet-paper"></div>
                <div className="h-full w-[1px] bg-soviet-paper absolute"></div>
             </div>
           </div>
           
           <div className="border-t border-soviet-paper/30 pt-2">
             <span className="text-[10px] font-mono text-soviet-cyan block">
               UNIT: PROTOTYPE
             </span>
             <span className="text-[10px] font-mono text-soviet-red block">
               STATUS: ONLINE
             </span>
           </div>
        </div>
      </div>

      {/* Navigation Links - Concrete Blocks */}
      <div className="flex flex-col w-full flex-grow relative bg-soviet-paper dark:bg-[#151515]">
        {/* Vertical line through menu */}
        <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-soviet-black/10 dark:bg-soviet-paper/10 dashed"></div>

        {navItems.map((item, index) => (
          <RectButton
            key={item.id}
            index={index}
            label={item.label}
            description={item.desc}
            isActive={currentPage === item.id}
            onClick={() => handlePageChange(item.id)}
            onHover={() => playSound(SoundType.HOVER)}
          >
            <item.icon size={18} className="mr-4 relative z-10" />
          </RectButton>
        ))}
      </div>

      {/* Utility Panel */}
      <div className="w-full bg-soviet-paper dark:bg-[#0a0a0a] border-t-4 border-soviet-black dark:border-soviet-paper p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-stripes opacity-5 pointer-events-none"></div>
        <div className="relative z-10 grid grid-cols-2 gap-3">
          <ControlKnob label={theme === Theme.LIGHT ? "ДЕНЬ" : "НОЧЬ"} onClick={() => handleControlClick(toggleTheme)} active={theme === Theme.DARK} onHover={() => playSound(SoundType.HOVER)}>
             {theme === Theme.LIGHT ? <Sun size={18} /> : <Moon size={18} />}
          </ControlKnob>
          <ControlKnob label={isBgmPlaying ? "ЗВУК" : "ТИХО"} onClick={() => handleControlClick(toggleBgm)} active={isBgmPlaying} onHover={() => playSound(SoundType.HOVER)}>
            {isBgmPlaying ? <Volume2 size={18} className="text-soviet-red animate-pulse" /> : <VolumeX size={18} />}
          </ControlKnob>
          <ControlKnob label={language} onClick={() => handleControlClick(() => setLanguage(language === Language.CN ? Language.EN : Language.CN))} active={false} onHover={() => playSound(SoundType.HOVER)}>
            <Languages size={18} />
          </ControlKnob>
           <ControlKnob label="DONATE" onClick={() => handleControlClick(onDonateClick, false)} active={true} isAccent onHover={() => playSound(SoundType.HOVER)}>
            <Coffee size={18} />
          </ControlKnob>
        </div>
        <div className="mt-6 flex justify-between items-end border-t-2 border-soviet-black dark:border-soviet-paper pt-2">
            <div className="flex flex-col">
                <span className="text-[8px] font-mono text-soviet-black dark:text-soviet-paper uppercase tracking-widest">System</span>
                <span className="text-[10px] font-black text-soviet-red">CONNECTED</span>
            </div>
            <Radio size={12} className="text-soviet-cyan animate-pulse" />
        </div>
      </div>
    </nav>
  );

  // ================= MOBILE HEADER & MENU =================
  const MobileHeader = (
    <>
      {/* Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-soviet-paper dark:bg-[#111] border-b-4 border-soviet-black dark:border-soviet-paper z-50 flex justify-between items-center px-4 shadow-lg">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 bg-soviet-black flex items-center justify-center text-soviet-paper font-black text-xs">XC</div>
           <span className="font-black text-xl tracking-tighter text-soviet-black dark:text-soviet-paper">NOTES</span>
        </div>
        
        <div className="flex items-center gap-4">
           <button onClick={() => handleControlClick(toggleTheme)} className="text-soviet-black dark:text-soviet-paper">
              {theme === Theme.LIGHT ? <Sun size={20} /> : <Moon size={20} />}
           </button>
           <button 
             onClick={() => { playSound(SoundType.CLICK); setIsMobileMenuOpen(true); }} 
             className="bg-soviet-red text-soviet-paper p-2 border-2 border-soviet-black active:translate-y-1"
           >
             <Menu size={20} />
           </button>
        </div>
      </div>

      {/* Fullscreen Overlay Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="md:hidden fixed inset-0 z-[60] bg-soviet-paper dark:bg-[#111] flex flex-col"
          >
             {/* Header */}
             <div className="h-16 flex justify-between items-center px-4 border-b-4 border-soviet-black dark:border-soviet-paper bg-soviet-black">
                <span className="text-soviet-paper font-mono text-xs uppercase tracking-widest">Navigation // System</span>
                <button 
                  onClick={() => { playSound(SoundType.CLICK); setIsMobileMenuOpen(false); }}
                  className="text-soviet-paper hover:text-soviet-red transition-colors"
                >
                  <X size={28} />
                </button>
             </div>

             {/* Menu Items */}
             <div className="flex-grow flex flex-col justify-center p-8 gap-4 relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute inset-0 bg-stripes opacity-5 pointer-events-none"></div>
                <div className="absolute -right-20 top-20 text-[20rem] font-black text-soviet-black opacity-5 pointer-events-none rotate-12">
                   MENU
                </div>

                {navItems.map((item, index) => (
                   <button
                     key={item.id}
                     onClick={() => handlePageChange(item.id)}
                     className={`
                       text-4xl font-black uppercase tracking-tighter text-left py-4 border-b-2 border-soviet-black/10 dark:border-soviet-paper/10 flex items-center gap-4
                       ${currentPage === item.id ? 'text-soviet-red translate-x-4' : 'text-soviet-black dark:text-soviet-paper'}
                       transition-all duration-300
                     `}
                   >
                     <span className="text-xs font-mono font-bold opacity-50">0{index + 1}</span>
                     {item.label}
                     <span className="text-sm font-serif italic text-soviet-black/50 dark:text-soviet-paper/50 ml-auto">{item.desc}</span>
                   </button>
                ))}
             </div>

             {/* Footer Controls */}
             <div className="p-6 border-t-4 border-soviet-black dark:border-soviet-paper grid grid-cols-2 gap-4 bg-soviet-paper dark:bg-[#0a0a0a]">
                <ControlKnob label={isBgmPlaying ? "BGM ON" : "BGM OFF"} onClick={() => handleControlClick(toggleBgm)} active={isBgmPlaying}>
                   {isBgmPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
                </ControlKnob>
                <ControlKnob label={language} onClick={() => handleControlClick(() => setLanguage(language === Language.CN ? Language.EN : Language.CN))} active={false}>
                   <Languages size={20} />
                </ControlKnob>
                 <ControlKnob label="DONATE" onClick={() => handleControlClick(onDonateClick, false)} active={true} isAccent>
                    <Coffee size={18} />
                </ControlKnob>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

  return (
    <>
      {DesktopSidebar}
      {MobileHeader}
    </>
  );
};

interface RectButtonProps {
  children: React.ReactNode;
  label: string;
  description: string;
  onClick: () => void;
  onHover?: () => void;
  isActive?: boolean;
  index: number;
}

const RectButton: React.FC<RectButtonProps> = ({ 
  children, 
  label, 
  description,
  onClick, 
  onHover,
  isActive,
  index
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => { setIsHovered(true); onHover?.(); }}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        relative w-full h-20 pl-10 flex items-center text-xl font-bold uppercase tracking-wider
        transition-all duration-200 group overflow-hidden
        border-b-2 border-soviet-black dark:border-soviet-paper
        ${isActive 
          ? 'bg-soviet-black text-soviet-paper dark:bg-soviet-paper dark:text-soviet-black' 
          : 'hover:bg-soviet-red hover:text-soviet-paper text-soviet-black dark:text-soviet-paper'}
      `}
      data-hoverable="true"
    >
      <span className={`absolute left-2 top-2 text-[10px] font-mono font-black ${isActive ? 'text-soviet-red' : 'opacity-30'}`}>
        0{index + 1}
      </span>
      <div className={`absolute inset-0 bg-soviet-red transform translate-y-full transition-transform duration-200 ease-linear group-hover:translate-y-0 -z-10 ${isActive ? 'hidden' : ''}`}></div>
      <div className="relative z-10 flex items-center w-full">
        {children}
        <div className="flex flex-col items-start overflow-hidden h-6 relative w-full">
            <AnimatePresence mode="wait">
                {isHovered ? (
                     <motion.span 
                        key="desc"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="font-serif italic text-sm absolute left-0"
                     >
                        {description}
                     </motion.span>
                ) : (
                    <motion.span 
                        key="label"
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 20, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-0"
                    >
                        {label}
                    </motion.span>
                )}
            </AnimatePresence>
        </div>
      </div>
      {isActive && (
        <div className="absolute right-0 top-0 bottom-0 w-2 bg-soviet-red"></div>
      )}
      <Zap size={16} className={`absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${isActive ? 'hidden' : 'text-soviet-paper'}`} />
    </button>
  );
};

const ControlKnob: React.FC<{
    label: string; 
    onClick: () => void; 
    onHover?: () => void;
    children: React.ReactNode; 
    active: boolean;
    isAccent?: boolean;
}> = ({ label, onClick, onHover, children, active, isAccent }) => (
    <button 
        onClick={onClick}
        onMouseEnter={onHover}
        className={`
            flex flex-col items-center justify-center p-3 border-2 
            transition-all active:translate-y-1 shadow-[2px_2px_0px_rgba(15,11,10,1)] dark:shadow-[2px_2px_0px_#e5e1e2] active:shadow-none
            ${active 
                ? 'bg-soviet-black text-soviet-paper border-soviet-black dark:bg-soviet-paper dark:text-soviet-black dark:border-soviet-paper' 
                : 'bg-transparent border-soviet-black dark:border-soviet-paper text-soviet-black dark:text-soviet-paper hover:bg-soviet-black/5'}
            ${isAccent ? 'bg-soviet-red border-soviet-black text-soviet-paper hover:bg-soviet-red/90' : ''}
        `}
        data-hoverable="true"
    >
        {children}
        <span className="text-[9px] font-bold mt-1 uppercase tracking-wider">{label}</span>
    </button>
);

export default Sidebar;
import React from 'react';
import { Home, Book, FolderOpen, PenTool, Sun, Moon, Volume2, VolumeX, Languages, Coffee, Zap, Radio } from 'lucide-react';
import { motion } from 'framer-motion';
import { Page, Language, Theme, NavItem } from '../types';
import { TRANSLATIONS } from '../constants';

interface SidebarProps {
  currentPage: Page;
  setPage: (page: Page) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  toggleTheme: () => void;
  isBgmPlaying: boolean;
  toggleBgm: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  setPage,
  language,
  setLanguage,
  theme,
  toggleTheme,
  isBgmPlaying,
  toggleBgm
}) => {
  const t = TRANSLATIONS[language];

  const navItems: NavItem[] = [
    { id: Page.HOME, labelCN: t.nav.home, labelEN: t.nav.home, icon: Home },
    { id: Page.NOTES, labelCN: t.nav.notes, labelEN: t.nav.notes, icon: Book },
    { id: Page.PORTFOLIO, labelCN: t.nav.portfolio, labelEN: t.nav.portfolio, icon: FolderOpen },
    { id: Page.GUESTBOOK, labelCN: t.nav.guestbook, labelEN: t.nav.guestbook, icon: PenTool },
  ];

  return (
    <nav className="fixed left-0 top-0 h-screen w-64 bg-soviet-paper dark:bg-[#111] flex flex-col z-50 border-r-4 border-soviet-black dark:border-soviet-paper shadow-[5px_0px_20px_rgba(0,0,0,0.2)]">
      
      {/* Header Area - Construction Block */}
      <div className="w-full h-40 relative overflow-hidden border-b-4 border-soviet-black dark:border-soviet-paper bg-soviet-black p-4 group">
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
               STATUS: UNSTABLE
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
            label={language === Language.CN ? item.labelCN : item.labelEN}
            isActive={currentPage === item.id}
            onClick={() => setPage(item.id)}
          >
            <item.icon size={18} className="mr-4 relative z-10" />
          </RectButton>
        ))}
      </div>

      {/* Utility Panel - Industrial Interface */}
      <div className="w-full bg-soviet-paper dark:bg-[#0a0a0a] border-t-4 border-soviet-black dark:border-soviet-paper p-4 relative overflow-hidden">
        {/* Background diagonal stripes */}
        <div className="absolute inset-0 bg-stripes opacity-5 pointer-events-none"></div>
        
        <div className="relative z-10 grid grid-cols-2 gap-3">
          {/* Theme Toggle */}
          <ControlKnob
            label={theme === Theme.LIGHT ? "ДЕНЬ" : "НОЧЬ"} // Day / Night
            onClick={toggleTheme}
            active={theme === Theme.DARK}
          >
             {theme === Theme.LIGHT ? <Sun size={18} /> : <Moon size={18} />}
          </ControlKnob>

          {/* BGM Toggle */}
          <ControlKnob
            label={isBgmPlaying ? "ЗВУК" : "ТИХО"} // Sound / Quiet
            onClick={toggleBgm}
            active={isBgmPlaying}
          >
            {isBgmPlaying ? <Volume2 size={18} className="text-soviet-red animate-pulse" /> : <VolumeX size={18} />}
          </ControlKnob>

          {/* Language Switch */}
          <ControlKnob
            label={language}
            onClick={() => setLanguage(language === Language.CN ? Language.EN : Language.CN)}
            active={false}
          >
            <Languages size={18} />
          </ControlKnob>

           {/* Donate */}
           <ControlKnob
            label="DONATE"
            onClick={() => alert('Unity learning fund - Coming Soon')}
            active={true}
            isAccent
          >
            <Coffee size={18} />
          </ControlKnob>
        </div>
        
        <div className="mt-6 flex justify-between items-end border-t-2 border-soviet-black dark:border-soviet-paper pt-2">
            <div className="flex flex-col">
                <span className="text-[8px] font-mono text-soviet-black dark:text-soviet-paper uppercase tracking-widest">System</span>
                <span className="text-[10px] font-black text-soviet-red">ONLINE</span>
            </div>
            <Radio size={12} className="text-soviet-cyan animate-pulse" />
        </div>
      </div>
    </nav>
  );
};

interface RectButtonProps {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
  isActive?: boolean;
  index: number;
}

const RectButton: React.FC<RectButtonProps> = ({ 
  children, 
  label, 
  onClick, 
  isActive,
  index
}) => {
  return (
    <button
      onClick={onClick}
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
      {/* Index Number */}
      <span className={`absolute left-2 top-2 text-[10px] font-mono font-black ${isActive ? 'text-soviet-red' : 'opacity-30'}`}>
        0{index + 1}
      </span>

      {/* Hover Slide Effect */}
      <div className={`absolute inset-0 bg-soviet-red transform translate-y-full transition-transform duration-200 ease-linear group-hover:translate-y-0 -z-10 ${isActive ? 'hidden' : ''}`}></div>

      <div className="relative z-10 flex items-center">
        {children}
        <span className="font-serif italic">{label}</span>
      </div>

      {/* Active Arrow */}
      {isActive && (
        <div className="absolute right-0 top-0 bottom-0 w-2 bg-soviet-red"></div>
      )}
      
      {/* Decorative arrow on hover */}
      <Zap size={16} className={`absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${isActive ? 'hidden' : 'text-soviet-paper'}`} />
    </button>
  );
};

const ControlKnob: React.FC<{
    label: string; 
    onClick: () => void; 
    children: React.ReactNode; 
    active: boolean;
    isAccent?: boolean;
}> = ({ label, onClick, children, active, isAccent }) => (
    <button 
        onClick={onClick}
        className={`
            flex flex-col items-center justify-center p-3 border-2 
            transition-all active:translate-y-1 shadow-[2px_2px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_#EBE8E3] active:shadow-none
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
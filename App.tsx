
import React, { useState, useEffect, useRef } from 'react';
import { HashRouter } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Sidebar from './components/Sidebar';
import CustomCursor from './components/CustomCursor';
import SplashScreen from './components/SplashScreen';
import Home from './pages/Home';
import Notes from './pages/Notes';
import Guestbook from './pages/Guestbook';
import Placeholder from './pages/Placeholder';
import DonateModal from './components/DonateModal';
import { Theme, Language, Page } from './types';
import { BGM_URL, TRANSLATIONS } from './constants';

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(Theme.LIGHT);
  const [language, setLanguage] = useState<Language>(Language.CN);
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);
  // Default BGM to true
  const [isBgmPlaying, setIsBgmPlaying] = useState<boolean>(true);
  const [isDonateModalOpen, setIsDonateModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize Audio
  useEffect(() => {
    audioRef.current = new Audio(BGM_URL);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3; 
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Handle BGM Toggle
  useEffect(() => {
    if (audioRef.current) {
      if (isBgmPlaying) {
        // Attempt to play. Browser might block until user interacts.
        // We handle the "first interaction" via the Splash Screen click now.
        audioRef.current.play().catch(e => {
            // Use this log to debug autoplay policies if needed
            // console.log("Autoplay waiting for interaction:", e);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isBgmPlaying]);

  // Handle Theme Class on Body
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === Theme.DARK) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Called when user clicks "Enter" on the splash screen
  const handleBootComplete = () => {
    setIsLoading(false);
    // Explicitly call play() here because this function is triggered by a user click event.
    // This satisfies the browser's Autoplay Policy.
    if (isBgmPlaying && audioRef.current) {
      audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
    }
  };

  const toggleTheme = () => {
    setTheme(prev => prev === Theme.LIGHT ? Theme.DARK : Theme.LIGHT);
  };

  const toggleBgm = () => {
    setIsBgmPlaying(prev => !prev);
  };

  const toggleDonateModal = () => {
    setIsDonateModalOpen(prev => !prev);
  }

  const renderContent = () => {
    switch (currentPage) {
      case Page.HOME:
        return <Home language={language} />;
      case Page.NOTES:
        return <Notes language={language} />;
      case Page.PORTFOLIO:
        return <Placeholder title={TRANSLATIONS[language].nav.portfolio} language={language} />;
      case Page.GUESTBOOK:
        return <Guestbook language={language} />;
      default:
        return <Home language={language} />;
    }
  };

  return (
    <HashRouter>
      <div className={`min-h-screen transition-colors duration-300 ${theme === Theme.DARK ? 'bg-soviet-black' : 'bg-soviet-paper'}`}>
        <CustomCursor currentPage={currentPage} />
        
        <AnimatePresence mode="wait">
          {isLoading && <SplashScreen onEnter={handleBootComplete} />}
        </AnimatePresence>

        <Sidebar 
          currentPage={currentPage}
          setPage={setCurrentPage}
          language={language}
          setLanguage={setLanguage}
          theme={theme}
          toggleTheme={toggleTheme}
          isBgmPlaying={isBgmPlaying}
          toggleBgm={toggleBgm}
          onDonateClick={toggleDonateModal}
        />
        
        <DonateModal 
          isOpen={isDonateModalOpen} 
          onClose={() => setIsDonateModalOpen(false)} 
          language={language} 
        />

        <main className="transition-opacity duration-300 relative z-0">
          {!isLoading && renderContent()}
        </main>
      </div>
    </HashRouter>
  );
};

export default App;

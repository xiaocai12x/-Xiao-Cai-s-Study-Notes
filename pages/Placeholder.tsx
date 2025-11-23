import React from 'react';
import { motion } from 'framer-motion';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';
import { Construction } from 'lucide-react';

interface PlaceholderProps {
  title: string;
  language: Language;
}

const Placeholder: React.FC<PlaceholderProps> = ({ title, language }) => {
  const t = TRANSLATIONS[language];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="min-h-screen flex flex-col items-center justify-center ml-20 bg-soviet-cream dark:bg-soviet-black p-8"
    >
      <div className="border-8 border-soviet-red p-12 text-center relative bg-white dark:bg-zinc-800 shadow-[16px_16px_0px_0px_rgba(26,26,26,1)] dark:shadow-[16px_16px_0px_0px_rgba(242,232,220,1)]">
        <div className="absolute -top-6 -left-6 bg-soviet-black text-soviet-cream px-4 py-2 font-black uppercase text-xl transform -rotate-3">
          {title}
        </div>
        
        <Construction size={64} className="mx-auto text-soviet-red mb-6 animate-bounce" />
        
        <h2 className="text-4xl font-black uppercase text-soviet-black dark:text-soviet-cream mb-4">
          {t.placeholder}
        </h2>
        
        <div className="w-full h-2 bg-soviet-black dark:bg-soviet-cream my-4">
           <div className="h-full bg-soviet-red w-2/3 animate-pulse"></div>
        </div>
        
        <p className="font-serif italic text-soviet-grey">
          Coming soon to a browser near you.
        </p>
      </div>
    </motion.div>
  );
};

export default Placeholder;

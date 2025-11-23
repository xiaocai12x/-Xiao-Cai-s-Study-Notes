import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, QrCode, Zap, Smartphone } from 'lucide-react';
import { Language, SoundType } from '../types';
import { TRANSLATIONS } from '../constants';
import { useAudioSystem } from '../hooks/useAudioSystem';

interface DonateModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

const DonateModal: React.FC<DonateModalProps> = ({ isOpen, onClose, language }) => {
  const t = TRANSLATIONS[language].donateModal;
  const { playSound } = useAudioSystem();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => { playSound(SoundType.CLICK); onClose(); }}
            className="absolute inset-0 bg-soviet-black/90 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, rotateX: 10 }}
            animate={{ scale: 1, opacity: 1, rotateX: 0 }}
            exit={{ scale: 0.9, opacity: 0, rotateX: -10 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-soviet-paper border-4 border-soviet-red shadow-[20px_20px_0px_rgba(0,0,0,0.5)] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Strip */}
            <div className="bg-soviet-red text-soviet-paper p-4 flex justify-between items-center border-b-4 border-soviet-black">
               <div className="flex items-center gap-3">
                  <Zap className="animate-pulse" />
                  <h2 className="text-xl md:text-2xl font-black uppercase tracking-tighter">
                    {t.title}
                  </h2>
               </div>
               <button 
                 onClick={() => { playSound(SoundType.CLICK); onClose(); }}
                 className="hover:rotate-90 transition-transform duration-300"
               >
                 <X size={32} />
               </button>
            </div>

            {/* Content Body */}
            <div className="p-6 md:p-10 relative">
               {/* Background Texture */}
               <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
               <div className="absolute -right-10 top-20 text-9xl font-black text-soviet-black opacity-5 pointer-events-none rotate-12">
                 FUND
               </div>

               <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="bg-soviet-black text-soviet-paper px-2 py-1 text-xs font-mono font-bold uppercase">
                      {t.subtitle}
                    </span>
                    <div className="h-[2px] flex-grow bg-soviet-black/20"></div>
                  </div>

                  <p className="text-lg md:text-xl font-bold text-soviet-black mb-10 leading-relaxed">
                    {t.desc}
                  </p>

                  {/* QR Placeholders */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                     {/* WeChat */}
                     <div className="border-2 border-soviet-black p-4 bg-white relative group cursor-crosshair">
                        <div className="absolute top-0 left-0 bg-soviet-black text-soviet-paper px-2 py-1 text-[10px] font-black uppercase">
                           WeChat
                        </div>
                        <div className="aspect-square bg-soviet-black/5 flex items-center justify-center relative overflow-hidden mb-4 border border-soviet-black/10">
                            {/* Visual Noise for "No QR" */}
                            <QrCode size={64} className="text-soviet-black opacity-20" />
                            <div className="absolute inset-0 bg-stripes opacity-10 animate-scan"></div>
                            <span className="absolute font-mono text-xs font-bold bg-soviet-red text-soviet-paper px-2 rotate-12">
                               PLACEHOLDER
                            </span>
                        </div>
                        <div className="text-center font-black uppercase text-sm tracking-wider">
                           {t.wechat}
                        </div>
                     </div>

                     {/* Alipay */}
                     <div className="border-2 border-soviet-black p-4 bg-white relative group cursor-crosshair">
                        <div className="absolute top-0 left-0 bg-soviet-cyan text-soviet-black px-2 py-1 text-[10px] font-black uppercase">
                           Alipay
                        </div>
                        <div className="aspect-square bg-soviet-cyan/10 flex items-center justify-center relative overflow-hidden mb-4 border border-soviet-black/10">
                            {/* Visual Noise for "No QR" */}
                            <QrCode size={64} className="text-soviet-cyan opacity-50" />
                            <div className="absolute inset-0 bg-stripes opacity-10 animate-scan"></div>
                             <span className="absolute font-mono text-xs font-bold bg-soviet-black text-soviet-paper px-2 -rotate-12">
                               PLACEHOLDER
                            </span>
                        </div>
                        <div className="text-center font-black uppercase text-sm tracking-wider">
                           {t.alipay}
                        </div>
                     </div>
                  </div>

                  <div className="text-center border-t-2 border-dashed border-soviet-black/30 pt-6">
                     <p className="font-mono text-xs text-soviet-black/60 uppercase tracking-widest">
                       {t.thanks}
                     </p>
                  </div>
               </div>
            </div>
            
            {/* Footer Bar */}
            <div className="h-4 bg-soviet-black w-full flex">
               <div className="h-full w-1/3 bg-soviet-yellow"></div>
               <div className="h-full w-1/3 bg-soviet-cyan"></div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DonateModal;
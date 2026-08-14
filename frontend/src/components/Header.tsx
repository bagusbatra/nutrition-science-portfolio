import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { HeartPulse, FileText, Send, Sparkles, Menu, X, ArrowUpRight } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

interface HeaderProps {
  onOpenContact: () => void;
  onOpenResume: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenContact, onOpenResume }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Scroll progress for top indicator
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      const sections = ['hero', 'skripsi', 'workbench', 'cases', 'rotations', 'media', 'skills'];
      const scrollPosition = window.scrollY + 180;
      
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'Profil' },
    { id: 'skripsi', label: 'Riset' },
    { id: 'workbench', label: 'Pengalaman' },
    { id: 'media', label: 'Galeri' },
    { id: 'skills', label: 'Kompetensi' }
  ];

  // Cases & rotations are sub-sections of "Pengalaman" — they share its nav highlight
  // even though the nav link itself anchors to the first section (workbench).
  const navGroupForSection: Record<string, string> = {
    hero: 'hero',
    skripsi: 'skripsi',
    workbench: 'workbench',
    cases: 'workbench',
    rotations: 'workbench',
    media: 'media',
    skills: 'skills'
  };

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Editorial Ribbon */}
      <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300">
        
        {/* Scroll Progress Bar at very top */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2D2D2D] via-[#F8BBD0] to-[#2D2D2D] origin-left z-50 pointer-events-none"
          style={{ scaleX }}
        />

        {/* Top Status Bar */}
        <div className="bg-[#FCE4EC]/80 backdrop-blur-md border-b border-[#F8BBD0]/40 py-1.5 px-3 sm:px-4 text-xs text-[#666666] flex items-center justify-between">
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
            <div className="flex items-center gap-2 truncate">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F8BBD0] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2D2D2D]"></span>
              </span>
              <span className="font-medium tracking-tight text-[#2D2D2D] text-[11px] sm:text-xs truncate">Status: {personalInfo.status}</span>
              <span className="hidden md:inline text-[#AAA]">|</span>
              <span className="hidden md:inline text-[#666666] text-xs">S1 Ilmu Gizi • {personalInfo.university} • Target: {personalInfo.targetGraduation}</span>
            </div>

            <div className="flex items-center gap-3 sm:gap-4 text-[11px] shrink-0">
              <span className="hidden sm:inline text-[#8E8E8E] uppercase tracking-wider font-mono text-[10px]">
                IPK: <strong className="text-[#2D2D2D] font-bold">{personalInfo.gpa}</strong>
              </span>
              <button 
                id="header-resume-btn-top"
                onClick={onOpenResume}
                className="text-[#2D2D2D] hover:text-[#F8BBD0] transition-colors flex items-center gap-1 font-medium cursor-pointer uppercase tracking-wider text-[10px]"
              >
                <FileText className="w-3 h-3 text-[#2D2D2D]" />
                <span className="hidden xs:inline">Lihat CV</span>
                <span className="xs:hidden">CV</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Sticky Navbar */}
        <nav className={`transition-all duration-300 px-3 sm:px-6 ${
          scrolled 
            ? 'bg-[#F9F5F6]/95 backdrop-blur-md shadow-xs border-b border-[#E8E0E3] py-2.5 sm:py-3' 
            : 'bg-[#F9F5F6]/85 backdrop-blur-sm py-3 sm:py-4 border-b border-[#E8E0E3]/60'
        }`}>
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
            
            {/* Logo / Monogram */}
            <div 
              id="header-brand-logo"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="cursor-pointer flex items-center gap-2.5 sm:gap-3 group select-none shrink-0"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#FCE4EC] border border-[#F8BBD0] flex items-center justify-center text-[#2D2D2D] font-serif italic font-bold text-sm sm:text-base group-hover:scale-105 transition-all shadow-xs">
                DPA
              </div>
              <div className="flex flex-col">
                <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.3em] sm:tracking-[0.4em] font-bold text-[#8E8E8E]">Portfolio</span>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <h1 className="text-lg sm:text-2xl font-serif italic text-[#2D2D2D] tracking-tight">
                    {personalInfo.name}
                  </h1>
                  <span className="text-[9px] sm:text-[10px] font-sans px-1.5 sm:px-2 py-0.5 rounded-full bg-[#E0E0E0] text-[#2D2D2D] font-semibold tracking-wider uppercase">
                    S.Gz (Cand.)
                  </span>
                </div>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-5 xl:gap-6 text-xs uppercase tracking-widest">
              {navItems.map((item) => {
                const isActive = navGroupForSection[activeSection] === item.id;
                return (
                  <button
                    key={item.id}
                    id={`nav-link-${item.id}`}
                    onClick={() => scrollTo(item.id)}
                    className={`transition-all cursor-pointer pb-0.5 relative py-1 ${
                      isActive 
                        ? 'text-[#2D2D2D] font-bold' 
                        : 'text-[#666666] hover:text-[#2D2D2D]'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2D2D2D]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="hidden sm:flex items-center gap-2.5">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                id="header-workbench-quick-btn"
                onClick={() => scrollTo('workbench')}
                className="px-3.5 py-2 rounded-full text-xs uppercase tracking-widest text-[#2D2D2D] border border-[#2D2D2D] hover:bg-[#2D2D2D] hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <HeartPulse className="w-3.5 h-3.5" />
                <span>Kalkulator</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                id="header-contact-btn"
                onClick={onOpenContact}
                className="px-4.5 py-2 rounded-full text-xs uppercase tracking-widest font-semibold text-white bg-[#2D2D2D] hover:bg-[#F8BBD0] hover:text-[#2D2D2D] transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3 h-3" />
                <span>Say Hello</span>
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-1.5">
              <motion.button
                whileTap={{ scale: 0.92 }}
                id="mobile-menu-toggle-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-full bg-[#FCE4EC] text-[#2D2D2D] hover:bg-[#F8BBD0] transition-colors cursor-pointer border border-[#F8BBD0] min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Toggle Navigation"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.button>
            </div>

          </div>
        </nav>
      </header>

      {/* Mobile Drawer Menu & Backdrop */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-xs z-30 lg:hidden"
            />

            {/* Slide-down menu sheet */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="fixed inset-x-0 top-[82px] z-40 bg-[#F9F5F6] border-b border-[#E8E0E3] shadow-2xl p-5 sm:p-6 lg:hidden max-h-[calc(100vh-90px)] overflow-y-auto"
            >
              <div className="flex flex-col gap-1.5 max-w-lg mx-auto">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8E8E8E] mb-2 font-mono">Navigasi Portofolio</p>
                {navItems.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      id={`mobile-nav-${item.id}`}
                      onClick={() => scrollTo(item.id)}
                      className={`text-left py-3 px-3.5 rounded-2xl text-xs uppercase tracking-wider font-semibold flex items-center justify-between transition-colors min-h-[44px] ${
                        isActive 
                          ? 'bg-[#2D2D2D] text-white shadow-xs' 
                          : 'text-[#2D2D2D] bg-white/60 border border-[#E8E0E3] hover:bg-[#FCE4EC]'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ArrowUpRight className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#8E8E8E]'}`} />
                    </button>
                  );
                })}

                <div className="pt-4 border-t border-[#E8E0E3] flex flex-col gap-2.5 mt-2">
                  <button
                    id="mobile-resume-btn"
                    onClick={() => { setMobileMenuOpen(false); onOpenResume(); }}
                    className="w-full py-3.5 rounded-full text-xs uppercase tracking-widest font-semibold text-[#2D2D2D] bg-white border border-[#2D2D2D] flex items-center justify-center gap-2 shadow-xs min-h-[44px]"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Lihat CV Lengkap</span>
                  </button>
                  <button
                    id="mobile-contact-btn"
                    onClick={() => { setMobileMenuOpen(false); onOpenContact(); }}
                    className="w-full py-3.5 rounded-full text-xs uppercase tracking-widest font-semibold text-white bg-[#2D2D2D] hover:bg-[#F8BBD0] hover:text-[#2D2D2D] flex items-center justify-center gap-2 shadow-xs transition-all min-h-[44px]"
                  >
                    <Send className="w-4 h-4" />
                    <span>Say Hello & Kontak Langsung</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};


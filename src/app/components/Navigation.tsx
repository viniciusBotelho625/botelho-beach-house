"use client";

import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "@radix-ui/react-select";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const Navigation = () => {
  const [hasBackground, setHasBackground] = useState(false);
  const [currentLang, setCurrentLang] = useState('pt');
  const { i18n, t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      // Detecta quando passa da primeira seção (Hero)
      // A primeira seção geralmente tem altura de 100vh
      const scrollPosition = window.scrollY;
      const heroHeight = window.innerHeight;

      setHasBackground(scrollPosition > heroHeight * 0.8);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Verifica na montagem inicial

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Atualiza o idioma atual quando mudar
  useEffect(() => {
    setCurrentLang(i18n.language || 'pt');
    
    const handleLanguageChange = (lng: string) => {
      setCurrentLang(lng);
    };
    
    i18n.on('languageChanged', handleLanguageChange);
    
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  // Função para trocar o idioma
  const changeLanguage = (lng: string) => {
    console.log('Changing language to:', lng);
    i18n.changeLanguage(lng).then(() => {
      console.log('Language changed successfully to:', lng);
      setCurrentLang(lng);
    });
  };

  // Verifica qual é o idioma atual
  const currentLanguage = currentLang;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-6 transition-all duration-300 ${
        hasBackground
          ? "bg-[#002b36]/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">
          <Button
            variant="ghost"
            size="sm"
            className="text-white/90 hover:text-white hover:bg-white/10 gap-1 sm:gap-2 p-2 sm:p-2"
          >
            <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-xs sm:text-sm font-light tracking-wider uppercase hidden xs:inline">
              Menu
            </span>
          </Button>
          <Separator className="h-4 sm:h-5 bg-white/10 hidden sm:block" />
          <div className="flex items-center gap-3 sm:gap-6 text-white/80 text-xs sm:text-sm font-light">
            <button 
              onClick={() => changeLanguage('pt')}
              className={`hover:text-white transition-colors ${
                currentLanguage === 'pt' ? 'text-white font-semibold' : ''
              }`}
            >
              PT
            </button>
            <span className="text-white/40">|</span>
            <button 
              onClick={() => changeLanguage('en')}
              className={`hover:text-white transition-colors ${
                currentLanguage === 'en' ? 'text-white font-semibold' : ''
              }`}
            >
              EN
            </button>
          </div>
        </div>

        <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-sm sm:text-lg lg:text-2xl font-light tracking-[0.2em] sm:tracking-[0.3em] italic hidden sm:block">
          Botelho Beach House
        </h1>

        <div className="flex items-center gap-4 sm:gap-8">
          <button className="text-white/90 hover:text-white text-xs sm:text-sm font-light tracking-wider uppercase transition-colors">
            {t('nav.contact')}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

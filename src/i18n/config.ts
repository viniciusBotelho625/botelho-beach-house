import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Detecta o idioma do navegador ou usa o salvo no localStorage
const getInitialLanguage = () => {
  if (typeof window !== "undefined") {
    const savedLang = localStorage.getItem("i18nextLng");
    if (savedLang) return savedLang;

    const browserLang = navigator.language.split("-")[0];
    return ["pt", "en"].includes(browserLang) ? browserLang : "pt";
  }
  return "pt";
};

// Traduções
const resources = {
  pt: {
    translation: {
      nav: {
        home: "Início",
        about: "Sobre",
        amenities: "Comodidades",
        photos: "Fotos",
        reviews: "Avaliações",
        contact: "Contato",
      },
      hero: {
        title: "Explore Sua Casa de Praia",
        subtitle: "dos Sonhos",
        data: "Selecionar as datas",
        guests: "Selecionar hóspedes",
        guestSingular: "hóspede",
        guestPlural: "hóspedes",
        dataLabel: "Datas",
        guestsLabel: "Hóspedes",
        buttonNext: "Próximo",
        adults: "Adultos",
        children: "Crianças",
        babies: "Bebês",
        animals: "Animais",
        confirm: "Confirmar",
      },
      amenities: {
        title: "Comodidades",
        subtitle: "Tudo para seu Conforto",
        pool: "Piscina Privativa",
        poolDesc: "Piscina com LED",
        bbq: "Churrasqueira",
        bbqDesc: "Área gourmet completa",
        wifi: "Wi-Fi Rápido",
        wifiDesc: "Internet de alta velocidade",
        parking: "Estacionamento",
        parkingDesc: "Garagem privativa para 3 veículos",
        ac: "Ventilador de teto",
        acDesc: "Ventiladores de teto nos quartos e sala",
        kitchen: "Cozinha Completa",
        kitchenDesc: "Todos os utensílios necessários",
        tv: "Smart TV",
        tvDesc: "Diversos canais e Netflix para entretenimento em família",
        security: "Segurança 24h",
        securityDesc:
          "Sistema de monitoramento com câmeras de segurança externa e cerca elétrica",
      },
      photos: {
        title: "Galeria de Fotos",
        subtitle: "Conheça Nossa Casa",
      },
      places: {
        title: "Pontos Turísticos",
        subtitle: "Belas praias e rica cultura a poucos minutos de distância",
      },
      reviews: {
        title: "Depoimentos",
        subtitle: "O Que Nossos Hóspedes Dizem",
        based: "Baseado em",
        reviews_count: "avaliações",
        verified: "Avaliações verificadas no Google",
        viewAll: "Ver Todas as Avaliações",
        google: "Google",
        airbnb: "Airbnb",
        loading: "Carregando avaliações do Google...",
        offline: "Avaliações em modo offline",
      },
      footer: {
        rights: "Todos os direitos reservados",
        contact: "Entre em contato",
      },
    },
  },
  en: {
    translation: {
      nav: {
        home: "Home",
        about: "About",
        amenities: "Amenities",
        photos: "Photos",
        reviews: "Reviews",
        contact: "Contact",
      },
      hero: {
        title: "Explore Your Dream",
        subtitle: "Beach House",
        data: "Select the dates",
        guests: "Select guests",
        guest_singular: "guest",
        guest_plural: "guests",
        dataLabel: "Dates",
        guestsLabel: "Guests",
        buttonNext: "Next",
        adults: "Adults",
        children: "Children",
        babies: "Babies",
        animals: "Animals",
        confirm: "Confirm",
      },
      amenities: {
        title: "Amenities",
        subtitle: "Everything for Your Comfort",
        pool: "Private Pool",
        poolDesc: "Led poll",
        bbq: "Barbecue",
        bbqDesc: "Complete gourmet area",
        wifi: "Fast Wi-Fi",
        wifiDesc: "High-speed internet",
        parking: "Parking",
        parkingDesc: "Private garage for 3 vehicles",
        ac: "Ceiling fans",
        acDesc: "Ceiling fans in bedrooms and living room",
        kitchen: "Full Kitchen",
        kitchenDesc: "All necessary utensils",
        tv: "Smart TV",
        tvDesc: "Various channels and Netflix for family entertainment",
        security: "Security 24h",
        securityDesc:
          "Monitoring system with external security cameras and electric fence",
      },
      photos: {
        title: "Photo Gallery",
        subtitle: "Discover Our House",
      },
      places: {
        title: "Tourist Places",
        subtitle: "Beautiful Beaches and Rich Culture a Few Minutes Away",
      },
      reviews: {
        title: "Testimonials",
        subtitle: "What Our Guests Say",
        based: "Based on",
        reviews_count: "reviews",
        verified: "Verified reviews on Google",
        viewAll: "View All Reviews",
        google: "Google",
        airbnb: "Airbnb",
        loading: "Loading Google reviews...",
        offline: "Reviews in offline mode",
      },
      footer: {
        rights: "All rights reserved",
        contact: "Get in touch",
      },
    },
  },
};

i18n
  .use(initReactI18next) // Integra com React
  .init({
    resources,
    fallbackLng: "pt", // Idioma padrão
    lng: getInitialLanguage(), // Idioma inicial detectado
    interpolation: {
      escapeValue: false, // React já protege contra XSS
    },
  });

// Salva a escolha do idioma no localStorage quando mudar
i18n.on("languageChanged", (lng) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("i18nextLng", lng);
  }
});

export default i18n;

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
        guest_singular: "hóspede",
        guest_plural: "hóspedes",
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
        poolDesc:
          "Aproveite uma piscina exclusiva com iluminação LED moderna, perfeita para relaxar a qualquer hora do dia ou da noite.",
        bbq: "Churrasqueira",
        bbqDesc:
          "Espaço gourmet completo com churrasqueira e bancada, ideal para preparar refeições especiais em família e amigos.",
        wifi: "Wi-Fi Rápido",
        wifiDesc:
          "Conexão de fibra óptica de alta velocidade em toda a propriedade, garantindo estabilidade para trabalho ou lazer.",
        parking: "Estacionamento",
        parkingDesc:
          "Garagem privativa e segura com capacidade para até 3 veículos, oferecendo total praticidade durante sua estadia.",
        ac: "Ventilação",
        acDesc:
          "Ventiladores de teto de alta performance instalados em todos os quartos e na sala para garantir conforto térmico ideal.",
        kitchen: "Cozinha Completa",
        kitchenDesc:
          "Equipada com geladeira, cooktop e todos os utensílios necessários para o preparo prático de suas refeições favoritas.",
        tv: "Smart TV",
        tvDesc:
          'Smart TV de 50" com acesso a diversos canais e plataformas de streaming como Netflix para sua diversão em família.',
        security: "Segurança 24h",
        securityDesc:
          "Propriedade monitorada por câmeras externas e protegida por cerca elétrica, garantindo total paz de espírito aos hóspedes.",
      },
      photos: {
        galleryLabel: "GALERIA",
        sectionTitle: "Explore Nossa",
        sectionTitleHighlight: "Casa de Praia",
        sectionDescription: "Descubra cada detalhe dos nossos espaços",
        title: "Galeria de Fotos",
        subtitle: "Conheça Nossa Casa",
        cards: {
          pool: {
            title: "Piscina",
            desc: "Piscina privativa de 5m com iluminação LED e área de descanso lateral. O local perfeito para relaxar sob o sol com total privacidade.",
          },
          decoration: {
            title: "Decoração",
            desc: "Ambiente instagramável unindo jardim artificial e iluminação RGB. O cenário ideal para garantir as melhores fotos de suas férias.",
          },
          external: {
            title: "Área Externa",
            desc: "Espaço amplo com piscina e cascata relaxante. Planejado para proporcionar momentos de lazer inesquecíveis em família.",
          },
          lateral: {
            title: "Privacidade",
            desc: "Casa de esquina garantindo maior ventilação e privacidade. Segurança total com câmeras 24h e monitoramento perimetral.",
          },
          garage: {
            title: "Garagem",
            desc: "Estacionamento privativo com 3 vagas seguras. Tranquilidade para guardar seus veículos dentro da propriedade durante a estadia.",
          },
          living: {
            title: "Sala de Estar",
            desc: 'Sala aconchegante com Smart TV de 50" e sofá-cama. Ambiente integrado perfeito para relaxar após um dia intenso de praia.',
          },
          gourmet: {
            title: "Espaço Gourmet",
            desc: "Área de churrasco equipada e integrada ao lazer. Tudo o que você precisa para preparar almoços especiais ao lado da piscina.",
          },
          kitchen: {
            title: "Cozinha",
            desc: "Cozinha funcional com geladeira, cooktop e utensílios completos. Praticidade total para preparar desde o café até jantares elaborados.",
          },
          bathroom: {
            title: "Banheiros",
            desc: "Casa com 2 banheiros modernos e lavabo social. Equipados com água quente e chuveiros de alta pressão para seu total conforto.",
          },
          room1: {
            title: "Quarto 1",
            desc: "Suíte master versátil com 1 cama de casal e 2 de solteiro. Conforto térmico garantido com ventilador de teto silencioso.",
          },
          room2: {
            title: "Quarto 2",
            desc: "Segunda suíte privativa com acomodações flexíveis e ótima iluminação. O refúgio ideal para uma noite de sono restauradora.",
          },
        },
      },
      places: {
        title: "Pontos Turísticos",
        subtitle: "Belas praias e rica cultura a poucos minutos de distância",
        dragHint: "Arraste para explorar os pontos turísticos da região",
        items: {
          camaAnchieta: "Cama de Anchieta",
          passarelaAnchieta: "Passarela de Anchieta",
          praiaCibratel: "Praia Cibratel",
          morroParanambuco: "Morro do Paranambuco",
          mulheresAreia: "Estátua Mulheres de Areia",
          centrinho: "Centrinho da Cidade",
          praiaSuarao: "Praia do Suarão",
          praiaSonho: "Praia do Sonho",
        },
      },
      reviews: {
        sectionLabel: "DEPOIMENTOS",
        title: "Depoimentos",
        subtitle: "O Que Nossos Hóspedes Dizem",
        titlePrefix: "O Que Nossos ",
        titleHighlight: "Hóspedes Dizem",
        introBefore: "Exibindo as ",
        introAfter: " avaliações mais recentes",
        based: "Baseado em",
        reviewsCount: "avaliações",
        reviews_count: "avaliações",
        verified: "Avaliações verificadas no Google",
        viewAll: "Ver Todas as Avaliações",
        viewMoreOnAirbnb: "Veja todas no Airbnb",
        google: "Google",
        airbnb: "Airbnb",
        loading: "Carregando avaliações do Google...",
        offline: "Avaliações em modo offline",
      },
      footer: {
        tagline:
          "Sua casa de praia dos sonhos com piscina privativa, vista para o mar e todas as comodidades para férias inesquecíveis.",
        quickLinks: "Links Rápidos",
        home: "Início",
        photos: "Fotos",
        amenities: "Comodidades",
        reviews: "Avaliações",
        reserve: "Reservar",
        contact: "Entre em contato",
        hours: "Horários",
        checkIn: "Check-in",
        checkOut: "Check-out",
        serviceHours: "Atendimento",
        serviceNote:
          "Respondemos em até 2 horas durante o horário de atendimento",
        rights: "Todos os direitos reservados",
        madeWith: "Feito com",
        madeWithLove: "para suas férias perfeitas",
      },
      reservation: {
        rotating1: "Solicite",
        rotating2: "Agora Mesmo",
        rotating3: "Seu Orçamento",
        subtitle:
          "Reserve sua estadia dos sonhos e aproveite momentos inesquecíveis à beira-mar",
        formTitle: "Reserve sua",
        formTitleHighlight: "Experiência",
        formSubtitle:
          "Preencha o formulário e receba seu orçamento personalizado em instantes via WhatsApp.",
        checkIn: "Entrada",
        checkOut: "Saída",
        guests: "Hóspedes",
        checkInTime: "Horário de Entrada",
        selectPlaceholder: "Selecione",
        timePlaceholder: "Selecione o horário",
        morning: "Manhã (09:00 - 12:00)",
        evening: "Noite (18:00 - 22:00)",
        yourName: "Seu Nome",
        namePlaceholder: "Digite seu nome",
        guestsPlaceholder: "Quantidade",
        submit: "Solicitar Orçamento",
        whatsappNote: "Você será redirecionado para o WhatsApp",
        whatsappMessage: "Olá! Gostaria de solicitar um orçamento",
        messageName: "Nome",
        messageCheckIn: "Data de entrada",
        messageCheckOut: "Data de saída",
        messageTime: "Horário de entrada",
        messageGuests: "Hóspedes",
      },
      gallery: {
        prev: "Anterior",
        next: "Próximo",
      },
      dock: {
        home: "Home",
        calendar: "Calendário",
        photos: "Fotos",
        reviews: "Avaliações",
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
        poolDesc:
          "Enjoy an exclusive pool with modern LED lighting, perfect for relaxing at any time of the day or night.",
        bbq: "Barbecue Area",
        bbqDesc:
          "Complete gourmet space with barbecue and counter, ideal for preparing special meals with family and friends.",
        wifi: "Fast Wi-Fi",
        wifiDesc:
          "High-speed fiber optic connection throughout the property, ensuring stability for work or leisure.",
        parking: "Parking",
        parkingDesc:
          "Secure private garage with capacity for up to 3 vehicles, offering full convenience during your stay.",
        ac: "Ventilation",
        acDesc:
          "High-performance ceiling fans installed in all bedrooms and the living room to ensure ideal thermal comfort.",
        kitchen: "Full Kitchen",
        kitchenDesc:
          "Equipped with refrigerator, cooktop, and all necessary utensils for the practical preparation of your favorite meals.",
        tv: "Smart TV",
        tvDesc:
          '50" Smart TV with access to various channels and streaming platforms like Netflix for your family fun.',
        security: "24h Security",
        securityDesc:
          "Property monitored by external cameras and protected by electric fencing, ensuring peace of mind for all guests.",
      },
      photos: {
        galleryLabel: "GALLERY",
        sectionTitle: "Explore Our",
        sectionTitleHighlight: "Beach House",
        sectionDescription: "Discover every detail of our spaces",
        title: "Photo Gallery",
        subtitle: "Discover Our House",
        cards: {
          pool: {
            title: "Pool",
            desc: "Private 5m pool with LED lighting and lateral lounge area. The perfect spot to relax under the sun with total privacy.",
          },
          decoration: {
            title: "Decoration",
            desc: "Instagrammable setting combining artificial garden and RGB lighting. The ideal scenery for your best vacation photos.",
          },
          external: {
            title: "Outdoor Area",
            desc: "Spacious area with pool and a relaxing waterfall. Designed to provide unforgettable family leisure moments during your stay.",
          },
          lateral: {
            title: "Privacy",
            desc: "Corner house ensuring better ventilation and privacy. Total security with 24h cameras and perimeter monitoring.",
          },
          garage: {
            title: "Garage",
            desc: "Private parking with 3 secure spaces. Peace of mind keeping your vehicles inside the property throughout your visit.",
          },
          living: {
            title: "Living Room",
            desc: 'Cozy living room with 50" Smart TV and sofa bed. Integrated environment perfect for relaxing after a long day at the beach.',
          },
          gourmet: {
            title: "Gourmet Space",
            desc: "Equipped barbecue area integrated with leisure facilities. Everything you need for special lunches by the pool.",
          },
          kitchen: {
            title: "Kitchen",
            desc: "Functional kitchen with fridge, cooktop, and full utensils. Practical setup for everything from breakfast to dinner.",
          },
          bathroom: {
            title: "Bathrooms",
            desc: "House with 2 modern bathrooms and a social powder room. Equipped with hot water and high-pressure showers for comfort.",
          },
          room1: {
            title: "Bedroom 1",
            desc: "Versatile master suite with 1 double and 2 single beds. Thermal comfort guaranteed with a quiet ceiling fan.",
          },
          room2: {
            title: "Bedroom 2",
            desc: "Second private suite with flexible accommodations and great lighting. The ideal refuge for a restorative night's sleep.",
          },
        },
      },
      places: {
        title: "Tourist Places",
        subtitle: "Beautiful Beaches and Rich Culture a Few Minutes Away",
        dragHint: "Drag to explore the region's tourist spots",
        items: {
          camaAnchieta: "Cama de Anchieta",
          passarelaAnchieta: "Anchieta Boardwalk",
          praiaCibratel: "Cibratel Beach",
          morroParanambuco: "Morro do Paranambuco",
          mulheresAreia: "Mulheres de Areia Statue",
          centrinho: "Downtown",
          praiaSuarao: "Suarão Beach",
          praiaSonho: "Praia do Sonho",
        },
      },
      reviews: {
        sectionLabel: "TESTIMONIALS",
        title: "Testimonials",
        subtitle: "What Our Guests Say",
        titlePrefix: "What Our ",
        titleHighlight: "Guests Say",
        introBefore: "showing ",
        introAfter: " the most recent reviews",
        based: "Based on",
        reviewsCount: "reviews",
        reviews_count: "reviews",
        verified: "Verified reviews on Google",
        viewAll: "View All Reviews",
        viewMoreOnAirbnb: "View more on Airbnb",
        google: "Google",
        airbnb: "Airbnb",
        loading: "Loading Google reviews...",
        offline: "Reviews in offline mode",
      },
      footer: {
        tagline:
          "Your dream beach house with private pool, sea view and all the comforts for an unforgettable vacation.",
        quickLinks: "Quick Links",
        home: "Home",
        photos: "Photos",
        amenities: "Amenities",
        reviews: "Reviews",
        reserve: "Reserve",
        contact: "Get in touch",
        hours: "Hours",
        checkIn: "Check-in",
        checkOut: "Check-out",
        serviceHours: "Service",
        serviceNote: "We reply within 2 hours during service hours",
        rights: "All rights reserved",
        madeWith: "Made with",
        madeWithLove: "for your perfect vacation",
      },
      reservation: {
        rotating1: "Request",
        rotating2: "Right Now",
        rotating3: "Your Quote",
        subtitle:
          "Book your dream stay and enjoy unforgettable moments by the sea",
        formTitle: "Book your",
        formTitleHighlight: "Experience",
        formSubtitle:
          "Fill out the form and get your personalized quote via WhatsApp in minutes.",
        checkIn: "Check-in",
        checkOut: "Check-out",
        guests: "Guests",
        checkInTime: "Check-in Time",
        selectPlaceholder: "Select",
        timePlaceholder: "Select time",
        morning: "Morning (09:00 - 12:00)",
        evening: "Evening (18:00 - 22:00)",
        yourName: "Your Name",
        namePlaceholder: "Enter your name",
        guestsPlaceholder: "Quantity",
        submit: "Request Quote",
        whatsappNote: "You will be redirected to WhatsApp",
        whatsappMessage: "Hi! I would like to request a quote",
        messageName: "Name",
        messageCheckIn: "Check-in date",
        messageCheckOut: "Check-out date",
        messageTime: "Check-in time",
        messageGuests: "Guests",
      },
      gallery: {
        prev: "Previous",
        next: "Next",
      },
      dock: {
        home: "Home",
        calendar: "Calendar",
        photos: "Photos",
        reviews: "Reviews",
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

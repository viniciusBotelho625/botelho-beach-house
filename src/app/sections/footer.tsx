"use client";

import { t } from "i18next";
import { Instagram, Mail, Phone, MapPin, Heart, Waves } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#105c74] text-white overflow-hidden">
      <div className="absolute top-0 left-0 right-0 w-full h-20 overflow-hidden">
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,0 L0,40 C240,0 480,80 720,40 C960,0 1200,80 1440,40 L1440,0 Z"
            fill="#ffffff"
          />
          <path
            d="M0,0 L0,50 C240,10 480,90 720,50 C960,10 1200,90 1440,50 L1440,0 Z"
            fill="#ffffff"
            opacity="0.7"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-6 sm:pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-8 sm:mb-12">
          <div className="space-y-4">
            <img
              src="/logo_beach_house.png"
              alt="Botelho Beach House"
              className="w-28 mb-2"
            />
            <h2 className="text-2xl font-bold text-[#3fbbd0] mb-3">
              Botelho Beach House
            </h2>
            <p className="text-white/90 leading-relaxed text-sm">
              Sua casa de praia dos sonhos com piscina privativa, vista para o
              mar e todas as comodidades para férias inesquecíveis.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4">Links Rápidos</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#inicio"
                  className="text-white/90 hover:text-white transition-colors duration-300 text-sm"
                >
                  Início
                </a>
              </li>
              <li>
                <a
                  href="#fotos"
                  className="text-white/90 hover:text-white transition-colors duration-300 text-sm"
                >
                  Fotos
                </a>
              </li>
              <li>
                <a
                  href="#comodidades"
                  className="text-white/90 hover:text-white transition-colors duration-300 text-sm"
                >
                  Comodidades
                </a>
              </li>
              <li>
                <a
                  href="#avaliacoes"
                  className="text-white/90 hover:text-white transition-colors duration-300 text-sm"
                >
                  Avaliações
                </a>
              </li>
              <li>
                <a
                  href="#reservar"
                  className="text-white/90 hover:text-white transition-colors duration-300 text-sm"
                >
                  Reservar
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4">
              {t("footer.contact")}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-white/90 text-sm">
                <Phone className="h-5 w-5 mt-0.5 flex-shrink-0 text-white" />
                <a
                  href="tel:+5511934905837"
                  className="hover:text-white transition-colors duration-300"
                >
                  (11) 93490-5837
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/90 text-sm">
                <Mail className="h-5 w-5 mt-0.5 flex-shrink-0 text-white" />
                <a
                  href="mailto:beachhousepix@gmail.com"
                  className="hover:text-white transition-colors duration-300"
                >
                  beachhousepix@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/90 text-sm">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0 text-white" />
                <span>
                  Praia Itanhaém
                  <br />
                  Litoral Sul, SP
                </span>
              </li>
              <li className="flex items-start gap-3 text-white/90 text-sm">
                <Instagram className="h-5 w-5 text-white" />
                <a
                  href="https://www.instagram.com/botelhobeachhouse?igsh=ejd2cDd6ZmhrZmN0&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors duration-300"
                >
                  @botelhobeachhouse
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4">Horários</h3>
            <ul className="space-y-3 text-white/90 text-sm">
              <li>
                Check-in: <span className="text-[#3fbbd0]">09:00</span>
              </li>
              <li>
                Check-out: <span className="text-[#3fbbd0]">16:00</span>
              </li>
              <li>
                Atendimento: <span className="text-[#3fbbd0]">8h - 22h</span>
              </li>
            </ul>
            <div className="mt-6 bg-[#3fbbd0]/20 rounded-lg p-4 border border-[#3fbbd0]/30">
              <p className="text-white text-sm leading-relaxed">
                Respondemos em até 2 horas durante o horário de atendimento
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 sm:pt-8 mt-6 sm:mt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
            <p className="text-white/80 text-xs sm:text-sm text-center sm:text-left">
              © {currentYear} Botelho Beach House. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-1.5 sm:gap-2 text-white/80 text-xs sm:text-sm">
              <span>Feito com</span>
              <Heart className="h-3 w-3 sm:h-4 sm:w-4 text-[#3fbbd0] fill-[#3fbbd0]" />
              <span>para suas férias perfeitas</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

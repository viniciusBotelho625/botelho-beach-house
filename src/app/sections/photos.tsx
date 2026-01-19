"use client";

import { LayoutGrid, Card } from "../components/ui/gallery";
import { useState } from "react";

export default function Photos() {
  const [showAll, setShowAll] = useState(false);
  
  const allCards: Card[] = [
    {
      id: 1,
      content: (
        <div className="w-full h-full flex flex-col md:flex-row gap-4 sm:gap-6 items-center justify-center p-4 sm:p-6 md:p-8">
          <div className="flex-1 space-y-3 sm:space-y-4">
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-4">
              Piscina Principal
            </h3>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed">
              Uma piscina moderna de 5 metros, perfeita para momentos de lazer e
              tranquilidade. Design contemporâneo com acabamento premium e
              iluminação LED ambiente.
            </p>
          </div>
          <div className="flex-1 relative w-full h-[250px] sm:h-[300px] md:h-full rounded-xl overflow-hidden">
            <img
              src="https://i.postimg.cc/j5PdzP4W/Chat-GPT-Image-3-de-out-de-2025-23-43-23.png"
              alt="Piscina Principal"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>
      ),
      thumbnail:
        "https://i.postimg.cc/j5PdzP4W/Chat-GPT-Image-3-de-out-de-2025-23-43-23.png",
    },
    {
      id: 2,
      content: (
        <div className="w-full h-full flex flex-col md:flex-row gap-4 sm:gap-6 items-center justify-center p-4 sm:p-6 md:p-8">
          <div className="flex-1 space-y-3 sm:space-y-4">
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-4">
              Área Gourmet
            </h3>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed">
              Espaço completo para entretenimento com churrasqueira, forno a
              lenha e área de convivência. Ideal para reunir família e amigos
              em um ambiente sofisticado.
            </p>
          </div>
          <div className="flex-1 relative w-full h-[250px] sm:h-[300px] md:h-full rounded-xl overflow-hidden">
            <img
              src="https://i.postimg.cc/j5PdzP4W/Chat-GPT-Image-3-de-out-de-2025-23-43-23.png"
              alt="Área Gourmet"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>
      ),
      thumbnail:
        "https://i.postimg.cc/j5PdzP4W/Chat-GPT-Image-3-de-out-de-2025-23-43-23.png",
    },
    {
      id: 3,
      content: (
        <div className="w-full h-full flex flex-col md:flex-row gap-4 sm:gap-6 items-center justify-center p-4 sm:p-6 md:p-8">
          <div className="flex-1 space-y-3 sm:space-y-4">
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-4">
              Jardim Zen
            </h3>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed">
              Um refúgio de paz e harmonia com paisagismo cuidadosamente
              planejado. Vegetação tropical e iluminação estratégica criam uma
              atmosfera única de bem-estar.
            </p>
          </div>
          <div className="flex-1 relative w-full h-[250px] sm:h-[300px] md:h-full rounded-xl overflow-hidden">
            <img
              src="https://i.postimg.cc/j5PdzP4W/Chat-GPT-Image-3-de-out-de-2025-23-43-23.png"
              alt="Jardim Zen"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>
      ),
      thumbnail:
        "https://i.postimg.cc/j5PdzP4W/Chat-GPT-Image-3-de-out-de-2025-23-43-23.png",
    },
    {
      id: 4,
      content: (
        <div className="w-full h-full flex flex-col md:flex-row gap-4 sm:gap-6 items-center justify-center p-4 sm:p-6 md:p-8">
          <div className="flex-1 space-y-3 sm:space-y-4">
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-4">
              Interior da Casa
            </h3>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed">
              Ambiente interno moderno e aconchegante, com decoração
              cuidadosamente selecionada para proporcionar conforto e elegância.
            </p>
          </div>
          <div className="flex-1 relative w-full h-[250px] sm:h-[300px] md:h-full rounded-xl overflow-hidden">
            <img
              src="https://i.postimg.cc/j5PdzP4W/Chat-GPT-Image-3-de-out-de-2025-23-43-23.png"
              alt="Interior da Casa"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>
      ),
      thumbnail:
        "https://i.postimg.cc/j5PdzP4W/Chat-GPT-Image-3-de-out-de-2025-23-43-23.png",
    },
    {
      id: 5,
      content: (
        <div className="w-full h-full flex flex-col md:flex-row gap-4 sm:gap-6 items-center justify-center p-4 sm:p-6 md:p-8">
          <div className="flex-1 space-y-3 sm:space-y-4">
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-4">
              Exterior da Casa
            </h3>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed">
              Casa de esquina com 125m², perfeita para momentos de lazer e
              tranquilidade. Design contemporâneo com acabamento premium e
              iluminação LED ambiente.
            </p>
          </div>
          <div className="flex-1 relative w-full h-[250px] sm:h-[300px] md:h-full rounded-xl overflow-hidden">
            <img
              src="https://i.postimg.cc/j5PdzP4W/Chat-GPT-Image-3-de-out-de-2025-23-43-23.png"
              alt="Exterior da Casa"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>
      ),
      thumbnail:
        "https://i.postimg.cc/j5PdzP4W/Chat-GPT-Image-3-de-out-de-2025-23-43-23.png",
    },
    {
      id: 6,
      content: (
        <div className="w-full h-full flex flex-col md:flex-row gap-4 sm:gap-6 items-center justify-center p-4 sm:p-6 md:p-8">
          <div className="flex-1 space-y-3 sm:space-y-4">
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-4">
              Garagem
            </h3>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed">
              Garagem com espaço para 3 veículos, oferecendo segurança e
              comodidade para seus carros.
            </p>
          </div>
          <div className="flex-1 relative w-full h-[250px] sm:h-[300px] md:h-full rounded-xl overflow-hidden">
            <img
              src="https://i.postimg.cc/j5PdzP4W/Chat-GPT-Image-3-de-out-de-2025-23-43-23.png"
              alt="Garagem"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>
      ),
      thumbnail:
        "https://i.postimg.cc/j5PdzP4W/Chat-GPT-Image-3-de-out-de-2025-23-43-23.png",
    },
    // Additional photos (more than 6)
    {
      id: 7,
      content: (
        <div className="w-full h-full flex flex-col md:flex-row gap-4 sm:gap-6 items-center justify-center p-4 sm:p-6 md:p-8">
          <div className="flex-1 space-y-3 sm:space-y-4">
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-4">
              Sala de Estar
            </h3>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed">
              Ambiente espaçoso e confortável, ideal para relaxar e reunir a família.
            </p>
          </div>
          <div className="flex-1 relative w-full h-[250px] sm:h-[300px] md:h-full rounded-xl overflow-hidden">
            <img
              src="https://i.postimg.cc/j5PdzP4W/Chat-GPT-Image-3-de-out-de-2025-23-43-23.png"
              alt="Sala de Estar"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>
      ),
      thumbnail:
        "https://i.postimg.cc/j5PdzP4W/Chat-GPT-Image-3-de-out-de-2025-23-43-23.png",
    },
    {
      id: 8,
      content: (
        <div className="w-full h-full flex flex-col md:flex-row gap-4 sm:gap-6 items-center justify-center p-4 sm:p-6 md:p-8">
          <div className="flex-1 space-y-3 sm:space-y-4">
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-4">
              Quarto Principal
            </h3>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed">
              Quarto aconchegante com vista para o jardim, perfeito para descanso.
            </p>
          </div>
          <div className="flex-1 relative w-full h-[250px] sm:h-[300px] md:h-full rounded-xl overflow-hidden">
            <img
              src="https://i.postimg.cc/j5PdzP4W/Chat-GPT-Image-3-de-out-de-2025-23-43-23.png"
              alt="Quarto Principal"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>
      ),
      thumbnail:
        "https://i.postimg.cc/j5PdzP4W/Chat-GPT-Image-3-de-out-de-2025-23-43-23.png",
    },
  ];

  const hasMorePhotos = allCards.length > 6;

  return (
    <section className="min-h-screen py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <p className="text-xs sm:text-sm uppercase tracking-wider text-primary font-medium mb-3 sm:mb-4">
            GALERIA
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4">
            <span className="text-gray-900">Explore Nossa</span>{" "}
            <span className="text-primary">Casa de Praia</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Descubra cada detalhe dos nossos espaços cuidadosamente projetados
            para o seu conforto
          </p>
        </div>
        <LayoutGrid 
          cards={allCards}
          showMoreButton={!showAll && hasMorePhotos}
          morePhotosCount={allCards.length - 6}
          onShowMore={() => setShowAll(true)}
        />
      </div>
    </section>
  );
}

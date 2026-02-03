"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

const allCards = [
  {
    id: 1,
    content: (
      <div>
        <p className="font-bold text-2xl text-white">Piscina</p>
        <p className="font-normal text-sm text-white/80 mt-2">
          Piscina moderna de 5 metros de comprimento e 2,30m de largura com 1,40m de profundidade
        </p>
      </div>
    ),
    className: "md:col-span-2 h-[450px]",
    thumbnail:
      "https://res.cloudinary.com/dmeglebnu/image/upload/v1769216812/IMG_1612_1_qhprv6.jpg",
  },
  
  {
    id: 2,
    content: (
      <div>
        <p className="font-bold text-xl text-white">Decoração</p>
        <p className="font-normal text-sm text-white/80 mt-2">
        Piscina com jardim artificial e iluminação LED RGB para fotos incríveis.
        </p>
      </div>
    ),
    className: "col-span-1 h-[450px]",
    thumbnail:
       "https://res.cloudinary.com/dmeglebnu/image/upload/v1769216809/IMG_5910_gpu4ha.jpg",
  },
  {
    id: 3,
    content: (
      <div>
        <p className="font-bold text-xl text-white">Área Externa</p>
        <p className="font-normal text-sm text-white/80 mt-2">
          Piscina privativa com cascata
        </p>
      </div>
    ),
    className: "col-span-1 h-[450px]",
    thumbnail:
    "https://res.cloudinary.com/dmeglebnu/image/upload/v1769216809/7c7435c9-20a5-40ac-8ad4-e28a775b1954_jh50v7.jpg",
  },
  {
    id: 4,
    content: (
      <div>
        <p className="font-bold text-xl text-white">Vista Lateral</p>
        <p className="font-normal text-sm text-white/80 mt-2">
          Casa de esquina equipada com cerca elétrica e câmeras de segurança.
        </p>
      </div>
    ),
    className: "md:col-span-2 h-[450px]",
    thumbnail:
      "https://res.cloudinary.com/dmeglebnu/image/upload/v1769216811/IMG_7277_gtecis.jpg",
  },
  {
    id: 5,
    content: (
      <div>
        <p className="font-bold text-xl text-white">Garagem</p>
        <p className="font-normal text-sm text-white/80 mt-2">
          Garagem com 3 vagas privativas e segura no local.
        </p>
      </div>
    ),
    className: "col-span-1 h-[450px]",
    thumbnail:
      "https://res.cloudinary.com/dmeglebnu/image/upload/v1769216810/IMG_3338_erzmzi.jpg",
  },
  {
    id: 6,
    content: (
      <div>
        <p className="font-bold text-xl text-white">Sala de Estar</p>
        <p className="font-normal text-sm text-white/80 mt-2">
          Sala de estar com Smart TV 50" e sofá cama para 2 pessoas.
        </p>
      </div>
    ),
    className: "col-span-1 h-[450px]",
    thumbnail:
      "https://res.cloudinary.com/dmeglebnu/image/upload/v1769216810/IMG_3345_1_z1p1ir.jpg",
  },
  {
    id: 7,
    content: (
      <div>
        <p className="font-bold text-xl text-white">Espaço Gourmet</p>
        <p className="font-normal text-sm text-white/80 mt-2">
          Espaço gourmet com churrasqueira e área de lazer para relaxar.
        </p>
      </div>
    ),
    className: "md:col-span-1 h-[450px]",
    thumbnail:
      "https://res.cloudinary.com/dmeglebnu/image/upload/v1769216813/IMG_0245_mmrvik.jpg",
  },
  {
    id: 8,
    content: (
      <div>
        <p className="font-bold text-xl text-white">Cozinha</p>
        <p className="font-normal text-sm text-white/80 mt-2">
          Cozinha com geladeira, cooktop e utensílios de cozinha para preparação de refeições.
        </p>
      </div>
    ),
    className: "col-span-1 h-[450px]",
    thumbnail:
      "https://res.cloudinary.com/dmeglebnu/image/upload/v1769216812/IMG_0663_gtlseo.jpg",
  },
  {
    id: 9,
    content: (
      <div>
        <p className="font-bold text-xl text-white">Banheiros</p>
        <p className="font-normal text-sm text-white/80 mt-2">
          Casa com 2 banheiros e 1 lavabo, equipados com água quente e chuveiro elétrico. 
        </p>
      </div>
    ),
    className: "col-span-1 h-[450px]",
    thumbnail:
      "https://res.cloudinary.com/dmeglebnu/image/upload/v1769216811/IMG_0292_u4fshf.jpg",
  },
  {
    id: 10,
    content: (
      <div>
        <p className="font-bold text-xl text-white">Quarto 1</p>
        <p className="font-normal text-sm text-white/80 mt-2">
          Quarto 1 com 2 camas de solteiro e 1 cama de casal, equipado com ar condicionado e TV 32".
        </p>
      </div>
    ),
    className: "md:col-span-1 h-[450px]",
    thumbnail:
      "https://res.cloudinary.com/dmeglebnu/image/upload/v1769216812/IMG_3195_xaddl9.jpg",
  },
];

export function Photos() {
  const [showAll, setShowAll] = useState(false);
  
  const displayCards = showAll ? allCards : allCards.slice(0, 4);
  const remainingCount = allCards.length - 4;

  return (
    <div className="min-h-screen py-20 w-full bg-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-wider text-primary font-medium mb-4">
            GALERIA
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gray-900">Explore Nossa</span>{" "}
            <span className="text-primary">Casa de Praia</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Descubra cada detalhe dos nossos espaços
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto">
          {displayCards.map((card, i) => (
            <div key={card.id} className={card.className}>
              <div className="relative overflow-hidden rounded-xl h-full group cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />
                <img
                  src={card.thumbnail}
                  alt={`Photo ${card.id}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  {card.content}
                </div>
              </div>
            </div>
          ))}
          
          {/* Show More Button Card */}
          {!showAll && remainingCount > 0 && (
            <div className="col-span-1 h-[450px]">
              <button
                onClick={() => setShowAll(true)}
                className="relative overflow-hidden rounded-xl h-full w-full group cursor-pointer"
              >
                <div className="absolute inset-0">
                  <img
                    src={allCards[4].thumbnail}
                    alt="More photos"
                    className="w-full h-full object-cover blur-sm scale-110 opacity-40"
                  />
                </div>
                <div className="absolute inset-0 bg-black/60 z-10" />
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white">
                  <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Plus className="w-10 h-10" />
                  </div>
                  <p className="text-2xl font-bold">{remainingCount}+ Fotos</p>
                  <p className="text-sm mt-2 opacity-90">Ver todas as fotos</p>
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import { AnimatedTestimonials } from "../components/ui/animated-testimonials";
import { cloudinaryOptimize } from "@/lib/utils";

const allCards = [
  {
    id: 1,
    content: (
      <div>
        <p className="font-bold text-2xl text-white">Piscina</p>
        <p className="font-normal text-sm text-white/80 mt-2">
          Piscina moderna de 5 metros de comprimento e 2,30m de largura com
          1,40m de profundidade
        </p>
      </div>
    ),
    thumbnail:
      "https://res.cloudinary.com/dmeglebnu/image/upload/v1769216812/IMG_1612_1_qhprv6.jpg",
  },

  {
    id: 2,
    content: (
      <div>
        <p className="font-bold text-xl text-white">Decoração</p>
        <p className="font-normal text-sm text-white/80 mt-2">
          Piscina com jardim artificial e iluminação LED RGB para fotos
          incríveis.
        </p>
      </div>
    ),
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
    thumbnail:
      "https://res.cloudinary.com/dmeglebnu/image/upload/v1769216813/IMG_0245_mmrvik.jpg",
  },
  {
    id: 8,
    content: (
      <div>
        <p className="font-bold text-xl text-white">Cozinha</p>
        <p className="font-normal text-sm text-white/80 mt-2">
          Cozinha com geladeira, cooktop e utensílios de cozinha para preparação
          de refeições.
        </p>
      </div>
    ),
    thumbnail:
      "https://res.cloudinary.com/dmeglebnu/image/upload/v1769216812/IMG_0663_gtlseo.jpg",
  },
  {
    id: 9,
    content: (
      <div>
        <p className="font-bold text-xl text-white">Banheiros</p>
        <p className="font-normal text-sm text-white/80 mt-2">
          Casa com 2 banheiros e 1 lavabo, equipados com água quente e chuveiro
          elétrico.
        </p>
      </div>
    ),
    thumbnail:
      "https://res.cloudinary.com/dmeglebnu/image/upload/v1769216811/IMG_0292_u4fshf.jpg",
  },
  {
    id: 10,
    content: (
      <div>
        <p className="font-bold text-xl text-white">Quarto 1</p>
        <p className="font-normal text-sm text-white/80 mt-2">
          Quarto 1 suite com 2 camas de solteiro e 1 cama de casal, equipado com
          ventilador de teto".
        </p>
      </div>
    ),
    thumbnail:
      "https://res.cloudinary.com/dmeglebnu/image/upload/v1769216812/IMG_3195_xaddl9.jpg",
  },
];

export function Photos() {
  return (
    <div className="min-h-screen py-20 w-full bg-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-wider text-primary font-medium mb-4">
            GALERIA
          </p>
          <h2 className="text-4xl md:text-5xl sm:text-2xl font-bold mb-4">
            <span className="text-gray-900">Explore Nossa</span>{" "}
            <span className="text-primary">Casa de Praia</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Descubra cada detalhe dos nossos espaços
          </p>
        </div>

        {/* Galeria Animada com Todas as Fotos */}
        <div>
          <AnimatedTestimonials
            testimonials={allCards.map((card) => {
              // Extrair texto do content
              const contentText =
                card.content.props.children[1]?.props?.children || "";
              const titleText =
                card.content.props.children[0]?.props?.children || "Ambiente";

              return {
                name: titleText,
                designation: "Botelho Beach House",
                quote: contentText,
                src: cloudinaryOptimize(card.thumbnail),
              };
            })}
            autoplay={true}
          />
        </div>
      </div>
    </div>
  );
}

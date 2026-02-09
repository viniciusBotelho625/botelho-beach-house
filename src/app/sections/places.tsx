"use client";

import { useTranslation } from "react-i18next";
import CircularGallery from "../components/CircularGallery";
import { cloudinaryOptimize } from "@/lib/utils";

const PLACES_RAW = [
  {
    image:
      "https://res.cloudinary.com/dmeglebnu/image/upload/v1770213287/Cama_de_Anchieta_-_Itanha%C3%A9m_-_SP_jqeegq.jpg",
    text: "Cama de Anchieta",
  },
  {
    image:
      "https://res.cloudinary.com/dmeglebnu/image/upload/v1770217378/WhatsApp_Image_2026-02-04_at_12.01.51_twqkqc.jpg",
    text: "Passarela de Anchieta",
  },
  {
    image:
      "https://res.cloudinary.com/dmeglebnu/image/upload/v1770213939/Itanha%C3%A9m_vxhgyn.jpg",
    text: "Praia Cibratel",
  },
  {
    image:
      "https://res.cloudinary.com/dmeglebnu/image/upload/v1770216030/unnamed_zgoims.webp",
    text: "Morro do Paranambuco",
  },
  {
    image:
      "https://res.cloudinary.com/dmeglebnu/image/upload/v1770216216/unnamed_1_h8szat.jpg",
    text: "Estátua Mulheres de Areia",
  },
  {
    image:
      "https://res.cloudinary.com/dmeglebnu/image/upload/v1770216829/unnamed_2_tskt2g.webp",
    text: "Centrinho da Cidade",
  },
  {
    image:
      "https://res.cloudinary.com/dmeglebnu/image/upload/v1770217160/Praia-do-Suarao-Itanhaem-Praiao-SP_q17x4r.jpg",
    text: "Praia do Suarão",
  },
  {
    image:
      "https://res.cloudinary.com/dmeglebnu/image/upload/v1770217379/WhatsApp_Image_2026-02-04_at_12.01.51_1_blwj9d.jpg",
    text: "Praia do Sonho",
  },
];

export function Places() {
  const { t } = useTranslation();
  const places = PLACES_RAW.map((p) => ({
    ...p,
    image: cloudinaryOptimize(p.image),
  }));

  return (
    <section className=" sm:py-16 lg:py-20 bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center py-12 max-w-3xl mx-auto">
          <p className="text-sm uppercase tracking-wider text-primary font-medium mb-4">
            {t("places.title")}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            {t("places.subtitle")}
          </h2>
        </div>

        {/* Gallery */}
        <CircularGallery
          items={places}
          bend={0.5}
          textColor="#000000"
          borderRadius={0.05}
          scrollEase={0.05}
          font=" 14px Inter, system-ui, -apple-system, sans-serif"
          scrollSpeed={1.8}
        />

        {/* Info text */}
        <div className="py-8 text-center">
          <p className="text-sm text-gray-500">
            Arraste para explorar os pontos turísticos da região
          </p>
        </div>
      </div>
    </section>
  );
}

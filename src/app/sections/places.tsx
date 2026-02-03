"use client";

import CircularGallery from "../components/CircularGallery";

export function Places() {
  const places = [
    {
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=900&h=700&fit=crop&sat=-100",
      text: "Praia de Peruíbe"
    },
    {
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=900&h=700&fit=crop&sat=-100",
      text: "Passeio de Barco"
    },
    {
      image: "https://images.unsplash.com/photo-1582719471137-c3967ffb1c42?w=900&h=700&fit=crop&sat=-100",
      text: "Ruínas do Abarebebê"
    },
    {
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&h=700&fit=crop&sat=-100",
      text: "Pôr do Sol na Praia"
    },
    {
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=900&h=700&fit=crop&sat=-100",
      text: "Trilhas e Natureza"
    },
    {
      image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=900&h=700&fit=crop&sat=-100",
      text: "Praia do Guaraú"
    },
    {
      image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=900&h=700&fit=crop&sat=-100",
      text: "Centro Histórico"
    },
    {
      image: "https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=900&h=700&fit=crop&sat=-100",
      text: "Gastronomia Local"
    },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <p className="text-xs sm:text-sm uppercase tracking-wider text-primary font-medium mb-3">
            EXPLORE
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4">
            <span className="text-gray-900">Descubra</span>{" "}
            <span className="text-primary">Pontos Turísticos</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
            Praias paradisíacas, natureza exuberante e cultura rica a poucos minutos da casa
          </p>
        </div>

        {/* Gallery */}
          <CircularGallery
            items={places}
            bend={1}
            textColor="#ffffff"
            borderRadius={0.05}
            scrollEase={0.05}
            font="bold 18px sans-serif"
            scrollSpeed={1.8}
          />

        {/* Info text */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Arraste para explorar os pontos turísticos da região
          </p>
        </div>
      </div>
    </section>
  );
}

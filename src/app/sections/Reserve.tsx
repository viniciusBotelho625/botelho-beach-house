"use client";

import RotatingText from "@/app/components/RotatingText";
import ReservationForm from "../components/ReservationForm";

export function Reserve() {
  return (
    <section
      className="min-h-screen min-h-dvh flex items-center justify-center px-4 py-8 sm:px-6 sm:py-12"
      style={{
        background:
          "linear-gradient(180deg, hsl(200 60% 12%) 0%, hsl(200 40% 15%) 50%, hsl(200 50% 18%) 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="w-full max-w-4xl mx-auto">
          <div className="text-center mb-6 sm:mb-8 animate-fade-up">
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white mb-2 sm:mb-3 leading-tight">
              <RotatingText
                texts={["Solicite", "Agora Mesmo", "Seu Orçamento"]}
                mainClassName="inline-block text-white"
                elementLevelClassName="text-white"
                rotationInterval={3000}
                splitBy="words"
              />
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-white/80 max-w-xl mx-auto px-1">
              Reserve sua estadia dos sonhos e aproveite momentos inesquecíveis
              à beira-mar
            </p>
          </div>

          <ReservationForm />
        </div>
      </div>
    </section>
  );
}

"use client";

import { Suspense } from "react";
import RotatingText from "@/app/components/RotatingText";
import ReservationForm from "../components/ReservationForm";
import { useTranslation } from "react-i18next";

export function Reservation() {
  const { t } = useTranslation();

  return (
    <section
      id="reservation"
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
                texts={[t("reservation.rotating1"), t("reservation.rotating2"), t("reservation.rotating3")]}
                mainClassName="inline-block text-white"
                elementLevelClassName="text-white"
                rotationInterval={3000}
                splitBy="words"
              />
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-white/80 max-w-xl mx-auto px-1">
              {t("reservation.subtitle")}
            </p>
          </div>

          <Suspense
            fallback={
              <div className="reservation-card p-4 sm:p-6 md:p-10 glow-accent min-h-[320px] animate-pulse rounded-lg bg-white/5" />
            }
          >
            <ReservationForm />
          </Suspense>
        </div>
      </div>
    </section>
  );
}

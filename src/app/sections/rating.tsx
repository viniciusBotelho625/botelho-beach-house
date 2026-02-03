"use client";

import { InfiniteMovingCards } from "@/app/components/ui/infinite-moving-cards";
import { Star, ExternalLink } from "lucide-react";
import CountUp from "@/app/components/ui/count-up";
import { useGoogleReviews } from "@/hooks/useGoogleReviews";
import Link from "next/link";

const GOOGLE_MAPS_LINK =
  "https://www.google.com/maps/place/Botelho+Beach+House/@-24.1381194,-46.7260795,17z/data=!4m8!3m7!1s0x94ce2900572eff73:0x6602e03209e3f4ff!8m2!3d-24.1381194!4d-46.7235046!9m1!1b1!16s%2Fg%2F11m75w7jmy?entry=ttu&g_ep=EgoyMDI2MDEyOC4wIKXMDSoASAFQAw%3D%3D";
const AIRBNB_LINK =
  "https://www.airbnb.com.br/rooms/1358899180534366297/reviews?photo_id=2091219424&source_impression_id=p3_1769961819_P385MsgB7dN0kRLw&previous_page_section_name=1000";

export function Rating() {
  const {
    reviews,
    rating,
    totalReviews,
    googleRating,
    googleTotal,
    airbnbRating,
    airbnbTotal,
    isLoading,
    error,
  } = useGoogleReviews();

  return (
    <div className="min-h-[40rem] rounded-md flex flex-col antialiased items-center justify-center relative overflow-hidden bg-gray-100 py-12 sm:py-16 lg:py-20">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 mb-8 sm:mb-12">
        <div className="text-center mb-3 sm:mb-4">
          <p className="text-xs sm:text-sm uppercase tracking-wider text-blue-600 font-medium">
            DEPOIMENTOS
          </p>
        </div>

        <div className="text-center mb-3 sm:mb-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">
            <span className="text-gray-900">O Que Nossos</span>
            <span className="text-blue-600"> Hóspedes Dizem</span>
          </h2>
        </div>

        <div className="text-center mb-6 sm:mb-8">
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Mais de{" "}
            <span className="font-bold">
              <CountUp end={40} duration={2} />
            </span>{" "}
            hospedagens concluídas com sucesso. Um histórico que transmite
            segurança, credibilidade e excelência em cada estadia.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center mb-6 sm:mb-8 max-w-xs mx-auto">
          <div className="bg-white rounded-2xl shadow-xl px-2 py-4 w-full border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-amber-400 text-amber-400 stroke-amber-400"
                />
              ))}
            </div>

            <div className="flex items-baseline gap-2 justify-center mb-2">
              <span className="text-5xl font-bold text-gray-900">
                {rating.toFixed(1).replace(".", ",")}
              </span>
              <span className="text-2xl text-gray-500">/ 5.0</span>
            </div>

            <p className="text-sm text-gray-600 text-center mb-6">
              Baseado em {totalReviews} avaliações
            </p>

            {/* Estatísticas por plataforma */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
              {googleTotal > 0 && (
                <Link
                  href={GOOGLE_MAPS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-lg w-full sm:w-auto"
                >
                  <svg
                    className="w-4 h-4 flex-shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                      fill="#4285F4"
                    />
                  </svg>
                  <div className="text-left flex-1">
                    <div className="font-semibold text-blue-700 text-sm">
                      {googleRating.toFixed(1).replace(".", ",")} · Google
                    </div>
                    <div className="text-xs text-blue-600">
                      {googleTotal} avaliações
                    </div>
                  </div>
                </Link>
              )}

              {airbnbTotal > 0 && (
                <Link
                  href={AIRBNB_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 bg-pink-50 rounded-lg w-full sm:w-auto"
                >
                  <svg
                    className="w-4 h-4 flex-shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                      fill="#FF5A5F"
                    />
                  </svg>
                  <div className="text-left flex-1">
                    <div className="font-semibold text-pink-700 text-sm">
                      {airbnbRating.toFixed(1).replace(".", ",")} · Airbnb
                    </div>
                    <div className="text-xs text-pink-600">
                      {airbnbTotal} avaliações
                    </div>
                  </div>
                </Link>
              )}
            </div>
          </div>

          {error && (
            <div className="text-center text-xs text-amber-600 mt-4">
              ⚠️ Avaliações em modo offline
            </div>
          )}

          {isLoading && reviews.length === 0 && (
            <div className="text-center text-sm text-gray-500 mt-4">
              Carregando avaliações do Google...
            </div>
          )}
        </div>
      </div>

      <div className="w-full">
        <InfiniteMovingCards
          items={reviews}
          direction="right"
          speed="normal"
          pauseOnHover
        />
      </div>
    </div>
  );
}

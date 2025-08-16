"use client";

import Image from "next/image";
import HeroImage from "../../../public/hero.png";
import {
  CarFrontIcon,
  UsersIcon,
  BedSingleIcon,
  ArrowRight,
} from "lucide-react";

export function Hero() {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      <Image
        src={HeroImage}
        alt="Casa de praia Botelho Beach House"
        fill
        priority
        className="object-cover object-center"
      />

      <div className="absolute inset-0 z-10 bg-gradient-to-br from-black/60 via-black/40 to-black/20" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

      <div className="absolute inset-0 z-20 flex items-center px-12">
        <div className="container max-w-7xl">
          <div className="max-w-4xl">
            <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight mt-10">
              Botelho
              <span className="block text-orange-300">Beach House</span>
            </h1>

            <p className="text-white/90 text-md md:text-xl lg:text-2xl max-w-2xl mb-12 leading-relaxed font-light">
              Desfrute de momentos únicos em nossa casa de praia com seus amigos
              e familía.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="flex items-center gap-4 text-white bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4 border border-white/20">
                <div className="bg-orange-300/20 p-3 rounded-lg">
                  <BedSingleIcon size={24} className="text-orange-300" />
                </div>
                <div>
                  <p className="text-lg font-semibold">Quartos Confortáveis</p>
                  <p className="text-white/70 text-sm">Espaços aconchegantes</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-white bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20">
                <div className="bg-orange-300/20 p-3 rounded-lg">
                  <UsersIcon size={24} className="text-orange-300" />
                </div>
                <div>
                  <p className="text-lg font-semibold">Até 10 Pessoas</p>
                  <p className="text-white/70 text-sm">Ideal para grupos</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-white bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4 border border-white/20">
                <div className="bg-orange-300/20 p-3 rounded-lg">
                  <CarFrontIcon size={24} className="text-orange-300" />
                </div>
                <div>
                  <p className="text-lg font-semibold">3 Vagas de Garagem</p>
                  <p className="text-white/70 text-sm">
                    Estacionamento privado
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group bg-gradient-to-r from-orange-400 to-orange-500 text-white font-bold text-lg px-8 py-4 rounded-xl hover:from-orange-500 hover:to-orange-600 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-orange-500/25 min-w-[240px] flex items-center cursor-pointer">
                Ver Disponibilidade
                <span className="ml-2 group-hover:translate-x-1 transition-transform inline-block">
                  <ArrowRight />
                </span>
              </button>

              <button className="bg-white/10 backdrop-blur-sm text-white font-semibold text-lg px-8 py-4 rounded-xl border-2 border-white/30 hover:bg-white/20 hover:border-white/50 transition-all duration-300 min-w-[200px] cursor-pointer">
                Tour Virtual
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex flex-col items-center text-white/70 animate-bounce">
          <span className="text-sm mb-2">Explore mais</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

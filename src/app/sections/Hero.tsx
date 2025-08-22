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

      <div className="absolute inset-0 z-10 bg-gradient-to-br from-blue-900/70 via-blue-800/50 to-blue-600/30" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-blue-950/90 via-transparent to-transparent" />

      <div className="absolute inset-0 z-20 flex items-center px-12">
        <div className="container max-w-7xl">
          <div className="max-w-4xl">
            <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight mt-10">
              Botelho
              <span className="block text-sky-300">Beach House</span>
            </h1>

            <p className="text-white/95 text-md md:text-xl lg:text-2xl max-w-2xl mb-12 leading-relaxed font-light">
              O lugar perfeito para programar sua próxima viagem com amigos e
              família.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="flex items-center gap-4 text-white bg-white/15 backdrop-blur-md rounded-2xl px-6 py-5 border border-sky-200/30 shadow-lg hover:bg-white/20 transition-all duration-300">
                <div className="bg-sky-400/25 p-3 rounded-xl">
                  <BedSingleIcon size={24} className="text-sky-200" />
                </div>
                <div>
                  <p className="text-lg font-semibold">Quartos Confortáveis</p>
                  <p className="text-sky-100/80 text-sm">
                    Espaços aconchegantes
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-white bg-white/15 backdrop-blur-md rounded-2xl px-6 py-5 border border-sky-200/30 shadow-lg hover:bg-white/20 transition-all duration-300">
                <div className="bg-sky-400/25 p-3 rounded-xl">
                  <UsersIcon size={24} className="text-sky-200" />
                </div>
                <div>
                  <p className="text-lg font-semibold">Até 10 Pessoas</p>
                  <p className="text-sky-100/80 text-sm">Ideal para grupos</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-white bg-white/15 backdrop-blur-md rounded-2xl px-6 py-5 border border-sky-200/30 shadow-lg hover:bg-white/20 transition-all duration-300">
                <div className="bg-sky-400/25 p-3 rounded-xl">
                  <CarFrontIcon size={24} className="text-sky-200" />
                </div>
                <div>
                  <p className="text-lg font-semibold">3 Vagas de Garagem</p>
                  <p className="text-sky-100/80 text-sm">
                    Estacionamento privado
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold text-lg px-8 py-4 rounded-2xl hover:from-sky-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-sky-500/30 min-w-[240px] flex items-center justify-center cursor-pointer border border-sky-400/30">
                Ver Disponibilidade
                <span className="ml-2 group-hover:translate-x-1 transition-transform inline-block">
                  <ArrowRight />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator com tema azul */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex flex-col items-center text-sky-200/80 animate-bounce">
          <span className="text-sm mb-2 font-medium">Explore mais</span>
          <div className="w-6 h-10 border-2 border-sky-200/40 rounded-full flex justify-center bg-white/10 backdrop-blur-sm">
            <div className="w-1 h-3 bg-sky-300/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

'use client'

import Image from "next/image";
import HeroImage from "../../../public/hero.png"; 
import { CarFrontIcon, UsersIcon, BedSingleIcon } from "lucide-react";

export function Hero() {
  return (
    <section className="relative w-full h-[calc(100vh-80px)] mt-20">
      <Image
        src={HeroImage}
        alt="Casa de praia"
        fill
        priority
        className="object-cover w-full h-full opacity-85"
      />

      <div className="absolute inset-0  z-10 bg-black/50" />

        <div className="absolute inset-0 z-20 flex flex-col text-left px-6 mt-40">
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">
            Casa de Praia dos Sonhos
          </h1>
          <p className="text-white text-lg md:text-xl max-w-2xl mb-6">
            Desfrute de momentos únicos em nossa casa de praia com vista panorâmica para o mar.
            Perfeita para famílias e grupos de amigos.
          </p>

          <div className="flex gap-6 text-white mb-6">
            <div className="flex items-center gap-2">
              <BedSingleIcon size={18}/>
              <span>
                 Quartos
              </span>
            </div>
            <div className="flex items-center gap-2">
              <UsersIcon size={18} />
              <span>
                Até 10 pessoas
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CarFrontIcon />
              <span>
                3 Vagas
              </span>
            </div>
          </div>

          <button className="bg-orange-200 text-gray-800 font-semibold px-6 py-3 rounded-md hover:bg-gray-100 cursor-pointer transition w-50">
            Ver Disponibilidade
          </button>
      </div>
    </section>
  );
}

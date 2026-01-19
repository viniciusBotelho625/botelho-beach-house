"use client";

import Image from "next/image";
import heroImage from "../../../public/hero-beach-house.jpg";
import BookingWidget from "../components/BookingWidget";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/hero-beach-house.jpg"
          alt="Casa de praia ao pôr do sol"
          
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50" />
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 py-12 sm:py-15 flex flex-col items-center justify-center min-h-screen">
        <div className="flex-1 flex items-center justify-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-white font-light italic leading-tight max-w-5xl px-4">
            Explore Sua Casa
            <br />
            de Praia dos Sonhos
          </h2>
        </div>

        <div className="w-full px-4">
          <BookingWidget />
        </div>
      </div>
    </section>
  );
};

export default Hero;

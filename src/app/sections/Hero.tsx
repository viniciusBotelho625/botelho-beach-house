"use client";

import BookingWidget from "../components/BookingWidget";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/hero-beach-house.jpg"
          alt="Casa de praia ao pôr do sol"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50" />
      </div>

      <div className="relative z-10 text-center px-3 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col items-center justify-center min-h-screen w-full">
        <div className="flex-1 flex items-center justify-center mb-6 sm:mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl text-white font-light italic leading-tight max-w-5xl px-2 sm:px-4">
            Explore Sua Casa
            <br />
            de Praia dos Sonhos
          </h2>
        </div>

        <div className="w-full max-w-6xl px-2 sm:px-4">
          <BookingWidget />
        </div>
      </div>
    </section>
  );
};

export default Hero;

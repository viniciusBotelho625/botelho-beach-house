"use client";

import { Photos } from "./sections/photos";
import { Places } from "./sections/places";
import { Rating } from "./sections/rating";
import { Footer } from "./sections/footer";
import { Amenities } from "./sections/amenities";
import { Hero } from "./sections/hero";
import { Reservation } from "./sections/reservation";
import { useIsMobile } from "@/hooks/use-mobile";
import { MobileRating } from "./components/MobileRating";

export default function Home() {
  const isMobile = useIsMobile();

  return (
    <>
      <section>
        <Hero />
      </section>
      <section>
        <Photos />
      </section>
      <section>
        <Amenities />
      </section>
      <section>
        <Places />
      </section>
      <section>
        <Reservation />
      </section>
      <section>{isMobile ? <MobileRating /> : <Rating />}</section>
      <section>
        <Footer />
      </section>
    </>
  );
}

import { Amenities } from "./sections/Amenities";
import Hero from "./sections/Hero";
import { Photos } from "./sections/photos";
import { Places } from "./sections/places";
import { Rating } from "./sections/rating";
import { Reserve } from "./sections/Reserve";
import Footer from "./sections/footer";

export default function Home() {
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
        <Reserve />
      </section>
      <section>
        <Rating />
      </section>
      <section>
        <Footer />
      </section>
    </>
  );
}

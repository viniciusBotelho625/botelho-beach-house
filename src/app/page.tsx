import { Amenities } from "./sections/amenities";
import Hero from "./sections/hero";
import { Photos } from "./sections/photos";
import { Rating } from "./sections/rating";
import { Reserve } from "./sections/reserve";
import Footer from "./sections/footer";
import { Places } from "./sections/places";

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

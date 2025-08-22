import Amenities from "./sections/Amenities";
import { Hero } from "./sections/Hero";
import Reserve from "./sections/Reserve";

export default function Home() {
  return (
    <>
      <section>
        <Hero />
      </section>
      <section className="w-full bg-gray-100">
        <Reserve />
      </section>
      <section className="py-10">
        <Amenities />
      </section>
    </>
  );
}

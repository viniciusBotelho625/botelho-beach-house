import { Hero } from "./sections/Hero";
import Reserve from "./sections/Reserve";

export default function Home() {
  return (
    <>
      <section>
        <Hero />
      </section>
      <section>
        <Reserve />
      </section>
    </>
  );
}

"use client";

import { InfiniteMovingCards } from "@/app/components/ui/infinite-moving-cards";
import { Star } from "lucide-react";
import CountUp from "@/app/components/ui/count-up";

export default function InfiniteMovingCardsDemo() {
  return (
    <div className="min-h-[40rem] rounded-md flex flex-col antialiased items-center justify-center relative overflow-hidden bg-gray-100 py-12 sm:py-16 lg:py-20">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 mb-8 sm:mb-12">
        <div className="text-center mb-3 sm:mb-4">
          
          <p className="text-xs sm:text-sm uppercase tracking-wider text-primary font-medium">
            DEPOIMENTOS
          </p>
        </div>

        <div className="text-center mb-3 sm:mb-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">
            <span className="text-gray-900">O Que Nossos</span>{" "}
            <span className="text-primary">Hóspedes Dizem</span>
          </h2>
        </div>

        <div className="text-center mb-6 sm:mb-8">
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Mais de <CountUp end={100} duration={2} /> hospedagens concluídas com sucesso. Um histórico que transmite segurança, credibilidade e excelência em cada estadia.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
          <div className="flex gap-0.5 sm:gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-5 h-5 sm:w-6 sm:h-6 fill-primary text-primary stroke-amber-300 fill-amber-300"
              />
            ))}
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-bold text-gray-900">5.0</span>
            <span className="text-sm sm:text-base text-gray-600">{testimonials.length} avaliações</span>
          </div>
        </div>
      </div>

      <div className="w-full">
        <InfiniteMovingCards
          items={testimonials}
          direction="right"
          speed="normal"
          className=""
        />
      </div>
    </div>
  );
}

const testimonials = [
  {
    quote:
      "Casa incrível!! Tudo limpinho. Uns 5 minutos de carro até a praia. Anfitrião e caseira super atenciosos. Amamos passar o feriado em família. Com certeza voltaremos mais vezes. Muito obrigada 😍🫰🏻",
    name: "Gabriela Barros",
    rating: 5,
  },
  {
    quote:
      "Casa nova, bem cuidada, com área de piscina e churrasqueira impecáveis. Ambiente privativo, ideal para quem busca conforto e sossego. Vinicius é um excelente anfitrião, sempre disponível para tirar dúvidas. Sem duvidas voltarei mais vezes.",
    name: "Gilmar Monteiro",
    rating: 5,
  },
  {
    quote:
      "Ótima casa, tudo novinho! Voltarei mais vezes, eu e minha família amamos!",
    name: "Ana Maria",
    rating: 5,
  },
  {
    quote:
      "Casa impecável 😍 Atendimento excelente, vale muitooo a pena alugar e aproveitar o lazer dessa casa ❤️ Gratidão ao Vinícius por ser tão atencioso  e prestativo, alugaremos mais vezes sem duvidas!!!",
    name: "Bianca Santps",
    rating: 5,
  },
  {
    quote:
      "Anfitrião excelente, responde imediatamente a qualquer dúvida. A casa é exatamente como descrita, sem dúvidas voltarei mais vezes.",
    name: "Paloma Teles",
    rating: 5,
  },
  {
    quote:
      "Casa nova, tudo limpo e bem cuidado. Igual as fotos e o Vinicius foi prestativo o tempo todo, recomendo!!",
    name: "Leticia Vitoria",
    rating: 5,
  },
  {
    quote:
      "Casa maravilhosa, muito limpa, aconchegante e bem localizada. Espaço perfeito para relaxar e aproveitar a praia. Recomendo demais! 🌊☀️",
    name: "João Cassio ",
    rating: 5,
  },
  {
    quote:
      "A estadia superou minhas expectativas novamente , a limpeza e a organização são impecável , o ambiente super agradável. E não podemos deixa de fora o atendimento que sempre está ali pra ter dá um suporte do começo ao fim , não é minha Primeira e nem a segunda vez , e nem a última, Obrigado por tudo,vocês são 10 ❤️❤️✅✅",
    name: "Thalia Sousa",
    rating: 5,
  },
];

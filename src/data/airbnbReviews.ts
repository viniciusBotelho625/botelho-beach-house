// Avaliações do Airbnb (hardcoded)
// Atualize este arquivo com as avaliações reais do Airbnb

export interface AirbnbReview {
  quote: string;
  name: string;
  rating: number;
  date?: string;
  source: "airbnb";
}

export const airbnbReviews: AirbnbReview[] = [
  {
    quote:
      "Casa incrível!! Tudo limpinho. Uns 5 minutos de carro até a praia. Anfitrião e caseira super atenciosos. Amamos passar o feriado em família. Com certeza voltaremos mais vezes. Muito obrigada 😍🫰🏻",
    name: "Gabriela B.",
    rating: 5,
    date: "2024-12",
    source: "airbnb",
  },
  {
    quote:
      "Casa nova, bem cuidada, com área de piscina e churrasqueira impecáveis. Ambiente privativo, ideal para quem busca conforto e sossego. Vinicius é um excelente anfitrião, sempre disponível para tirar dúvidas. Sem duvidas voltarei mais vezes.",
    name: "Gilmar M.",
    rating: 5,
    date: "2024-11",
    source: "airbnb",
  },
  {
    quote:
      "Ótima casa, tudo novinho! Voltarei mais vezes, eu e minha família amamos!",
    name: "Ana M.",
    rating: 5,
    date: "2024-11",
    source: "airbnb",
  },
  {
    quote:
      "Casa impecável 😍 Atendimento excelente, vale muitooo a pena alugar e aproveitar o lazer dessa casa ❤️ Gratidão ao Vinícius por ser tão atencioso e prestativo, alugaremos mais vezes sem duvidas!!!",
    name: "Bianca S.",
    rating: 5,
    date: "2024-10",
    source: "airbnb",
  },
  {
    quote:
      "Anfitrião excelente, responde imediatamente a qualquer dúvida. A casa é exatamente como descrita, sem dúvidas voltarei mais vezes.",
    name: "Paloma T.",
    rating: 5,
    date: "2024-10",
    source: "airbnb",
  },
  {
    quote:
      "Casa nova, tudo limpo e bem cuidado. Igual as fotos e o Vinicius foi prestativo o tempo todo, recomendo!!",
    name: "Leticia V.",
    rating: 5,
    date: "2024-09",
    source: "airbnb",
  },
  {
    quote:
      "A nossa estadia foi excelente! A casa é ótima, muito espaçosa e confortável. A piscina tem um tamanho ideal para aproveitar o dia, e a churrasqueira é uma delícia — perfeita para reunir a família e os amigos. Tudo estava limpo e organizado. E tinha um espaço ideal para minha filhotinha correr a vontade! Recomendo muito e com certeza voltaria!",
    name: "Julia",
    rating: 5,
    date: "2024-09",
    source: "airbnb",
  },
  {
    quote:
      "Lugar perfeito para descansar! A casa é exatamente como nas fotos, super bem equipada e limpa. A piscina é maravilhosa e a churrasqueira é ótima. Voltaremos com certeza!",
    name: "Roberto S.",
    rating: 5,
    date: "2024-08",
    source: "airbnb",
  },
  {
    quote:
      "Experiência incrível! A casa é linda, confortável e muito bem localizada. O anfitrião foi super atencioso durante toda a estadia. Recomendo demais!",
    name: "Mariana C.",
    rating: 5,
    date: "2024-07",
    source: "airbnb",
  },
  {
    quote:
      "Casa maravilhosa, limpa e organizada, amei a comodidade. Vinicius muito atencioso e gentil",
    name: "Elliane",
    rating: 5,
    date: "2025-07",
    source: "airbnb",
  },
  {
    quote:
      "Local idêntico as fotos. Rua muito calma, local seguro. Vinicius foi muito atencioso do início ao fim da hospedagem.",
    name: "Raphaella",
    rating: 5,
    date: "2026-01",
    source: "airbnb",
  },
  {
    quote:
      "A casa correspondeu às expectativas e é fiel às fotos, atendendo muito bem às nossas necessidades. O bairro é super tranquilo, e adoramos essa sensação de paz. O Vinícius é muito atencioso e solícito, sempre respondeu prontamente e tirou todas as nossas dúvidas. Vale muito a pena a estadia",
    name: "Gicela",
    rating: 5,
    date: "2025-12",
    source: "airbnb",
  },
];

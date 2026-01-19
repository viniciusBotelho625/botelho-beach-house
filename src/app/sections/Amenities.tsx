import {
  Wifi,
  Tv,
  Car,
  Waves,
  Wind,
  Shield,
  ChefHat,
  Flame,
} from "lucide-react";
import { Card, CardContent } from "../components/ui/card";

export default function Amenities() {
  const amenities = [
    {
      id: 1,
      Icon: Wifi,
      name: "WIFI gratuito",
      description: "Internet de alta velocidade em toda a casa.",
    },
    {
      id: 2,
      Icon: Tv,
      name: "Smart TV",
      description: "Diversos canais e Netflix para entretenimento em família.",
    },
    {
      id: 3,
      Icon: Car,
      name: "Estacionamento",
      description: "3 vagas privativas e segura no local.",
    },
    {
      id: 4,
      Icon: Waves,
      name: "Piscina privativa",
      description: "Piscina com cascata e LED exclusiva.",
    },
    {
      id: 5,
      Icon: ChefHat,
      name: "Cozinha completa",
      description: "Tudo o que você precisa para preparar suas refeições.",
    },
    {
      id: 6,
      Icon: Wind,
      name: "Ventiladores",
      description: "Ventiladores nos quartos.",
    },
    {
      id: 7,
      Icon: Shield,
      name: "Segurança 24h",
      description:
        "Sistema de monitoramento com câmeras de segurança externa e cerca elétrica.",
    },
    {
      id: 8,
      Icon: Flame,
      name: "Churrasqueira",
      description: "Área gourmet com churrasqueira",
    },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4 font-serif">
            Comodidades
          </h2>
          <div className="w-16 sm:w-24 h-1 bg-gradient-ocean mx-auto rounded-full" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {amenities.map((item) => {
            const Icon = item.Icon;
            return (
              <Card
                key={item.id}
                className="border-0 shadow-sm bg-white hover:shadow-md rounded-xl group relative overflow-hidden  backdrop-blur-sm hover:shadow-glow transition-all duration-500 hover:-translate-y-2 cursor-default"
              >
                <div className="absolute inset-0 bg-gradient-ocean opacity-0 group-hover:opacity-5 transition-opacity duration-500" />

                <CardContent className="pt-8 pb-6 px-6 text-center relative">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-ocean mx-auto flex items-center justify-center mb-6 shadow-soft group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                    <span className="text-primary-foreground">
                      <Icon className="text-white" size={30} />
                    </span>
                  </div>

                  <h3 className="font-semibold text-lg text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    {item.name}
                  </h3>

                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Car,
  Tv,
  Waves,
  Wifi,
  Wind,
  Shield,
  ChefHat,
  Heater,
} from "lucide-react";
import { ReactNode } from "react";

interface Amenities {
  id: number;
  icon: ReactNode;
  name: string;
  description: string;
}

export default function Amenities() {
  const amenities: Amenities[] = [
    {
      id: 1,
      icon: <Wifi />,
      name: "WIFI gratuito",
      description: "Internet de alta velocidade em toda a casa.",
    },
    {
      id: 2,
      icon: <Tv />,
      name: "Smart TV",
      description: "Diversos canais e Netflix para entretenimento em família.",
    },
    {
      id: 3,
      icon: <Car />,
      name: "Estacionamento",
      description: " 3 vagas privativas e segura no local.",
    },
    {
      id: 4,
      icon: <Waves />,
      name: "Piscina privativa",
      description: "Piscina com cascata e LED exclusiva.",
    },
    {
      id: 5,
      icon: <ChefHat />,
      name: "Cozinha completa",
      description: "Tudo o que você precisa para preparar suas refeições.",
    },
    {
      id: 6,
      icon: <Wind />,
      name: "Ventiladores",
      description: "Ventiladores nos quartos.",
    },
    {
      id: 7,
      icon: <Shield />,
      name: "Segurança 24h",
      description:
        "Sistema de monitoramento com câmeras de segurança externa e cerca elétrica.",
    },
    {
      id: 8,
      icon: <Heater />,
      name: "Churrasqueira",
      description: "Área gourmet com churrasqueira",
    },
  ];

  return (
    <div className="bg-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center text-gray-900 m-12">
        Comodidades
      </h2>
      <div className="grid grid-cols-4 gap-8 w-full">
        {amenities.map((item) => (
          <div key={item.id} className="flex items-start gap-4">
            <Card className="!border-0 shadow-none">
              <CardContent className="text-center">
                <div className="w-16 h-16 rounded-full bg-blue-100 mx-auto justify-center flex items-center mb-4">
                  <span className="text-blue-600">{item.icon}</span>
                </div>
                <p className="font-semibold text-gray-900 mb-2 capitalize">
                  {item.name}
                </p>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

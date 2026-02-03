"use client";

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
import { useTranslation } from "react-i18next";

export function Amenities() {
  const { t } = useTranslation();

  const amenities = [
    { id: 1, Icon: Wifi, key: "wifi", desc: "wifiDesc" },
    { id: 2, Icon: Tv, key: "tv", desc: "tvDesc" },
    { id: 3, Icon: Car, key: "parking", desc: "parkingDesc" },
    { id: 4, Icon: Waves, key: "pool", desc: "poolDesc" },
    { id: 5, Icon: ChefHat, key: "kitchen", desc: "kitchenDesc" },
    { id: 6, Icon: Wind, key: "ac", desc: "acDesc" },
    { id: 7, Icon: Shield, key: "security", desc: "securityDesc" },
    { id: 8, Icon: Flame, key: "bbq", desc: "bbqDesc" },
  ];

  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold font-serif">
            {t("amenities.title")}
          </h2>
          <p className="text-muted-foreground mt-2">
            {t("amenities.subtitle")}
          </p>
          <div className="w-24 h-1 bg-gradient-ocean mx-auto rounded-full mt-4" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {amenities.map(({ id, Icon, key, desc }) => (
            <Card key={id} className="border-0 shadow-sm bg-white rounded-xl">
              <CardContent className="pt-8 pb-6 px-6 text-center">
                <div className="w-20 h-20 rounded-2xl bg-gradient-ocean mx-auto flex items-center justify-center mb-6">
                  <Icon className="text-white" size={30} />
                </div>

                <h3 className="font-semibold text-lg mb-3">
                  {t(`amenities.${key}`)}
                </h3>

                <p className="text-muted-foreground text-sm">
                  {t(`amenities.${desc}`)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

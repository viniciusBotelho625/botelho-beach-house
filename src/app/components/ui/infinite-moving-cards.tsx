"use client";

import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";

const cn = (...classes: string[]) => classes.filter(Boolean).join(" ");

interface InfiniteMovingCardsProps {
  items: {
    quote: string;
    name: string;
    rating: number;
    source?: "google" | "airbnb";
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "slow",
  pauseOnHover = true,
  className,
}: InfiniteMovingCardsProps) => {
  const containerRef = React.useRef(null);
  const scrollerRef = React.useRef(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    addAnimation();
  }, []);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={cn(
          "w-4 h-4",
          i < rating
            ? "fill-yellow-400 text-yellow-400"
            : "fill-gray-200 text-gray-200"
        )}
      />
    ));
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const truncateText = (text: string, maxLength: number = 50) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  const gradients = [
    "from-blue-500 to-cyan-500",
    "from-purple-500 to-pink-500",
    "from-orange-500 to-red-500",
    "from-green-500 to-emerald-500",
    "from-indigo-500 to-blue-500",
    "from-pink-500 to-rose-500",
  ];

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-8xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <style jsx>{`
        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll var(--animation-duration, 40s) linear infinite
            var(--animation-direction, forwards);
        }
      `}</style>

      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-6 py-4",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
            className="relative w-[280px] sm:w-[300px] max-w-full shrink-0 rounded-xl sm:rounded-2xl border border-gray-100 p-4 sm:p-5 md:w-[360px] bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            key={`${item.name}-${idx}`}
          >
            <blockquote className="space-y-4">
              {/* Quote */}
              <div className="relative">
                <svg
                  className="absolute -top-2 -left-2 w-8 h-8 text-gray-200"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                >
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                <p className="relative z-10 text-gray-700 text-sm leading-relaxed pl-6 italic">
                  {truncateText(item.quote, 200)}
                </p>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-100"></div>

              {/* User Info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full bg-gradient-to-br flex items-center justify-center text-white font-semibold text-sm shadow-md",
                      gradients[idx % gradients.length]
                    )}
                  >
                    {getInitials(item.name)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-gray-900 text-sm">
                        {item.name}
                      </p>
                      {item.source && (
                        <span
                          className={cn(
                            "text-xs px-2 py-0.5 rounded-full font-medium",
                            item.source === "google"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-pink-100 text-pink-700"
                          )}
                        >
                          {item.source === "google" ? "Google" : "Airbnb"}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-0.5 mt-1">
                      {renderStars(item.rating)}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-gray-900">
                    {item.rating}.0
                  </div>
                  <div className="text-sm text-gray-500">de 5</div>
                </div>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function ReviewsDemo() {
  const reviews = [
    {
      quote:
        "A nossa estadia foi excelente! A casa é ótima, muito espaçosa e confortável. A piscina tem um tamanho ideal para aproveitar o dia, e a churrasqueira é uma delícia — perfeita para reunir a família e os amigos. Tudo estava limpo e organizado. E tinha um espaço ideal para minha filhotinha correr a vontade! Recomendo muito e com certeza voltaria!",
      name: "Julia",
      rating: 5,
    },
    {
      quote:
        "Muito bom! Recomendo para todos. Excelente custo-benefício e entrega rápida.",
      name: "João Santos",
      rating: 5,
    },
    {
      quote:
        "Adorei a experiência de compra. O produto chegou antes do prazo e em perfeitas condições.",
      name: "Ana Costa",
      rating: 4,
    },
    {
      quote:
        "Qualidade premium! Vale cada centavo investido. Já comprei novamente.",
      name: "Pedro Oliveira",
      rating: 5,
    },
    {
      quote:
        "Excelente! Fácil de usar e muito prático. Atendeu perfeitamente às minhas necessidades.",
      name: "Carla Mendes",
      rating: 5,
    },
    {
      quote:
        "Produto de altíssima qualidade. Estou muito satisfeito com a compra.",
      name: "Ricardo Alves",
      rating: 4,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            O que nossos clientes dizem
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Milhares de clientes satisfeitos compartilham suas experiências
          </p>
        </div>

        <InfiniteMovingCards
          items={reviews}
          direction="left"
          speed="slow"
          pauseOnHover={true}
        />
      </div>
    </div>
  );
}

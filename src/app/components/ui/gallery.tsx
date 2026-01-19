"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

export interface Card {
  id: number;
  content: React.ReactElement | React.ReactNode;
  className?: string;
  thumbnail: string;
}

interface LayoutGridProps {
  cards: Card[];
  showMoreButton?: boolean;
  morePhotosCount?: number;
  onShowMore?: () => void;
}

export const LayoutGrid = ({ 
  cards, 
  showMoreButton = false,
  morePhotosCount = 0,
  onShowMore 
}: LayoutGridProps) => {
  const [selected, setSelected] = useState<Card | null>(null);
  
  // Display only first 6 cards if showMoreButton is true, otherwise show all
  const displayCards = showMoreButton ? cards.slice(0, 6) : cards;
  const remainingCount = showMoreButton ? (cards.length - 6) : 0;

  return (
    <div className="w-full h-full p-2 sm:p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
        {displayCards.map((card, i) => {
          const isSelected = selected?.id === card.id;
          // Pattern: large-left, small-right, large-left, small-right
          const isLargeCard = i % 2 === 0;
          const colSpan = isLargeCard ? "md:col-span-2" : "md:col-span-1";
          const aspectRatio = isLargeCard ? "md:aspect-[2/1]" : "md:aspect-square";
          
          return (
            <motion.div
              key={card.id}
              onClick={() => setSelected(isSelected ? null : card)}
              className={cn(
                "relative overflow-hidden rounded-xl sm:rounded-2xl cursor-pointer",
                card.className || colSpan,
                isSelected && "fixed inset-2 sm:inset-4 z-50 md:inset-[5%]"
              )}
              layout
              transition={{
                layout: { duration: 0.3, type: "spring" },
              }}
            >
              <AnimatePresence mode="popLayout">
                {isSelected ? (
                  <motion.div
                    layoutId={`card-${card.id}`}
                    className="absolute inset-0 w-full h-full"
                    transition={{
                      layout: { duration: 0.3, type: "spring" },
                    }}
                  >
                    <motion.div
                      className="relative w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-2xl"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <motion.div
                        className="w-full h-full flex items-center justify-center p-4 sm:p-6 md:p-12 overflow-y-auto"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        {card.content}
                      </motion.div>
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelected(null);
                        }}
                        className="absolute top-2 right-2 sm:top-4 sm:right-4 z-20 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white rounded-full p-1.5 sm:p-2 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <svg
                          className="w-5 h-5 sm:w-6 sm:h-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </motion.button>
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.div
                    layoutId={`card-${card.id}`}
                    className={cn(
                      "relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden group",
                      aspectRatio
                    )}
                    transition={{
                      layout: { duration: 0.3, type: "spring" },
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                    <img
                      src={card.thumbnail}
                      alt={`Thumbnail ${card.id}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
        
        {/* "+ More Photos" card */}
        {showMoreButton && remainingCount > 0 && (
          <motion.div
            onClick={onShowMore}
            className="md:col-span-1 relative overflow-hidden rounded-2xl cursor-pointer aspect-square md:aspect-square group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="relative w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden">
              {/* Blurred background image (last photo) */}
              {cards.length > 6 && (
                <div className="absolute inset-0">
                  <img
                    src={cards[6].thumbnail}
                    alt="More photos"
                    className="w-full h-full object-cover blur-md scale-110 opacity-30"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-black/60" />
                </div>
              )}
              
              {/* "+" and text overlay */}
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6">
                <motion.div
                  className="text-white text-6xl font-bold mb-4"
                  whileHover={{ scale: 1.1 }}
                >
                  +
                </motion.div>
                <p className="text-white text-lg font-medium text-center">
                  {remainingCount} {remainingCount === 1 ? "foto" : "fotos"}
                </p>
                <p className="text-white/80 text-sm mt-2 text-center">
                  Ver mais
                </p>
              </div>
              
              {/* Hover effect */}
              <motion.div
                className="absolute inset-0 z-5 bg-white/5"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />
            </div>
          </motion.div>
        )}
      </div>
      
      {/* Overlay when a card is selected */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>
    </div>
  );
};

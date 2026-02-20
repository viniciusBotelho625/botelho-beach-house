"use client";

import { Star, StarHalf } from "lucide-react";

interface StarRatingProps {
  rating: number;
  size?: number;
  showValue?: boolean;
}

const StarRating = ({
  rating,
  size = 16,
  showValue = false,
}: StarRatingProps) => {
  const clamped = Math.min(5, Math.max(0, rating));
  const fullStars = Math.floor(clamped);
  const hasHalf = clamped - fullStars >= 0.5;
  const emptyStars = Math.max(0, 5 - fullStars - (hasHalf ? 1 : 0));

  return (
    <div className="flex items-center gap-1">
      <div className="flex gap-0.5">
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star
            key={`full-${i}`}
            size={size}
            style={{ fill: "#fb923c", color: "#fb923c" }}
          />
        ))}
        {hasHalf && (
          <StarHalf size={size} style={{ fill: "#fb923c", color: "#fb923c" }} />
        )}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Star
            key={`empty-${i}`}
            size={size}
            style={{ fill: "#e5e7eb", color: "#e5e7eb" }}
          />
        ))}
      </div>
      {showValue && (
        <span className="ml-1 text-sm font-semibold text-neutral-800">
          {clamped.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default StarRating;

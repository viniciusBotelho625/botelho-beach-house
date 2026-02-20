"use client";

import StarRating from "./StarRating";

interface RatingBarProps {
  star: number;
  count: number;
  total: number;
}

const RatingBar = ({ star, count, total }: RatingBarProps) => {
  const percentage = total > 0 ? (count / total) * 100 : 0;

  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="w-3 text-right text-neutral-400 text-xs font-medium">
        {star}
      </span>
      <div className="flex-1 h-2 bg-neutral-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-orange-400 rounded-full transition-all duration-700 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="w-4 text-right text-xs text-neutral-400">{count}</span>
    </div>
  );
};

interface RatingSummaryProps {
  average: number;
  total: number;
  distribution: Record<number, number>;
}

const RatingSummary = ({
  average,
  total,
  distribution,
}: RatingSummaryProps) => {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-neutral-200">
      <div className="flex items-center gap-5">
        {/* Score */}
        <div className="text-center min-w-[72px]">
          <div className="text-5xl font-extrabold text-neutral-900 leading-none tracking-tight">
            {average.toFixed(1)}
          </div>
          <div className="mt-2">
            <StarRating rating={average} size={14} />
          </div>
          <div className="text-xs text-neutral-400 mt-1.5 whitespace-nowrap">
            {total} avaliações
          </div>
        </div>

        {/* Barras */}
        <div className="flex-1 space-y-2">
          {[5, 4, 3, 2, 1].map((star) => (
            <RatingBar
              key={star}
              star={star}
              count={distribution[star] || 0}
              total={total}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RatingSummary;

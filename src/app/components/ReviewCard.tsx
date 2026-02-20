"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThumbsUp } from "lucide-react";
import StarRating from "./StarRating";

export interface ReviewData {
  id: string;
  author: string;
  avatar?: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  helpful: number;
  verified: boolean;
  tags?: string[];
}

interface ReviewCardProps {
  review: ReviewData;
  index: number;
}

/* Cores de fundo do avatar baseadas no índice */
const AVATAR_COLORS = [
  "bg-orange-100 text-orange-600",
  "bg-blue-100 text-blue-600",
  "bg-emerald-100 text-emerald-600",
  "bg-rose-100 text-rose-600",
  "bg-violet-100 text-violet-600",
  "bg-amber-100 text-amber-600",
];

const ReviewCard = ({ review, index }: ReviewCardProps) => {
  const initials = review.author
    .trim()
    .split(/\s+/)
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const avatarColor = AVATAR_COLORS[index % AVATAR_COLORS.length];

  const displayDate = (dateStr: string) => {
    if (dateStr.length === 7) {
      const [year, month] = dateStr.split("-");
      const date = new Date(Number(year), Number(month) - 1);
      return date
        .toLocaleDateString("pt-BR", { month: "short", year: "numeric" })
        .replace(".", "");
    }
    return dateStr;
  };

  console.log("asdsadas", review.rating);

  return (
    <div
      className="rounded-2xl bg-white border border-neutral-200 p-4 shadow-sm"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Header: Avatar + Nome + Verificado + Data */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={review.avatar} alt={review.author} />
            <AvatarFallback
              className={`text-sm font-bold rounded-full ${avatarColor}`}
            >
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-sm text-neutral-800 capitalize">
                {review.author}
              </span>
              {/* Tags */}
              {review.tags && review.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {review.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-neutral-600 bg-neutral-100 border border-neutral-200 px-2.5 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <span className="text-xs text-neutral-400">
              {displayDate(review.date)}
            </span>
          </div>
        </div>

        {/* Menu kebab */}
        <button className="text-neutral-300 hover:text-neutral-500 transition-colors p-1 rounded-full hover:bg-neutral-100">
          <span className="text-lg leading-none tracking-widest select-none">
            ···
          </span>
        </button>
      </div>

      {/* Estrelas */}
      <div className="mb-2">
        <StarRating rating={review.rating} size={16} />
      </div>

      {/* Comentário */}
      <p className="text-sm text-gray-500 leading-relaxed mb-3">
        {review.comment}
      </p>
    </div>
  );
};

export default ReviewCard;

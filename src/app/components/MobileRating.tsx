import { useMemo, useState } from "react";
import { ChevronDown, Search, SlidersHorizontal } from "lucide-react";
import RatingSummary from "./RatingSummary";
import FilterChip from "./FilterChip";
import ReviewCard, { ReviewData } from "./ReviewCard";
import { useGoogleReviews } from "@/hooks/useGoogleReviews";

type FilterType = "todas" | "verificadas" | "5" | "4" | "3" | "2" | "1";

type SortValue = "recentes" | "melhor" | "pior" | "uteis";

const sortOptions: { value: SortValue; label: string }[] = [
  { value: "recentes", label: "Mais recentes" },
  { value: "melhor", label: "Melhor avaliadas" },
  { value: "pior", label: "Pior avaliadas" },
  { value: "uteis", label: "Mais úteis" },
];

export function MobileRating() {
  const { reviews, rating, totalReviews, isLoading } = useGoogleReviews();

  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>("todas");
  const [showSort, setShowSort] = useState(false);
  const [sortBy, setSortBy] = useState<SortValue>("recentes");

  // Mapeia dados combinados de Google + Airbnb para o formato do ReviewCard
  const mappedReviews: ReviewData[] = useMemo(
    () =>
      reviews.map((review, index) => {
        let displayDate = "Data não disponível";

        if (review.time) {
          // Formato Google: Timestamp (segundos) -> DD/MM/AAAA
          const dateObj = new Date(review.time * 1000);
          displayDate = dateObj.toLocaleDateString("pt-BR");
        } else if (review.date) {
          // Formato Airbnb: "2024-11" -> "11/2024" ou "01/11/2024"
          const parts = review.date.split("-");
          if (parts.length === 2) {
            // Se for YYYY-MM, transforma em MM/YYYY
            displayDate = `${parts[1]}/${parts[0]}`;
          } else {
            // Se já for YYYY-MM-DD, inverte para DD/MM/YYYY
            displayDate = parts.reverse().join("/");
          }
        }

        return {
          id: `${review.name}-${review.time ?? index}`,
          author: review.name,
          avatar: review.profilePhoto,
          rating: review.rating,
          date: displayDate, // Agora sempre teremos uma string de data válida
          title:
            review.quote && review.quote.length > 60
              ? `${review.quote.slice(0, 57)}...`
              : review.quote || "",
          comment: review.quote || "",
          helpful: 0,
          verified: review.source === "airbnb",
          tags: review.source
            ? [review.source === "airbnb" ? "Airbnb" : "Google"]
            : undefined,
        };
      }),
    [reviews],
  );

  const ratingDistribution = useMemo(() => {
    const dist: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

    reviews.forEach((r) => {
      const star = Math.round(r.rating) as 1 | 2 | 3 | 4 | 5;
      dist[star] = (dist[star] || 0) + 1;
    });

    return dist;
  }, [reviews]);

  const filteredReviews = useMemo(() => {
    let list = [...mappedReviews];

    // 1. Filtro por estrelas / verificadas
    if (activeFilter === "verificadas") {
      list = list.filter((r) => r.verified);
    } else if (activeFilter !== "todas") {
      const star = Number(activeFilter);
      list = list.filter((r) => Math.round(r.rating) === star);
    }

    // 2. Busca (com proteção contra campos undefined)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (r) =>
          r.author?.toLowerCase().includes(q) ||
          r.comment?.toLowerCase().includes(q) ||
          r.title?.toLowerCase().includes(q),
      );
    }

    // 3. Ordenação (Corrigindo o bug do NaN/Recentemente)
    list.sort((a, b) => {
      if (sortBy === "melhor") return b.rating - a.rating;
      if (sortBy === "pior") return a.rating - b.rating;
      if (sortBy === "uteis") return (b.helpful ?? 0) - (a.helpful ?? 0);

      // Função auxiliar para tratar "Recentemente" e formatos de data
      const getTime = (dateStr: string) => {
        if (dateStr === "Recentemente") return Date.now(); // Joga pro topo
        const timestamp = new Date(dateStr).getTime();
        return isNaN(timestamp) ? 0 : timestamp;
      };

      return getTime(b.date) - getTime(a.date);
    });

    return list;
  }, [mappedReviews, activeFilter, searchQuery, sortBy]);

  const averageRating = rating;

  return (
    <div className="px-4 py-4 space-y-4 bg-gray-200">
      {/* Rating Summary */}
      <RatingSummary
        average={averageRating}
        total={totalReviews}
        distribution={ratingDistribution}
      />

      {/* Search */}
      <div className="relative">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
        />
        <input
          type="text"
          placeholder="Buscar nas avaliações..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-secundary text-sm text-gray-500 placeholder:text-gray-600 border-none outline-none focus:ring-2 focus:ring-primary/30 transition-all"
        />
      </div>

      {/* Filters */}
      <div className="flex gap-2  scrollbar-hide pb-1">
        <FilterChip
          label="Todas"
          active={activeFilter === "todas"}
          count={totalReviews}
          onClick={() => setActiveFilter("todas")}
        />
        {[5, 4, 3, 2, 1].map((star) => (
          <FilterChip
            key={star}
            label={`${star} ★`}
            active={activeFilter === String(star)}
            count={ratingDistribution[star] || 0}
            onClick={() => setActiveFilter(String(star) as FilterType)}
          />
        ))}
      </div>

      {/* Sort */}
      <div className="relative">
        <button
          onClick={() => setShowSort(!showSort)}
          className="flex items-center gap-1.5 text-xs text-gray-500 font-medium hover:text-foreground transition-colors"
        >
          <SlidersHorizontal size={14} />
          {sortOptions.find((s) => s.value === sortBy)?.label}
          <ChevronDown
            size={12}
            className={`transition-transform ${showSort ? "rotate-180" : ""}`}
          />
        </button>
        {showSort && (
          <div className="absolute top-8 left-0 z-20 bg-card border border-border rounded-lg shadow-lg py-1 min-w-[160px] animate-fade-in">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  setSortBy(option.value);
                  setShowSort(false);
                }}
                className={`w-full text-left px-3 py-2 text-xs transition-colors ${
                  sortBy === option.value
                    ? "text-primary font-semibold bg-primary/5"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Reviews List */}
      <div className="space-y-3 pb-8">
        {isLoading && mappedReviews.length === 0 ? (
          <div className="text-center py-12 animate-fade-in">
            <p className="text-muted-foreground text-sm">
              Carregando avaliações...
            </p>
          </div>
        ) : filteredReviews.length > 0 ? (
          filteredReviews.map((review, index) => (
            <ReviewCard key={review.id} review={review} index={index} />
          ))
        ) : (
          <div className="text-center py-12 animate-fade-in">
            <p className="text-muted-foreground text-sm">
              Nenhuma avaliação encontrada
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

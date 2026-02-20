"use client";

interface FilterChipProps {
  label: string;
  active?: boolean;
  count?: number;
  onClick?: () => void;
}

const FilterChip = ({
  label,
  active = false,
  count,
  onClick,
}: FilterChipProps) => {
  return (
    <button
      onClick={onClick}
      className={`
        inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium
        whitespace-nowrap transition-all duration-200
        ${
          active
            ? "bg-primary text-primary-foreground shadow-sm"
            : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
        }
      `}
    >
      {label}
      {count !== undefined && (
        <span
          className={`text-[10px] ${active ? "opacity-80" : "text-muted-foreground"}`}
        >
          ({count})
        </span>
      )}
    </button>
  );
};

export default FilterChip;

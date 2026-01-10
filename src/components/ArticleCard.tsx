import { ArrowUpRight, Clock } from "lucide-react";

interface ArticleCardProps {
  id: string;
  title: string;
  category: string;
  date: string;
  image: string;
  readTime?: string;
  size?: "small" | "large";
}

const ArticleCard = ({ 
  id, 
  title, 
  category, 
  date, 
  image, 
  readTime = "5 min",
  size = "small" 
}: ArticleCardProps) => {
  const getCategoryClass = (cat: string) => {
    const normalized = cat.toLowerCase();
    if (normalized.includes("financ")) return "tag-financing";
    if (normalized.includes("lifestyle")) return "tag-lifestyle";
    if (normalized.includes("community")) return "tag-community";
    if (normalized.includes("wellness")) return "tag-wellness";
    if (normalized.includes("travel")) return "tag-travel";
    if (normalized.includes("creativ")) return "tag-creativity";
    if (normalized.includes("growth")) return "tag-growth";
    return "tag-lifestyle";
  };

  return (
    <a
      href={`/article/${id}`}
      className={`group relative block rounded-[2rem] overflow-hidden card-hover ${
        size === "large" ? "col-span-1 md:col-span-2 row-span-2" : ""
      }`}
      aria-label={`Read article: ${title}`}
    >
      {/* Glass Card Container */}
      <article className="relative glass-card rounded-[2rem] overflow-hidden">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={image}
            alt=""
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
            loading="lazy"
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          
          {/* Glass overlay on hover */}
          <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Top section - Category and Read Time */}
          <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-2">
            <span className={`glass-subtle px-3 py-1.5 rounded-full text-xs font-semibold ${getCategoryClass(category)}`}>
              {category}
            </span>
            <div className="glass-subtle px-3 py-1.5 rounded-full flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-white/80" />
              <span className="text-xs font-medium text-white/90">{readTime}</span>
            </div>
          </div>

          {/* Bottom section - Content */}
          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
            {/* Date */}
            <span className="text-white/60 text-xs font-medium tracking-wider uppercase mb-2 block">
              {date}
            </span>
            
            {/* Title */}
            <h3 className="text-white text-xl md:text-2xl font-bold leading-tight tracking-tight line-clamp-2 group-hover:text-white/90 transition-colors">
              {title}
            </h3>
          </div>

          {/* Floating arrow button */}
          <div className="absolute bottom-5 right-5 sm:bottom-6 sm:right-6">
            <div className="floating-button group-hover:rotate-45">
              <ArrowUpRight className="w-5 h-5 text-foreground" />
            </div>
          </div>
        </div>
      </article>
    </a>
  );
};

export default ArticleCard;

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import type { Poem } from "@/lib/poemsData";

interface PoemCardProps {
  poem: Poem;
  index?: number;
  compact?: boolean;
}

const PoemCard = ({ poem, index = 0, compact = false }: PoemCardProps) => {
  const formattedDate = new Date(poem.date).toLocaleDateString("ro-RO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  if (compact) {
    // Compact card for homepage grid
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.15 }}
        className="h-full"
      >
        <Link to={`/poezii/${poem.id}`} className="block poem-card group overflow-hidden !p-0 h-full flex flex-col">
          {poem.image && (
            <div className="h-48 overflow-hidden">
              <img
                src={poem.image}
                alt={poem.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          )}
          <div className="p-5 flex-1 flex flex-col">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Calendar className="w-3.5 h-3.5" />
              <span className="font-body">{formattedDate}</span>
            </div>
            <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
              {poem.title}
            </h3>
            <p className="font-elegant text-base text-muted-foreground italic leading-relaxed line-clamp-2 mt-auto">
              {poem.excerpt}
            </p>
          </div>
        </Link>
      </motion.div>
    );
  }

  // Wide horizontal card for poems page
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Link
        to={`/poezii/${poem.id}`}
        className="block group"
      >
        <div className="flex flex-col md:flex-row gap-5 md:gap-8 items-start md:items-center md:justify-center max-w-4xl mx-auto">
          {poem.image && (
            <div className="md:w-1/2 aspect-[4/3] overflow-hidden flex-shrink-0 rounded-2xl shadow-md">
              <img
                src={poem.image}
                alt={poem.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          )}
          <div className="md:w-1/2 py-4 md:py-6 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
              <Calendar className="w-3 h-3" />
              <span className="font-body">{formattedDate}</span>
            </div>
            <h3 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors">
              {poem.title}
            </h3>
            <div className="font-elegant text-base md:text-lg text-muted-foreground italic leading-relaxed mb-5 poem-text line-clamp-6">
              {poem.content.split('\n').slice(0, 8).join('\n')}
            </div>
            <div className="flex items-center gap-2 text-primary font-body text-sm tracking-wide group-hover:gap-3 transition-all">
              Citește poezia
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default PoemCard;

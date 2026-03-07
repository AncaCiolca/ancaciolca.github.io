import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Helmet } from "react-helmet-async";
import PoemCard from "@/components/PoemCard";
import { getPoems } from "@/lib/poemsData";
import { SITE_NAME, SITE_URL, OG_LOCALE, FAVICON_PATH, getPoemsSeo } from "@/config/seo";

const POEMS_PER_PAGE = 3;

const Poems = () => {
  const poems = getPoems();
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(poems.length / POEMS_PER_PAGE);
  const paginatedPoems = poems.slice((page - 1) * POEMS_PER_PAGE, page * POEMS_PER_PAGE);
  const seo = getPoemsSeo();

  const goTo = (p: number) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="pt-24 md:pt-28">
      <Helmet>
        <title>{seo.metaTitle || `${SITE_NAME} | Poezii`}</title>
        <meta
          name="description"
          content={seo.metaDescription || "Toate poeziile Ancăi Ciolca, adunate într-un singur loc."}
        />
        <meta property="og:title" content={seo.metaTitle || `${SITE_NAME} | Poezii`} />
        <meta
          property="og:description"
          content={seo.metaDescription || "Toate poeziile Ancăi Ciolca, adunate într-un singur loc."}
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_URL}/poezii`} />
        <meta
          property="og:image"
          content={seo.ogImage ? `${SITE_URL}${seo.ogImage}` : `${SITE_URL}/placeholder.svg`}
        />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:locale" content={OG_LOCALE} />
        <link rel="icon" href={FAVICON_PATH} />
        <link rel="canonical" href={`${SITE_URL}/poezii`} />
      </Helmet>
      <section className="section-padding">
        <div className="mx-auto max-w-5xl lg:max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Poezii
            </h1>
            <div className="decorative-line mb-4" />
            <p className="font-elegant text-lg text-muted-foreground italic">
              Toate versurile, adunate într-un singur loc
            </p>
          </motion.div>

          <div className="space-y-8">
            {paginatedPoems.map((poem, i) => (
              <PoemCard key={poem.id} poem={poem} index={i} />
            ))}
          </div>

          {poems.length === 0 && (
            <p className="text-center text-muted-foreground font-elegant text-lg italic py-12">
              Încă nu există poezii publicate...
            </p>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-center gap-3 mt-16"
            >
              <button
                onClick={() => goTo(page - 1)}
                disabled={page === 1}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button
                  key={p}
                  onClick={() => goTo(p)}
                  className={`w-10 h-10 rounded-full font-display text-sm transition-all duration-300 ${
                    p === page
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "border border-border text-muted-foreground hover:text-primary hover:border-primary/50"
                  }`}
                >
                  {p}
                </button>
              ))}

              <button
                onClick={() => goTo(page + 1)}
                disabled={page === totalPages}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Poems;

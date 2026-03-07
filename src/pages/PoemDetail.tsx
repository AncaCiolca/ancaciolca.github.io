import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { getPoems } from "@/lib/poemsData";
import PoemCard from "@/components/PoemCard";
import { SITE_NAME, SITE_URL, FAVICON_PATH } from "@/config/seo";

const PoemDetail = () => {
  const { id } = useParams();
  const poems = getPoems();
  const poem = poems.find(p => p.id === id);

  if (!poem) {
    return (
      <main className="pt-24 md:pt-28 section-padding">
        <div className="container mx-auto max-w-4xl lg:max-w-5xl text-center">
          <p className="text-muted-foreground font-elegant text-xl italic">Poezia nu a fost găsită.</p>
          <Link to="/poezii" className="inline-flex items-center gap-2 text-primary mt-6 font-body text-sm">
            <ArrowLeft className="w-4 h-4" /> Înapoi la poezii
          </Link>
        </div>
      </main>
    );
  }

  const formattedDate = new Date(poem.date).toLocaleDateString("ro-RO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const otherPoems = poems.filter(p => p.id !== id).slice(0, 3);

  const pageUrl = `${SITE_URL}/poezii/${poem.id}`;
  const description = poem.excerpt || poem.content.slice(0, 140);
  const ogImage =
    poem.image && poem.image.startsWith("http")
      ? poem.image
      : poem.image
        ? `${SITE_URL}${poem.image}`
        : `${SITE_URL}/placeholder.svg`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    headline: poem.title,
    name: poem.title,
    author: {
      "@type": "Person",
      name: "Anca Ciolca",
    },
    datePublished: poem.date,
    image: ogImage,
    description,
    url: pageUrl,
  };

  return (
    <main className="pt-24 md:pt-28">
      <Helmet>
        <title>{`${poem.title} – ${SITE_NAME}`}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={`${poem.title} – ${SITE_NAME}`} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:site_name" content={SITE_NAME} />
        <link rel="icon" href={FAVICON_PATH} />
        <link rel="canonical" href={pageUrl} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <section className="section-padding">
        <div className="mx-auto max-w-4xl lg:max-w-5xl">
          <Link to="/poezii" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-body text-base md:text-sm mb-8">
            <ArrowLeft className="w-4 h-4" /> Înapoi la poezii
          </Link>

          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 text-base md:text-sm text-muted-foreground mb-4">
              <Calendar className="w-4 h-4" />
              <span className="font-body">{formattedDate}</span>
            </div>

            <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6">
              {poem.title}
            </h1>

            <div className="decorative-line-wide !mx-0 !w-24 mb-8" />

            {poem.image && (
              <div className="rounded-xl overflow-hidden mb-10 shadow-lg">
                <img
                  src={poem.image}
                  alt={poem.title}
                  loading="lazy"
                  className="w-full h-72 md:h-96 object-cover"
                />
              </div>
            )}

            <div className="poem-text font-elegant text-lg md:text-xl text-foreground/90 leading-loose">
              {poem.content}
            </div>

            <div className="decorative-line mt-12" />
          </motion.article>
        </div>
      </section>

      {/* Alte poezii */}
      {otherPoems.length > 0 && (
        <section className="section-padding border-t border-border/50">
          <div className="mx-auto max-w-5xl lg:max-w-6xl">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-3">
                Alte poezii
              </h2>
              <div className="decorative-line" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {otherPoems.map((p, i) => (
                <PoemCard key={p.id} poem={p} index={i} compact />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default PoemDetail;

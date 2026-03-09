import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import PoemCard from "@/components/PoemCard";
import { getPoems } from "@/lib/poemsData";
import { getHomeData } from "@/lib/homeData";
import { DEFAULT_DESCRIPTION, SITE_NAME, SITE_URL, OG_LOCALE, FAVICON_PATH, getHomeSeo } from "@/config/seo";

const Index = () => {
  const poems = getPoems().slice(0, 6);
  const home = getHomeData();
  const seo = getHomeSeo();

  const authorJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: seo.authorName || "Anca Ciolca",
    description: seo.authorDescription || DEFAULT_DESCRIPTION,
    url: SITE_URL,
    image: seo.authorImage ? `${SITE_URL}${seo.authorImage}` : `${SITE_URL}/uploads/anca-ciolca-01.jpg`,
  };

  return (
    <main>
      <Helmet>
        <title>{seo.metaTitle || SITE_NAME}</title>
        <meta name="description" content={seo.metaDescription || DEFAULT_DESCRIPTION} />
        <meta property="og:title" content={seo.metaTitle || SITE_NAME} />
        <meta property="og:description" content={seo.metaDescription || DEFAULT_DESCRIPTION} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE_URL} />
        <meta
          property="og:image"
          content={seo.ogImage ? `${SITE_URL}${seo.ogImage}` : `${SITE_URL}/placeholder.svg`}
        />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:locale" content={OG_LOCALE} />
        <link rel="icon" href={FAVICON_PATH} />
        <link rel="canonical" href={SITE_URL} />
        <script type="application/ld+json">
          {JSON.stringify(authorJsonLd)}
        </script>
      </Helmet>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={home.heroImageLight}
            alt="Flori delicate și carte de poezie"
            className="w-full h-full object-cover dark:hidden"
          />
          <img
            src={home.heroImageDark}
            alt="Flori delicate și carte de poezie"
            className="w-full h-full object-cover hidden dark:block"
          />
          <div className="absolute inset-0 bg-background/80 dark:bg-background/65" />
          <div className="absolute bottom-0 left-0 right-0 h-72 bg-gradient-to-t from-background via-background/70 to-transparent" />
        </div>

        <div className="relative z-10 text-center px-3 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
              {home.heroTitle}
            </h1>
            <div className="decorative-line-wide mb-6" />
            <p className="font-elegant text-xl md:text-2xl text-muted-foreground italic mb-10">
              {home.heroSubtitle}
            </p>
            <Link
              to={home.heroButtonLink || "/poezii"}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-full font-body text-base md:text-sm tracking-wide hover:opacity-90 transition-opacity"
            >
              {home.heroButtonLabel}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Latest Poems */}
      <section className="section-padding">
        <div className="mx-auto max-w-5xl lg:max-w-6xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">
              {home.latestTitle}
            </h2>
            <div className="decorative-line mb-4" />
            <p className="font-elegant text-lg text-muted-foreground italic">
              {home.latestSubtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8 lg:gap-8">
            {poems.map((poem, i) => (
              <PoemCard key={poem.id} poem={poem} index={i} compact />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              to="/poezii"
              className="inline-flex items-center gap-2 text-primary font-body text-base md:text-sm tracking-wide hover:gap-3 transition-all"
            >
              Vezi toate poeziile
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Index;

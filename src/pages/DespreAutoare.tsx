import { motion } from "framer-motion";
import { Feather, Quote, Mail, Heart } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { getAboutData } from "@/lib/aboutData";
import {
  SITE_NAME,
  SITE_URL,
  OG_LOCALE,
  FAVICON_PATH,
  getAboutSeo,
} from "@/config/seo";

const DespreAutoare = () => {
  const about = getAboutData();
  const paragraphs = about.body.split(/\n{2,}/).filter(Boolean);

  const pageUrl = `${SITE_URL}/despre-mine`;
  const ogImage =
    about.image && about.image.startsWith("http")
      ? about.image
      : about.image
      ? `${SITE_URL}${about.image}`
      : `${SITE_URL}/placeholder.svg`;

  const seo = getAboutSeo();

  return (
    <main className="pt-24 md:pt-28 relative overflow-hidden">
      <Helmet>
        <title>{seo.metaTitle || `${SITE_NAME} | Despre Mine`}</title>
        <meta
          name="description"
          content={
            seo.metaDescription ||
            "Află mai multe despre Anca Ciolca, poeta din spatele versurilor de suflet."
          }
        />
        <meta property="og:title" content={seo.metaTitle || `${SITE_NAME} | Despre Mine`} />
        <meta
          property="og:description"
          content={
            seo.metaDescription ||
            "Află mai multe despre Anca Ciolca, poeta din spatele versurilor de suflet."
          }
        />
        <meta property="og:type" content="profile" />
        <meta property="og:url" content={pageUrl} />
        <meta
          property="og:image"
          content={seo.ogImage ? `${SITE_URL}${seo.ogImage}` : ogImage}
        />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:locale" content={OG_LOCALE} />
        <link rel="icon" href={FAVICON_PATH} />
        <link rel="canonical" href={pageUrl} />
      </Helmet>

      {/* Bandă de culoare sub navbar doar pe tema light, să acopere complet zona albă */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-32 -z-10 bg-card dark:bg-transparent" />

      {/* Background decorativ global */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-rose-light/5 via-transparent to-gold-light/5" />
        <div className="absolute top-20 right-10 w-80 h-80 rounded-full bg-gold-light/8 blur-[100px]" />
        <div className="absolute top-[40%] -left-20 w-96 h-96 rounded-full bg-rose-light/8 blur-[120px]" />
        <div className="absolute bottom-32 right-1/3 w-72 h-72 rounded-full bg-gold-light/6 blur-[80px]" />
        <div className="absolute top-[60%] left-1/4 w-64 h-64 rounded-full bg-primary/3 blur-[100px]" />
      </div>

      {/* Hero band cu foto */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-card via-background to-background" />
        <div className="absolute top-10 left-1/4 w-64 h-64 rounded-full bg-rose-light/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-48 h-48 rounded-full bg-gold-light/10 blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-5 md:px-4 py-12 md:py-20">
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative mb-8 md:mb-10"
            >
              {about.image && (
                <div className="w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-gold/20 shadow-2xl">
                  <img
                    src={about.image}
                    alt={about.title || "Anca Ciolca"}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              )}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-card border-2 border-gold/30 flex items-center justify-center shadow-lg"
              >
                <Feather className="w-4 h-4 text-primary" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="absolute -top-1 -left-3 w-8 h-8 rounded-full bg-card border border-gold/30 flex items-center justify-center shadow-md"
              >
                <Heart className="w-3 h-3 text-primary" />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-2">
                {about.title}
              </h1>
              {about.subtitle && (
                <p className="font-elegant text-lg md:text-xl text-muted-foreground italic">
                  {about.subtitle}
                </p>
              )}
              <div className="decorative-line-wide mt-4" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="px-5 md:px-4 py-10 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl lg:max-w-4xl text-center"
        >
          <Quote className="w-8 h-8 text-gold/50 mx-auto mb-4 rotate-180" />
          {about.quote && (
            <blockquote className="font-display text-xl md:text-2xl text-foreground/80 italic leading-relaxed">
              {about.quote}
            </blockquote>
          )}
          <div className="decorative-line mt-6" />
        </motion.div>
      </section>

      {/* Despre mine */}
      <section className="px-5 md:px-4 pb-12 md:pb-16">
        <div className="mx-auto max-w-4xl lg:max-w-5xl space-y-6">
          {paragraphs.map((text, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="poem-card"
            >
              <p className="font-elegant text-lg md:text-xl text-foreground/90 leading-relaxed">
                {text}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="px-5 md:px-4 pb-20 md:pb-28">
        <div className="mx-auto max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-3">
              {about.contactTitle ?? "Scrie-mi"}
            </h2>
            <div className="decorative-line" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <a
              href={about.email ? `mailto:${about.email}` : "#"}
              className="group block poem-card text-center py-10 md:py-14 hover:border-gold/40"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/15 transition-colors duration-500">
                <Mail className="w-7 h-7 text-primary group-hover:scale-110 transition-transform duration-300" />
              </div>
              <p className="font-body text-xs tracking-widest uppercase text-muted-foreground mb-3">
                {(about.contactSubtitleSmall ?? "Scrie-mi pe email").toUpperCase()}
              </p>
              {about.email && (
                <p className="font-display text-lg md:text-xl text-foreground group-hover:text-primary transition-colors duration-300">
                  {about.email}
                </p>
              )}
              <div className="decorative-line mt-6" />
              <p className="font-elegant text-sm text-muted-foreground italic mt-4">
                {about.contactFooterText ?? "Răspund cu drag fiecărui mesaj ♡"}
              </p>
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default DespreAutoare;


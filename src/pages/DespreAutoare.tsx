import { motion } from "framer-motion";
import { Feather, Quote, Mail, Heart } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { getAboutData } from "@/lib/aboutData";
import { getHomeData } from "@/lib/homeData";
import {
  SITE_NAME,
  SITE_URL,
  OG_LOCALE,
  FAVICON_PATH,
  getAboutSeo,
} from "@/config/seo";

const DespreAutoare = () => {
  const about = getAboutData();
  const home = getHomeData();
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
    <main className="relative overflow-hidden">
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

      {/* Hero + Quote: fundal imagine de la top (vizibil sub meniu, ca pe prima pagină) */}
      <div className="relative">
        {/* Imagine de fundal - de la top, sub navbar */}
        <div className="absolute inset-0">
          <img
            src={home.heroImageLight}
            alt=""
            className="w-full h-full object-cover object-center dark:hidden"
            aria-hidden
          />
          <img
            src={home.heroImageDark}
            alt=""
            className="w-full h-full object-cover object-center hidden dark:block"
            aria-hidden
          />
          {/* Degradé: imaginea se vede sus, se pierde în fundal în zona citatului */}
          <div
            className="absolute inset-0 bg-gradient-to-b from-background/65 via-background/85 to-background dark:from-background/60 dark:via-background/80 dark:to-background"
            aria-hidden
          />
        </div>
        {/* Conținut peste fundal - cu padding ca să nu fie sub meniu */}
        <div className="relative z-10 pt-24 md:pt-28">
        {/* Hero band cu foto */}
        <section className="relative overflow-hidden">
          <div className="relative mx-auto max-w-5xl px-5 md:px-4 py-12 md:py-20">
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative mb-8 md:mb-10"
            >
              {about.image && (
                <div className="w-[15.4rem] h-[15.4rem] md:w-[19.8rem] md:h-[19.8rem] rounded-full overflow-hidden border-4 border-gold/20 shadow-2xl">
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

        </div>
      </div>

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
              <p className="font-body text-sm md:text-xs tracking-widest uppercase text-muted-foreground mb-3">
                {(about.contactSubtitleSmall ?? "Scrie-mi pe email").toUpperCase()}
              </p>
              {about.email && (
                <p className="font-display text-lg md:text-xl text-foreground group-hover:text-primary transition-colors duration-300">
                  {about.email}
                </p>
              )}
              <div className="decorative-line mt-6" />
              <p className="font-elegant text-base md:text-sm text-muted-foreground italic mt-4">
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


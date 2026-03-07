import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { SITE_NAME, SITE_URL, FAVICON_PATH } from "@/config/seo";
import { getHomeData } from "@/lib/homeData";
import { getNotFoundData } from "@/lib/notFoundData";

const NotFound = () => {
  const location = useLocation();
  const home = getHomeData();
  const strings = getNotFoundData();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>{`Pagină negăsită – ${SITE_NAME}`}</title>
        <meta name="robots" content="noindex" />
        <meta property="og:title" content={`Pagină negăsită – ${SITE_NAME}`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_URL}${location.pathname}`} />
        <link rel="icon" href={FAVICON_PATH} />
      </Helmet>
      <main className="pt-24 md:pt-28">
        <section className="relative min-h-[55vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={home.heroImageLight}
              alt="Fundal poetic"
              className="w-full h-full object-cover dark:hidden"
            />
            <img
              src={home.heroImageDark}
              alt="Fundal poetic"
              className="w-full h-full object-cover hidden dark:block"
            />
            <div className="absolute inset-0 bg-background/80 dark:bg-background/70" />
            <div className="absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-background via-background/80 to-transparent dark:from-background dark:via-background/80 dark:to-transparent" />
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background/90 via-background/60 to-transparent dark:from-background dark:via-background/70 dark:to-transparent" />
          </div>

          <div className="relative z-10 w-full px-5 md:px-8">
            <div className="mx-auto max-w-xl text-center bg-card/90 backdrop-blur-sm border border-border/60 rounded-2xl px-6 md:px-10 py-10 md:py-12 shadow-lg">
              <p className="font-body text-xs tracking-[0.25em] uppercase text-muted-foreground mb-4">
                {strings.label.toUpperCase()}
              </p>
              <h1 className="font-display text-5xl md:text-6xl font-bold text-foreground mb-4">
                {strings.title}
              </h1>
              <p className="font-elegant text-lg md:text-xl text-muted-foreground mb-8 italic">
                {strings.description}
              </p>
              <Link
                to="/"
                className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-primary text-primary-foreground font-body text-sm tracking-wide hover:opacity-90 transition-opacity"
              >
                {strings.buttonLabel}
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default NotFound;

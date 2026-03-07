import homeRaw from "/src/content/home.md?raw";
import { parseFrontmatter } from "@/lib/poemsData";
import defaultHeroLight from "@/assets/hero-bg.jpg";
import defaultHeroDark from "@/assets/hero-bg-dark.jpg";

export interface HomeData {
  heroTitle: string;
  heroSubtitle: string;
  heroButtonLabel: string;
  heroButtonLink: string;
  heroImageLight: string;
  heroImageDark: string;
  latestTitle: string;
  latestSubtitle: string;
  footerTitle: string;
  footerQuote: string;
  footerCopyright: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
}

let cachedHome: HomeData | null = null;

export const getHomeData = (): HomeData => {
  if (cachedHome) return cachedHome;

  const { attributes } = parseFrontmatter(homeRaw as string);

  const heroImageLight = attributes.hero_image_light || defaultHeroLight;
  const heroImageDark = attributes.hero_image_dark || defaultHeroDark;

  cachedHome = {
    heroTitle: attributes.hero_title || "Anca Ciolca",
    heroSubtitle:
      attributes.hero_subtitle ||
      "Un colț de liniște unde cuvintele prind aripi și se transformă în poezie",
    heroButtonLabel: attributes.hero_button_label || "Descoperă Poeziile",
    heroButtonLink: attributes.hero_button_link || "/poezii",
    heroImageLight,
    heroImageDark,
    latestTitle: attributes.latest_title || "Ultimele Poezii",
    latestSubtitle:
      attributes.latest_subtitle || "Cele mai recente gânduri puse în versuri",
    footerTitle: attributes.footer_title || "Anca Ciolca",
    footerQuote:
      attributes.footer_quote || "Poezia este muzica sufletului",
    footerCopyright:
      attributes.footer_copyright ||
      "© 2026 Anca Ciolca. Toate drepturile rezervate.",
    facebook: attributes.facebook || "",
    instagram: attributes.instagram || "",
    youtube: attributes.youtube || "",
  };

  return cachedHome;
};


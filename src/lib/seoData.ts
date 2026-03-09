import seoGlobalRaw from "/src/content/seo-global.md?raw";
import seoHomeRaw from "/src/content/seo-home.md?raw";
import seoPoemsRaw from "/src/content/seo-poems.md?raw";
import seoAboutRaw from "/src/content/seo-about.md?raw";
import { parseFrontmatter } from "@/lib/poemsData";

export interface SeoGlobal {
  siteName: string;
  siteUrl: string;
  defaultDescription: string;
  ogLocale: string;
  favicon?: string;
}

export interface PageSeo {
  metaTitle: string;
  metaDescription: string;
  ogImage?: string;
  authorName?: string;
  authorDescription?: string;
  authorImage?: string;
}

let cachedGlobal: SeoGlobal | null = null;
let cachedHome: PageSeo | null = null;
let cachedPoems: PageSeo | null = null;
let cachedAbout: PageSeo | null = null;

export const getSeoGlobal = (): SeoGlobal => {
  if (cachedGlobal) return cachedGlobal;

  const { attributes } = parseFrontmatter(seoGlobalRaw as string);

  cachedGlobal = {
    siteName: attributes.site_name || "Anca Ciolca",
    siteUrl: attributes.site_url || "https://versuri-de-suflet.ro",
    defaultDescription:
      attributes.default_description ||
      "Un colț de liniște unde cuvintele prind aripi și se transformă în poezie. Descoperă versurile Ancăi Ciolca.",
    ogLocale: attributes.og_locale || "ro_RO",
    favicon: attributes.favicon || "/favicon.ico",
  };

  return cachedGlobal;
};

const mapPageSeo = (raw: string, defaults: PageSeo): PageSeo => {
  const { attributes } = parseFrontmatter(raw as string);
  return {
    metaTitle: attributes.meta_title || defaults.metaTitle,
    metaDescription: attributes.meta_description || defaults.metaDescription,
    ogImage: attributes.og_image || defaults.ogImage,
    authorName: attributes.author_name || defaults.authorName,
    authorDescription: attributes.author_description || defaults.authorDescription,
    authorImage: attributes.author_image || defaults.authorImage,
  };
};

export const getSeoHome = (): PageSeo => {
  if (cachedHome) return cachedHome;
  const global = getSeoGlobal();
  cachedHome = mapPageSeo(seoHomeRaw as string, {
    metaTitle: global.siteName,
    metaDescription: global.defaultDescription,
    ogImage: "/uploads/hero-bg.jpg",
    authorName: "Anca Ciolca",
    authorDescription:
      "Poetă, autoare de poezii de suflet.",
    authorImage: "/uploads/anca-ciolca-01.jpg",
  });
  return cachedHome;
};

export const getSeoPoems = (): PageSeo => {
  if (cachedPoems) return cachedPoems;
  const global = getSeoGlobal();
  cachedPoems = mapPageSeo(seoPoemsRaw as string, {
    metaTitle: `${global.siteName} | Poezii`,
    metaDescription: "Toate poeziile Ancăi Ciolca, adunate într-un singur loc.",
    ogImage: "/uploads/hero-bg.jpg",
  });
  return cachedPoems;
};

export const getSeoAbout = (): PageSeo => {
  if (cachedAbout) return cachedAbout;
  const global = getSeoGlobal();
  cachedAbout = mapPageSeo(seoAboutRaw as string, {
    metaTitle: `${global.siteName} | Despre Mine`,
    metaDescription:
      "Află mai multe despre Anca Ciolca, poeta din spatele versurilor de suflet.",
    ogImage: "/uploads/anca-ciolca-01.jpg",
  });
  return cachedAbout;
};


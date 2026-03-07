import aboutRaw from "/src/content/about.md?raw";
import { parseFrontmatter } from "@/lib/poemsData";

export interface AboutData {
  title: string;
  subtitle?: string;
  quote?: string;
  image?: string;
  email?: string;
  contactTitle?: string;
  contactSubtitleSmall?: string;
  contactFooterText?: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
  body: string;
}

let cachedAbout: AboutData | null = null;

export const getAboutData = (): AboutData => {
  if (cachedAbout) return cachedAbout;

  const { attributes, body } = parseFrontmatter(aboutRaw as string);

  cachedAbout = {
    title: attributes.title || "Anca Ciolca",
    subtitle: attributes.subtitle || "",
    quote: attributes.quote || "",
    image: attributes.image || "",
    email: attributes.email || "",
    contactTitle: attributes.contact_title || "Scrie-mi",
    contactSubtitleSmall: attributes.contact_subtitle_small || "Scrie-mi pe email",
    contactFooterText:
      attributes.contact_footer_text || "Răspund cu drag fiecărui mesaj ♡",
    facebook: attributes.facebook || "",
    instagram: attributes.instagram || "",
    youtube: attributes.youtube || "",
    body,
  };

  return cachedAbout;
};


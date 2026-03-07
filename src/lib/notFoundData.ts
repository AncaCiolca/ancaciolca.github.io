import notFoundRaw from "/src/content/not-found.md?raw";
import { parseFrontmatter } from "@/lib/poemsData";

export interface NotFoundData {
  label: string;
  title: string;
  description: string;
  buttonLabel: string;
}

let cachedNotFound: NotFoundData | null = null;

export const getNotFoundData = (): NotFoundData => {
  if (cachedNotFound) return cachedNotFound;

  const { attributes } = parseFrontmatter(notFoundRaw as string);

  cachedNotFound = {
    label: attributes.label || "Pagină negăsită",
    title: attributes.title || "404",
    description:
      attributes.description ||
      "Se pare că ai ajuns într-o pagină care nu există.",
    buttonLabel: attributes.button_label || "Înapoi la Acasă",
  };

  return cachedNotFound;
};


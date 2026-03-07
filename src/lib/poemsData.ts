export interface Poem {
  id: string;
  title: string;
  content: string;
  date: string;
  excerpt: string;
  image?: string;
}

export function parseFrontmatter(raw: string): { attributes: Record<string, string>; body: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { attributes: {}, body: raw };

  const attrs: Record<string, string> = {};
  match[1].split("\n").forEach(line => {
    const idx = line.indexOf(":");
    if (idx > 0) {
      const key = line.slice(0, idx).trim();
      let val = line.slice(idx + 1).trim();
      // Remove surrounding quotes
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      attrs[key] = val;
    }
  });

  return { attributes: attrs, body: match[2].trim() };
}

// Import all markdown files at build time
const mdModules = import.meta.glob("/src/content/poems/*.md", { eager: true, query: "?raw", import: "default" }) as Record<string, string>;

function loadPoemsFromMarkdown(): Poem[] {
  const poems: Poem[] = [];

  for (const [path, raw] of Object.entries(mdModules)) {
    const { attributes, body } = parseFrontmatter(raw);
    const slug = path.split("/").pop()?.replace(".md", "") || "";

    poems.push({
      id: slug,
      title: attributes.title || "Fără titlu",
      content: body,
      date: attributes.date || "",
      excerpt: attributes.excerpt || body.slice(0, 100) + "...",
      image: attributes.image,
    });
  }

  // Sort by date descending
  poems.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return poems;
}

const ALL_POEMS = loadPoemsFromMarkdown();

export const getPoems = (): Poem[] => ALL_POEMS;

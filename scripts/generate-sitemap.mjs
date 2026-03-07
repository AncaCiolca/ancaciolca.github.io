import fs from "fs";
import path from "path";
import url from "url";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, "..");
const CONTENT_DIR = path.join(ROOT_DIR, "src", "content", "poems");
const PUBLIC_DIR = path.join(ROOT_DIR, "public");

const SITE_URL = "https://versuri-de-suflet.ro";

function getPoemSlugs() {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  return fs
    .readdirSync(CONTENT_DIR)
    .filter(name => name.endsWith(".md"))
    .map(name => name.replace(/\.md$/, ""));
}

function generateSitemapXml() {
  const slugs = getPoemSlugs();
  const urls = [
    "",
    "poezii",
    "despre-mine",
    ...slugs.map(slug => `poezii/${slug}`),
  ];

  const now = new Date().toISOString();

  const body = urls
    .map(
      route => `
  <url>
    <loc>${SITE_URL}/${route}</loc>
    <lastmod>${now}</lastmod>
  </url>`,
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;
}

function main() {
  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  }

  const xml = generateSitemapXml();
  const target = path.join(PUBLIC_DIR, "sitemap.xml");
  fs.writeFileSync(target, xml.trim() + "\n", "utf8");
  console.log(`Sitemap generated at ${target}`);
}

main();


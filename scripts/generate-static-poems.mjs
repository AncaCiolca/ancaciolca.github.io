import fs from "fs/promises";
import path from "path";
import url from "url";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");

const POEMS_DIR = path.join(projectRoot, "src", "content", "poems");
const SEO_GLOBAL_PATH = path.join(projectRoot, "src", "content", "seo-global.md");
const SEO_HOME_PATH = path.join(projectRoot, "src", "content", "seo-home.md");
const DIST_DIR = path.join(projectRoot, "dist");

function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { attributes: {}, body: raw.trim() };

  const attrs = {};
  match[1].split("\n").forEach(line => {
    const idx = line.indexOf(":");
    if (idx > 0) {
      const key = line.slice(0, idx).trim();
      let val = line.slice(idx + 1).trim();
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1);
      }
      attrs[key] = val;
    }
  });

  return { attributes: attrs, body: match[2].trim() };
}

async function loadSeoConfig() {
  const [globalRaw, homeRaw] = await Promise.all([
    fs.readFile(SEO_GLOBAL_PATH, "utf8"),
    fs.readFile(SEO_HOME_PATH, "utf8"),
  ]);

  const globalFm = parseFrontmatter(globalRaw);
  const homeFm = parseFrontmatter(homeRaw);

  const siteUrl =
    globalFm.attributes.site_url?.trim().replace(/\/+$/, "") ||
    "https://ancaciolca.github.io";
  const siteName = globalFm.attributes.site_name || "Anca Ciolca";
  const defaultDescription =
    globalFm.attributes.default_description ||
    "Un colț de liniște unde cuvintele prind aripi și se transformă în poezie. Descoperă versurile Ancăi Ciolca.";
  const ogLocale = globalFm.attributes.og_locale || "ro_RO";
  const favicon = globalFm.attributes.favicon || "/favicon.ico";
  const defaultOgImage =
    homeFm.attributes.og_image || "/uploads/hero-bg.jpg";

  return {
    siteUrl,
    siteName,
    defaultDescription,
    ogLocale,
    favicon,
    defaultOgImage,
  };
}

async function loadBaseHtmlAssets() {
  const indexHtmlPath = path.join(DIST_DIR, "index.html");
  const html = await fs.readFile(indexHtmlPath, "utf8");

  const headMatch = html.match(/<head>([\s\S]*?)<\/head>/i);
  const headInner = headMatch ? headMatch[1] : "";

  const charsetMeta =
    headInner.match(/<meta[^>]*charset[^>]*>/i)?.[0] ||
    '<meta charset="UTF-8" />';
  const viewportMeta =
    headInner.match(/<meta[^>]*name=["']viewport["'][^>]*>/i)?.[0] ||
    '<meta name="viewport" content="width=device-width, initial-scale=1.0" />';
  const faviconLink =
    headInner.match(/<link[^>]*rel=["']icon["'][^>]*>/i)?.[0] || "";

  const cssLinks = Array.from(
    headInner.matchAll(/<link[^>]*rel=["']stylesheet["'][^>]*>/gi),
  ).map(m => m[0]);

  const scriptTags = Array.from(
    headInner.matchAll(/<script[^>]*type=["']module["'][^>]*><\/script>/gi),
  ).map(m => m[0]);

  return {
    charsetMeta,
    viewportMeta,
    faviconLink,
    cssLinks,
    scriptTags,
  };
}

async function loadPoems() {
  const entries = await fs.readdir(POEMS_DIR);
  const poems = [];

  for (const file of entries) {
    if (!file.endsWith(".md")) continue;
    const slug = file.replace(/\.md$/, "");
    const fullPath = path.join(POEMS_DIR, file);
    const raw = await fs.readFile(fullPath, "utf8");
    const { attributes, body } = parseFrontmatter(raw);

    const title = attributes.title || "Fără titlu";
    const content = body;
    const excerpt =
      attributes.excerpt ||
      (body.replace(/\s+/g, " ").slice(0, 140).trim() + "…");
    const image = attributes.image || "";

    poems.push({ slug, title, content, excerpt, image });
  }

  return poems;
}

function buildPoemHtml({
  poem,
  seo,
  assets,
}) {
  const { slug, title, content, excerpt, image } = poem;
  const {
    siteUrl,
    siteName,
    defaultDescription,
    ogLocale,
    favicon,
    defaultOgImage,
  } = seo;

  const description = excerpt || defaultDescription;
  const pageUrl = `${siteUrl}/poezii/${slug}`;

  let ogImage = image || defaultOgImage;
  if (!/^https?:\/\//i.test(ogImage)) {
    ogImage = `${siteUrl}${ogImage}`;
  }

  const headParts = [
    assets.charsetMeta,
    assets.viewportMeta,
    `<title>${title} – ${siteName}</title>`,
    `<meta name="description" content="${escapeHtml(description)}" />`,
    `<link rel="canonical" href="${pageUrl}" />`,
    `<meta property="og:title" content="${escapeHtml(
      `${title} – ${siteName}`,
    )}" />`,
    `<meta property="og:description" content="${escapeHtml(
      description,
    )}" />`,
    `<meta property="og:type" content="article" />`,
    `<meta property="og:url" content="${pageUrl}" />`,
    `<meta property="og:image" content="${ogImage}" />`,
    `<meta property="og:site_name" content="${escapeHtml(siteName)}" />`,
    `<meta property="og:locale" content="${ogLocale}" />`,
    assets.faviconLink || `<link rel="icon" href="${favicon}" />`,
    ...assets.cssLinks,
    ...assets.scriptTags,
  ].filter(Boolean);

  const bodyHtml = `
    <div id="root">
      <main class="poem-detail-static">
        <article>
          <h1>${escapeHtml(title)}</h1>
          <div class="poem-text">${content
            .split("\n")
            .map(p => `<p>${escapeHtml(p)}</p>`)
            .join("\n")}</div>
        </article>
      </main>
    </div>
  `;

  return [
    "<!DOCTYPE html>",
    '<html lang="ro">',
    "<head>",
    headParts.join("\n    "),
    "</head>",
    "<body>",
    bodyHtml,
    "</body>",
    "</html>",
  ].join("\n");
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function ensureDir(dirPath) {
  await fs.mkdir(dirPath, { recursive: true });
}

async function main() {
  const [seo, assets, poems] = await Promise.all([
    loadSeoConfig(),
    loadBaseHtmlAssets(),
    loadPoems(),
  ]);

  for (const poem of poems) {
    const outDir = path.join(DIST_DIR, "poezii", poem.slug);
    const outPath = path.join(outDir, "index.html");
    await ensureDir(outDir);
    const html = buildPoemHtml({ poem, seo, assets });
    await fs.writeFile(outPath, html, "utf8");
  }
}

main().catch(err => {
  console.error("[generate-static-poems] Error:", err);
  process.exit(1);
});


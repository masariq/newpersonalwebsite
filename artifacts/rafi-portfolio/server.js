import compression from "compression";
import express from "express";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();
const port = Number(process.env.PORT ?? 3000);
const currentDir = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(currentDir, "dist", "public");
const indexHtml = readFileSync(path.join(publicDir, "index.html"), "utf8");
const pageMetadata = {
  "/": {
    title: "Rafi Ariq Maulana | Digital Marketer & Content Creator",
    description:
      "Meet Rafi Ariq Maulana, a digital marketer and content creator based in Indonesia, working alongside brands and teams.",
  },
  "/services": {
    title: "Services | Rafi Ariq Maulana",
    description:
      "Explore content and video, social media management, website design and development, and full partner services.",
  },
  "/contact": {
    title: "Contact | Rafi Ariq Maulana",
    description:
      "Tell Rafi about your project, monthly partnership, or remote role. Get in touch and expect a reply within 24 hours.",
  },
};

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error(`Invalid PORT value: ${process.env.PORT}`);
}

app.use(compression());
app.use(
  express.static(publicDir, {
    index: false,
    setHeaders(response, filePath) {
      if (filePath.endsWith(".html")) {
        response.setHeader("Cache-Control", "no-cache, must-revalidate");
      } else if (filePath.includes(`${path.sep}assets${path.sep}`)) {
        response.setHeader(
          "Cache-Control",
          "public, max-age=31536000, immutable",
        );
      } else {
        response.setHeader(
          "Cache-Control",
          "public, max-age=86400, stale-while-revalidate=604800",
        );
      }
    },
  }),
);

app.get(["/", "/services", "/contact"], (_req, res) => {
  const metadata = pageMetadata[_req.path];
  const escapeAttribute = (value) =>
    value
      .replaceAll("&", "&amp;")
      .replaceAll('"', "&quot;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");
  const replaceMeta = (
    html,
    attribute,
    key,
    value,
  ) =>
    html.replace(
      new RegExp(`<meta ${attribute}="${key}" content="[^"]*"\\s*\\/?>`),
      `<meta ${attribute}="${key}" content="${escapeAttribute(value)}" />`,
    );
  let html = indexHtml.replace(
    /<title>[\s\S]*?<\/title>/,
    `<title>${escapeAttribute(metadata.title)}</title>`,
  );
  html = replaceMeta(html, "name", "description", metadata.description);
  html = replaceMeta(html, "property", "og:title", metadata.title);
  html = replaceMeta(html, "property", "og:description", metadata.description);
  html = replaceMeta(html, "name", "twitter:title", metadata.title);
  html = replaceMeta(
    html,
    "name",
    "twitter:description",
    metadata.description,
  );
  res.setHeader("Cache-Control", "no-cache, must-revalidate");
  res.type("html").send(html);
});

app.listen(port, "0.0.0.0");

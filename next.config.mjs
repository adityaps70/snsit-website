/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: `npm run build` writes a plain HTML/CSS/JS site to ./out
  // that can be uploaded to any static host (Hostinger public_html, Vercel, Netlify).
  output: "export",
  images: { unoptimized: true },
  // GitHub Pages serves the site from /snsit-website, so the Pages workflow sets
  // PAGES_BASE_PATH. Local and Hostinger builds leave it unset and serve from "/".
  ...(process.env.PAGES_BASE_PATH ? { basePath: process.env.PAGES_BASE_PATH } : {}),
}
export default nextConfig

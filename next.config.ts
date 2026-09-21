import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      { source: "/pisos", destination: "/produtos", statusCode: 301 },
      { source: "/loja", destination: "/produtos", statusCode: 301 },
      { source: "/sobre", destination: "/quem-somos", statusCode: 301 },
      { source: "/blog", destination: "/", statusCode: 302 },
      { source: "/portas-brancas", destination: "/produtos", statusCode: 301 },
      { source: "/pisos/deck", destination: "/produtos/tipos/deck", statusCode: 301 },
      { source: "/pisos/assoalho", destination: "/produtos/tipos/assoalho", statusCode: 301 },
      { source: "/pisos/taco", destination: "/produtos/tipos/taco", statusCode: 301 },
      { source: "/pisos/piso-pronto", destination: "/produtos/tipos/piso-pronto", statusCode: 301 },
      { source: "/especiais/painel-ripado", destination: "/produtos/tipos/painel-ripado", statusCode: 301 },
      { source: "/piso-pronto-de-madeira-macica-ipe", destination: "/produtos/piso-pronto-de-madeira-macica-ipe", statusCode: 301 },
      { source: "/piso-pronto-de-madeira-macica-garapeira", destination: "/produtos/piso-pronto-de-madeira-macica-garapeira", statusCode: 301 },
      { source: "/piso-pronto-de-madeira-mcica-jatoba", destination: "/produtos/piso-pronto-de-madeira-macica-jatoba", statusCode: 301 },
      { source: "/piso-pronto-de-madeira-macica-cumaru", destination: "/produtos/piso-pronto-de-madeira-macica-cumaru", statusCode: 301 },
      { source: "/painel-ripado-de-madeira-macica-tauari", destination: "/produtos/painel-ripado-de-madeira-macica-tauari", statusCode: 301 },
      { source: "/piso-pronto-de-madeira-macica-muiracatiara", destination: "/produtos/piso-pronto-de-madeira-macica-muiracatiara", statusCode: 301 },
      { source: "/piso-pronto-de-madeira-macica-peroba-mica", destination: "/produtos/piso-pronto-de-madeira-macica-peroba-mica", statusCode: 301 },
      { source: "/assoalho-de-madeira-macica-cumaru-copia-5", destination: "/produtos/piso-pronto-de-madeira-macica-cumaru", statusCode: 301 },
      { source: "/assoalho-de-madeira-macica-cumaru-copia-2", destination: "/produtos/piso-pronto-de-madeira-macica-cumaru", statusCode: 301 },
      { source: "/2025/03/12/guia-completo-piso-pronto-de-madeira-macica-beleza-durabilidade-e-praticidade-para-seu-ambienteacica-tauari", destination: "/", statusCode: 302 },
      { source: "/piso-pronto-de-madeira-ma", destination: "/produtos/tipos/piso-pronto", statusCode: 301 },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
      {
        // Cache assets for 1 day
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, s-maxage=604800" }],
      },
      {
        // Cache favicon for 1 week
        source: "/favicon.ico",
        headers: [{ key: "Cache-Control", value: "public, max-age=604800, s-maxage=604800, immutable" }],
      },
      {
        // Cache media API responses for 1 day
        source: "/api/media/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, s-maxage=604800" }],
      },
      {
        // generic Rules for HTML pages - cache for 1 day
        source: "/((?!_next/static|assets|api|_next/image|favicon.ico|pesquisar|es/pesquisar|en/search|admin).*)",
        headers: [{ key: "Cache-Control", value: "public, max-age=0, s-maxage=86400, stale-while-revalidate=86400" }],
      },
      {
        // Remove caching for all other API routes
        source: "/api/((?!media).*)",
        headers: [{ key: "Cache-Control", value: "private, no-cache, no-store, must-revalidate" }],
      },
      {
        // no cache in /admin
        source: "/admin(.*)",
        headers: [{ key: "Cache-Control", value: "private, no-cache, no-store, must-revalidate" }],
      },
    ];
  },
};

export default withPayload(nextConfig);

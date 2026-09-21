import { fetchProducts } from "@/collections/Products/data";
import { fetchAllProductCategories } from "@/collections/ProductsCategory/data";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await fetchProducts();
  const productCategories = await fetchAllProductCategories();

  // Páginas estáticas
  const sitemap: MetadataRoute.Sitemap = [
    {
      url: `${process.env.SITE_URL}`,
    },
    {
      url: `${process.env.SITE_URL}/quem-somos`,
    },
    {
      url: `${process.env.SITE_URL}/projetos`,
    },
    {
      url: `${process.env.SITE_URL}/produtos`,
    },
    {
      url: `${process.env.SITE_URL}/parceria-com-arquitetos`,
    },
    {
      url: `${process.env.SITE_URL}/contato`,
    },
  ];

  products.forEach((product) => {
    sitemap.push({
      url: `${process.env.SITE_URL}${product.relPermalink}`,
      lastModified: new Date(product.updatedAt),
    });
  });

  productCategories.forEach((product) => {
    sitemap.push({
      url: `${process.env.SITE_URL}${product.relPermalink}`,
      lastModified: new Date(product.updatedAt),
    });
  });

  return sitemap;
}

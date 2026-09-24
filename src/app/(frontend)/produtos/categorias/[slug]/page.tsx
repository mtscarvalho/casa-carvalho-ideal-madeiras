import { notFound } from "next/navigation";

import { fetchProducts } from "@/collections/Products/data";
import { fetchAllProductCategories, fetchProductCategoryBySlug } from "@/collections/ProductsCategory/data";
import { ProductListing } from "@/components/ProductListing";
import CallToAction from "@/sections/CallToAction";
import { createMetadata } from "@/utilities/create-metadata";

type PageArgs = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageArgs) {
  const { slug } = await params;
  const category = await fetchProductCategoryBySlug(slug);

  if (!category) notFound();

  return createMetadata({
    path: category.relPermalink,
    title: `${category.title} | Produtos`,
    description: `Conheça os produtos da categoria ${category.title} da Ideal Madeiras.`,
  });
}

export default async function Page({ params }: PageArgs) {
  const { slug } = await params;
  const category = await fetchProductCategoryBySlug(slug);

  if (!category) notFound();

  const [products, categories] = await Promise.all([fetchProducts({ category: category.id }), fetchAllProductCategories()]);

  return (
    <main id="conteudo">
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mb-10 space-y-3">
            <p className="overtitle text-primary text-sm">Categoria de produtos</p>
            <h1 className="heading-md">{category.title}</h1>
            <p className="text-subtle">
              {products.length} {products.length === 1 ? "produto disponível" : "produtos disponíveis"}
            </p>
          </div>
          <ProductListing products={products} categories={categories} activeCategoryId={category.id} />
        </div>
      </section>
      <CallToAction />
    </main>
  );
}

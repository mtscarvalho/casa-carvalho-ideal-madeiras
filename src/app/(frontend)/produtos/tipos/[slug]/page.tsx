import { createMetadata } from "@/utilities/create-metadata";

import { fetchProductCategoryBySlug } from "@/collections/ProductsCategory/data";
import { ProductsArchive } from "@/components/ProductsArchive";
import CallToAction from "@/sections/CallToAction";
import { notFound } from "next/navigation";

type PageArgs = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: PageArgs) {
  const { slug } = await params;
  const post = await fetchProductCategoryBySlug(slug);

  return createMetadata({
    path: `/produtos/${slug}`,
    title: `${post.title} | Produtos`,
    description: "Explore nossa linha completa! Produtos de alto padrão, com qualidade, durabilidade e sofisticação para projetos residenciais e arquitetônicos.",
  });
}

export default async function Page({ params }: PageArgs) {
  const { slug } = await params;
  const category = await fetchProductCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  return (
    <main>
      <section className="pt-6 pb-24">
        <div className="container">
          <ProductsArchive filterByCategory={category} />
        </div>
      </section>

      <CallToAction />
    </main>
  );
}

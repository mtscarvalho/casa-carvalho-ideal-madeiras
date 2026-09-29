import { fetchProducts } from "@/collections/Products/data";
import { fetchAllProductCategories } from "@/collections/ProductsCategory/data";
import { ProductListing } from "@/components/ProductListing";
import { createMetadata } from "@/utilities/create-metadata";

export const dynamic = "force-dynamic";

export function generateMetadata() {
  return createMetadata({
    path: "/produtos",
    title: "Produtos",
    description: "Explore nossa linha completa! Produtos de alto padrão, com qualidade, durabilidade e sofisticação para projetos residenciais e arquitetônicos.",
  });
}

type PageProps = {
  searchParams: Promise<{ q?: string | string[] }>;
};

export default async function Page({ searchParams }: PageProps) {
  const { q } = await searchParams;
  const searchTerm = (Array.isArray(q) ? q[0] : q)?.trim().slice(0, 100);
  const [products, categories] = await Promise.all([fetchProducts({ title: searchTerm }), fetchAllProductCategories()]);
  const isSearching = Boolean(searchTerm);

  return (
    <main id="conteudo">
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mb-10 space-y-3">
            <p className="overtitle text-primary text-sm">Catálogo</p>
            <h1 className="heading-md">{isSearching ? "Resultados da busca" : "Todos os produtos"}</h1>
            <p className="text-subtle max-w-2xl">{isSearching ? `Resultados para “${searchTerm}”` : "Explore nossa linha de produtos em madeira para o seu projeto."}</p>
          </div>
          <ProductListing products={products} categories={categories} emptyMessage={isSearching ? `Nenhum produto encontrado para “${searchTerm}”.` : undefined} />
        </div>
      </section>
    </main>
  );
}

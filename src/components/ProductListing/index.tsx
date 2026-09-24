import Link from "next/link";
import type { ReactNode } from "react";

import { ProductCard } from "@/components/ProductCard";
import type { Product, ProductsCategory } from "@/payload-types";

type ProductListingProps = {
  products: Product[];
  categories: ProductsCategory[];
  activeCategoryId?: number;
  toolbar?: ReactNode;
  emptyMessage?: string;
};

export function ProductListing({ products, categories, activeCategoryId, toolbar, emptyMessage }: ProductListingProps) {
  return (
    <>
      <nav aria-label="Categorias de produtos" className="mb-10 flex flex-wrap gap-2">
        <Link href="/produtos" aria-current={activeCategoryId === undefined ? "page" : undefined} className={`rounded-full border px-4 py-2 text-sm transition-colors ${activeCategoryId === undefined ? "border-primary bg-primary text-on-primary" : "border-subtle hover:bg-subtle"}`}>
          Todos os produtos
        </Link>
        {categories.map((category) => (
          <Link key={category.id} href={category.relPermalink} aria-current={activeCategoryId === category.id ? "page" : undefined} className={`rounded-full border px-4 py-2 text-sm transition-colors ${activeCategoryId === category.id ? "border-primary bg-primary text-on-primary" : "border-subtle hover:bg-subtle"}`}>
            {category.title}
          </Link>
        ))}
      </nav>

      <div className="grid grid-cols-[300px_1fr] gap-10">
        {toolbar}

        {products.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        ) : (
          <p className="border-subtle bg-subtle rounded-xl border p-8 text-center">{emptyMessage ?? (activeCategoryId === undefined ? "Nenhum produto disponível no momento." : "Nenhum produto disponível nesta categoria no momento.")}</p>
        )}
      </div>
    </>
  );
}

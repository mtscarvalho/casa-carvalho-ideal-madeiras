import type { ReactNode } from "react";

import { ProductCard } from "@/components/ProductCard";
import { cn } from "@/lib/utils";
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
      <div className={cn("grid items-start gap-6", toolbar ? "grid-cols-[300px_1fr]" : "grid-cols-1")}>
        {toolbar}

        {products.length > 0 ? (
          <div className={cn("grid gap-4", toolbar ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-4")}>
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

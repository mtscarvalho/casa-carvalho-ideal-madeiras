import Link from "next/link";

import { fetchProducts } from "@/collections/Products/data";
import { fetchAllProductCategories } from "@/collections/ProductsCategory/data";

import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { ProductsCategory } from "@/payload-types";

type ProductsArchiveProps = {
  filterByCategory?: ProductsCategory;
};

export async function ProductsArchive({ filterByCategory }: ProductsArchiveProps) {
  const products = await fetchProducts({ category: filterByCategory?.id });
  const categories = await fetchAllProductCategories();

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <div className="lg:col-span-3">
        <h3 className="border-copper-100 mb-3 border-b pb-3 pl-3 text-base font-bold tracking-widest uppercase">Tipos</h3>
        <ul className="">
          <li>
            <Button fullwidth variant="ghost" asChild>
              <Link href="/produtos">
                {!filterByCategory && <span className="bg-secondary inline-block size-2 rounded-full"></span>}
                Todos os tipos
              </Link>
            </Button>
          </li>
          {categories.map((category) => (
            <li key={category.id}>
              <Button variant="ghost" fullwidth asChild>
                <Link href={category.relPermalink}>
                  {filterByCategory?.slug == category.slug && <span className="bg-secondary inline-block size-2 rounded-full"></span>}
                  {category.title}
                </Link>
              </Button>
            </li>
          ))}
        </ul>
      </div>
      <div className="lg:col-span-9">
        <ul className="grid gap-x-3 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <li key={product.id}>
              <ProductCard {...product} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

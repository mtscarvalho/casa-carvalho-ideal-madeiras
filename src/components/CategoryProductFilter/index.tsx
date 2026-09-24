"use client";

import { useMemo, useState } from "react";

import { ProductListing } from "@/components/ProductListing";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type { Product, ProductsCategory } from "@/payload-types";
import { formatProductSize } from "@/utilities/format-product-size";

type CategoryProductFilterProps = {
  products: Product[];
  categories: ProductsCategory[];
  categoryId: number;
};

const CUSTOM_MADE_KEY = "customMade";

export function CategoryProductFilter({ products, categories, categoryId }: CategoryProductFilterProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const filterOptions = useMemo(() => {
    const options = new Map<string, { label: string; count: number }>();
    let customMadeCount = 0;

    for (const product of products) {
      if (product.sizes?.customMade) customMadeCount += 1;

      const productSizes = new Set<string>();

      for (const size of product.sizes?.list ?? []) {
        const label = formatProductSize(size);
        if (!label) continue;

        const key = label;
        if (productSizes.has(key)) continue;

        productSizes.add(key);
        const existing = options.get(key);
        options.set(key, { label, count: (existing?.count ?? 0) + 1 });
      }
    }

    const sizeOptions = [...options].map(([key, value]) => ({ key, ...value })).sort((a, b) => a.label.localeCompare(b.label, "pt-BR", { numeric: true }));

    if (customMadeCount > 0) {
      sizeOptions.push({ key: CUSTOM_MADE_KEY, label: "Sob medida", count: customMadeCount });
    }

    return sizeOptions;
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (selectedOptions.length === 0) return products;

    const selected = new Set(selectedOptions);
    return products.filter(
      (product) =>
        (selected.has(CUSTOM_MADE_KEY) && product.sizes?.customMade) ||
        product.sizes?.list?.some((size) => {
          const label = formatProductSize(size);
          return label !== null && selected.has(label);
        }),
    );
  }, [products, selectedOptions]);

  const toolbar = filterOptions.length > 0 && (
    <div className="border-subtle bg-subtle mb-8 rounded-xl border p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-bold">Filtrar por medidas</h2>
        {selectedOptions.length > 0 && (
          <Button type="button" variant="ghost" size="sm" onClick={() => setSelectedOptions([])}>
            Limpar filtros
          </Button>
        )}
      </div>
      <fieldset>
        <legend className="sr-only">Selecione uma ou mais opções de medidas</legend>
        <div className="flex flex-col gap-3">
          {filterOptions.map(({ key, label, count }, index) => {
            const id = `category-${categoryId}-size-${index}`;

            return (
              <div key={key} className="flex items-center gap-2">
                <Checkbox id={id} checked={selectedOptions.includes(key)} onCheckedChange={(checked) => setSelectedOptions((current) => (checked === true ? [...current, key] : current.filter((option) => option !== key)))} />
                <Label htmlFor={id} className="cursor-pointer font-normal">
                  {label} <span className="text-subtle">({count})</span>
                </Label>
              </div>
            );
          })}
        </div>
      </fieldset>
      {selectedOptions.length > 0 && (
        <p className="text-subtle mt-4 text-sm" aria-live="polite">
          {filteredProducts.length} {filteredProducts.length === 1 ? "produto encontrado" : "produtos encontrados"}
        </p>
      )}
    </div>
  );

  return <ProductListing products={filteredProducts} categories={categories} activeCategoryId={categoryId} toolbar={toolbar} emptyMessage={selectedOptions.length > 0 ? "Nenhum produto encontrado para os filtros selecionados." : undefined} />;
}

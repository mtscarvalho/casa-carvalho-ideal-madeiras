import type { Product } from "@/payload-types";

type ProductSize = NonNullable<NonNullable<Product["sizes"]>["list"]>[number];

export function formatProductSize(size: ProductSize | null | undefined): string | null {
  const width = size?.width?.trim();
  const height = size?.height?.trim();
  const dimensions = [width && `${width} cm (L)`, height && `${height} cm (A)`].filter(Boolean);

  return dimensions.length > 0 ? dimensions.join(" × ") : null;
}

import { draftMode } from "next/headers";

import config from "@payload-config";
import { getPayload } from "payload";

import { ProductsCategory } from "@/payload-types";

const payload = await getPayload({ config });

export const fetchAllProductCategories = async (): Promise<ProductsCategory[]> => {
  const { isEnabled: draft } = await draftMode();

  // Busca todas as categorias
  const { docs: categories } = await payload.find({
    collection: "productsCategory",
    depth: 2,
    draft,
    limit: 0,
    where: {
      and: [...(draft ? [] : [{ _status: { equals: "published" } }])],
    },
  });

  // Filtra apenas as categorias que têm posts
  const filtered = categories.filter((category: ProductsCategory) => {
    const posts = category?.products?.docs ?? [];
    return posts.length > 0;
  });

  return filtered;
};

export const fetchProductCategoryBySlug = async (slug: string): Promise<ProductsCategory> => {
  const { isEnabled: draft } = await draftMode();
  const data = await payload.find({
    collection: "productsCategory",
    depth: 1,
    draft,
    limit: 1,
    where: {
      and: [{ slug: { equals: slug } }, ...(draft ? [] : [{ _status: { equals: "published" } }])],
    },
  });

  return data.docs[0];
};

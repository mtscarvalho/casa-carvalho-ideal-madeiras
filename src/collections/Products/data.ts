import { draftMode } from "next/headers";

import config from "@payload-config";
import { getPayload } from "payload";

import type { Where } from "payload";

import { Product } from "@/payload-types";

const payload = await getPayload({ config });

export const fetchProductBySlug = async (slug: string): Promise<Product> => {
  const { isEnabled: draft } = await draftMode();
  const data = await payload.find({
    collection: "products",
    depth: 1,
    draft,
    limit: 1,
    where: {
      and: [{ slug: { equals: slug } }, ...(draft ? [] : [{ _status: { equals: "published" } }])],
    },
  });

  return data.docs[0];
};

type FetchProductsOptions = {
  category?: number;
  excludeId?: number;
  limit?: number;
};

export const fetchProducts = async (options?: FetchProductsOptions): Promise<Product[]> => {
  const { isEnabled: draft } = await draftMode();

  const whereConditions: Where[] = [];

  if (options?.category !== undefined) {
    whereConditions.push({
      category: {
        equals: options.category,
      },
    });
  }

  if (options?.excludeId !== undefined) {
    whereConditions.push({
      id: {
        not_equals: options.excludeId,
      },
    });
  }

  if (!draft) {
    whereConditions.push({
      _status: {
        equals: "published",
      },
    });
  }

  const { docs } = await payload.find({
    collection: "products",
    depth: 1,
    draft,
    sort: "title",
    limit: options?.limit ?? 0,
    where: {
      and: whereConditions,
    },
  });

  return docs;
};

import { relPermalinkField } from "@/fields/relpermalink";
import { slugField } from "@/fields/slug";
import { revalidatePath } from "next/cache";

import type { CollectionConfig } from "payload";

export const ProductsCategory: CollectionConfig = {
  slug: "productsCategory",
  labels: {
    singular: "Categoria",
    plural: "Categorias",
  },
  access: {
    read: () => true,
    create: () => false,
    update: () => true,
    delete: () => false,
  },
  admin: {
    useAsTitle: "title",
    group: "Produtos",
  },
  versions: {
    drafts: {
      autosave: true,
    },
  },
  hooks: {
    afterChange: [
      ({ operation }) => {
        if (operation === "update") {
          revalidatePath("/", "layout");
        }
      },
    ],
  },
  fields: [
    slugField(),
    relPermalinkField("/produtos/categorias"),
    {
      name: "title",
      label: "Título",
      type: "text",
      required: true,
    },
    {
      label: "Produtos relacionados",
      type: "group",
      fields: [
        {
          name: "products",
          label: "Produtos relacionados",
          type: "join",
          collection: "products",
          on: "category",
          admin: {
            defaultColumns: ["title", "image"],
          },
        },
      ],
    },
  ],
};

import { revalidatePath } from "next/cache";

import type { CollectionConfig } from "payload";

export const ProductsPattern: CollectionConfig = {
  slug: "productsPattern",
  labels: {
    singular: "Paginação",
    plural: "Paginações",
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
          on: "pattern",
          admin: {
            defaultColumns: ["title", "image"],
          },
        },
      ],
    },
  ],
};

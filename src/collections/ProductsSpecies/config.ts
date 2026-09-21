import { revalidatePath } from "next/cache";

import type { CollectionConfig } from "payload";

export const ProductsSpecies: CollectionConfig = {
  slug: "productsSpecies",
  labels: {
    singular: "Essência",
    plural: "Essências",
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
          on: "specie",
          admin: {
            defaultColumns: ["title", "image"],
          },
        },
      ],
    },
  ],
};

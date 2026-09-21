import { revalidatePath } from "next/cache";

import type { CollectionConfig } from "payload";

import { relPermalinkField } from "@/fields/relpermalink";
import { slugField } from "@/fields/slug";

export const Products: CollectionConfig = {
  slug: "products",
  labels: {
    singular: "Produto",
    plural: "Produtos",
  },
  admin: {
    useAsTitle: "title",
    group: "Produtos",
  },
  versions: {
    drafts: {
      autosave: false,
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
      name: "category",
      label: "Categoria",
      type: "relationship",
      relationTo: "productsCategory",
      required: true,
    },
    {
      name: "title",
      label: "Nome",
      type: "text",
      required: true,
      admin: {
        placeholder: "Piso Pronto de Madeira Cumaru Ferro",
      },
    },
    {
      name: "description",
      label: "Descrição",
      type: "textarea",
      required: true,
      admin: {
        placeholder: "Altamente resistente, com tons castanho-dourados e acabamento nobre, ideal para ambientes elegantes e de longa durabilidade.",
      },
    },
    {
      name: "images",
      label: "Imagem",
      type: "upload",
      relationTo: "media",
      required: true,
      hasMany: true,
    },
    {
      name: "sizes",
      label: "Medidas",
      labels: {
        plural: "Medidas",
        singular: "Medidas",
      },
      type: "array",
      fields: [
        {
          name: "size",
          label: false,
          type: "text",
          required: true,
          admin: {
            placeholder: "80x180cm",
          },
        },
      ],
    },
    {
      name: "content",
      label: "Conteúdo",
      type: "richText",
      required: true,
    },

    // ================================
    // SIDEBAR
    // ================================

    slugField(),
    relPermalinkField("/produtos"),
  ],
};

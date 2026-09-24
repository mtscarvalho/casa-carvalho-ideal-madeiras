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
      label: false,
      type: "group",
      fields: [
        {
          name: "list",
          label: "Medidas",
          labels: {
            plural: "Medidas",
            singular: "Medidas",
          },
          type: "array",
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "width",
                  label: "Largura",
                  type: "text",
                  admin: {
                    placeholder: "80",
                    description: "Em centímetros.",
                  },
                },
                {
                  name: "thickness",
                  label: "Espessura",
                  type: "text",
                  admin: {
                    placeholder: "3,5",
                    description: "Em centímetros.",
                  },
                },
                {
                  name: "height",
                  label: "Altura",
                  type: "text",
                  admin: {
                    placeholder: "210",
                    description: "Em centímetros.",
                  },
                },
              ],
            },
          ],
        },
        {
          name: "customMade",
          label: "Disponível sob medida",
          type: "checkbox",
          admin: {
            description: "Marque esta opção se o produto também puder ser fabricado em medidas personalizadas.",
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

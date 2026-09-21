import { revalidatePath } from "next/cache";

import type { CollectionConfig } from "payload";

import { relPermalinkField } from "@/fields/relpermalink";
import { slugField } from "@/fields/slug";
import { isYouTubeUrl } from "@/utilities/is-youtube-url";

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
      name: "title",
      label: "Nome",
      type: "text",
      required: true,
      admin: {
        placeholder: "Piso Pronto de Madeira Cumaru Ferro",
      },
    },
    {
      name: "category",
      label: "Categoria",
      type: "relationship",
      relationTo: "productsCategory",
      required: true,
    },
    {
      name: "specie",
      label: "Essência",
      type: "relationship",
      relationTo: "productsSpecies",
      required: true,
    },
    {
      name: "scientificName",
      label: "Nome científico",
      type: "text",
      admin: {
        placeholder: "Dipteryx odorata",
      },
    },
    {
      name: "collection",
      label: "Coleção",
      type: "text",
      admin: {
        placeholder: "Exotic Collection",
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

    // ================================
    // IMAGENS
    // ================================

    {
      type: "array",
      name: "images",
      label: "Imagens",
      labels: {
        singular: "Imagem",
        plural: "Imagens",
      },
      fields: [
        {
          name: "media",
          label: "Imagem",
          type: "upload",
          relationTo: "media",
          required: true,
        },
        {
          name: "color",
          label: "Iluminação",
          type: "select",
          options: [
            { label: "Quente", value: "warm" },
            { label: "Fria", value: "cool" },
          ],
          admin: {
            position: "sidebar",
          },
        },
        {
          name: "badge",
          label: "Selo",
          type: "select",
          options: [
            { label: "IA", value: "ia" },
            { label: "Obra real", value: "real" },
          ],
          admin: {
            position: "sidebar",
          },
        },
      ],
    },

    // ================================
    // Tamanhos
    // ================================

    {
      type: "array",
      name: "sizes",
      label: "Tamanhos",
      labels: {
        singular: "Tamanho",
        plural: "Tamanhos",
      },
      fields: [
        {
          name: "width",
          label: "Largura",
          type: "text",
          admin: {
            placeholder: "",
          },
        },
        {
          name: "length",
          label: "Comprimento",
          type: "text",
          admin: {
            placeholder: "",
          },
        },
        {
          name: "thickness",
          label: "Espessura",
          type: "text",
          admin: {
            placeholder: "",
          },
        },
        {
          type: "group",
          name: "price",
          label: "Valores",
          fields: [
            {
              type: "group",
              name: "materialOnly",
              label: "Apenas material",
              fields: [
                {
                  name: "priceOf",
                  label: "Valor sem desconto",
                  type: "number",
                  admin: {
                    placeholder: "",
                  },
                },
                {
                  name: "price",
                  label: "Valor",
                  type: "number",
                  admin: {
                    placeholder: "",
                  },
                },
              ],
            },
            {
              type: "group",
              name: "withInstalation",
              label: "Com instalação",
              fields: [
                {
                  name: "priceOf",
                  label: "Valor sem desconto",
                  type: "number",
                  admin: {
                    placeholder: "",
                  },
                },
                {
                  name: "price",
                  label: "Valor",
                  type: "number",
                  admin: {
                    placeholder: "",
                  },
                },
              ],
            },
          ],
        },
      ],
    },

    // ================================
    // ESPECIFICAÇÃO
    // ================================

    {
      type: "group",
      label: "Especificações técnicas",
      fields: [
        {
          name: "composition",
          label: "Composição",
          type: "select",
          required: true,
          options: [{ label: "Madeira Maciça", value: "madeira-macica" }],
          admin: {
            position: "sidebar",
          },
        },
        {
          name: "jointType",
          label: "Encaixe",
          type: "select",
          required: true,
          options: [{ label: "Macho e fêmea", value: "macho-e-femea" }],
          admin: {
            position: "sidebar",
          },
        },
        {
          name: "installation",
          label: "Método(s) de instalação",
          type: "select",
          required: true,
          options: [
            { label: "Grampo", value: "grampo" },
            { label: "Cola", value: "cola" },
            { label: "Prego", value: "prego" },
            { label: "Flutuante", value: "flutuante" },
          ],
          hasMany: true,
        },
        {
          name: "finish",
          label: "Acabamento(s)",
          type: "select",
          required: true,
          options: [
            { label: "Matte 8% Bona UV – 8 camadas", value: "matte" },
            { label: "Stain 30%  Bona UV – 8 camadas", value: "stain" },
          ],
          hasMany: true,
        },
        {
          name: "pattern",
          label: "Paginação",
          type: "relationship",
          relationTo: "productsPattern",
          required: true,
        },
        {
          name: "janka",
          label: "Dureza (Janka)",
          type: "text",
          admin: {
            placeholder: "3.540 lbf (15.700N)",
          },
        },
        {
          name: "density",
          label: "Densidade",
          type: "text",
          admin: {
            placeholder: "Madeira seca possui 1000kg/m3 - pesada",
          },
        },
      ],
    },

    // ================================
    // COMPLEMENTAR
    // ================================

    {
      type: "group",
      label: "Adicionais",
      fields: [
        {
          name: "tutorial",
          type: "text",
          label: "Vídeo de instalação",
          required: true,
          admin: {
            placeholder: "https://www.youtube.com/watch?v=vXYVfk7agqU",
          },
          validate: (value: string | undefined | null) => {
            if (value && !isYouTubeUrl(value)) {
              return "URL inválida. Por favor, insira uma URL válida.";
            }
            return true;
          },
        },
      ],
    },

    // ================================
    // ESPECIFICAÇÃO
    // ================================

    {
      name: "image",
      label: "Imagem",
      type: "upload",
      relationTo: "media",
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
    {
      name: "layout",
      type: "select",
      required: true,
      options: [
        { label: "Antigo", value: "old" },
        { label: "Novo", value: "new" },
      ],
      defaultValue: "old",
      admin: {
        position: "sidebar",
      },
    },
  ],
};

import { GlobalConfig } from "payload";

export const Homepage: GlobalConfig = {
  slug: "homepage",
  label: "Página inicial",
  access: {
    read: () => true,
  },
  admin: {
    group: "Páginas",
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Abertura",
          fields: [
            {
              type: "array",
              name: "hero",
              minRows: 1,
              maxRows: 4,
              required: true,
              fields: [
                {
                  name: "title",
                  label: "Título",
                  type: "text",
                  required: true,
                },
                {
                  name: "description",
                  label: "Descrição",
                  type: "textarea",
                  required: true,
                },
                {
                  name: "image",
                  label: "Imagem",
                  type: "upload",
                  relationTo: "media",
                  required: true,
                  admin: {
                    description: "Dimensão recomendada: 1920x1080 no formato AVIF. Use o https://squoosh.app/ para converter e otimizar a imagem.",
                  },
                },
                {
                  type: "group",
                  label: "Botão",
                  name: "button",
                  fields: [
                    {
                      name: "label",
                      label: "Rótulo",
                      type: "text",
                      required: true,
                    },
                    {
                      name: "url",
                      label: "URL",
                      type: "text",
                      required: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

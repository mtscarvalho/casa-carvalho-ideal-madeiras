import { revalidatePath } from "next/cache";

import type { CollectionConfig } from "payload";

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  labels: {
    singular: "Depoimento",
    plural: "Depoimentos",
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "name",
    group: "Globais",
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
      name: "name",
      label: "Nome",
      type: "text",
      required: true,
      admin: {
        placeholder: "Laise Sanches",
      },
    },
    {
      name: "content",
      label: "Conteúdo",
      type: "textarea",
      required: true,
    },
  ],
};

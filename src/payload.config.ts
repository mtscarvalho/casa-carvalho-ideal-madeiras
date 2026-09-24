import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

import { postgresAdapter } from "@payloadcms/db-postgres";
import { BlockquoteFeature, BoldFeature, FixedToolbarFeature, HeadingFeature, ItalicFeature, lexicalEditor, LinkFeature, LinkFields, OrderedListFeature, ParagraphFeature, UnderlineFeature, UnorderedListFeature } from "@payloadcms/richtext-lexical";
import { buildConfig, TextFieldSingleValidation } from "payload";

import { pt } from "@payloadcms/translations/languages/pt";

import { seoPlugin } from "@payloadcms/plugin-seo";
import { s3Storage } from "@payloadcms/storage-s3";

import { Media } from "@/collections/Media/config";
import { Posts } from "@/collections/Posts/config";
import { Products } from "@/collections/Products/config";
import { ProductsCategory } from "@/collections/ProductsCategory/config";
import { Users } from "@/collections/Users/config";

import { Homepage } from "./globals/Homepage/config";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  experimental: {
    localizeStatus: true,
  },
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: `| ${process.env.SITE_TITLE}`,
      icons: [
        {
          type: "image/png",
          rel: "icon",
          url: "/payload-favicon.svg",
        },
      ],
    },
    components: {
      graphics: {
        Icon: "/components/Payload/DashboardIcon/index.tsx",
        Logo: "/components/Payload/DashboardLogo/index.tsx",
      },
    },
  },
  i18n: {
    supportedLanguages: { pt },
  },
  editor: lexicalEditor({
    features: () => [
      FixedToolbarFeature(),
      ParagraphFeature(),
      UnderlineFeature(),
      BoldFeature(),
      ItalicFeature(),
      OrderedListFeature(),
      UnorderedListFeature(),
      BlockquoteFeature(),
      HeadingFeature({ enabledHeadingSizes: ["h2", "h3", "h4", "h5", "h6"] }),
      LinkFeature({
        enabledCollections: ["posts"],
        fields: ({ defaultFields }) => {
          const defaultFieldsWithoutUrl = defaultFields.filter((field) => {
            if ("name" in field && field.name === "url") return false;
            return true;
          });

          return [
            ...defaultFieldsWithoutUrl,
            {
              name: "url",
              type: "text",
              admin: {
                condition: (_data, siblingData) => siblingData?.linkType !== "internal",
              },
              label: ({ t }) => t("fields:enterURL"),
              required: true,
              validate: ((value, options) => {
                if ((options?.siblingData as LinkFields)?.linkType === "internal") {
                  return true;
                }
                return value ? true : "URL is required";
              }) as TextFieldSingleValidation,
            },
          ];
        },
      }),
    ],
  }),
  collections: [Users, Posts, Media, Products, ProductsCategory],
  globals: [Homepage],
  secret: process.env.PAYLOAD_SECRET || "",
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL || "" },
  }),
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  sharp,
  plugins: [
    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env.CLOUDFLARE_R2_BUCKET!,
      config: {
        endpoint: new URL(process.env.CLOUDFLARE_R2_ENDPOINT!).href,
        credentials: {
          accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID!,
          secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY!,
        },
        region: "auto",
      },
    }),
    seoPlugin({}),
  ],
});

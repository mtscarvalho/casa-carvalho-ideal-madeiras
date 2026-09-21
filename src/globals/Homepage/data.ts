import { cache } from "react";

import config from "@payload-config";
import { getPayload } from "payload";

import type { Homepage } from "@/payload-types";

const payload = await getPayload({ config });

export const fetchHomepage = cache(async (): Promise<Homepage> => {
  const data = await payload.findGlobal({
    slug: "homepage",
    depth: 2,
  });

  return data;
});

"use client";

import { GroupField, useFormFields } from "@payloadcms/ui";
import type { GroupFieldClientProps } from "payload";
import { useEffect, useState } from "react";

const supportedCategorySlugs = ["portas", "janelas", "pisos", "vitros"];

export const ConditionalProductMeasurementsField = (props: GroupFieldClientProps) => {
  const category = useFormFields(([fields]) => fields.category?.value);
  const categoryID = typeof category === "object" && category !== null && "id" in category ? category.id : category;
  const [isSupportedCategory, setIsSupportedCategory] = useState(false);

  useEffect(() => {
    if (!categoryID) {
      setIsSupportedCategory(false);
      return;
    }

    let isCurrent = true;

    const loadCategory = async () => {
      const response = await fetch(`/api/productsCategory/${categoryID}?depth=0`);

      if (!response.ok) {
        throw new Error("Unable to load product category.");
      }

      const category = (await response.json()) as { slug?: string };

      if (isCurrent) {
        setIsSupportedCategory(supportedCategorySlugs.includes(category.slug ?? ""));
      }
    };

    loadCategory().catch(() => {
      if (isCurrent) {
        setIsSupportedCategory(false);
      }
    });

    return () => {
      isCurrent = false;
    };
  }, [categoryID]);

  return isSupportedCategory ? <GroupField {...props} /> : null;
};

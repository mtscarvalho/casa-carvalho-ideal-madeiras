"use client";

import { RelationshipField, useFormFields } from "@payloadcms/ui";
import type { RelationshipFieldClientProps } from "payload";
import { useEffect, useState } from "react";

export const ConditionalProductAttributeField = (props: RelationshipFieldClientProps) => {
  const category = useFormFields(([fields]) => fields.category?.value);
  const categoryID = typeof category === "object" && category !== null && "id" in category ? category.id : category;
  const supportedCategorySlugs = props.field.name === "rooms" ? ["fechaduras"] : ["fechaduras", "puxadores"];
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

  if (!isSupportedCategory) {
    return null;
  }

  return <RelationshipField {...props} field={{ ...props.field, required: true }} />;
};

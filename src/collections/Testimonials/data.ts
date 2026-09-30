import config from "@payload-config";
import { getPayload } from "payload";

import { Testimonial } from "@/payload-types";

const payload = await getPayload({ config });

export const fetchAllTestimonials = async (): Promise<Testimonial[]> => {
  const { docs } = await payload.find({
    collection: "testimonials",
    limit: 0,
    sort: "-createdAt",
  });

  return docs;
};

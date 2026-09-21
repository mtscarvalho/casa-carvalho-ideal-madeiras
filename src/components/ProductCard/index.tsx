import { Media, Product } from "@/payload-types";
import Link from "next/link";
import { PayloadImage } from "../Payload/Image";

export function ProductCard({ title, image, description, relPermalink }: Product) {
  return (
    <Link href={relPermalink} className="bg-copper-50 border-copper-100 relative block h-full space-y-2 rounded-md border p-3 text-base">
      <PayloadImage image={image as Media} alt={title} className="mb-5 aspect-3/4 rounded-md object-cover" />
      <h3 className="text-primary text-xl leading-[1.2] font-bold text-balance">{title}</h3>
      <p className="">{description}</p>
      <span className="bg-copper-700 absolute top-6 left-6 rounded-md border border-white px-2 py-1 text-xs text-white">Fabricação própia</span>
    </Link>
  );
}

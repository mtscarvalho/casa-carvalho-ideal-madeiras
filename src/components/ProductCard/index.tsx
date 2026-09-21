import { Media, Product } from "@/payload-types";
import Link from "next/link";
import { PayloadImage } from "../Payload/Image";
import { Button } from "../ui/button";

export function ProductCard({ title, images, description, relPermalink }: Product) {
  return (
    <Link href={relPermalink} className="bg-cararra-50 border-cararra-200 relative block h-full space-y-2 rounded-md border p-3 text-base">
      <PayloadImage image={images[0] as Media} alt={title} className="mb-5 aspect-square rounded-md object-cover" />
      <h3 className="text-xl leading-[1.2] font-bold text-balance text-blue-950">{title}</h3>
      <p className="line-clamp-3 text-xs">{description}</p>
      <Button variant={"whatsapp"} size={"sm"}>
        Orçamento
      </Button>
    </Link>
  );
}

import { Media, Product } from "@/payload-types";
import { getWhatsAppUrl } from "@/utilities/get-whatsapp-url";
import Link from "next/link";
import { PayloadImage } from "../Payload/Image";
import { Button } from "../ui/button";

export function ProductCard({ title, images, relPermalink }: Product) {
  const whatsappMessage = getWhatsAppUrl({ message: `Olá! Vim através do site e gostaria de orçar: ${title} ${process.env.NEXT_PUBLIC_SITE_URL}${relPermalink}` });

  return (
    <div className="bg-neutral-0 border-subtle group relative z-0 flex h-full flex-col gap-4 rounded-md p-4 text-base shadow-sm transition-shadow duration-500 hover:shadow-lg">
      <div className="relative mb-1 aspect-square overflow-hidden rounded-md">
        {images.length > 0 ? (
          <PayloadImage image={images[0] as Media} alt={title} className="bg-neutral-0 absolute inset-0 size-fit object-cover transition-transform duration-300 group-hover:scale-105" />
        ) : (
          <div className="bg-subtle absolute inset-0 grid size-full items-center text-center">
            <p className="text-xs">Imagem não disponível</p>
          </div>
        )}
      </div>
      <h3 className="leading-[1.2] text-balance text-blue-950">{title}</h3>
      <Button className="relative z-10" size={"sm"} asChild>
        <Link href={whatsappMessage} target="_blank" rel="noopener">
          Orçamento
        </Link>
      </Button>
      <Link href={relPermalink} className="absolute inset-0 size-full rounded-md"></Link>
    </div>
  );
}

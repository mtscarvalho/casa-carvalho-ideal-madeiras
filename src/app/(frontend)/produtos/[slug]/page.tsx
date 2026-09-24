import { notFound } from "next/navigation";

import { createMetadata } from "@/utilities/create-metadata";

import { fetchProductBySlug } from "@/collections/Products/data";
import { PayloadImage } from "@/components/Payload/Image";
import { RichText } from "@/components/RichText";
import { WhatsApp } from "@/components/SocialIcon";
import { Button } from "@/components/ui/button";
import { Media } from "@/payload-types";
import CallToAction from "@/sections/CallToAction";
import { getWhatsAppUrl } from "@/utilities/get-whatsapp-url";
import { Info } from "lucide-react";
import Link from "next/link";

type PageArgs = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: PageArgs) {
  const { slug } = await params;
  const post = await fetchProductBySlug(slug);

  return createMetadata({
    path: `/produtos/${slug}`,
    title: `${post.title} | Produtos`,
    description: post.description,
  });
}

export default async function Page({ params }: PageArgs) {
  const { slug } = await params;

  const product = await fetchProductBySlug(slug);
  const whatsappMessage = getWhatsAppUrl({ message: `Olá! Vim através do site e gostaria de orçar: ${product.title} ${process.env.SITE_URL}${product.relPermalink}` });

  if (!product) {
    notFound();
  }

  return (
    <main>
      <article>
        <section className="pt-16 pb-24">
          <div className="container max-w-5xl">
            <div className="grid gap-10 md:grid-cols-2">
              <div className="space-y-8 md:pt-16">
                <div className="space-y-4">
                  <h1 className="heading-md text-balance">{product.title}</h1>
                  <p className="text-sm">{product.description}</p>
                  <div className="border-subtle flex justify-between border-y py-2 text-sm">
                    <h2 className="flex items-center gap-1">
                      Medidas
                      <Info className="size-4" />
                    </h2>
                    <ul>
                      {product.sizes?.map(({ id, size }) => (
                        <div className="" key={id}>
                          {size}
                        </div>
                      ))}
                    </ul>
                  </div>
                </div>
                <Button variant="default" asChild>
                  <Link href={whatsappMessage} target="_blank" rel="noopener noreferrer">
                    <WhatsApp />
                    Orçamento via WhatsApp
                  </Link>
                </Button>
              </div>
              <div className="md:order-first">
                <PayloadImage className="border-subtle rounded-xl border" image={product.images[0] as Media} />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-subtle py-24">
          <div className="container max-w-3xl">
            <div className="mb-6 space-y-2">
              <h2 className="flex flex-col gap-2">
                <span className="heading-md">Descrição</span>
              </h2>
            </div>
            <div className="">{product.content && <RichText data={product.content} />}</div>
          </div>
        </section>
      </article>

      <CallToAction url={whatsappMessage} />
    </main>
  );
}

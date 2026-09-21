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
      <article className="pt-6 pb-24">
        <div className="container max-w-5xl">
          <div className="grid gap-10 md:grid-cols-2">
            <div className="space-y-4 md:pt-16">
              <h1 className="text-primary text-4xl font-bold text-balance">{product.title}</h1>
              <p>{product.description}</p>
              <Button variant="whatsapp" asChild>
                <Link href={whatsappMessage} target="_blank" rel="noopener noreferrer">
                  <WhatsApp />
                  Orçamento via WhatsApp
                </Link>
              </Button>
            </div>
            <div className="md:order-first">
              <PayloadImage className="rounded-md" image={product.image as Media} />
            </div>
          </div>
          <div className="mx-auto max-w-3xl pt-10 md:pt-16">{product.content && <RichText data={product.content} />}</div>
        </div>
      </article>

      <CallToAction url={whatsappMessage} />
    </main>
  );
}

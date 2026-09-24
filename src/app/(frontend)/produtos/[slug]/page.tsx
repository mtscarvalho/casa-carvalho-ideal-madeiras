import { notFound } from "next/navigation";

import { createMetadata } from "@/utilities/create-metadata";

import { fetchProductBySlug, fetchProducts } from "@/collections/Products/data";
import { ProductGallery } from "@/components/ProductGallery";
import { RelatedProductsCarousel } from "@/components/RelatedProductsCarousel";
import { RichText } from "@/components/RichText";
import { WhatsApp } from "@/components/SocialIcon";
import { Button } from "@/components/ui/button";
import { ProductsCategory } from "@/payload-types";
import { formatProductSize } from "@/utilities/format-product-size";
import { getWhatsAppUrl } from "@/utilities/get-whatsapp-url";
import { isMediaObject } from "@/utilities/payload/is-media-object";
import { RulerDimensionLine } from "lucide-react";
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

  if (!product) {
    notFound();
  }

  const categoryId = typeof product.category === "number" ? product.category : product.category.id;
  const relatedProducts = await fetchProducts({ category: categoryId, excludeId: product.id, limit: 6 });
  const whatsappMessage = getWhatsAppUrl({ message: `Olá! Vim através do site e gostaria de orçar: ${product.title} ${process.env.SITE_URL}${product.relPermalink}` });
  const formattedSizes = product.sizes?.list?.map((size) => ({ id: size.id, label: formatProductSize(size) })).filter((size) => size.label !== null) ?? [];

  return (
    <main>
      <article>
        <section className="pt-16 pb-24">
          <div className="container max-lg:max-w-2xl">
            <div className="grid min-w-0 gap-10 lg:grid-cols-2">
              <div className="min-w-0 space-y-8 lg:pt-12">
                <div className="space-y-4">
                  {product.category && (
                    <nav aria-label="Caminho de navegação" className="text-subtle text-sm">
                      <ol className="flex flex-wrap items-center gap-2">
                        <li>
                          <Link href="/" className="hover:text-primary transition-colors">
                            Início
                          </Link>
                        </li>
                        <li aria-hidden="true">/</li>
                        <li>
                          <Link href={(product.category as ProductsCategory).relPermalink} className="hover:text-primary transition-colors">
                            {(product.category as ProductsCategory).title}
                          </Link>
                        </li>
                      </ol>
                    </nav>
                  )}
                  <h1 className="heading-md text-balance">{product.title}</h1>
                  <p className="text-sm">{product.description}</p>
                  {formattedSizes.length > 0 && (
                    <div className="border-subtle flex items-baseline justify-between border-y py-2 text-sm">
                      <div className="flex items-center gap-1 pt-1">
                        <RulerDimensionLine className="size-4" />
                        <h2>Medidas</h2>
                      </div>
                      <ul className="space-y-1 pb-2">
                        {formattedSizes.map(({ id, label }, index) => (
                          <li key={id ?? index}>{label}</li>
                        ))}
                        {product.sizes?.customMade && <li>Sob medida</li>}
                      </ul>
                    </div>
                  )}
                </div>
                <Button variant="default" asChild>
                  <Link href={whatsappMessage} target="_blank" rel="noopener noreferrer">
                    <WhatsApp />
                    Orçamento via WhatsApp
                  </Link>
                </Button>
              </div>
              <div className="min-w-0 lg:order-first">
                <ProductGallery images={product.images.filter(isMediaObject)} title={product.title} />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-subtle py-24">
          <div className="container max-w-2xl lg:max-w-3xl">
            <div className="mb-6 space-y-2">
              <h2 className="flex flex-col gap-2">
                <span className="heading-md">Descrição</span>
              </h2>
            </div>
            <div className="">{product.content && <RichText data={product.content} />}</div>
          </div>
        </section>
      </article>

      {relatedProducts.length > 0 && (
        <section className="py-24">
          <div className="container">
            <div className="mb-10 space-y-2">
              <h2 className="flex flex-col gap-2 text-center">
                <span className="heading-md">Produtos relacionados</span>
              </h2>
            </div>
            <RelatedProductsCarousel products={relatedProducts} />
          </div>
        </section>
      )}
    </main>
  );
}

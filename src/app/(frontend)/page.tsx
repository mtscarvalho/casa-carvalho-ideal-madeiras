import { createMetadata } from "@/utilities/create-metadata";

import { fetchAllProductCategories } from "@/collections/ProductsCategory/data";
import { fetchAllTestimonials } from "@/collections/Testimonials/data";
import { Carrousel, CarrouselItem, CarrouselPagination, CarrouselWrapper } from "@/components/Carrousel";
import { CategoryCarousel } from "@/components/CategoryCarousel";
import { PayloadImage } from "@/components/Payload/Image";
import { RelatedProductsCarousel } from "@/components/RelatedProductsCarousel";
import { TestimonialsCarousel } from "@/components/TestimonialsCarousel";
import { WhatsApp } from "@/components/SocialIcon";
import { fetchHomepage } from "@/globals/Homepage/data";
import { Media, Product } from "@/payload-types";
import { CreditCard, StarCheck, Zap } from "lucide-react";

export function generateMetadata() {
  return createMetadata({
    path: "/",
    title: "Ideal Madeiras | Portas, Pisos e Janelas",
    description: "Pisos, decks, painéis e acabamentos em madeira maciça de alto padrão. Qualidade, sofisticação e sustentabilidade em cada projeto. Conheça a Decorato Pisos e transforme seus ambientes.",
  });
}

export default async function Page() {
  const page = await fetchHomepage();
  const categories = await fetchAllProductCategories();
  const testimonials = await fetchAllTestimonials();
  const featuredProducts = page.featuredProducts.filter((product): product is Product => typeof product !== "number");

  return (
    <main>
      <section>
        {page.hero.length > 1 && (
          <Carrousel name="hero">
            <CarrouselWrapper>
              {page.hero.map((item) => (
                <CarrouselItem key={item.id}>
                  <div className="px-6 pt-6">
                    <PayloadImage className="w-full rounded-xl object-cover max-lg:aspect-video max-md:aspect-square" image={item.image as Media} loading="eager" />
                  </div>
                </CarrouselItem>
              ))}
            </CarrouselWrapper>
            <CarrouselPagination className="absolute right-0 bottom-6 left-0 z-10 mt-10" />
          </Carrousel>
        )}
        {page.hero.length == 1 && (
          <div className="px-6 pt-6">
            <PayloadImage className="w-full rounded-xl" image={page.hero[0].image as Media} loading="eager" />
          </div>
        )}
      </section>

      <section className="py-10">
        <div className="container">
          <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <li className="bg-subtle border-subtle flex flex-col gap-2 rounded-xl border p-6">
              <WhatsApp className="text-accent size-8 shrink-0" />
              <div className="space-y-1 pt-1 text-balance">
                <h2 className="font-bold">Compre pelo WhatsApp</h2>
                <p className="text-sm">Fale com nossa equipe e tire suas dúvidas antes de comprar.</p>
              </div>
            </li>
            <li className="bg-subtle border-subtle flex flex-col gap-2 rounded-xl border p-6">
              <Zap className="text-accent size-8 shrink-0" />
              <div className="space-y-1 pt-1 text-balance">
                <h2 className="font-bold">Entrega super rápida</h2>
                <p className="text-sm">Receba seus produtos com agilidade, segurança e comodidade.</p>
              </div>
            </li>
            <li className="bg-subtle border-subtle flex flex-col gap-2 rounded-xl border p-6">
              <CreditCard className="text-accent size-8 shrink-0" />
              <div className="space-y-1 pt-1 text-balance">
                <h2 className="font-bold">Parcelamento em 10x</h2>
                <p className="text-sm">Parcele suas compras em até 10x e facilite seu pagamento.</p>
              </div>
            </li>
            <li className="bg-subtle border-subtle flex flex-col gap-2 rounded-xl border p-6">
              <StarCheck className="text-accent size-8 shrink-0" />
              <div className="space-y-1 pt-1 text-balance">
                <h2 className="font-bold">Segurança e garantia</h2>
                <p className="text-sm">Compre com tranquilidade, qualidade garantida e suporte especializado.</p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <section className="bg-subtle py-16">
        <div className="container">
          <div className="mb-6 space-y-2">
            <h2 className="heading-md border-accent border-b pb-4">Categorias</h2>
          </div>
          {categories.length > 0 && <CategoryCarousel categories={categories} />}
        </div>
      </section>

      {featuredProducts.length > 0 && (
        <section className="py-16">
          <div className="container">
            <div className="mb-6 space-y-2">
              <h2 className="heading-md border-accent border-b pb-4">Produtos em destaque</h2>
            </div>
            <RelatedProductsCarousel products={featuredProducts} />
          </div>
        </section>
      )}

      {testimonials.length > 0 && (
        <section className="bg-subtle py-16">
          <div className="container">
            <div className="mb-6 space-y-2">
              <h2 className="heading-md border-accent border-b pb-4">Quem compra, recomenda</h2>
            </div>
            <TestimonialsCarousel testimonials={testimonials} />
          </div>
        </section>
      )}
    </main>
  );
}

"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { A11y, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { PayloadImage } from "@/components/Payload/Image";
import { Media, ProductsCategory } from "@/payload-types";

type CategoryCarouselProps = {
  categories: ProductsCategory[];
};

export function CategoryCarousel({ categories }: CategoryCarouselProps) {
  return (
    <Swiper
      modules={[A11y, Navigation]}
      slidesPerView={1}
      spaceBetween={16}
      navigation={{
        prevEl: ".swiper-pagination-prev",
        nextEl: ".swiper-pagination-next",
      }}
      breakpoints={{
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 5 },
      }}
      className="category-carousel!"
    >
      {categories.map((category) => {
        const productCount = category.products?.docs?.length ?? 0;

        return (
          <SwiperSlide key={category.id} className="h-auto!">
            <Link href={category.relPermalink} className="group bg-elevated border-subtle focus-visible:focused block h-full overflow-hidden rounded-xl border transition-shadow duration-500 hover:shadow-lg">
              <PayloadImage image={category.thumb as Media} alt={category.title} className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105" />

              <div className="space-y-1 p-5">
                <h3 className="text-lg font-bold">{category.title}</h3>

                <p className="text-subtle text-sm">
                  {productCount} {productCount === 1 ? "produto" : "produtos"}
                </p>
              </div>
            </Link>
          </SwiperSlide>
        );
      })}

      <div className="mt-6 flex items-center justify-center gap-2">
        <button type="button" className="swiper-pagination-prev border-subtle hover:bg-elevated flex size-10 cursor-pointer items-center justify-center rounded-full border transition-colors disabled:cursor-not-allowed disabled:opacity-40" aria-label="Categoria anterior">
          <ChevronLeft className="size-5" />
        </button>

        <button type="button" className="swiper-pagination-next border-subtle hover:bg-elevated flex size-10 cursor-pointer items-center justify-center rounded-full border transition-colors disabled:cursor-not-allowed disabled:opacity-40" aria-label="Próxima categoria">
          <ChevronRight className="size-5" />
        </button>
      </div>
    </Swiper>
  );
}

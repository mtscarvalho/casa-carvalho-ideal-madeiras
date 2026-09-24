"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Swiper as SwiperType } from "swiper";
import { A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@/payload-types";

type RelatedProductsCarouselProps = {
  products: Product[];
};

export function RelatedProductsCarousel({ products }: RelatedProductsCarouselProps) {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);

  function updateNavigation(instance: SwiperType) {
    setCanGoBack(!instance.isBeginning);
    setCanGoForward(!instance.isEnd);
  }

  return (
    <Swiper
      modules={[A11y]}
      onSwiper={(instance) => {
        setSwiper(instance);
        updateNavigation(instance);
      }}
      onSlideChange={updateNavigation}
      onResize={updateNavigation}
      slidesPerView={1}
      spaceBetween={16}
      breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
      className="related-products-carousel!"
      aria-label="Outros produtos da mesma categoria"
    >
      {products.map((product) => (
        <SwiperSlide key={product.id} className="h-auto!">
          <ProductCard {...product} />
        </SwiperSlide>
      ))}

      <div className="mt-6 flex items-center justify-center gap-2">
        <button type="button" onClick={() => swiper?.slidePrev()} disabled={!canGoBack} className="border-subtle hover:bg-elevated flex size-10 cursor-pointer items-center justify-center rounded-full border transition-colors disabled:cursor-not-allowed disabled:opacity-40" aria-label="Produtos anteriores">
          <ChevronLeft className="size-5" />
        </button>
        <button type="button" onClick={() => swiper?.slideNext()} disabled={!canGoForward} className="border-subtle hover:bg-elevated flex size-10 cursor-pointer items-center justify-center rounded-full border transition-colors disabled:cursor-not-allowed disabled:opacity-40" aria-label="Próximos produtos">
          <ChevronRight className="size-5" />
        </button>
      </div>
    </Swiper>
  );
}

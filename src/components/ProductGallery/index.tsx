"use client";

import { useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from "lucide-react";
import type { Swiper as SwiperType } from "swiper";
import { A11y, Keyboard, Mousewheel, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { PayloadImage } from "@/components/Payload/Image";
import type { Media } from "@/payload-types";

type ProductGalleryProps = {
  images: Media[];
  title: string;
};

export function ProductGallery({ images, title }: ProductGalleryProps) {
  const [mainSwiper, setMainSwiper] = useState<SwiperType | null>(null);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollBack, setCanScrollBack] = useState(false);
  const [canScrollForward, setCanScrollForward] = useState(false);
  const [hasThumbOverflow, setHasThumbOverflow] = useState(false);

  function updateThumbNavigation(swiper: SwiperType) {
    setCanScrollBack(!swiper.isBeginning);
    setCanScrollForward(!swiper.isEnd);
    setHasThumbOverflow(!swiper.isLocked);
  }

  if (images.length === 0) return null;

  return (
    <div className="flex min-w-0 flex-col-reverse gap-3 md:grid md:grid-cols-[5rem_minmax(0,1fr)]" aria-label={`Imagens de ${title}`}>
      <div className="flex h-16 min-w-0 items-center gap-2 md:h-auto md:min-h-0 md:flex-col">
        {hasThumbOverflow && (
          <button type="button" onClick={() => thumbsSwiper?.slidePrev()} disabled={!canScrollBack} className="border-subtle hover:bg-subtle flex size-8 shrink-0 items-center justify-center rounded-full border transition-colors disabled:cursor-not-allowed disabled:opacity-40" aria-label="Miniaturas anteriores">
            <ChevronLeft className="size-4 md:hidden" />
            <ChevronUp className="hidden size-4 md:block" />
          </button>
        )}
        <div className="relative h-full min-w-0 flex-1 md:h-auto md:min-h-0 md:w-full">
          <Swiper
            modules={[A11y, Mousewheel]}
            onSwiper={(swiper) => {
              setThumbsSwiper(swiper);
              updateThumbNavigation(swiper);
            }}
            onProgress={updateThumbNavigation}
            onResize={updateThumbNavigation}
            direction="horizontal"
            breakpoints={{ 768: { direction: "vertical", slidesPerView: 4 } }}
            slidesPerView={5}
            spaceBetween={8}
            watchSlidesProgress
            watchOverflow
            mousewheel={{ forceToAxis: true }}
            className="h-full! w-full! md:absolute! md:inset-0!"
            aria-label="Miniaturas do produto"
          >
            {images.map((image, index) => (
              <SwiperSlide key={image.id}>
                <button type="button" onClick={() => mainSwiper?.slideTo(index)} className={`focus-visible:focused size-full overflow-hidden rounded-lg border-2 transition-colors ${activeIndex === index ? "border-primary" : "border-subtle hover:border-primary"}`} aria-label={`Mostrar imagem ${index + 1} de ${images.length}`} aria-pressed={activeIndex === index}>
                  <PayloadImage image={image} alt="" className="size-full object-cover" />
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {hasThumbOverflow && (
          <button type="button" onClick={() => thumbsSwiper?.slideNext()} disabled={!canScrollForward} className="border-subtle hover:bg-subtle flex size-8 shrink-0 items-center justify-center rounded-full border transition-colors disabled:cursor-not-allowed disabled:opacity-40" aria-label="Próximas miniaturas">
            <ChevronRight className="size-4 md:hidden" />
            <ChevronDown className="hidden size-4 md:block" />
          </button>
        )}
      </div>

      <Swiper
        modules={[A11y, Keyboard, Thumbs]}
        onSwiper={setMainSwiper}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        keyboard={{ enabled: true, onlyInViewport: true }}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        slidesPerView={1}
        className="border-subtle aspect-square w-full overflow-hidden rounded-xl border"
        aria-label="Galeria de imagens do produto"
      >
        {images.map((image, index) => (
          <SwiperSlide key={image.id}>
            <PayloadImage image={image} alt={`${title} — imagem ${index + 1} de ${images.length}`} loading={index === 0 ? "eager" : "lazy"} className="size-full object-contain" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

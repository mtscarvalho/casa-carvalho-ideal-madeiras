"use client";

import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import type { Testimonial } from "@/payload-types";

type TestimonialsCarouselProps = {
  testimonials: Testimonial[];
};

export function TestimonialsCarousel({ testimonials }: TestimonialsCarouselProps) {
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
      breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
      className="testimonials-carousel!"
      aria-label="Depoimentos de clientes"
    >
      {testimonials.map((testimonial) => (
        <SwiperSlide key={testimonial.id} className="h-auto!">
          <figure className="bg-elevated border-subtle flex h-full flex-col rounded-xl border p-6">
            <Quote className="text-accent mb-4 size-8" aria-hidden="true" />
            <blockquote className="flex-1 text-sm leading-relaxed">{testimonial.content}</blockquote>
            <figcaption className="mt-6 font-bold">{testimonial.name}</figcaption>
          </figure>
        </SwiperSlide>
      ))}

      <div className="mt-6 flex items-center justify-center gap-2">
        <button type="button" onClick={() => swiper?.slidePrev()} disabled={!canGoBack} className="border-subtle hover:bg-elevated flex size-10 cursor-pointer items-center justify-center rounded-full border transition-colors disabled:cursor-not-allowed disabled:opacity-40" aria-label="Depoimentos anteriores">
          <ChevronLeft className="size-5" />
        </button>
        <button type="button" onClick={() => swiper?.slideNext()} disabled={!canGoForward} className="border-subtle hover:bg-elevated flex size-10 cursor-pointer items-center justify-center rounded-full border transition-colors disabled:cursor-not-allowed disabled:opacity-40" aria-label="Próximos depoimentos">
          <ChevronRight className="size-5" />
        </button>
      </div>
    </Swiper>
  );
}

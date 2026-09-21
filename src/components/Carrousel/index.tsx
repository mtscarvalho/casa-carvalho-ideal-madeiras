"use client";

import { cn } from "@/utilities/cn";
import React, { createContext, useContext } from "react";
import { A11y, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperProps, SwiperSlide } from "swiper/react";

type CarrouselProps = { children: React.ReactNode; name: string };
type CarrouselWrapperProps = { children: React.ReactNode };
type CarrouselPaginationProps = { className?: string };

const CarrouselContext = createContext<{ name: string } | null>(null);
export const useCarrousel = () => {
  const context = useContext(CarrouselContext);
  if (!context) throw new Error("useCarrousel must be used within a Carrousel component");
  return context;
};

export const CarrouselItem = SwiperSlide;

export function Carrousel({ children, name }: CarrouselProps) {
  return (
    <CarrouselContext.Provider value={{ name }}>
      <div className="relative h-full w-full" data-swiper={name}>
        {children}
      </div>
    </CarrouselContext.Provider>
  );
}

export function CarrouselWrapper({ children }: CarrouselWrapperProps) {
  const { name } = useCarrousel();

  const Bullet = (index: number, className: string) => {
    return `<span class="${cn("aria-current:bg-transparent aria-current:border-neutral-0 select-none flex items-center relative group border-neutral-0 justify-center size-6 cursor-pointer rounded-full border-[1.5px] transition-colors duration-300", className)}">
      <span class="size-4 group-aria-current:opacity-100 duration-300 transition-opacity opacity-0 bg-neutral-0 rounded-full inset-0"></span>
      <span class="sr-only">Página ${index + 1}</span>
    </span>`;
  };

  const swiperOptions: SwiperProps = {
    modules: [Pagination, A11y, EffectFade],
    slidesPerView: 1,
    effect: "fade",
    pagination: {
      el: `[data-swiper="${name}"] .swiper-pagination`,
      clickable: true,
      renderBullet: (index, className) => Bullet(index, className),
    },
  };

  return (
    <Swiper className="overflow-hidden" {...swiperOptions}>
      {React.Children.map(children, (child, index) => (
        <SwiperSlide className="h-auto! w-full!" key={index}>
          {child}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export function CarrouselPagination({ className }: CarrouselPaginationProps) {
  return <div className={cn("swiper-pagination bg-primary mx-auto flex max-w-max justify-center gap-2 rounded-full px-2 py-2", className)} />;
}

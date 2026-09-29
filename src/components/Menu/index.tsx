"use client";

import Link from "next/link";
import { RefObject, useEffect, useRef, useState } from "react";

import { useEscapeKey } from "@/hooks/useEscapeKey";
import { useFocusTrap } from "@/hooks/useFocusTrap";

import { Menu as MenuIcon, Search, X } from "lucide-react";

import { TMenu } from "../Header";

import { cn } from "@/lib/utils";
import IdealMadeiras from "../Decorato";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

type MenuProps = {
  items: TMenu[];
};

export function Menu({ items }: MenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleOpen = () => setIsOpen((v) => !v);
  const closeMenu = () => setIsOpen(false);

  useFocusTrap(menuRef as RefObject<HTMLElement>, isOpen);
  useEscapeKey(() => setIsOpen(false));

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div className={`relative z-10 w-full overflow-auto py-3 sm:px-6 ${isOpen ? "bg-woodsmoke max-lg:from-neutral-0/50 max-lg:to-neutral-0/20 h-svh" : "h-auto"}`} ref={menuRef}>
      <div className="container h-full">
        <div className="flex w-full items-center justify-between gap-x-6 max-lg:flex-wrap">
          <Link className="block rounded p-1" href="/">
            <IdealMadeiras className="w-full max-w-36" />
            <span className="sr-only">Página inicial</span>
          </Link>

          {/* Mobile toggle */}
          <div className="dark flex items-center justify-center lg:hidden">
            <Button variant="ghost" size="icon-lg" onClick={toggleOpen} aria-expanded={isOpen} aria-controls="main-navigation" aria-label={isOpen ? "Fechar menu" : "Abrir menu"}>
              {isOpen ? <X className="" /> : <MenuIcon className="" />}
            </Button>
          </div>

          <div className={cn("flex flex-1 items-center gap-4 rounded-lg max-lg:basis-full max-lg:flex-wrap lg:p-2", isOpen ? "mt-6" : "")}>
            <form action="/produtos" className={cn("relative flex w-full items-center", isOpen ? "" : "max-lg:hidden")} role="search" onSubmit={closeMenu}>
              <label className="sr-only" htmlFor="product-search">
                Buscar produtos
              </label>
              <Input id="product-search" name="q" type="search" placeholder="Buscar produtos" className="bg-neutral-0 h-10 border-white/30 pr-10 text-white placeholder:text-white/70" />
              <Button className="absolute right-1" type="submit" variant="ghost" size="icon" aria-label="Buscar produtos">
                <Search className="text-accent size-4" />
              </Button>
            </form>

            <div className="max-lg:hidden">
              <Button variant="default" asChild>
                <Link href="/">Solicitar Orçamento</Link>
              </Button>
            </div>

            <nav id="main-navigation" className={`basis-full items-center lg:hidden lg:basis-auto lg:py-0 ${isOpen ? "pt-4" : ""}`}>
              <ul className={`-ml-2.5 space-y-2 lg:hidden ${isOpen ? "block" : "hidden"}`}>
                {items.map((item) =>
                  item.submenu ? (
                    <li key={item.label} className="dark">
                      <h2 className="text-on-primary mb-2 pl-4 font-semibold">{item.label}</h2>
                      <ul className="ml-4 flex flex-col justify-start space-y-2">
                        {item.submenu.map((entry, idx) => (
                          <li key={`${entry.label}-${idx}`}>
                            <Button className="justify-start" variant="ghost" fullwidth asChild>
                              <Link href={entry.href!} onClick={() => setIsOpen(false)}>
                                {entry.label}
                              </Link>
                            </Button>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ) : (
                    <li key={item.label} className="dark">
                      <Button className="max-lg:w-full max-lg:justify-start" variant="ghost" fullwidth asChild>
                        <Link href={item.href ?? "/"} onClick={() => setIsOpen(false)}>
                          {item.label}
                        </Link>
                      </Button>
                    </li>
                  ),
                )}
                <li className="mt-6">
                  <Button className="w-full" variant="default" asChild>
                    <Link href="/">Solicitar Orçamento</Link>
                  </Button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

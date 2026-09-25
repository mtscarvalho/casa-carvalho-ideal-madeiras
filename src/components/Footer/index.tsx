import Link from "next/link";

import { getCurrentYear } from "@/utilities/get-current-year";

import { getWhatsAppUrl } from "@/utilities/get-whatsapp-url";
import { ArrowUp, Mail, MapPin } from "lucide-react";
import IdealMadeiras from "../Decorato";
import { Instagram, WhatsApp } from "../SocialIcon";
import { Button } from "../ui/button";

export function Footer() {
  return (
    <footer className="dark text-body bg-blue-950 py-12">
      <div className="container grid gap-10 md:grid-cols-2 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-5">
          <IdealMadeiras className="max-w-40" />
          <div className="space-y-4">
            <p className="text-sm">A maior loja de portas, janelas e pisos de madeira da Rua do Gasômetro. Venha conferir nosso show room e conhecer o maior catálogo de produtos de São Paulo</p>
            <p className="text-sm">
              © {getCurrentYear()} Decorato Pisos. <br />
              Todos os direitos reservados.
            </p>
          </div>
        </div>
        <div className="space-y-2 lg:col-span-3">
          <h2 className="heading-xs">Mapa do site</h2>
          <ul className="-translate-x-3">
            <li>
              <Button size="sm" variant="ghost" asChild>
                <Link href="/">Início</Link>
              </Button>
            </li>
            <li>
              <Button size="sm" variant="ghost" asChild>
                <Link href="/produtos">Produtos</Link>
              </Button>
            </li>
            <li>
              <Button size="sm" variant="ghost" asChild>
                <Link href="/projetos">Projetos</Link>
              </Button>
            </li>
            <li>
              <Button size="sm" variant="ghost" asChild>
                <Link href="/quem-somos">Quem somos</Link>
              </Button>
            </li>
            <li>
              <Button size="sm" variant="ghost" asChild>
                <Link href="/contato">Contato</Link>
              </Button>
            </li>
            <li>
              <Button size="sm" variant="ghost" asChild>
                <Link href="/parceria-com-arquitetos">Parceria com arquitetos</Link>
              </Button>
            </li>
          </ul>
        </div>
        <div className="space-y-2 lg:col-span-3">
          <h2 className="heading-xs">Contato e informações</h2>
          <ul className="-translate-x-3 space-y-1">
            <li>
              <Button className="h-auto" size="sm" variant="ghost" asChild>
                <Link href="/">
                  <MapPin className="size-6 shrink-0" />
                  <span>
                    Rua Vergueiro, 4382 - Chácara Klabin, <br /> São Paulo - SP, 04102-002
                  </span>
                </Link>
              </Button>
            </li>
            <li>
              <Button size="sm" variant="ghost" asChild>
                <Link href="/">
                  <Instagram className="size-6 shrink-0" />
                  <span>@decoratopisos</span>
                </Link>
              </Button>
            </li>
            <li>
              <Button size="sm" variant="ghost" asChild>
                <Link href="/">
                  <WhatsApp className="size-6 shrink-0" />
                  <span>(11) 99621-9150</span>
                </Link>
              </Button>
            </li>
            <li>
              <Button size="sm" variant="ghost" asChild>
                <Link href="/">
                  <Mail className="size-6 shrink-0" />
                  <span>comercial@decoratoconcept.com.br </span>
                </Link>
              </Button>
            </li>
          </ul>
        </div>
      </div>
      <Button className="fixed right-6 bottom-6 size-16 rounded-full! p-3" size="icon" variant="whatsapp" asChild>
        <Link href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
          <span className="sr-only">WhatsApp</span>
          <WhatsApp className="size-10" />
        </Link>
      </Button>
      <Button className="back-to-top" asChild>
        <Link href="#body">
          Voltar ao topo
          <ArrowUp className="size-4" />
        </Link>
      </Button>
    </footer>
  );
}

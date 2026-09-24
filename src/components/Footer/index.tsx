import Link from "next/link";

import { getCurrentYear } from "@/utilities/get-current-year";

import { ButtonOld } from "@/components/Button";
import { getWhatsAppUrl } from "@/utilities/get-whatsapp-url";
import { ArrowUp, Mail, MapPin } from "lucide-react";
import { Instagram, WhatsApp } from "../SocialIcon";
import { Button } from "../ui/button";

export function Footer() {
  return (
    <footer className="text-neutral-0 bg-blue-950 py-12">
      <div className="container grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-2">
          <h2 className="text-xl font-bold">Sobre nós</h2>
          <p className="text-base">A Decorato Pisos oferece acabamentos em madeira de alta qualidade, transformando ambientes com materiais exclusivos e duráveis para cada estilo.</p>
          <p className="text-base">
            © {getCurrentYear()} Decorato Pisos. <br />
            Todos os direitos reservados.
          </p>
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold">Mapa do site</h2>
          <ul className="-translate-x-3">
            <li>
              <ButtonOld size="sm" variant="subtle" asChild>
                <Link href="/">Início</Link>
              </ButtonOld>
            </li>
            <li>
              <ButtonOld size="sm" variant="subtle" asChild>
                <Link href="/produtos">Produtos</Link>
              </ButtonOld>
            </li>
            <li>
              <ButtonOld size="sm" variant="subtle" asChild>
                <Link href="/projetos">Projetos</Link>
              </ButtonOld>
            </li>
            <li>
              <ButtonOld size="sm" variant="subtle" asChild>
                <Link href="/quem-somos">Quem somos</Link>
              </ButtonOld>
            </li>
            <li>
              <ButtonOld size="sm" variant="subtle" asChild>
                <Link href="/contato">Contato</Link>
              </ButtonOld>
            </li>
            <li>
              <ButtonOld size="sm" variant="subtle" asChild>
                <Link href="/parceria-com-arquitetos">Parceria com arquitetos</Link>
              </ButtonOld>
            </li>
          </ul>
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold">Contato e informações</h2>
          <ul className="-translate-x-3">
            <li>
              <ButtonOld size="sm" variant="subtle" asChild>
                <Link href="/">
                  <MapPin className="size-6 shrink-0" />
                  <span>Rua Vergueiro, 4382 - Chácara Klabin, São Paulo - SP, 04102-002</span>
                </Link>
              </ButtonOld>
            </li>
            <li>
              <ButtonOld size="sm" variant="subtle" asChild>
                <Link href="/">
                  <Instagram className="size-6 shrink-0" />
                  <span>@decoratopisos</span>
                </Link>
              </ButtonOld>
            </li>
            <li>
              <ButtonOld size="sm" variant="subtle" asChild>
                <Link href="/">
                  <WhatsApp className="size-6 shrink-0" />
                  <span>(11) 99621-9150</span>
                </Link>
              </ButtonOld>
            </li>
            <li>
              <ButtonOld size="sm" variant="subtle" asChild>
                <Link href="/">
                  <Mail className="size-6 shrink-0" />
                  <span>comercial@decoratoconcept.com.br </span>
                </Link>
              </ButtonOld>
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

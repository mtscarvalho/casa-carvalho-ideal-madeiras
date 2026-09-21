import { createMetadata } from "@/utilities/create-metadata";

import { WhatsApp } from "@/components/SocialIcon";
import { Button } from "@/components/ui/button";
import CallToAction from "@/sections/CallToAction";
import { getWhatsAppUrl } from "@/utilities/get-whatsapp-url";
import { DollarSign, Layers2, PencilRuler, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function generateMetadata() {
  return createMetadata({
    path: "/",
    title: "Parceria com arquitetos",
    description: "Soluções sob medida em pisos e painéis de madeira, com o suporte e as vantagens que você e o seu projeto merece.",
  });
}

export default function Page() {
  const whatsappMessage = getWhatsAppUrl({ message: "Olá! Vim através do site e gostaria de ser um arquiteto parceiro." });

  return (
    <main>
      <section className="relative z-0 grid items-center pt-6 pb-24">
        <div className="container max-w-5xl">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div className="space-y-4 text-pretty">
              <h1 className="text-primary text-4xl font-bold text-balance">Parceria exclusiva para arquitetos</h1>
              <p>A Decorato Concept é especialista em pisos prontos, assoalhos, tacos, decks e painéis ripados de madeira de alto padrão, oferecendo aos profissionais de arquitetura uma parceria baseada em confiança, atendimento personalizado e produtos selecionados para projetos residenciais e corporativos.</p>
              <p className="font-bold">Faça parte do nosso programa de arquitetos parceiros!</p>
              <Button variant="whatsapp" asChild>
                <Link href={whatsappMessage} target="_blank" rel="noopener noreferrer">
                  <WhatsApp />
                  Seja um parceiro
                </Link>
              </Button>
            </div>
            <div className="">
              <Image className="aspect-square rounded-md object-cover" src="/imagens/parceria-com-arquitetos/01.png" alt="..." width={854} height={1289} />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-copper-50 border-copper-100 overflow-x-hidden border-y py-24">
        <div className="container">
          <ul className="grid gap-x-16 gap-y-6 md:grid-cols-2 lg:grid-cols-4">
            <li className="relative space-y-2 text-balance">
              <DollarSign className="text-secondary size-16" />
              <h3 className="text-primary pt-4 text-2xl font-bold text-balance lg:max-w-[14ch]">Comissão atrativa</h3>
              <p>Reconhecemos seu valor com uma comissão diferenciada em cada projeto.</p>
              <div className="bg-copper-100 absolute -right-8 bottom-0 h-full w-[1px]"></div>
            </li>
            <li className="relative space-y-2 text-balance">
              <PencilRuler className="text-secondary size-16" />
              <h3 className="text-primary pt-4 text-2xl font-bold text-balance lg:max-w-[14ch]">Apoio técnico especializado</h3>
              <p>Conte com nossa equipe para suporte técnico, especificações e soluções personalizadas.</p>
              <div className="bg-copper-100 absolute -right-8 bottom-0 h-full w-[1px]"></div>
            </li>
            <li className="relative space-y-2 text-balance">
              <Star className="text-secondary size-16" />
              <h3 className="text-primary pt-4 text-2xl font-bold text-balance lg:max-w-[14ch]">Acesso exclusivo ao showroom</h3>
              <p>Visite nosso showroom com seus clientes e explore a qualidade dos nossos produtos.</p>
              <div className="bg-copper-100 absolute -right-8 bottom-0 h-full w-[1px]"></div>
            </li>
            <li className="space-y-2 text-balance">
              <Layers2 className="text-secondary size-16" />
              <h3 className="text-primary pt-4 text-2xl font-bold text-balance lg:max-w-[14ch]">Materiais de apoio e amostras</h3>
              <p>Disponibilizamos catálogos, amostras e materiais para facilitar suas apresentações.</p>
            </li>
          </ul>
        </div>
      </section>

      <section className="pt-24 pb-24">
        <div className="container">
          <div className="flex justify-center gap-x-10 gap-y-6 max-md:flex-col md:items-center">
            <h2 className="text-primary text-4xl font-bold md:max-w-[9ch]">Benefício da parceria</h2>
            <div className="payload-richtext">
              <ul>
                <li>Comissão diferenciada em projetos aprovados;</li>
                <li>Atendimento prioritário;</li>
                <li>Apoio técnico para especificações;</li>
                <li>Amostras e materiais para apresentação aos clientes;</li>
                <li>Convites para eventos e lançamentos exclusivos;</li>
                <li>Condições comerciais especiais;</li>
                <li>Suporte durante todo o processo de compra.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-4 mb-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Image className="aspect-square rounded-md object-cover" src="/imagens/pagina-inicial/deck-de-madeira-macica.avif" alt="..." width={854} height={1289} />
          <Image className="aspect-square rounded-md object-cover" src="/imagens/pagina-inicial/painel-ripado-de-madeira-macica.avif" alt="..." width={854} height={1289} />
          <Image className="aspect-square rounded-md object-cover" src="/imagens/pagina-inicial/hero.avif" alt="..." width={854} height={1289} />
          <Image className="aspect-square rounded-md object-cover" src="/imagens/projetos/piso-pronto-cumaru.avif" alt="..." width={854} height={1289} />
        </div>
      </section>

      <CallToAction title="Pronto para levar seus projetos a um novo nível?" description="Nossa equipe entrará em contato para apresentar as condições exclusivas e mostrar como podemos contribuir para o sucesso dos seus próximos projetos." button="Seja um parceiro" url={whatsappMessage} />
    </main>
  );
}

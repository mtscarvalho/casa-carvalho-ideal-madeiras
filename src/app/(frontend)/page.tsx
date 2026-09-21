import { createMetadata } from "@/utilities/create-metadata";

import { fetchProducts } from "@/collections/Products/data";
import { Carrousel, CarrouselItem, CarrouselPagination, CarrouselWrapper } from "@/components/Carrousel";
import { PayloadImage } from "@/components/Payload/Image";
import { ProductCard } from "@/components/ProductCard";
import { WhatsApp } from "@/components/SocialIcon";
import { Button } from "@/components/ui/button";
import { fetchHomepage } from "@/globals/Homepage/data";
import { Media } from "@/payload-types";
import CallToAction from "@/sections/CallToAction";
import { getWhatsAppUrl } from "@/utilities/get-whatsapp-url";
import { Star, Trees, Truck, UserStar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function generateMetadata() {
  return createMetadata({
    path: "/",
    title: "Ideal Madeiras | Portas, Pisos e Janelas",
    description: "Pisos, decks, painéis e acabamentos em madeira maciça de alto padrão. Qualidade, sofisticação e sustentabilidade em cada projeto. Conheça a Decorato Pisos e transforme seus ambientes.",
  });
}

export default async function Page() {
  const page = await fetchHomepage();
  const products = await fetchProducts({ category: 1, limit: 3 });

  return (
    <main>
      <section>
        {page.hero.length > 1 && (
          <Carrousel name="hero">
            <CarrouselWrapper>
              {page.hero.map((item) => (
                <CarrouselItem key={item.id}>
                  <div className="px-6 pt-6">
                    <PayloadImage className="w-full rounded-xl" image={item.image as Media} loading="eager" />
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

      <section className="pt-24">
        <div className="container">
          <ul className="grid gap-x-16 gap-y-6 md:grid-cols-2 lg:grid-cols-4">
            <li className="relative space-y-2 text-balance">
              <Star className="text-secondary size-16" />
              <h2 className="text-primary pt-4 text-2xl font-bold text-balance lg:max-w-[16ch]">Qualidade inigualável</h2>
              <p>Madeiras selecionadas, duráveis e de alto padrão para garantir sofisticação e resistência.</p>
              <div className="bg-copper-100 absolute -right-8 bottom-0 h-full w-px max-md:hidden"></div>
            </li>
            <li className="relative space-y-2 text-balance">
              <Truck className="text-secondary size-16" />
              <h2 className="text-primary pt-4 text-2xl font-bold text-balance lg:max-w-[16ch]">Entrega rápida e segura</h2>
              <p>Logística eficiente para que seu pedido chegue com agilidade e segurança.</p>
              <div className="bg-copper-100 absolute -right-8 bottom-0 h-full w-px max-md:hidden"></div>
            </li>
            <li className="relative space-y-2 text-balance">
              <UserStar className="text-secondary size-16" />
              <h2 className="text-primary pt-4 text-2xl font-bold text-balance lg:max-w-[16ch]">Atendimento especializado</h2>
              <p>Equipe pronta para oferecer suporte e orientação na escolha do melhor produto para seu projeto.</p>
              <div className="bg-copper-100 absolute -right-8 bottom-0 h-full w-px max-md:hidden"></div>
            </li>
            <li className="space-y-2 text-balance">
              <Trees className="text-secondary size-16" />
              <h2 className="text-primary pt-4 text-2xl font-bold text-balance lg:max-w-[16ch]">Sustentabilidade responsável</h2>
              <p>Compromisso com madeiras de origem certificada, garantindo respeito à natureza.</p>
            </li>
          </ul>
        </div>
      </section>

      <section className="py-24">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="space-y-4 text-balance lg:col-span-3 lg:pt-10">
              <h2 className="text-primary text-4xl font-bold">Piso Pronto de Madeira Maciça</h2>
              <p className="md:text-xl">Elegância natural, charme rústico e nobreza em cada detalhe.</p>
              <Button asChild>
                <Link href="/produtos/tipos/piso-pronto">Ver todos</Link>
              </Button>
            </div>
            <div className="lg:col-span-9">
              <ul className="grid gap-3 sm:grid-cols-3">
                {products.map((product) => (
                  <li key={product.id}>
                    <ProductCard {...product} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-copper-50 border-copper-100 border-y py-24">
        <div className="container">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <Image className="rounded-md" src="/imagens/pagina-inicial/deck-de-madeira-macica.avif" alt="..." width={960} height={768} />
            </div>
            <div className="space-y-4 text-balance">
              <h2 className="text-primary text-4xl font-bold">Deck de madeira maciça</h2>
              <p>Combinando a beleza natural da madeira com resistência e durabilidade, nossos decks são a escolha perfeita para áreas externas sofisticadas. Unimos tradição e tecnologia para oferecer soluções que valorizam seus espaços com charme e aconchego incomparáveis.</p>
              <Button asChild>
                <Link href="/produtos/tipos/deck">Ver todos</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div className="md:order-last">
              <Image className="rounded-md" src="/imagens/pagina-inicial/painel-ripado-de-madeira-macica.avif" alt="..." width={960} height={768} />
            </div>
            <div className="space-y-4 text-balance">
              <h2 className="text-primary text-4xl font-bold">Painel ripado de madeira maciça</h2>
              <p>A união perfeita entre sofisticação e autenticidade. Nossos painéis ripados trazem elegância, textura e um toque natural para qualquer ambiente, destacando a beleza única da madeira maciça com qualidade e durabilidade excepcionais.</p>
              <Button asChild>
                <Link href="/produtos/tipos/painel-ripado">Ver todos</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-copper-50 border-copper-100 border-y py-24">
        <div className="container">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div className="">
              <Image className="rounded-md" src="/imagens/pagina-inicial/assoalho-de-madeira-demolicao.avif" alt="..." width={960} height={768} />
            </div>
            <div className="space-y-4 text-balance">
              <h2 className="text-primary text-4xl font-bold">Assoalho de madeira demolição</h2>
              <p>O assoalho de madeira de demolição traz um charme único e uma história genuína para o seu ambiente. Cada tábua carrega marcas do tempo, oferecendo autenticidade, resistência e um visual incomparável. Ideal para quem valoriza o charme do antigo com a durabilidade de um material renovado.</p>
              <Button asChild>
                <Link href="/produtos/tipos/assoalho">Ver todos</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container space-y-10">
          <h2 className="text-primary text-center text-4xl font-bold">O que nossos clientes dizem</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <figure className="border-copper-100 bg-copper-50 flex flex-col gap-3 rounded-md border p-8">
              <blockquote className="flex-1 italic">
                "Fiquei extremamente contente com o resultado entregue na minha casa! A empresa executou o projeto com precisão e foi sempre muito atenciosa aos desafios que surgiram ao longo do caminho. Recomendo de olhos fechados e já compartilhei a experiência positiva com o grupo do condomínio. Parabéns pelo excelente trabalho!"
              </blockquote>
              <figcaption className="text-primary text-right font-bold">Lourenço Oliveira Aquino</figcaption>
            </figure>
            <figure className="border-copper-100 bg-copper-50 flex flex-col gap-3 rounded-md border p-8">
              <blockquote className="flex-1 italic">
                "Gostaria de parabenizar toda a equipe da loja pelo excelente atendimento que recebi! Fui muito bem acolhido desde o primeiro contato, com profissionais atenciosos, prestativos e sempre dispostos a tirar dúvidas e ajudar na escolha do melhor produto. Além disso, a variedade e qualidade dos pisos disponíveis impressionam — é fácil perceber o cuidado com cada
                detalhe. Sem dúvida, uma experiência de compra acima das expectativas. Recomendo de olhos fechados!"
              </blockquote>
              <figcaption className="text-primary text-right font-bold">Vitor Oliveira</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="bg-primary py-24 text-white">
        <div className="container">
          <div className="grid items-center gap-x-10 gap-y-6 lg:grid-cols-12">
            <div className="space-y-4 text-balance max-md:text-center lg:col-span-3">
              <h2 className="text-xl">Trabalhamos exclusivamente com matéria-prima certificada, oriunda de manejo florestal.</h2>
            </div>
            <div className="lg:col-span-9">
              <ul className="flex justify-center gap-8 rounded-xl bg-white/10 p-8 max-md:flex-wrap">
                <li>
                  <Image className="h-24 w-auto" src="/logos/ministerio-do-meio-ambiente.avif" alt="Ibama MMA" width={395} height={443} />
                </li>
                <li>
                  <Image className="h-24 w-auto" src="/logos/ief.svg" alt="Ibama MMA" width={619} height={443} />
                </li>
                <li>
                  <Image className="h-24 w-auto" src="/logos/nwfa.svg" alt="Ibama MMA" width={482} height={443} />
                </li>
                <li>
                  <Image className="h-24 w-auto" src="/logos/ibama.svg" alt="Ibama MMA" width={435} height={443} />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div className="space-y-4 text-balance">
              <h2 className="text-primary text-4xl font-bold">Parceria com arquitetos</h2>
              <p>Na Decorato Pisos, valorizamos a visão e o trabalho dos arquitetos. Oferecemos um programa de parceria exclusivo para impulsionar seus projetos e garantir a satisfação dos seus clientes.</p>
              <ul className="list-outside list-disc space-y-2 pl-4">
                <li>Comissão exclusiva sobre vendas.</li>
                <li>Apoio técnico especializado em todas as etapas do projeto.</li>
                <li>Acesso prioritário ao nosso showroom para você e seus clientes.</li>
                <li>Materiais de apoio e amostras exclusivas.</li>
                <li>Participação em eventos e workshops.</li>
              </ul>
              <Button variant="whatsapp" asChild>
                <Link href={getWhatsAppUrl({ message: "Olá! Vim através do site e gostaria de ser um arquiteto parceiro." })} target="_blank" rel="noopener noreferrer">
                  <WhatsApp />
                  Seja um parceiro
                </Link>
              </Button>
            </div>
            <div>
              <Image className="rounded-md" src="/imagens/pagina-inicial/parceria-com-arquitetos.avif" alt="..." width={960} height={768} />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-copper-50 border-copper-100 border-y py-24">
        <div className="container">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div className="space-y-4 text-balance">
              <h2 className="text-primary text-4xl font-bold">Somos fábrica</h2>
              <p>Da floresta ao seu ambiente, cada peça da Decorato Pisos é produzida com o mais alto padrão de qualidade em nossa fábrica própria. Investimos em tecnologia e mão de obra especializada para garantir a excelência em cada detalhe.</p>
              <ul className="list-outside list-disc space-y-2 pl-4">
                <li>Controle de qualidade rigoroso em todas as etapas.</li>
                <li>Preços competitivos por sermos fabricantes diretos.</li>
                <li>Flexibilidade para projetos sob medida.</li>
                <li>Entrega segura e pontual em todo o Brasil.</li>
                <li>Compromisso com a sustentabilidade e manejo florestal responsável.</li>
              </ul>
            </div>
            <div className="md:order-first">
              <Image className="rounded-md" src="/imagens/pagina-inicial/somos-fabrica.avif" alt="..." width={960} height={768} />
            </div>
          </div>
        </div>
      </section>

      <CallToAction />
    </main>
  );
}

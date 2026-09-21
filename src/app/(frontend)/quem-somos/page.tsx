import { createMetadata } from "@/utilities/create-metadata";

import CallToAction from "@/sections/CallToAction";

export function generateMetadata() {
  return createMetadata({
    path: "/quem-somos",
    title: "Sobre a Decorato Concept",
    description: "Referência em pisos de madeira de alto padrão. Qualidade, procedência e atendimento personalizado em projetos que unem sofisticação e confiança.",
  });
}

export default function Page() {
  return (
    <main>
      <section className="pt-6 pb-24">
        <div className="container max-w-4xl space-y-6">
          <h1 className="text-primary border-b-copper-100 border-b pb-4 text-4xl font-bold">Sobre a Decorato Pisos</h1>
          <div className="space-y-3">
            <p>A Decorato Concept nasceu com um propósito claro: transformar ambientes com sofisticação, excelência e confiança. Mais do que vender pisos, queremos entregar experiências únicas em cada projeto.</p>
            <p>O casal Tiago Bettin e Wanessa C. Bettin fundou a empresa com base em princípios sólidos, guiados pela fé e por uma trajetória construída com esforço, visão de futuro e amor ao que fazem.</p>
            <p>Tiago soma anos de experiência no setor da construção civil: atuou com pisos cerâmicos, foi supervisor de vendas em indústria de esquadrias de alumínio e representou madeireiras e serrarias no Acre e Mato Grosso, sempre com responsabilidade técnica e fiscal, incluindo atuação com o DOF (Documento de Origem Florestal).</p>
            <p>Com esse conhecimento de mercado, fundou a Decorato Pisos, que evoluiu para a Decorato Concept: uma marca voltada ao público que valoriza qualidade, procedência e acabamento impecável.</p>
            <p>A Decorato Concept oferece pisos de madeira de alto padrão, cuidadosamente selecionados para garantir o melhor custo-benefício, sem abrir mão da estética e da durabilidade. Tiago acompanha pessoalmente as obras, garantindo execução de alto nível do início ao fim.</p>
            <p>Wanessa, além de sócia, é a alma do atendimento. Cuida de cada detalhe da gestão, da experiência do cliente e da comunicação com acolhimento e profissionalismo.</p>
            <p>Nosso showroom vai muito além de uma loja técnica.</p>
            <p>Ele é também uma extensão para nossos arquitetos parceiros, que contam com uma sala de reuniões exclusiva, amostras completas de materiais e todo o suporte necessário para criar paletas de cores, apresentar projetos e tomar decisões ao lado dos seus clientes.</p>
            <p>Recebemos cada pessoa como quem recebe amigos em casa, com atenção, clareza e transparência.</p>
            <p>Na Decorato Concept, você fala direto com os proprietários. E mais do que um produto, você leva confiança, cuidado e excelência em cada projeto.</p>
          </div>
        </div>
      </section>

      <CallToAction />
    </main>
  );
}

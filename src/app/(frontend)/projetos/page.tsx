import { createMetadata } from "@/utilities/create-metadata";

import CallToAction from "@/sections/CallToAction";
import Image from "next/image";

export function generateMetadata() {
  return createMetadata({
    path: "/",
    title: "Projetos",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  });
}

export default function Page() {
  return (
    <main>
      <section className="pt-6 pb-24">
        <div className="container space-y-6">
          <h1 className="text-primary border-b-copper-100 border-b pb-4 text-4xl font-bold">Projetos</h1>
          <div className="grid grid-cols-2 gap-4">
            <Image className="col-span-2 object-cover max-sm:aspect-4/3" src="/imagens/projetos/bannerdeck.avif" alt="Deck" width={1920} height={920} />
            <Image className="col-span-2 object-cover max-sm:aspect-4/3 sm:col-span-1" src="/imagens/projetos/piso-pronto-cumaru.avif" alt="Piso pronto Cumaru" width={960} height={885} />
            <Image className="col-span-2 object-cover max-sm:aspect-4/3 sm:col-span-1" src="/imagens/projetos/assoalho-demolicao.avif" alt="Assoalho Demo;ição" width={960} height={885} />
            <Image className="col-span-2 object-cover max-sm:aspect-4/3" src="/imagens/projetos/piso-pronto-demadeira-macica.avif" alt="Piso pronto de madeira maciça" width={1920} height={920} />
          </div>
        </div>
      </section>

      <CallToAction />
    </main>
  );
}

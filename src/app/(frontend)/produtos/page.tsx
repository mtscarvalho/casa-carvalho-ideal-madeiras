import { createMetadata } from "@/utilities/create-metadata";

import { ProductsArchive } from "@/components/ProductsArchive";
import CallToAction from "@/sections/CallToAction";

export function generateMetadata() {
  return createMetadata({
    path: "/produtos",
    title: "Produtos",
    description: "Explore nossa linha completa! Produtos de alto padrão, com qualidade, durabilidade e sofisticação para projetos residenciais e arquitetônicos.",
  });
}

export default function Page() {
  return (
    <main>
      <section className="pt-6 pb-24">
        <div className="container">
          <ProductsArchive />
        </div>
      </section>

      <CallToAction />
    </main>
  );
}

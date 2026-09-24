import { createMetadata } from "@/utilities/create-metadata";

export function generateMetadata() {
  return createMetadata({
    path: "/produtos",
    title: "Produtos",
    description: "Explore nossa linha completa! Produtos de alto padrão, com qualidade, durabilidade e sofisticação para projetos residenciais e arquitetônicos.",
  });
}

export default function Page() {
  return <main></main>;
}

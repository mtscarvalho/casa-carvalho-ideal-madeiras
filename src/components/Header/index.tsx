import { fetchAllProductCategories } from "@/collections/ProductsCategory/data";
import Link from "next/link";
import { Menu } from "../Menu";
import { Button } from "../ui/button";

type TMenuItem = {
  label: string;
  href?: string;
  external?: boolean;
};

export type TMenu = {
  submenu?: TMenuItem[];
} & TMenuItem;

export async function Header() {
  const categories = await fetchAllProductCategories();

  const menu: TMenu[] = [
    {
      label: "Produtos",
      submenu: [
        {
          label: "Todos os produtos",
          href: "/produtos",
        },
        ...categories.map((category) => ({
          label: category.title,
          href: category.relPermalink,
        })),
      ],
    },
    { label: "Projetos", href: "/projetos" },
    { label: "Quem somos", href: "/quem-somos" },
    { label: "Parceria com arquitetos", href: "/parceria-com-arquitetos" },
    { label: "Contato", href: "/contato" },
  ];

  return (
    <header className="dark bg-blue-950">
      <Button className="skip-to-main" asChild>
        <Link href="#conteudo">Pular para o conteúdo</Link>
      </Button>
      <Menu items={menu} />
    </header>
  );
}

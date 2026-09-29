import { fetchAllProductCategories } from "@/collections/ProductsCategory/data";
import { cn } from "@/lib/utils";
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
  hideDesktop?: boolean;
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
    { label: "Contato", href: "/contato" },
  ];

  return (
    <header className="bg-blue-950">
      <Button className="skip-to-main" asChild>
        <Link href="#conteudo">Pular para o conteúdo</Link>
      </Button>
      <Menu items={menu} />
      <nav className="bg-neutral-0 max-lg:hidden">
        <ul className="border-subtle flex justify-center border-b py-3">
          {categories.map((category) => (
            <li className={cn("border-subtle border-r px-3 last:border-r-0")} key={category.id}>
              <Button className="justify-start" variant="ghost" fullwidth asChild>
                <Link href={category.relPermalink}>{category.title}</Link>
              </Button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

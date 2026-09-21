"use client";

import { useRouter } from "nextjs-toploader/app";

import { cn } from "@/utilities/cn";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { ButtonOld } from "@/components/Button";

type PaginationProps = {
  className?: string;
  page?: number;
  totalPages: number;
  path: string;
};

export function Pagination({ className, page, path, totalPages }: PaginationProps) {
  const router = useRouter();

  if (totalPages <= 1) {
    return;
  }

  if (page) {
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return (
      <div className={cn("my-12", className)}>
        <nav aria-label="pagination" className="mx-auto flex w-full justify-center" role="navigation">
          <ul className="flex flex-row items-center gap-1">
            <li className="-mr-1">
              <ButtonOld size="md" variant="subtle" aria-label="Ir para página anterior" disabled={!hasPrevPage} onClick={() => router.push(`${path}/${page - 1}`)}>
                <ChevronLeft className="h-4 w-4" />
                <span>Anterior</span>
              </ButtonOld>
            </li>

            {hasPrevPage && (
              <li>
                <ButtonOld className="size-10" size="icon" variant="subtle" aria-label={`Ir para página ${page - 1}`} disabled={!hasPrevPage} onClick={() => router.push(`${path}/${page - 1}`)}>
                  {page - 1}
                </ButtonOld>
              </li>
            )}

            <li>
              <ButtonOld className="size-10" size="icon" variant="primary" aria-label="Página atual" onClick={() => router.push(`${path}/${page}`)}>
                {page}
              </ButtonOld>
            </li>

            {hasNextPage && (
              <li>
                <ButtonOld className="size-10" size="icon" variant="subtle" aria-label={`Ir para página ${page + 1}`} disabled={!hasNextPage} onClick={() => router.push(`${path}/${page + 1}`)}>
                  {page + 1}
                </ButtonOld>
              </li>
            )}

            <li className="-ml-1">
              <ButtonOld size="md" variant="subtle" aria-label="Ir para próxima página" disabled={!hasNextPage} onClick={() => router.push(`${path}/${page + 1}`)}>
                <span>Próxima</span>
                <ChevronRight className="h-4 w-4" />
              </ButtonOld>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

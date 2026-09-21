import Link from "next/link";

import { WhatsApp } from "@/components/SocialIcon";
import { Button } from "@/components/ui/button";
import { getWhatsAppUrl } from "@/utilities/get-whatsapp-url";

type CallToActionProps = {
  url?: string;
  title?: string;
  description?: string;
  button?: string;
};

export default function CallToAction({ title = "Solicite um orçamento", description = "Transforme sua ideia em realidade com um projeto especial sob medida em madeira. Fale com nossa equipe e solicite um orçamento personalizado para criar um ambiente único, elegante e com a qualidade Decorato Pisos.", button = "Orçamento via WhatsApp", url }: CallToActionProps) {
  return (
    <section className="bg-primary py-24 text-white">
      <div className="container max-w-2xl space-y-6 text-center">
        <h2 className="text-4xl font-bold text-balance">{title}</h2>
        <p>{description}</p>
        <Button variant="whatsapp" asChild>
          <Link href={url || getWhatsAppUrl()}>
            <WhatsApp />
            {button}
          </Link>
        </Button>
      </div>
    </section>
  );
}

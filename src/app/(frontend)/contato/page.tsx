import { ContactForm } from "@/components/ContactForm";
import { WhatsApp } from "@/components/SocialIcon";
import { createMetadata } from "@/utilities/create-metadata";
import { getWhatsAppUrl } from "@/utilities/get-whatsapp-url";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

export function generateMetadata() {
  return createMetadata({
    path: "/contato",
    title: "Contato | Decorato Pisos",
    description: "Entre em contato com a Decorato Pisos. Endereço, e-mail, telefones e horário de atendimento.",
  });
}

export default function Page() {
  return (
    <main>
      <section className="pt-10 pb-24">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="space-y-6">
              <div className="max-w-xl space-y-4 text-balance">
                <h1 className="text-primary text-4xl font-bold">Contate-nos</h1>
                <p className="text-lg">Estamos prontos para tirar suas dúvidas, enviar orçamentos e ajudar no que for preciso. Fale conosco e descubra como a madeira certa pode transformar o seu ambiente.</p>
              </div>
              <ul className="space-y-3">
                <li className="flex gap-2">
                  <MapPin className="text-secondary size-6 shrink-0" />
                  <div className="space-y-0">
                    <p>Rua Vergueiro, 4382, Chácara Klabin, São Paulo/SP, 04102-002</p>
                  </div>
                </li>
                <li className="flex gap-2">
                  <Clock className="text-secondary size-6 shrink-0" />
                  <div className="space-y-0">
                    <p>Segunda - Sexta: 09h às 16h</p>
                  </div>
                </li>
                <li className="flex gap-2">
                  <Mail className="text-secondary size-6 shrink-0" />
                  <div className="space-y-0">
                    <p>
                      <a className="hover:text-primary" href="mailto:contato@decoratopisos.com.br">
                        contato@decoratopisos.com.br
                      </a>
                    </p>
                  </div>
                </li>
                <li className="flex gap-2">
                  <Phone className="text-secondary size-6 shrink-0" />
                  <div className="space-y-0">
                    <p>
                      <a className="hover:text-primary" href="+551133268033">
                        (11) 3326-8033
                      </a>{" "}
                      /{" "}
                      <a className="hover:text-primary" href="tel:+5511996219150">
                        (11) 99621-9150
                      </a>
                    </p>
                  </div>
                </li>
                <li className="flex gap-2">
                  <WhatsApp className="text-secondary size-6 shrink-0" />
                  <div className="space-y-0">
                    <p>
                      <a className="hover:text-primary" href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
                        WhatsApp
                      </a>
                    </p>
                  </div>
                </li>
              </ul>
              <div className="space-y-4">
                <h2 className="text-primary text-xl font-bold text-balance">Formulário para contato</h2>
                <ContactForm />
              </div>
            </div>
            <div className="aspect-square min-h-96 overflow-hidden rounded-md">
              <iframe title="Mapa Decorato Pisos" className="size-full min-h-96 border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=Decorato%20Concept%20Hardwood%20Floors%20Rua%20Vergueiro%204382%20S%C3%A3o%20Paulo&output=embed" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

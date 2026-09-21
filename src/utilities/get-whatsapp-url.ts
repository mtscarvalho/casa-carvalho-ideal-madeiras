const DEFAULT_PHONE = "5511996219150";
const DEFAULT_MESSAGE = "Olá! Vim através do seu site e gostaria de um orçamento.";

type GetWhatsAppUrlParams = {
  phone?: string;
  message?: string;
};

export function getWhatsAppUrl({ phone = DEFAULT_PHONE, message = DEFAULT_MESSAGE }: GetWhatsAppUrlParams = {}): string {
  const formattedPhone = phone.replace(/\D/g, "");

  return `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;
}

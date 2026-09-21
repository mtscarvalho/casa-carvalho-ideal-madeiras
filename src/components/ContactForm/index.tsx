"use client";

import type { ChangeEvent, FormEvent } from "react";
import { useRef, useState } from "react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

type ContactFormData = {
  name: string;
  email: string;
  message: string;
  honeypot: string;
};

type ContactFormResponse = {
  message?: string;
  error?: string;
};

const initialFormData: ContactFormData = {
  name: "",
  email: "",
  message: "",
  honeypot: "",
};

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const formStartedAt = useRef(Date.now());

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccessMessage("");
    setIsSubmitting(true);

    const formDuration = Date.now() - formStartedAt.current;

    try {
      const response = await fetch("/api/contact-form/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          formDuration,
        }),
      });

      const data = (await response.json().catch(() => null)) as ContactFormResponse | null;

      if (!response.ok) {
        throw new Error(data?.error ?? data?.message ?? "Não foi possível enviar a mensagem.");
      }

      setSuccessMessage(data?.message ?? "Mensagem enviada com sucesso!");

      setFormData(initialFormData);
      formStartedAt.current = Date.now();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Ocorreu um erro inesperado.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="pointer-events-none absolute top-auto -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <Label htmlFor="website">Não preencha este campo</Label>
        <Input id="website" name="honeypot" type="text" value={formData.honeypot} onChange={handleChange} autoComplete="off" tabIndex={-1} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Nome</Label>
        <Input id="name" name="name" type="text" value={formData.name} onChange={handleChange} placeholder="Digite seu nome" autoComplete="name" maxLength={120} required disabled={isSubmitting} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">E-mail</Label>
        <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="nome@exemplo.com" autoComplete="email" maxLength={254} required disabled={isSubmitting} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Mensagem</Label>
        <Textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Digite sua mensagem" rows={6} maxLength={5000} required disabled={isSubmitting} />
      </div>

      {error && (
        <p role="alert" aria-live="assertive" className="text-sm text-red-600">
          {error}
        </p>
      )}

      {successMessage && (
        <p role="status" aria-live="polite" className="text-sm text-green-600">
          {successMessage}
        </p>
      )}

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Enviando..." : "Enviar mensagem"}
      </Button>
    </form>
  );
}

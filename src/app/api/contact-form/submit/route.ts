import { NextResponse } from "next/server";

type ContactFormBody = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  honeypot?: unknown;
  formDuration?: unknown;
};

const MINIMUM_FORM_DURATION = 2000;

function getString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function fakeSuccessResponse() {
  return NextResponse.json(
    {
      message: "Mensagem enviada com sucesso!",
    },
    {
      status: 200,
    },
  );
}

export async function POST(req: Request) {
  let body: ContactFormBody;

  try {
    body = (await req.json()) as ContactFormBody;
  } catch {
    return NextResponse.json(
      {
        error: "Corpo da requisição inválido.",
      },
      {
        status: 400,
      },
    );
  }

  const name = getString(body.name);
  const email = getString(body.email).toLowerCase();
  const message = getString(body.message);
  const honeypot = getString(body.honeypot);

  /*
   * 1. Honeypot
   *
   * Bots normalmente preenchem todos os inputs encontrados.
   * Retornamos sucesso para não informar ao bot que ele foi detectado.
   */
  if (honeypot) {
    return fakeSuccessResponse();
  }

  /*
   * 2. Tempo mínimo de preenchimento
   */
  if (typeof body.formDuration === "number" && Number.isFinite(body.formDuration) && body.formDuration < MINIMUM_FORM_DURATION) {
    return fakeSuccessResponse();
  }

  const rdApiAccessToken = process.env.RD_API_ACCESS_TOKEN;

  if (!rdApiAccessToken) {
    console.error("A variável RD_API_ACCESS_TOKEN não foi configurada.");
    return NextResponse.json({ error: "O serviço de contato não está configurado." }, { status: 500 });
  }

  try {
    const endpoint = new URL("https://api.rd.services/platform/conversions");

    endpoint.searchParams.set("api_key", rdApiAccessToken);

    const rdResponse = await fetch(endpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event_type: "CONVERSION",
        event_family: "CDP",
        payload: {
          conversion_identifier: "site",
          name,
          email,
          cf_mensagem: message,
          cf_origin: "Site",
        },
      }),
      cache: "no-store",
    });

    if (!rdResponse.ok) {
      const rdError = await rdResponse.text().catch(() => "");

      console.error("Erro retornado pelo RD Station:", {
        status: rdResponse.status,
        response: rdError,
      });

      return NextResponse.json({ error: "Não foi possível enviar sua mensagem." }, { status: 502 });
    }

    return NextResponse.json({ message: "Mensagem enviada com sucesso!" }, { status: 200 });
  } catch (error) {
    console.error("Erro ao enviar contato para o RD Station:", error);
    return NextResponse.json({ error: "Erro interno ao enviar a mensagem." }, { status: 500 });
  }
}

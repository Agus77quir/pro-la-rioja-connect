import { createFileRoute } from "@tanstack/react-router";
import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";
import { z } from "zod";

const SYSTEM = `Sos el asistente virtual de PRO La Rioja (Propuesta Republicana en la provincia de La Rioja, Argentina). Respondé en español rioplatense, breve y cordial.
Información del sitio:
- Propuestas: 01 Institucionalidad (instituciones fuertes, controles independientes, rendición de cuentas). 02 Producción y empleo (reducir impuestos distorsivos, modernizar el Estado, empleo privado de calidad). 03 Educación, innovación y tecnología (educación pública con metas claras, evaluación y oportunidades). 04 Seguridad (más presencia policial, tecnología, justicia ágil, política firme contra el delito y el narcotráfico).
- Actividades/noticias: "Nuestra agenda para el desarrollo" (plan integral de producción, empleo privado e infraestructura); encuentro provincial con más de 400 vecinos en mesas de trabajo de seguridad, salud y educación; voluntarios jóvenes recorren barrios de Capital, Chilecito y Chamical.
- Para sumarse: sección "Afiliate" del sitio. Contacto: sección "Contacto" al pie de la página.
Si no sabés algo, decilo y sugerí la sección de Contacto. No inventes datos, fechas ni nombres.`;

const schema = z.object({
  messages: z
    .array(z.object({ role: z.enum(["user", "assistant"]), content: z.string().min(1).max(2000) }))
    .min(1)
    .max(30),
});

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const key = process.env.LOVABLE_API_KEY;
        if (!key) return new Response("Falta configuración del asistente.", { status: 500 });
        const parsed = schema.safeParse(await request.json().catch(() => null));
        if (!parsed.success) return new Response("Mensaje inválido.", { status: 400 });
        const openai = createOpenAI({
          baseURL: "https://ai.gateway.lovable.dev/v1",
          apiKey: key,
          headers: { "Lovable-API-Key": key, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
        });
        const result = streamText({
          model: openai.responses("openai/gpt-6-astra"),
          system: SYSTEM,
          messages: parsed.data.messages,
          abortSignal: request.signal,
          maxRetries: 0,
          providerOptions: {
            openai: { forceReasoning: true, reasoningEffort: "low", store: false },
          },
        });
        return result.toTextStreamResponse();
      },
    },
  },
});

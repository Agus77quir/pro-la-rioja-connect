import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Msg = { role: "bot" | "user"; text: string };

const faqs: { q: string; keywords: string[]; a: string }[] = [
  {
    q: "¿Cómo me sumo a la Fundación?",
    keywords: ["afili", "sumar", "unir", "membres", "particip"],
    a: "Podés sumarte completando el formulario en la sección 'Sumate' de esta misma página. Es gratuito y solo te toma un minuto.",
  },
  {
    q: "¿Cuáles son las propuestas?",
    keywords: ["propuest", "plan", "proyecto", "ideas"],
    a: "Trabajamos en seguridad, educación, salud, producción y empleo privado. Mirá el detalle completo en la sección 'Propuestas'.",
  },
  {
    q: "¿Cómo los contacto?",
    keywords: ["contact", "tel", "mail", "email", "direcc", "ubicac"],
    a: "Escribinos a contacto@fundacionpensarlarioja.ar o llamanos al +54 380 000-0000. También podés usar el formulario en 'Contacto'.",
  },
  {
    q: "¿Dónde están las novedades?",
    keywords: ["notici", "novedad", "nueva", "comunicad"],
    a: "Publicamos novedades en la sección 'Noticias' y en nuestras redes sociales (Instagram, Facebook y Twitter).",
  },
  {
    q: "¿Puedo ser voluntario?",
    keywords: ["volunt", "ayud", "colabor"],
    a: "¡Sí! Sumate como voluntario completando el formulario y marcando tu interés. Te contactamos desde el equipo territorial.",
  },
  {
    q: "¿Qué es la Fundación Pensar Pro La Rioja?",
    keywords: ["quien", "equipo", "integr", "lider", "referent", "fundac", "pensar", "que es"],
    a: "Somos la Fundación Pensar Pro La Rioja: un espacio de pensamiento y acción política integrado por vecinos, profesionales y dirigentes comprometidos con la provincia. Más info en 'Quiénes somos'.",
  },
];

const quickReplies = faqs.slice(0, 4).map((f) => f.q);

function findAnswer(input: string): string {
  const text = input.toLowerCase();
  const match = faqs.find((f) => f.keywords.some((k) => text.includes(k)));
  if (match) return match.a;
  if (/hola|buen[oa]s|saludos|hey/.test(text))
    return "¡Hola! Soy el asistente de la Fundación Pensar Pro La Rioja. ¿En qué puedo ayudarte? Podés preguntarme por propuestas, cómo sumarte o contacto.";
  if (/gracias/.test(text)) return "¡Gracias a vos por escribirnos!";
  return "No tengo una respuesta exacta para eso. Probá con: propuestas, sumarme, contacto, noticias o voluntariado. También podés escribirnos a contacto@fundacionpensarlarioja.ar.";
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "bot",
      text: "¡Hola! 👋 Soy el asistente virtual de la Fundación Pensar Pro La Rioja. ¿En qué puedo ayudarte hoy?",
    },
  ]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages((m) => [...m, { role: "user", text: trimmed }]);
    setInput("");
    setTimeout(() => {
      setMessages((m) => [...m, { role: "bot", text: findAnswer(trimmed) }]);
    }, 350);
  };

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Cerrar chat" : "Abrir chat"}
        className="fixed bottom-5 right-5 z-50 h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-5 z-50 w-[92vw] max-w-sm rounded-2xl border border-border bg-card shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4">
          <div className="bg-primary text-primary-foreground px-4 py-3">
            <div className="font-semibold">Asistente Fundación Pensar Pro La Rioja</div>
            <div className="text-xs opacity-80">Respuestas a preguntas frecuentes</div>
          </div>

          <div className="flex-1 max-h-[55vh] overflow-y-auto p-3 space-y-2 bg-background">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] text-sm rounded-2xl px-3 py-2 ${
                    m.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-muted text-foreground rounded-bl-sm"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>

          <div className="px-3 pb-2 flex flex-wrap gap-1.5 bg-background">
            {quickReplies.map((q) => (
              <button
                key={q}
                onClick={() => send(q)}
                className="text-xs px-2.5 py-1 rounded-full border border-border bg-card hover:bg-muted transition-colors"
              >
                {q}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 p-2 border-t border-border bg-card"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribí tu pregunta..."
              className="flex-1"
            />
            <Button type="submit" size="icon" aria-label="Enviar">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}
    </>
  );
}

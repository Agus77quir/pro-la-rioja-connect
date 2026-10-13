import { createFileRoute } from "@tanstack/react-router";
import PRORioja from "@/components/PRORioja";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PRO La Rioja — Nuestra provincia, nuestro futuro" },
      { name: "description", content: "Conocé las propuestas, noticias y el equipo de PRO La Rioja. Participá y sumate al PRO." },
      { property: "og:title", content: "PRO La Rioja — Nuestra provincia, nuestro futuro" },
      { property: "og:description", content: "Propuestas, noticias y participación para el futuro de La Rioja." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PRORioja,
});

import { createFileRoute } from "@tanstack/react-router";
import html from "@/assets/pagina-estatica.html?raw";

const FILENAME = "fundacion-pensar-la-rioja.html";

export const Route = createFileRoute("/api/public/descargar-html")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const view = url.searchParams.has("ver");
        return new Response(html, {
          headers: {
            "Content-Type": "text/html; charset=utf-8",
            "Content-Disposition": view
              ? "inline"
              : `attachment; filename="${FILENAME}"`,
            "Cache-Control": "no-cache",
          },
        });
      },
    },
  },
});

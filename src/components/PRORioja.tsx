import { useEffect, useRef, useState } from "react";
import logo from "@/assets/pro-logo.png";
import hero from "@/assets/hero-pro.jpg";
import news1 from "@/assets/news-1.jpg";
import news2 from "@/assets/news-2.jpg";
import news3 from "@/assets/news-3.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, X, ArrowRight, Mail, MapPin, Phone } from "lucide-react";

const navLinks = [
  { label: "Propuestas", href: "#propuestas" },
  { label: "Noticias", href: "#noticias" },
  { label: "Quiénes somos", href: "#quienes-somos" },
  { label: "Sumate", href: "#sumate" },
];

const news = [
  {
    img: news1,
    date: "abril 18, 2026",
    title: "Una nueva agenda de desarrollo para La Rioja",
    excerpt:
      "Presentamos un plan integral para impulsar la producción, el empleo privado y la infraestructura en toda la provincia.",
  },
  {
    img: news2,
    date: "abril 12, 2026",
    title: "Encuentro provincial: escuchar para gobernar mejor",
    excerpt:
      "Más de 400 vecinos participaron del encuentro de mesas de trabajo sobre seguridad, salud y educación.",
  },
  {
    img: news3,
    date: "abril 5, 2026",
    title: "Voluntarios PRO Joven recorren los barrios",
    excerpt:
      "La militancia joven del PRO La Rioja realizó una nueva jornada de territorio en Capital, Chilecito y Chamical.",
  },
];

const proposals = [
  {
    n: "01",
    title: "República y transparencia",
    text: "Instituciones fuertes, controles independientes y rendición de cuentas en cada nivel del Estado provincial.",
  },
  {
    n: "02",
    title: "Producción y empleo",
    text: "Reducir impuestos distorsivos, modernizar el Estado y crear las condiciones para el empleo privado de calidad.",
  },
  {
    n: "03",
    title: "Educación y futuro",
    text: "Una educación pública con metas claras, evaluación y oportunidades reales para los chicos de La Rioja.",
  },
  {
    n: "04",
    title: "Seguridad para vivir tranquilos",
    text: "Más presencia policial, tecnología, justicia ágil y una política firme contra el delito y el narcotráfico.",
  },
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && e.target.classList.add("in"));
      },
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Triangle({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`pro-triangle inline-block bg-primary ${className}`}
      style={{ transform: "rotate(180deg)" }}
    />
  );
}

export default function PRORioja() {
  useReveal();
  const [open, setOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3">
            <img src={logo} alt="Logo PRO La Rioja" width={44} height={44} className="w-11 h-11" />
            <div className="leading-tight">
              <div className="font-extrabold tracking-tight text-lg">PRO</div>
              <div className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
                La Rioja
              </div>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="yellow-underline text-sm font-semibold py-1"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Button asChild className="rounded-none font-bold px-6 h-11">
              <a href="#sumate">
                Sumate <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>

          <button
            className="lg:hidden p-2"
            onClick={() => setOpen(!open)}
            aria-label="Menú"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {open && (
          <div className="lg:hidden border-t border-border bg-background">
            <div className="px-5 py-4 flex flex-col gap-3">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="py-2 font-semibold"
                >
                  {l.label}
                </a>
              ))}
              <Button asChild className="rounded-none font-bold mt-2">
                <a href="#sumate" onClick={() => setOpen(false)}>
                  Sumate
                </a>
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section ref={heroRef} className="relative overflow-hidden bg-[oklch(0.15_0.01_80)] text-white">
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: `url(${hero})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.15_0.01_80)] via-[oklch(0.15_0.01_80/0.7)] to-transparent" />

        <Triangle className="float-tri absolute -right-10 top-10 w-72 h-72 opacity-90" />
        <Triangle className="absolute -left-20 -bottom-24 w-96 h-96 opacity-20" />

        <div className="relative max-w-7xl mx-auto px-5 lg:px-8 py-28 lg:py-44">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 mb-8 reveal">
              <span className="h-[2px] w-10 bg-primary" />
              <span className="text-xs font-bold tracking-[0.3em] uppercase text-primary">
                PRO La Rioja
              </span>
            </div>
            <h1 className="text-balance text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[0.95] reveal">
              La Rioja que <span className="text-primary">queremos</span>,
              <br />
              empieza hoy.
            </h1>
            <p className="mt-8 text-lg md:text-xl text-white/80 max-w-2xl reveal">
              Somos el espacio que cree en el cambio, en las instituciones y en una provincia con
              futuro. Trabajamos para que La Rioja vuelva a ser protagonista.
            </p>
            <div className="mt-10 flex flex-wrap gap-4 reveal">
              <Button
                asChild
                className="rounded-none h-14 px-8 font-bold text-base bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <a href="#sumate">
                  Sumate al equipo <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-none h-14 px-8 font-bold text-base bg-transparent border-white/40 text-white hover:bg-white hover:text-foreground"
              >
                <a href="#propuestas">Conocé nuestras propuestas</a>
              </Button>
            </div>
          </div>
        </div>

        {/* marquee */}
        <div className="relative border-t border-white/10 bg-black/30 py-4 overflow-hidden">
          <div className="marquee-track flex gap-12 whitespace-nowrap text-sm font-bold uppercase tracking-[0.25em] text-white/60">
            {Array.from({ length: 2 }).map((_, k) => (
              <div key={k} className="flex gap-12">
                {[
                  "República",
                  "Trabajo",
                  "Educación",
                  "Seguridad",
                  "Producción",
                  "Federalismo",
                  "Transparencia",
                  "Futuro",
                ].map((w) => (
                  <span key={w} className="flex items-center gap-12">
                    {w}
                    <Triangle className="w-3 h-3" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROPUESTAS */}
      <section id="propuestas" className="py-24 lg:py-36">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-16 reveal">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Triangle className="w-4 h-4" />
                <span className="text-xs font-bold tracking-[0.3em] uppercase text-muted-foreground">
                  Nuestras propuestas
                </span>
              </div>
              <h2 className="text-4xl md:text-6xl font-extrabold max-w-2xl text-balance">
                Cuatro ejes para transformar la provincia.
              </h2>
            </div>
            <p className="max-w-md text-muted-foreground text-lg">
              Ideas concretas, equipos preparados y una visión de largo plazo para La Rioja.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {proposals.map((p) => (
              <article
                key={p.n}
                className="reveal hover-lift bg-secondary p-10 border border-border group cursor-pointer"
              >
                <div className="flex items-start justify-between mb-8">
                  <span className="text-5xl font-extrabold text-muted-foreground/30">{p.n}</span>
                  <Triangle className="w-8 h-8 transition-transform duration-500 group-hover:scale-125" />
                </div>
                <h3 className="text-2xl md:text-3xl font-extrabold mb-4">{p.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{p.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* NOTICIAS */}
      <section id="noticias" className="py-24 lg:py-36 bg-secondary">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="flex items-center gap-3 mb-4 reveal">
            <Triangle className="w-4 h-4" />
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-muted-foreground">
              Últimas noticias
            </span>
          </div>
          <div className="flex items-end justify-between flex-wrap gap-4 mb-14 reveal">
            <h2 className="text-4xl md:text-6xl font-extrabold text-balance">
              Lo que está pasando en La Rioja.
            </h2>
            <a href="#" className="yellow-underline font-bold text-sm py-1">
              Ver todas →
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {news.map((n) => (
              <article key={n.title} className="reveal group cursor-pointer">
                <div className="overflow-hidden mb-6">
                  <img
                    src={n.img}
                    alt={n.title}
                    loading="lazy"
                    width={800}
                    height={600}
                    className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-3">
                  {n.date}
                </div>
                <h3 className="text-xl md:text-2xl font-extrabold mb-3 group-hover:text-foreground/70 transition-colors">
                  {n.title}
                </h3>
                <p className="text-muted-foreground mb-4">{n.excerpt}</p>
                <span className="inline-flex items-center gap-2 font-bold text-sm yellow-underline py-1">
                  Leer más <ArrowRight className="h-4 w-4" />
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* QUIENES SOMOS */}
      <section id="quienes-somos" className="py-24 lg:py-36">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative reveal">
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary -z-10" />
            <img
              src={hero}
              alt="Equipo PRO La Rioja"
              loading="lazy"
              width={1200}
              height={800}
              className="w-full aspect-[4/3] object-cover"
            />
            <div className="absolute -bottom-6 -right-6 w-40 h-40 pro-triangle bg-primary -z-10" style={{ transform: "rotate(180deg)" }} />
          </div>

          <div className="reveal">
            <div className="flex items-center gap-3 mb-4">
              <Triangle className="w-4 h-4" />
              <span className="text-xs font-bold tracking-[0.3em] uppercase text-muted-foreground">
                Quiénes somos
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-balance">
              Un equipo riojano comprometido con el cambio real.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              El PRO La Rioja reúne a vecinos, profesionales, productores y militantes que comparten
              una misma convicción: la provincia merece más y puede más. Defendemos la república,
              promovemos el trabajo privado y trabajamos para una gestión moderna, honesta y
              eficiente.
            </p>
            <div className="grid grid-cols-3 gap-6 mt-10">
              {[
                { n: "18", l: "Departamentos" },
                { n: "+5k", l: "Afiliados" },
                { n: "100%", l: "Compromiso" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="text-4xl md:text-5xl font-extrabold text-primary">{s.n}</div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground mt-2">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SUMATE */}
      <section id="sumate" className="relative overflow-hidden bg-primary text-primary-foreground py-24 lg:py-36">
        <Triangle className="absolute -left-16 -top-16 w-72 h-72 bg-primary-foreground/10" />
        <Triangle className="absolute -right-10 -bottom-10 w-96 h-96 bg-primary-foreground/10" />
        <div className="relative max-w-4xl mx-auto px-5 lg:px-8 text-center">
          <div className="inline-flex items-center gap-3 mb-6 reveal justify-center">
            <span className="h-[2px] w-10 bg-primary-foreground" />
            <span className="text-xs font-bold tracking-[0.3em] uppercase">Sumate</span>
            <span className="h-[2px] w-10 bg-primary-foreground" />
          </div>
          <h2 className="text-5xl md:text-7xl font-extrabold mb-6 reveal text-balance">
            Hagamos juntos la La Rioja del futuro.
          </h2>
          <p className="text-lg md:text-xl mb-10 reveal opacity-90 max-w-2xl mx-auto">
            Dejanos tu mail y mantenete al tanto de nuestras actividades, propuestas y eventos en
            toda la provincia.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto reveal"
          >
            <Input
              type="email"
              required
              placeholder="tu@email.com"
              className="h-14 rounded-none bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/60 focus-visible:ring-primary-foreground"
            />
            <Button
              type="submit"
              className="h-14 rounded-none px-8 font-bold bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            >
              Suscribirme
            </Button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[oklch(0.12_0.01_80)] text-white/80 py-16">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <img src={logo} alt="" width={44} height={44} className="w-11 h-11" />
              <div>
                <div className="font-extrabold text-white">PRO La Rioja</div>
                <div className="text-xs uppercase tracking-[0.2em] text-white/50">
                  Propuesta Republicana
                </div>
              </div>
            </div>
            <p className="max-w-md text-sm leading-relaxed">
              Trabajamos por una provincia con instituciones fuertes, oportunidades reales y futuro
              para todos los riojanos.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-widest">Enlaces</h4>
            <ul className="space-y-2 text-sm">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="hover:text-primary transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-widest">
              Contacto
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-primary" /> La Rioja, Argentina
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 text-primary" /> contacto@prolarioja.ar
              </li>
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-0.5 text-primary" /> +54 380 000-0000
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-5 lg:px-8 mt-12 pt-6 border-t border-white/10 text-xs text-white/50 flex flex-wrap justify-between gap-2">
          <span>© {new Date().getFullYear()} PRO La Rioja. Todos los derechos reservados.</span>
          <span>Hecho con compromiso por La Rioja.</span>
        </div>
      </footer>
    </div>
  );
}

import { useEffect, useState } from "react";
import logo from "@/assets/pro-logo.png";
import news1 from "@/assets/news-1.jpg";
import news2 from "@/assets/news-2.jpg";
import news3 from "@/assets/news-3.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Menu,
  X,
  ArrowRight,
  Mail,
  MapPin,
  Phone,
  Instagram,
  Facebook,
  Twitter,
  CheckCircle2,
} from "lucide-react";

const navLinks = [
  { label: "Inicio", id: "inicio" },
  { label: "Propuestas", id: "propuestas" },
  { label: "Noticias", id: "noticias" },
  { label: "Quiénes somos", id: "quienes-somos" },
  { label: "Afiliate", id: "afiliate" },
  { label: "Contacto", id: "contacto" },
];

const news = [
  {
    img: news1,
    date: "abril 18, 2026",
    cat: "Provincia",
    title: "Una nueva agenda de desarrollo para La Rioja",
    excerpt:
      "Presentamos un plan integral para impulsar la producción, el empleo privado y la infraestructura en toda la provincia.",
  },
  {
    img: news2,
    date: "abril 12, 2026",
    cat: "Territorio",
    title: "Encuentro provincial: escuchar para gobernar mejor",
    excerpt:
      "Más de 400 vecinos participaron del encuentro de mesas de trabajo sobre seguridad, salud y educación.",
  },
  {
    img: news3,
    date: "abril 5, 2026",
    cat: "PRO Joven",
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
    if (typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    document.documentElement.classList.add("js-ready");

    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -5% 0px" },
    );
    els.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        requestAnimationFrame(() => el.classList.add("in"));
      } else {
        io.observe(el);
      }
    });
    return () => {
      io.disconnect();
      document.documentElement.classList.remove("js-ready");
    };
  }, []);
}

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [ids]);
  return active;
}

/** PRO logo mark — yellow play triangle + "pro" wordmark, scalable SVG */
function PROMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 90" className={className} aria-label="PRO" role="img">
      <path d="M5 10 L5 80 L70 45 Z" fill="currentColor" />
      <text
        x="90"
        y="72"
        fontFamily="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
        fontSize="78"
        fontWeight="900"
        fill="currentColor"
        letterSpacing="-3"
      >
        pro
      </text>
    </svg>
  );
}

function smoothScroll(id: string) {
  const el = document.getElementById(id);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

export default function PRORioja() {
  useReveal();
  const active = useActiveSection(navLinks.map((l) => l.id));
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    smoothScroll(id);
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* NAV */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/90 backdrop-blur-md border-b border-border shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8 h-16 sm:h-18 lg:h-20 flex items-center justify-between">
          <button
            onClick={() => go("inicio")}
            className="flex items-center gap-2 sm:gap-3 group min-w-0"
            aria-label="PRO La Rioja - Inicio"
          >
            <img
              src={logo}
              alt="Logo PRO"
              width={72}
              height={58}
              className="h-9 sm:h-10 lg:h-12 w-auto transition-transform duration-300 group-hover:scale-105 shrink-0"
            />
            <div
              className={`leading-tight border-l pl-3 hidden sm:block transition-colors ${
                scrolled ? "border-border" : "border-white/30"
              }`}
            >
              <div
                className={`font-extrabold tracking-tight text-sm transition-colors ${
                  scrolled ? "text-foreground" : "text-white"
                }`}
              >
                La Rioja
              </div>
              <div
                className={`text-[10px] tracking-[0.2em] uppercase transition-colors ${
                  scrolled ? "text-muted-foreground" : "text-white/70"
                }`}
              >
                Propuesta Republicana
              </div>
            </div>
          </button>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((l) => {
              const isActive = active === l.id;
              return (
                <button
                  key={l.id}
                  onClick={() => go(l.id)}
                  className={`relative px-4 py-2 text-sm font-semibold transition-colors ${
                    scrolled
                      ? isActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                      : isActive
                        ? "text-white"
                        : "text-white/70 hover:text-white"
                  }`}
                >
                  {l.label}
                  <span
                    className={`absolute left-4 right-4 -bottom-0.5 h-[3px] bg-primary transition-transform duration-300 origin-left ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </button>
              );
            })}
          </nav>

          <div className="hidden lg:block">
            <Button
              onClick={() => go("afiliate")}
              className="rounded-none font-bold px-6 h-11 bg-primary text-primary-foreground hover:bg-primary/90 hover:translate-y-[-2px] transition-all duration-300 shadow-[var(--shadow-yellow)]"
            >
              Afiliate <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <button
            className={`lg:hidden p-2 transition-colors ${
              scrolled ? "text-foreground" : "text-white"
            }`}
            onClick={() => setOpen(!open)}
            aria-label="Menú"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {/* mobile drawer */}
        <div
          className={`lg:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${
            open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          } bg-background border-t border-border`}
        >
          <div className="px-5 py-4 flex flex-col">
            {navLinks.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className={`text-left py-3 font-semibold border-b border-border/60 last:border-0 transition-colors ${
                  active === l.id ? "text-primary-foreground bg-primary px-3" : ""
                }`}
              >
                {l.label}
              </button>
            ))}
            <Button
              onClick={() => go("afiliate")}
              className="rounded-none font-bold mt-4 h-12 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Afiliate
            </Button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section
        id="inicio"
        className="relative min-h-screen flex items-center bg-[oklch(0.13_0.01_80)] text-white overflow-hidden"
      >
        {/* Composición geométrica de fondo (sin personas, sin animación) */}
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          {/* gradiente base */}
          <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.18_0.01_80)] via-[oklch(0.13_0.01_80)] to-[oklch(0.10_0.01_80)]" />
          {/* Triángulo PRO marca de agua, suave y desplazado al borde */}
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="xMaxYMid slice"
            className="absolute -right-[10%] top-0 h-full w-[60%] opacity-[0.08]"
          >
            <polygon points="20,90 90,55 20,20" fill="var(--pro-yellow)" />
          </svg>
          {/* Acento amarillo en esquina inferior derecha (fuera del área de texto/botones) */}
          <svg
            viewBox="0 0 100 100"
            className="absolute -right-[5%] -bottom-[10%] h-[45%] aspect-square opacity-90 hidden lg:block"
          >
            <polygon points="20,88 88,52 20,16" fill="var(--pro-yellow)" />
          </svg>
          {/* Velo oscuro sobre la mitad izquierda para garantizar contraste del texto blanco */}
          <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.10_0.01_80)] via-[oklch(0.10_0.01_80)]/85 to-transparent" />
          {/* Línea horizontal sutil */}
          <div className="absolute left-0 right-0 top-1/2 h-px bg-white/5" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-5 lg:px-8 py-28 sm:py-32 lg:py-40 w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 mb-6 sm:mb-8 reveal">
              <span className="h-[2px] w-8 sm:w-10 bg-primary" />
              <span className="text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase text-primary">
                PRO La Rioja
              </span>
            </div>
            <h1 className="text-balance text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[1.02] sm:leading-[0.95] reveal">
              La Rioja que <span className="text-primary">queremos</span>,
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>empieza hoy.
            </h1>
            <p className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-white/75 max-w-2xl leading-relaxed reveal">
              Somos el espacio que cree en el cambio, en las instituciones y en una provincia con
              futuro. Trabajamos para que La Rioja vuelva a ser protagonista.
            </p>
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 reveal">
              <Button
                onClick={() => go("afiliate")}
                className="rounded-none h-12 sm:h-14 px-6 sm:px-8 font-bold text-sm sm:text-base bg-primary text-primary-foreground hover:bg-primary/90 hover:translate-y-[-2px] transition-all duration-300 w-full sm:w-auto justify-center"
              >
                Afiliate al PRO <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <Button
                onClick={() => go("propuestas")}
                variant="outline"
                className="rounded-none h-12 sm:h-14 px-6 sm:px-8 font-bold text-sm sm:text-base bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-foreground transition-all duration-300 w-full sm:w-auto justify-center"
              >
                Conocé nuestras propuestas
              </Button>
            </div>
          </div>
        </div>

        {/* Indicador de scroll */}
        <button
          onClick={() => go("propuestas")}
          aria-label="Bajar"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-primary transition-colors hidden md:flex flex-col items-center gap-2 group"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <span className="block w-px h-10 bg-current group-hover:h-14 transition-all duration-300" />
        </button>
      </section>

      {/* PROPUESTAS */}
      <section id="propuestas" className="py-16 sm:py-24 lg:py-36 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-10 sm:mb-16 reveal">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="h-[2px] w-8 sm:w-10 bg-primary" />
                <span className="text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase text-muted-foreground">
                  Nuestras propuestas
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold max-w-2xl text-balance">
                Cuatro ejes para transformar la provincia.
              </h2>
            </div>
            <p className="max-w-md text-muted-foreground text-base sm:text-lg">
              Ideas concretas, equipos preparados y una visión de largo plazo para La Rioja.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            {proposals.map((p, i) => (
              <article
                key={p.n}
                style={{ transitionDelay: `${i * 80}ms` }}
                className="reveal hover-lift bg-secondary p-6 sm:p-10 border border-border group cursor-default"
              >
                <div className="flex items-start justify-between mb-6 sm:mb-8">
                  <span className="text-4xl sm:text-5xl font-extrabold text-muted-foreground/30">{p.n}</span>
                  <PROMark className="h-6 sm:h-7 w-auto text-primary transition-transform duration-500 group-hover:scale-110 group-hover:translate-x-1" />
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold mb-3 sm:mb-4">{p.title}</h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{p.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* NOTICIAS */}
      <section id="noticias" className="py-16 sm:py-24 lg:py-36 bg-secondary scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
          <div className="flex items-center gap-3 mb-4 reveal">
            <span className="h-[2px] w-8 sm:w-10 bg-primary" />
            <span className="text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase text-muted-foreground">
              Últimas noticias
            </span>
          </div>
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10 sm:mb-14 reveal">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-balance">
              Lo que está pasando en La Rioja.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {news.map((n, i) => (
              <article
                key={n.title}
                style={{ transitionDelay: `${i * 100}ms` }}
                className="reveal group cursor-pointer"
              >
                <div className="overflow-hidden mb-6 relative">
                  <img
                    src={n.img}
                    alt={n.title}
                    loading="lazy"
                    width={800}
                    height={600}
                    className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-[10px] font-bold tracking-widest uppercase px-3 py-1.5">
                    {n.cat}
                  </span>
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
      <section id="quienes-somos" className="py-16 sm:py-24 lg:py-36 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8 grid lg:grid-cols-2 gap-10 sm:gap-16 items-center">
          <div className="relative reveal">
            <div className="absolute -top-4 -left-4 w-full h-full border-4 border-primary -z-10" />
            <div className="bg-[oklch(0.13_0.01_80)] aspect-[4/3] flex items-center justify-center relative overflow-hidden">
              <PROMark className="h-32 w-auto text-primary relative z-10" />
              <svg
                viewBox="0 0 100 100"
                className="absolute right-[-10%] top-1/2 -translate-y-1/2 h-[120%] opacity-10"
              >
                <polygon points="20,88 88,52 20,16" fill="var(--pro-yellow)" />
              </svg>
            </div>
          </div>

          <div className="reveal">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-[2px] w-10 bg-primary" />
              <span className="text-xs font-bold tracking-[0.3em] uppercase text-muted-foreground">
                Quiénes somos
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-5 sm:mb-6 text-balance">
              Un equipo riojano comprometido con el cambio real.
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6">
              El PRO La Rioja reúne a vecinos, profesionales, productores y militantes que comparten
              una misma convicción: la provincia merece más y puede más. Defendemos la república,
              promovemos el trabajo privado y trabajamos para una gestión moderna, honesta y
              eficiente.
            </p>
            <div className="grid grid-cols-3 gap-3 sm:gap-6 mt-8 sm:mt-10">
              {[
                { n: "18", l: "Departamentos" },
                { n: "+5k", l: "Afiliados" },
                { n: "100%", l: "Compromiso" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary">{s.n}</div>
                  <div className="text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground mt-2">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AFILIATE */}
      <section
        id="afiliate"
        className="relative overflow-hidden bg-primary text-primary-foreground py-16 sm:py-24 lg:py-32 scroll-mt-20"
      >
        {/* Triángulos decorativos estáticos */}
        <svg
          viewBox="0 0 100 100"
          aria-hidden
          className="absolute -left-10 -top-10 w-80 h-80 opacity-15 pointer-events-none"
        >
          <polygon points="20,88 88,52 20,16" fill="var(--pro-ink)" />
        </svg>
        <svg
          viewBox="0 0 100 100"
          aria-hidden
          className="absolute -right-16 -bottom-16 w-96 h-96 opacity-10 pointer-events-none"
        >
          <polygon points="20,88 88,52 20,16" fill="var(--pro-ink)" />
        </svg>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-5 lg:px-8 grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          <div className="reveal">
            <div className="inline-flex items-center gap-3 mb-5 sm:mb-6">
              <span className="h-[2px] w-8 sm:w-10 bg-primary-foreground" />
              <span className="text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase">Afiliate</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-5 sm:mb-6 text-balance leading-[1.02] sm:leading-[0.95]">
              Sumate al equipo que está cambiando La Rioja.
            </h2>
            <p className="text-base sm:text-lg mb-6 sm:mb-8 opacity-90 max-w-xl">
              Afiliarte al PRO es dar un paso concreto por la provincia que querés. Vas a formar
              parte de un espacio nacional con presencia en cada departamento.
            </p>
            <ul className="space-y-3 mb-10">
              {[
                "Participación en encuentros y capacitaciones",
                "Acceso a la red nacional del PRO",
                "Voz en las decisiones locales",
                "Trámite 100% online y gratuito",
              ].map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 mt-0.5 shrink-0" />
                  <span className="font-medium">{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("¡Gracias! Pronto nos pondremos en contacto.");
            }}
            className="reveal bg-background text-foreground p-6 sm:p-8 lg:p-10 shadow-2xl"
          >
            <h3 className="text-xl sm:text-2xl font-extrabold mb-2">Iniciá tu afiliación</h3>
            <p className="text-sm text-muted-foreground mb-5 sm:mb-6">
              Completá tus datos y nos contactamos para finalizar el trámite.
            </p>
            <div className="space-y-3 sm:space-y-4">
              <div className="grid sm:grid-cols-2 gap-3">
                <Input
                  required
                  placeholder="Nombre"
                  className="h-12 rounded-none border-border focus-visible:ring-primary"
                />
                <Input
                  required
                  placeholder="Apellido"
                  className="h-12 rounded-none border-border focus-visible:ring-primary"
                />
              </div>
              <Input
                required
                type="email"
                placeholder="Email"
                className="h-12 rounded-none border-border focus-visible:ring-primary"
              />
              <Input
                required
                type="tel"
                placeholder="Teléfono"
                className="h-12 rounded-none border-border focus-visible:ring-primary"
              />
              <Input
                required
                placeholder="DNI"
                className="h-12 rounded-none border-border focus-visible:ring-primary"
              />
              <Input
                required
                placeholder="Localidad / Departamento"
                className="h-12 rounded-none border-border focus-visible:ring-primary"
              />
            </div>
            <Button
              type="submit"
              className="mt-6 w-full h-14 rounded-none font-bold text-base bg-foreground text-background hover:bg-foreground/90 transition-all duration-300"
            >
              Quiero afiliarme <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <p className="text-[11px] text-muted-foreground mt-4 text-center">
              Tus datos son confidenciales y solo se usan para procesar tu afiliación.
            </p>
          </form>
        </div>
      </section>

      {/* CONTACTO / FOOTER */}
      <footer
        id="contacto"
        className="bg-[oklch(0.11_0.01_80)] text-white/80 pt-14 sm:pt-20 pb-10 scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8 grid sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 mb-10 sm:mb-14">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <img src={logo} alt="" width={72} height={58} className="h-12 w-auto" />
              <div className="border-l border-white/20 pl-3">
                <div className="font-extrabold text-white">La Rioja</div>
                <div className="text-xs uppercase tracking-[0.2em] text-white/50">
                  Propuesta Republicana
                </div>
              </div>
            </div>
            <p className="max-w-md text-sm leading-relaxed mb-6">
              Trabajamos por una provincia con instituciones fuertes, oportunidades reales y futuro
              para todos los riojanos.
            </p>
            <div className="flex gap-3">
              {[
                { I: Instagram, label: "Instagram" },
                { I: Facebook, label: "Facebook" },
                { I: Twitter, label: "Twitter" },
              ].map(({ I, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
                >
                  <I className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-widest">Menú</h4>
            <ul className="space-y-2 text-sm">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => go(l.id)}
                    className="hover:text-primary transition-colors text-left"
                  >
                    {l.label}
                  </button>
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
                <MapPin className="h-4 w-4 mt-0.5 text-primary shrink-0" /> La Rioja, Argentina
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 text-primary shrink-0" /> contacto@prolarioja.ar
              </li>
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-0.5 text-primary shrink-0" /> +54 380 000-0000
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8 pt-6 border-t border-white/10 text-xs text-white/50 flex flex-wrap justify-between gap-2">
          <span>© {new Date().getFullYear()} PRO La Rioja. Todos los derechos reservados.</span>
          <span>Hecho con compromiso por La Rioja.</span>
        </div>
      </footer>
    </div>
  );
}

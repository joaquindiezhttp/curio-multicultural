import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/Navbar";

export const Route = createFileRoute("/privacidad")({
  head: () => ({
    meta: [
      { title: "Privacidad y Confianza · Curio" },
      {
        name: "description",
        content:
          "Información sobre privacidad, seguridad y manejo de datos en la plataforma Curio.",
      },
      { property: "og:title", content: "Privacidad y Confianza · Curio" },
      {
        property: "og:description",
        content:
          "Cómo Curio trata los datos de artistas y visitantes, y qué controles existen en la plataforma.",
      },
    ],
  }),
  component: PrivacyPage,
});

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="font-heading text-3xl text-oliva mb-3">{title}</h2>
      <div className="space-y-3 text-foreground/85 text-sm md:text-base leading-relaxed">
        {children}
      </div>
    </section>
  );
}

function PrivacyPage() {
  return (
    <PageShell
      title="Privacidad"
      subtitle="Esta página es mantenida por el equipo de Curio para responder preguntas frecuentes sobre privacidad y seguridad de la plataforma. No constituye una certificación independiente."
    >
      <Section title="Qué datos recolectamos">
        <p>
          Curio recolecta únicamente la información que las personas envían
          voluntariamente a través del formulario de postulación (nombre,
          contacto, propuesta artística) y datos básicos de navegación necesarios
          para mostrar el sitio.
        </p>
      </Section>

      <Section title="Cómo usamos los datos">
        <p>
          La información de postulaciones se usa exclusivamente para evaluar
          propuestas y coordinar la participación en eventos. No vendemos ni
          compartimos datos personales con terceros con fines comerciales.
        </p>
      </Section>

      <Section title="Plataforma y hosting">
        <p>
          El sitio está construido sobre Lovable y su infraestructura gestionada.
          La plataforma proporciona cifrado en tránsito (HTTPS) y controles de
          acceso a la base de datos. La responsabilidad sobre el contenido
          publicado y las decisiones editoriales corresponde al equipo de Curio.
        </p>
      </Section>

      <Section title="Retención y eliminación">
        <p>
          Las postulaciones se conservan mientras sean relevantes para la
          programación de eventos. Para solicitar acceso, corrección o
          eliminación de tus datos, escribinos al contacto indicado abajo.
        </p>
      </Section>

      <Section title="Cookies y analítica">
        <p>
          Usamos únicamente las cookies técnicas necesarias para el
          funcionamiento del sitio. No utilizamos rastreadores publicitarios de
          terceros.
        </p>
      </Section>

      <Section title="Contacto">
        <p>
          Para consultas sobre privacidad, seguridad o tus datos personales,
          podés contactarnos a través de los canales oficiales de Curio.
        </p>
      </Section>
    </PageShell>
  );
}

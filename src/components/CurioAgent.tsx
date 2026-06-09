// @ts-nocheck
// CurioAgent.jsx
// Agente conversacional de CURIO — para usar en Lovable
//
// SETUP:
// 1. Copiá este archivo en src/components/CurioAgent.jsx
// 2. Importalo donde quieras mostrarlo: import CurioAgent from "@/components/CurioAgent"
// 3. Agregá en .env:  VITE_CURIO_API_URL=https://<tu-proyecto>.supabase.co/functions/v1/curio-chat
// 4. Deployá la Supabase Edge Function (ver curio-chat/index.ts)

import { useState, useRef, useEffect } from "react";

// ─── Mock data (reemplazar por llamadas a Supabase DB cuando escales) ──────────

const MOCK_DATA = {
  artists: [
    { id: "a1", name: "Zona Muerta",    discipline: "graffiti",        city: "Buenos Aires", bio: "Colectivo de writers activo desde 2018. Murales de gran escala con crítica política.", instagram: "@zonamuerta_ba",  upcoming: "Intervención Mural — 14 jun" },
    { id: "a2", name: "Lola Ferreyra",  discipline: "tatuaje",         city: "Córdoba",       bio: "Especialista en fine line botánico y microrealism. Trabaja con tinta vegana.",        instagram: "@lolaink_cba",      upcoming: "Flash Day CURIO — 21 jun" },
    { id: "a3", name: "El Pulpo",       discipline: "música",          city: "Buenos Aires", bio: "Productor de cumbia digital y electrónica experimental.",                              instagram: "@elpulpo_beats",    upcoming: "CURIO Live — 28 jun" },
    { id: "a4", name: "Fausto Blanc",   discipline: "poesía",          city: "Rosario",       bio: "Poeta y performer. Spoken word + body art + música en vivo.",                        instagram: "@faustoblanc",      upcoming: "Noche de Poesía — 22 jun" },
    { id: "a5", name: "Studio KRAK",    discipline: "diseño gráfico",  city: "Montevideo",    bio: "Estudio especializado en identidades visuales underground y fanzines.",               instagram: "@studiokrak_mvd",   upcoming: "Workshop Fanzine — 5 jul" },
    { id: "a6", name: "Tinta Viva",     discipline: "graffiti",        city: "Córdoba",       bio: "Murales abstractos con influencias afrofuturistas.",                                  instagram: "@tintaviva_cba",    upcoming: "Mural Colaborativo — 19 jun" },
  ],
  events: [
    { id: "e1", title: "Intervención Mural — Zona Muerta",  date: "14 jun 2025", city: "Buenos Aires", discipline: "graffiti",       venue: "Pasaje Lanín, Barracas",         description: "Intervención colectiva en el histórico Pasaje Lanín. Abierto al público." },
    { id: "e2", title: "Mural Colaborativo — Tinta Viva",   date: "19 jun 2025", city: "Córdoba",       discipline: "graffiti",       venue: "Barrio Güemes",                  description: "Jornada de muralismo en vivo con participación abierta." },
    { id: "e3", title: "Flash Day CURIO — Lola Ferreyra",   date: "21 jun 2025", city: "Córdoba",       discipline: "tatuaje",        venue: "Espacio CURIO CBA",              description: "Diseños flash exclusivos. Turnos por orden de llegada." },
    { id: "e4", title: "Noche de Poesía — Fausto Blanc",    date: "22 jun 2025", city: "Rosario",       discipline: "poesía",         venue: "La Trinchera, Centro",           description: "Spoken word + música en vivo. Entrada libre." },
    { id: "e5", title: "CURIO Live — El Pulpo",             date: "28 jun 2025", city: "Buenos Aires", discipline: "música",         venue: "Club Niceto, Palermo",           description: "Cumbia digital + electrónica experimental. Apertura 22hs." },
    { id: "e6", title: "Workshop Fanzine — Studio KRAK",    date: "5 jul 2025",  city: "Montevideo",    discipline: "diseño gráfico", venue: "Centro Cultural España MVD",     description: "Taller intensivo de diseño de fanzines. Cupo limitado." },
  ],
  cities: [
    { city: "Buenos Aires", node: "CURIO BA",  active: true,  artists: 2, upcoming_events: 2, coordinator: "Valentina Ricci" },
    { city: "Córdoba",      node: "CURIO CBA", active: true,  artists: 2, upcoming_events: 2, coordinator: "Marco Heredia" },
    { city: "Rosario",      node: "CURIO ROS", active: true,  artists: 1, upcoming_events: 1, coordinator: "Sol Bianchi" },
    { city: "Montevideo",   node: "CURIO MVD", active: true,  artists: 1, upcoming_events: 1, coordinator: "Diego Larrañaga" },
    { city: "Santiago",     node: "CURIO SCL", active: false, artists: 0, upcoming_events: 0, coordinator: "en construcción" },
  ],
};

// ─── Tool definitions (se envían al proxy, que las pasa a Claude) ─────────────

const TOOLS = [
  {
    name: "buscar_artistas",
    description: "Busca artistas de CURIO por disciplina, ciudad o nombre.",
    input_schema: {
      type: "object",
      properties: {
        disciplina: { type: "string", description: "graffiti | tatuaje | música | poesía | diseño gráfico" },
        ciudad:     { type: "string", description: "Ciudad del artista" },
        nombre:     { type: "string", description: "Nombre del artista" },
      },
    },
  },
  {
    name: "consultar_agenda",
    description: "Consulta próximos eventos de CURIO. Filtra por ciudad, disciplina o semana.",
    input_schema: {
      type: "object",
      properties: {
        ciudad:     { type: "string",  description: "Ciudad del evento" },
        disciplina: { type: "string",  description: "Disciplina artística" },
        semana:     { type: "boolean", description: "true = sólo eventos de la próxima semana" },
      },
    },
  },
  {
    name: "ver_nodos",
    description: "Muestra nodos/ciudades activos de CURIO con artistas y eventos por nodo.",
    input_schema: {
      type: "object",
      properties: {
        solo_activos: { type: "boolean", description: "true = sólo nodos activos" },
      },
    },
  },
];

// ─── Ejecución local de tools (mock) ─────────────────────────────────────────

function executeTool(name, input) {
  if (name === "buscar_artistas") {
    let r = [...MOCK_DATA.artists];
    if (input.disciplina) r = r.filter(a => a.discipline.toLowerCase().includes(input.disciplina.toLowerCase()));
    if (input.ciudad)     r = r.filter(a => a.city.toLowerCase().includes(input.ciudad.toLowerCase()));
    if (input.nombre)     r = r.filter(a => a.name.toLowerCase().includes(input.nombre.toLowerCase()));
    return JSON.stringify(r.length ? r : { message: "No se encontraron artistas con esos criterios." });
  }
  if (name === "consultar_agenda") {
    let r = [...MOCK_DATA.events];
    if (input.ciudad)     r = r.filter(e => e.city.toLowerCase().includes(input.ciudad.toLowerCase()));
    if (input.disciplina) r = r.filter(e => e.discipline.toLowerCase().includes(input.disciplina.toLowerCase()));
    if (input.semana)     r = r.slice(0, 3);
    return JSON.stringify(r.length ? r : { message: "No hay eventos con esos criterios." });
  }
  if (name === "ver_nodos") {
    const r = input.solo_activos ? MOCK_DATA.cities.filter(c => c.active) : MOCK_DATA.cities;
    return JSON.stringify(r);
  }
  return JSON.stringify({ error: "Herramienta desconocida" });
}

// ─── Formateo de texto markdown básico ───────────────────────────────────────

function formatText(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n/g, "<br />");
}

// ─── Componente principal ─────────────────────────────────────────────────────

const QUICK_PROMPTS = [
  { label: "agenda esta semana",        text: "¿Qué eventos hay esta semana?" },
  { label: "artistas de graffiti",      text: "¿Quiénes son los artistas de graffiti?" },
  { label: "ciudades activas",          text: "¿En qué ciudades hay nodos activos?" },
  { label: "música en Buenos Aires",    text: "Contame sobre el próximo evento de música en Buenos Aires" },
];

export default function CurioAgent() {
  const [messages, setMessages]   = useState([]);   // { role, content, isToolCall?, isToolResult? }
  const [input, setInput]         = useState("");
  const [loading, setLoading]     = useState(false);
  const [showTools, setShowTools] = useState(false);
  const chatEndRef                = useRef(null);
  const inputRef                  = useRef(null);
  const API_URL                   = import.meta.env.VITE_CURIO_API_URL;

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Agrega un mensaje al estado
  const push = (msg) => setMessages(prev => [...prev, msg]);

  async function sendMessage(text) {
    const userText = (text ?? input).trim();
    if (!userText || loading) return;
    setInput("");
    setLoading(true);

    push({ role: "user", content: userText });

    // Construimos el historial para enviar al proxy
    // (sólo mensajes reales de user/assistant, sin los decorativos de tool UI)
    const history = [];
    for (const m of messages) {
      if (m.isToolCall || m.isToolResult) continue;
      history.push({ role: m.role, content: m.content });
    }
    history.push({ role: "user", content: userText });

    try {
      let currentHistory = history;
      let iterations = 0;

      while (iterations < 5) {
        iterations++;

        const res  = await fetch(API_URL, {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          body:    JSON.stringify({ messages: currentHistory, tools: TOOLS }),
        });
        const data = await res.json();

        if (data.error) {
          push({ role: "agent", content: "Hubo un error con el agente. Intentá de nuevo." });
          break;
        }

        const toolBlocks = data.content.filter(b => b.type === "tool_use");
        const textBlocks = data.content.filter(b => b.type === "text");
        const assistantEntry = { role: "assistant", content: data.content };

        if (toolBlocks.length > 0) {
          // Mostrar tool calls en UI
          for (const block of toolBlocks) {
            push({ role: "agent", isToolCall: true,   toolName: block.name, toolInput: block.input });
            await new Promise(r => setTimeout(r, 350));
            const result = executeTool(block.name, block.input);
            push({ role: "agent", isToolResult: true, toolName: block.name, toolResult: result });
          }

          // Armar tool_results para siguiente iteración
          const toolResults = toolBlocks.map(b => ({
            type:        "tool_result",
            tool_use_id: b.id,
            content:     executeTool(b.name, b.input),
          }));

          currentHistory = [...currentHistory, assistantEntry, { role: "user", content: toolResults }];

        } else if (textBlocks.length > 0) {
          const finalText = textBlocks.map(b => b.text).join("\n").trim();
          push({ role: "agent", content: finalText });
          break;
        } else {
          break;
        }
      }
    } catch (err) {
      push({ role: "agent", content: "Error de conexión. Revisá tu red e intentá de nuevo." });
    }

    setLoading(false);
    inputRef.current?.focus();
  }

  function handleKey(e) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  }

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <div style={styles.root}>

      {/* Header */}
      <div style={styles.header}>
        <CurioLogo />
        <div>
          <p style={styles.headerTitle}>CURIO</p>
          <p style={styles.headerSub}>underground · multicultural · agent</p>
        </div>
        <button style={styles.toggleBtn} onClick={() => setShowTools(v => !v)}>
          {showTools ? "ocultar herramientas" : "ver herramientas"}
        </button>
        <div style={styles.statusDot} />
      </div>

      {/* Chat area */}
      <div style={styles.chatArea}>
        {/* Mensaje inicial */}
        <AgentBubble content={"Hola. Soy el agente de **CURIO**.\nPuedo contarte sobre artistas, eventos en la agenda o los nodos activos en cada ciudad. ¿Qué querés explorar?"} />

        {messages.map((msg, i) => {
          if (msg.isToolCall)   return showTools ? <ToolCall   key={i} name={msg.toolName} input={msg.toolInput} />   : null;
          if (msg.isToolResult) return showTools ? <ToolResult key={i} name={msg.toolName} result={msg.toolResult} /> : null;
          if (msg.role === "user")  return <UserBubble  key={i} content={msg.content} />;
          if (msg.role === "agent") return <AgentBubble key={i} content={msg.content} />;
          return null;
        })}

        {loading && <TypingIndicator />}
        <div ref={chatEndRef} />
      </div>

      {/* Quick prompts */}
      {messages.length === 0 && (
        <div style={styles.quickPrompts}>
          {QUICK_PROMPTS.map((qp) => (
            <button key={qp.label} style={styles.qpBtn} onClick={() => sendMessage(qp.text)}>
              {qp.label}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div style={styles.inputArea}>
        <textarea
          ref={inputRef}
          style={styles.textarea}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Preguntá sobre artistas, agenda, nodos..."
          rows={1}
        />
        <button style={{ ...styles.sendBtn, opacity: loading ? 0.5 : 1 }} onClick={() => sendMessage()} disabled={loading}>
          <SendIcon />
        </button>
      </div>
    </div>
  );
}

// ─── Sub-componentes ──────────────────────────────────────────────────────────

function UserBubble({ content }) {
  return (
    <div style={{ ...styles.msgRow, alignSelf: "flex-end", alignItems: "flex-end" }}>
      <span style={styles.msgLabel}>vos</span>
      <div style={{ ...styles.bubble, ...styles.bubbleUser }}>{content}</div>
    </div>
  );
}

function AgentBubble({ content }) {
  return (
    <div style={{ ...styles.msgRow, alignSelf: "flex-start", alignItems: "flex-start" }}>
      <span style={styles.msgLabel}>curio agent</span>
      <div
        style={{ ...styles.bubble, ...styles.bubbleAgent }}
        dangerouslySetInnerHTML={{ __html: formatText(content) }}
      />
    </div>
  );
}

function ToolCall({ name, input }) {
  return (
    <div style={styles.toolCall}>
      <p style={styles.toolCallName}>⚙ {name}</p>
      <p style={styles.toolCallBody}>{JSON.stringify(input)}</p>
    </div>
  );
}

function ToolResult({ name, result }) {
  let preview = "";
  try {
    const parsed = JSON.parse(result);
    const count  = Array.isArray(parsed) ? parsed.length : 1;
    preview      = Array.isArray(parsed)
      ? `${count} resultado${count !== 1 ? "s" : ""} encontrado${count !== 1 ? "s" : ""}`
      : parsed.message ?? "datos recibidos";
  } catch { preview = result.substring(0, 60); }
  return (
    <div style={styles.toolResult}>
      <p style={styles.toolResultLabel}>✓ {name}</p>
      <p style={styles.toolResultBody}>{preview}</p>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div style={{ ...styles.msgRow, alignSelf: "flex-start" }}>
      <span style={styles.msgLabel}>curio agent</span>
      <div style={styles.typing}>
        {[0, 1, 2].map(i => (
          <span key={i} style={{ ...styles.typingDot, animationDelay: `${i * 0.2}s` }} />
        ))}
      </div>
    </div>
  );
}

function CurioLogo() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <circle cx="18" cy="18" r="17" stroke="#4a7c59" strokeWidth="1.2" />
      <circle cx="18" cy="18" r="4"  fill="#c9a84c" />
      <line x1="18" y1="4"  x2="18" y2="14" stroke="#c9a84c" strokeWidth="1.2" />
      <line x1="18" y1="22" x2="18" y2="32" stroke="#c9a84c" strokeWidth="1.2" />
      <line x1="4"  y1="18" x2="14" y2="18" stroke="#c9a84c" strokeWidth="1.2" />
      <line x1="22" y1="18" x2="32" y2="18" stroke="#c9a84c" strokeWidth="1.2" />
      <line x1="8.2"  y1="8.2"  x2="14.9" y2="14.9" stroke="#4a7c59" strokeWidth="1" />
      <line x1="21.1" y1="21.1" x2="27.8" y2="27.8" stroke="#4a7c59" strokeWidth="1" />
      <line x1="27.8" y1="8.2"  x2="21.1" y2="14.9" stroke="#4a7c59" strokeWidth="1" />
      <line x1="14.9" y1="21.1" x2="8.2"  y2="27.8" stroke="#4a7c59" strokeWidth="1" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#d4f0db">
      <path d="M2 12L22 2L12 22L10 14L2 12Z" />
    </svg>
  );
}

// ─── Estilos inline (sin dependencias externas) ───────────────────────────────
// Tip: si usás Tailwind en Lovable, podés reemplazar estos por clases utilitarias.

const C = {
  bg:         "#0d1410",
  surface:    "#141c17",
  surface2:   "#1c2820",
  border:     "#2a3d2f",
  green:      "#4a7c59",
  greenLight: "#6aad7a",
  gold:       "#c9a84c",
  goldDim:    "#8a6e2f",
  text:       "#d4cfc4",
  textDim:    "#7a8a7d",
};

const styles = {
  root: {
    fontFamily: "'Space Grotesk', 'Inter', sans-serif",
    background:    C.bg,
    borderRadius:  12,
    border:        `1px solid ${C.border}`,
    display:       "flex",
    flexDirection: "column",
    minHeight:     520,
    overflow:      "hidden",
  },
  header: {
    background:    C.surface,
    padding:       "14px 20px",
    display:       "flex",
    alignItems:    "center",
    gap:           12,
    borderBottom:  `1px solid ${C.border}`,
  },
  headerTitle: {
    fontFamily:    "'Space Mono', monospace",
    fontSize:      15,
    fontWeight:    700,
    color:         C.gold,
    letterSpacing: 3,
    textTransform: "uppercase",
    margin:        0,
  },
  headerSub: {
    fontSize:      11,
    color:         C.textDim,
    letterSpacing: 1,
    margin:        0,
  },
  toggleBtn: {
    marginLeft:    "auto",
    background:    "none",
    border:        `1px solid ${C.border}`,
    borderRadius:  6,
    padding:       "3px 10px",
    fontSize:      11,
    color:         C.textDim,
    cursor:        "pointer",
    fontFamily:    "inherit",
  },
  statusDot: {
    width:        7,
    height:       7,
    borderRadius: "50%",
    background:   C.greenLight,
    flexShrink:   0,
  },
  chatArea: {
    flex:          1,
    overflowY:     "auto",
    padding:       "20px 16px",
    display:       "flex",
    flexDirection: "column",
    gap:           16,
  },
  msgRow: {
    display:       "flex",
    flexDirection: "column",
    gap:           6,
    maxWidth:      "88%",
  },
  msgLabel: {
    fontSize:      10,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    color:         C.textDim,
    padding:       "0 4px",
  },
  bubble: {
    padding:    "10px 14px",
    borderRadius: 8,
    fontSize:   14,
    lineHeight: 1.6,
  },
  bubbleUser: {
    background:   C.green,
    color:        "#d4f0db",
    borderRadius: "8px 8px 2px 8px",
  },
  bubbleAgent: {
    background:   C.surface2,
    border:       `1px solid ${C.border}`,
    borderRadius: "2px 8px 8px 8px",
    color:        C.text,
  },
  toolCall: {
    background:  C.bg,
    border:      `1px solid ${C.goldDim}`,
    borderLeft:  `3px solid ${C.gold}`,
    borderRadius: 6,
    padding:     "8px 12px",
    maxWidth:    "88%",
    alignSelf:   "flex-start",
  },
  toolCallName: {
    fontFamily: "'Space Mono', monospace",
    fontSize:   11,
    color:      C.gold,
    fontWeight: 700,
    margin:     "0 0 3px",
  },
  toolCallBody: {
    fontFamily: "'Space Mono', monospace",
    fontSize:   10,
    color:      C.goldDim,
    margin:     0,
    wordBreak:  "break-all",
  },
  toolResult: {
    background:   C.bg,
    border:       `1px solid ${C.green}`,
    borderLeft:   `3px solid ${C.greenLight}`,
    borderRadius: 6,
    padding:      "8px 12px",
    maxWidth:     "92%",
    alignSelf:    "flex-start",
  },
  toolResultLabel: {
    fontFamily: "'Space Mono', monospace",
    fontSize:   11,
    color:      C.greenLight,
    fontWeight: 700,
    margin:     "0 0 3px",
  },
  toolResultBody: {
    fontFamily: "'Space Mono', monospace",
    fontSize:   10,
    color:      C.textDim,
    margin:     0,
  },
  typing: {
    display:      "flex",
    gap:          4,
    padding:      "10px 14px",
    background:   C.surface2,
    border:       `1px solid ${C.border}`,
    borderRadius: "2px 8px 8px 8px",
    alignItems:   "center",
  },
  typingDot: {
    display:         "inline-block",
    width:           6,
    height:          6,
    borderRadius:    "50%",
    background:      C.greenLight,
    animation:       "bounce 1.2s ease-in-out infinite",
  },
  quickPrompts: {
    padding:    "0 16px 12px",
    display:    "flex",
    gap:        8,
    flexWrap:   "wrap",
  },
  qpBtn: {
    background:   C.surface2,
    border:       `1px solid ${C.border}`,
    borderRadius: 20,
    padding:      "5px 12px",
    fontSize:     12,
    color:        C.textDim,
    cursor:       "pointer",
    fontFamily:   "inherit",
  },
  inputArea: {
    padding:      "12px 16px 16px",
    display:      "flex",
    gap:          10,
    borderTop:    `1px solid ${C.border}`,
    background:   C.surface,
  },
  textarea: {
    flex:        1,
    background:  C.bg,
    border:      `1px solid ${C.border}`,
    borderRadius: 8,
    padding:     "10px 14px",
    fontSize:    14,
    color:       C.text,
    outline:     "none",
    resize:      "none",
    lineHeight:  1.4,
    minHeight:   42,
    fontFamily:  "inherit",
  },
  sendBtn: {
    background:   C.green,
    border:       "none",
    borderRadius: 8,
    width:        42,
    height:       42,
    cursor:       "pointer",
    display:      "flex",
    alignItems:   "center",
    justifyContent: "center",
    flexShrink:   0,
  },
};

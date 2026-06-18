export type Discipline =
  | "Música"
  | "Graffiti"
  | "Indumentaria"
  | "Hair Tattoo"
  | "Flash Tattoo"
  | "Poesía"
  | "Fotografía"
  | "Diseño Gráfico";

export const DISCIPLINES: Discipline[] = [
  "Música",
  "Graffiti",
  "Indumentaria",
  "Hair Tattoo",
  "Flash Tattoo",
  "Poesía",
  "Fotografía",
  "Diseño Gráfico",
];

export type Artist = {
  id: string;
  name: string;
  act: string;
  discipline: Discipline;
  venue?: string;
  instagram?: string;
};

export const ARTISTS: Artist[] = [
  { id: "1", name: "INSITU", act: "Jam Musical / Open Mic", discipline: "Música", venue: "INSITU" },
  { id: "2", name: "MAV DALI", act: "DJ Set", discipline: "Música" },
  { id: "3", name: "DAMO", act: "Indumentaria Intervenida", discipline: "Indumentaria" },
  { id: "4", name: "EVA.BELLONI", act: "Indumentaria Intervenida", discipline: "Indumentaria" },
  { id: "5", name: "REAL.CLOTHING", act: "Indumentaria Intervenida", discipline: "Indumentaria" },
  { id: "6", name: "INK.CLOTHING", act: "Indumentaria Intervenida", discipline: "Indumentaria" },
  { id: "7", name: "LA PELU DE VANDI", act: "Hair Tattoo", discipline: "Hair Tattoo" },
  { id: "8", name: "CHIKI & MOX", act: "Graffiti en Vivo", discipline: "Graffiti" },
  { id: "9", name: "FEDE BESIO", act: "Poesía y Fotografía", discipline: "Poesía" },
  { id: "9b", name: "FEDE BESIO", act: "Fotografía en Vivo", discipline: "Fotografía" },
  { id: "10", name: "TOMI GREENE", act: "Flash Tattoo", discipline: "Flash Tattoo" },
];

export type AgendaItem = {
  id: string;
  time: string;
  title: string;
  artist: string;
  discipline: Discipline;
};

export const AGENDA: AgendaItem[] = [
  { id: "a1", time: "19:00", title: "Apertura · Graffiti en Vivo", artist: "CHIKI & MOX", discipline: "Graffiti" },
  { id: "a2", time: "19:30", title: "Hair Tattoo Sessions", artist: "LA PELU DE VANDI", discipline: "Hair Tattoo" },
  { id: "a3", time: "20:00", title: "Indumentaria Intervenida · Showroom", artist: "DAMO · EVA.BELLONI · REAL · INK", discipline: "Indumentaria" },
  { id: "a4", time: "20:30", title: "Flash Tattoo Walk-ins", artist: "TOMI GREENE", discipline: "Flash Tattoo" },
  { id: "a5", time: "21:00", title: "Poesía & Lente", artist: "FEDE BESIO", discipline: "Poesía" },
  { id: "a6", time: "22:00", title: "Jam Musical / Open Mic", artist: "INSITU", discipline: "Música" },
  { id: "a7", time: "00:00", title: "DJ Set · Cierre", artist: "MAV DALI", discipline: "Música" },
];

export type City = {
  id: string;
  city: string;
  edition: number;
  date: string;
  status: "Realizado" | "Próximamente";
};

export const CITIES: City[] = [
  { id: "c1", city: "Buenos Aires", edition: 1, date: "Marzo 2026", status: "Realizado" },
  { id: "c2", city: "Córdoba", edition: 2, date: "Junio 2026", status: "Próximamente" },
  { id: "c3", city: "Rosario", edition: 3, date: "Septiembre 2026", status: "Próximamente" },
  { id: "c4", city: "Montevideo", edition: 4, date: "Noviembre 2026", status: "Próximamente" },
];

export type GalleryItem = {
  id: string;
  type: "photo" | "video";
  edition: string;
  caption: string;
  hue: number;
};

export const GALLERY: GalleryItem[] = Array.from({ length: 12 }).map((_, i) => ({
  id: `g${i}`,
  type: i % 5 === 0 ? "video" : "photo",
  edition: "Edición 01 · Buenos Aires",
  caption: ["Graffiti en vivo", "Jam nocturno", "Hair tattoo", "Pasarela DIY", "Flash session", "Backstage"][i % 6],
  hue: (i * 47) % 360,
}));

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
  image?: string;
};

export const ARTISTS: Artist[] = [
  { id: "1", name: "INSITU", act: "Jam Musical / Open Mic", discipline: "Música", venue: "INSITU", image: "/img/insitu-band.jpg" },
  { id: "2", name: "MAV DALI", act: "DJ Set", discipline: "Música" },
  { id: "3", name: "DAMO", act: "Indumentaria Intervenida y Diseño Propio", discipline: "Indumentaria", image: "/img/damo-portrait.jpg" },
  { id: "4", name: "EVA.BELLONI", act: "Indumentaria Intervenida y Diseño Propio", discipline: "Indumentaria", image: "/img/eva-belloni-hoodie.jpg" },
  { id: "5", name: "REAL.CLOTHING", act: "Indumentaria Intervenida", discipline: "Indumentaria", image: "/img/real-clothing.jpg" },
  { id: "6", name: "INK.CLOTHING", act: "Indumentaria Vintage", discipline: "Indumentaria" },
  
  { id: "7", name: "LA PELU DE VANDI", act: "Hair Tattoo", discipline: "Hair Tattoo" },
  { id: "8", name: "CHIKI & MOX", act: "Graffiti en Vivo", discipline: "Graffiti", image: "/img/mox-graffiti.jpg" },
  { id: "9", name: "FEDE BESIO", act: "Poesía", discipline: "Poesía" },
  { id: "9b", name: "FEDE BESIO", act: "Exposición Fotográfica", discipline: "Fotografía" },
  { id: "10", name: "TOMI GREENE", act: "Flash Tattoo", discipline: "Flash Tattoo" },
];

export type AgendaItem = {
  id: string;
  time: string;
  title: string;
  artist: string;
  discipline: Discipline;
  image?: string;
};

export const AGENDA: AgendaItem[] = [
  { id: "a1", time: "19:00", title: "Apertura · Graffiti en Vivo", artist: "CHIKI & MOX", discipline: "Graffiti", image: "/img/mox-graffiti.jpg" },
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
  { id: "c1", city: "Buenos Aires", edition: 1, date: "16 de mayo 2026", status: "Realizado" },
];

export type GalleryItem = {
  id: string;
  type: "photo" | "video";
  edition: string;
  caption: string;
  hue: number;
  image?: string;
};

export const GALLERY: GalleryItem[] = [
  { id: "g1", type: "photo", edition: "Edición 01 · Buenos Aires", caption: "INSITU · Jam musical", hue: 47, image: "/img/insitu-banner.jpg" },
  { id: "g2", type: "photo", edition: "Edición 01 · Buenos Aires", caption: "CHIKI & MOX · Graffiti en vivo", hue: 94, image: "/img/mox-graffiti.jpg" },
  { id: "g3", type: "photo", edition: "Edición 01 · Buenos Aires", caption: "DAMO · Indumentaria", hue: 141, image: "/img/damo.jpg" },
  { id: "g4", type: "photo", edition: "Edición 01 · Buenos Aires", caption: "EVA.BELLONI · Detalle", hue: 188, image: "/img/eva-belloni-patch.jpg" },
  { id: "g5", type: "photo", edition: "Edición 01 · Buenos Aires", caption: "REAL.CLOTHING · Intervención", hue: 235, image: "/img/real-clothing.jpg" },
  { id: "g6", type: "photo", edition: "Edición 01 · Buenos Aires", caption: "INSITU · En vivo", hue: 282, image: "/img/insitu-band.jpg" },
];

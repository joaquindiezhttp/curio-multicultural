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
  { id: "1", name: "INSITU", act: "Jam Musical / Open Mic", discipline: "Música", venue: "INSITU", image: "/__l5e/assets-v1/d9c8a851-97b1-4880-8b34-401310342ef6/insitu-band.jpg" },
  { id: "2", name: "MAV DALI", act: "DJ Set", discipline: "Música" },
  { id: "3", name: "DAMO", act: "Indumentaria Intervenida y Diseño Propio", discipline: "Indumentaria", image: "/__l5e/assets-v1/1fcee07e-bc3c-4d98-ae78-36b494188dc4/damo-portrait.jpg" },
  { id: "4", name: "EVA.BELLONI", act: "Indumentaria Intervenida y Diseño Propio", discipline: "Indumentaria", image: "/__l5e/assets-v1/bfdf17d4-c15f-451f-9706-369415ab35ea/eva-belloni-hoodie.jpg" },
  { id: "5", name: "REAL.CLOTHING", act: "Indumentaria Intervenida", discipline: "Indumentaria", image: "/__l5e/assets-v1/27a21620-20de-42bb-a371-4eaba2a7c19b/real-clothing.jpg" },
  { id: "6", name: "INK.CLOTHING", act: "Indumentaria Vintage", discipline: "Indumentaria" },
  
  { id: "7", name: "LA PELU DE VANDI", act: "Hair Tattoo", discipline: "Hair Tattoo" },
  { id: "8", name: "CHIKI & MOX", act: "Graffiti en Vivo", discipline: "Graffiti", image: "/__l5e/assets-v1/f0c5f140-3d79-4565-87b3-01d58de410c9/mox-graffiti.jpg" },
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
  { id: "a1", time: "19:00", title: "Apertura · Graffiti en Vivo", artist: "CHIKI & MOX", discipline: "Graffiti", image: "/__l5e/assets-v1/f0c5f140-3d79-4565-87b3-01d58de410c9/mox-graffiti.jpg" },
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
  { id: "g1", type: "photo", edition: "Edición 01 · Buenos Aires", caption: "INSITU · Jam musical", hue: 47, image: "/__l5e/assets-v1/296ec062-b989-43ad-973a-a1bd336d1219/insitu-banner.jpg" },
  { id: "g2", type: "photo", edition: "Edición 01 · Buenos Aires", caption: "CHIKI & MOX · Graffiti en vivo", hue: 94, image: "/__l5e/assets-v1/f0c5f140-3d79-4565-87b3-01d58de410c9/mox-graffiti.jpg" },
  { id: "g3", type: "photo", edition: "Edición 01 · Buenos Aires", caption: "DAMO · Indumentaria", hue: 141, image: "/__l5e/assets-v1/3b4bb781-ed5d-4a03-bf31-b48cbb5d49a2/damo.jpg" },
  { id: "g4", type: "photo", edition: "Edición 01 · Buenos Aires", caption: "EVA.BELLONI · Detalle", hue: 188, image: "/__l5e/assets-v1/e788d703-5cf6-4f7d-aa46-b56b62f94902/eva-belloni-patch.jpg" },
  { id: "g5", type: "photo", edition: "Edición 01 · Buenos Aires", caption: "REAL.CLOTHING · Intervención", hue: 235, image: "/__l5e/assets-v1/27a21620-20de-42bb-a371-4eaba2a7c19b/real-clothing.jpg" },
  { id: "g6", type: "photo", edition: "Edición 01 · Buenos Aires", caption: "INSITU · En vivo", hue: 282, image: "/__l5e/assets-v1/d9c8a851-97b1-4880-8b34-401310342ef6/insitu-band.jpg" },
];

export type EventSettings = {
  id: number;
  title: string;
  date_label: string;
  venue: string;
  ticket_price: number;
  max_tickets_per_order: number;
  tickets_enabled: boolean;
  payment_url: string | null;
  updated_at: string;
};

export const DEFAULT_EVENT_SETTINGS: EventSettings = {
  id: 1,
  title: "CURIO · Edición 02",
  date_label: "A confirmar",
  venue: "Buenos Aires",
  ticket_price: 8000,
  max_tickets_per_order: 6,
  tickets_enabled: false,
  payment_url: null,
  updated_at: "",
};

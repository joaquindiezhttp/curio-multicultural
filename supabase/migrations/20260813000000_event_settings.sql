CREATE TABLE public.event_settings (
  id integer PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  title text NOT NULL DEFAULT 'CURIO · Edición 02',
  date_label text NOT NULL DEFAULT 'A confirmar',
  venue text NOT NULL DEFAULT 'Buenos Aires',
  ticket_price integer NOT NULL DEFAULT 8000 CHECK (ticket_price >= 0),
  max_tickets_per_order integer NOT NULL DEFAULT 6 CHECK (max_tickets_per_order BETWEEN 1 AND 20),
  tickets_enabled boolean NOT NULL DEFAULT false,
  payment_url text,
  updated_at timestamptz NOT NULL DEFAULT now()
);

INSERT INTO public.event_settings (id) VALUES (1)
ON CONFLICT (id) DO NOTHING;

ALTER TABLE public.event_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read event settings"
  ON public.event_settings FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admins can update event settings"
  ON public.event_settings FOR UPDATE
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

GRANT SELECT ON public.event_settings TO anon, authenticated;
GRANT UPDATE ON public.event_settings TO authenticated;
GRANT ALL ON public.event_settings TO service_role;

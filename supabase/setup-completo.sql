-- CURIO: setup completo de la base. Pegar entero en Supabase -> SQL Editor -> Run.

-- === 20260619015253_735a60b5-746e-45b5-82e5-872f299e0c9f.sql ===

CREATE TABLE public.postulaciones (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre text NOT NULL,
  nombre_artistico text NOT NULL,
  disciplina text NOT NULL,
  ciudad text NOT NULL,
  instagram text NOT NULL,
  portfolio text,
  mensaje text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.postulaciones TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.postulaciones TO authenticated;
GRANT ALL ON public.postulaciones TO service_role;

ALTER TABLE public.postulaciones ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a postulation"
  ON public.postulaciones FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view postulations"
  ON public.postulaciones FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete postulations"
  ON public.postulaciones FOR DELETE
  TO authenticated
  USING (true);

-- === 20260811000000_admin_role_security.sql ===
-- Only users explicitly marked as administrators in Supabase auth app_metadata
-- can read, update, or delete artist applications.
DROP POLICY IF EXISTS "Authenticated users can view postulations" ON public.postulaciones;
DROP POLICY IF EXISTS "Authenticated users can delete postulations" ON public.postulaciones;

CREATE POLICY "Admins can view postulations"
  ON public.postulaciones FOR SELECT
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admins can update postulations"
  ON public.postulaciones FOR UPDATE
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admins can delete postulations"
  ON public.postulaciones FOR DELETE
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- === 20260813000000_event_settings.sql ===
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

-- === Dar rol admin ===
-- 1) Crear el usuario en Authentication -> Users -> Add user (email + contrasena, marcar Auto Confirm).
-- 2) Cambiar el email de abajo por el de ese usuario y correr SOLO esta parte.
UPDATE auth.users
SET raw_app_meta_data = COALESCE(raw_app_meta_data, '{}'::jsonb) || '{"role":"admin"}'::jsonb
WHERE email = 'CAMBIAR@EMAIL.COM';

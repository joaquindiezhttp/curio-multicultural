
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

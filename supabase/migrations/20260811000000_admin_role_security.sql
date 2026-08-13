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

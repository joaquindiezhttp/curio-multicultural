# Acceso al panel de CURIO

El panel ya no permite registro público. Además, las políticas de Supabase sólo permiten leer, actualizar o eliminar postulaciones a usuarios con `app_metadata.role = "admin"`.

## Activación

1. Aplicá la migración `supabase/migrations/20260811000000_admin_role_security.sql`.
2. Creá el usuario administrador desde Supabase Authentication.
3. Desde un entorno seguro con la service role, asignale estos metadatos:

```ts
await supabase.auth.admin.updateUserById(userId, {
  app_metadata: { role: "admin" },
});
```

4. Cerrá cualquier sesión previa y volvé a ingresar en `/auth` para obtener un token actualizado.

No uses la `service_role` en el navegador ni la incluyas en variables públicas del proyecto.

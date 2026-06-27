import { checkAuth, json, unauthorized, handleOptions, type Env } from '../../_helpers';

// PUT /api/leads/[id] — updates a lead (requires auth)
// DELETE /api/leads/[id] — deletes a lead (requires auth)
export const onRequestOptions = handleOptions;

export const onRequestPut: PagesFunction<Env> = async (context) => {
  if (!checkAuth(context.request)) return unauthorized();

  const { DB } = context.env;
  const id = context.params.id;

  try {
    const body = await context.request.json();

    // Build dynamic update query from provided fields
    const allowedFields = [
      'nicho', 'ciudad', 'negocio', 'telefono', 'whatsapp_ok', 'tiene_web',
      'tiene_fb', 'rating', 'reviews_count', 'estado', 'fecha_contacto',
      'fecha_respuesta', 'paquete', 'setup_usd', 'monthly_usd', 'notas'
    ];

    const updates: string[] = [];
    const values: any[] = [];

    for (const [key, value] of Object.entries(body)) {
      if (allowedFields.includes(key)) {
        updates.push(`${key} = ?`);
        values.push(value);
      }
    }

    if (updates.length === 0) {
      return json({ success: false, error: 'Nada que actualizar' }, 400);
    }

    updates.push(`updated_at = datetime('now')`);
    values.push(id);

    await DB.prepare(`UPDATE leads SET ${updates.join(', ')} WHERE id = ?`)
      .bind(...values)
      .run();

    return json({ success: true });
  } catch (err) {
    return json({ success: false, error: 'Error al actualizar lead' }, 500);
  }
};

export const onRequestDelete: PagesFunction<Env> = async (context) => {
  if (!checkAuth(context.request)) return unauthorized();

  const { DB } = context.env;
  const id = context.params.id;

  try {
    await DB.prepare('DELETE FROM leads WHERE id = ?').bind(id).run();
    return json({ success: true });
  } catch (err) {
    return json({ success: false, error: 'Error al eliminar lead' }, 500);
  }
};

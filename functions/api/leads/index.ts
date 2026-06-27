import { checkAuth, json, unauthorized, handleOptions, type Env } from '../../_helpers';

// GET /api/leads — returns all leads (requires auth)
// POST /api/leads — creates a new lead (requires auth)
export const onRequestOptions = handleOptions;

export const onRequestGet: PagesFunction<Env> = async (context) => {
  if (!checkAuth(context.request)) return unauthorized();

  const { DB } = context.env;
  try {
    const { results } = await DB.prepare(`
      SELECT * FROM leads ORDER BY created_at DESC
    `).all();
    return json({ success: true, leads: results });
  } catch (err) {
    return json({ success: false, error: 'Error al leer leads' }, 500);
  }
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  if (!checkAuth(context.request)) return unauthorized();

  const { DB } = context.env;
  try {
    const body = await context.request.json();
    const result = await DB.prepare(`
      INSERT INTO leads (nicho, ciudad, negocio, telefono, whatsapp_ok, tiene_web, tiene_fb, rating, reviews_count, estado, notas)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      body.nicho || '',
      body.ciudad || '',
      body.negocio || '',
      body.telefono || '',
      body.whatsapp_ok ? 1 : 0,
      body.tiene_web ? 1 : 0,
      body.tiene_fb ? 1 : 0,
      body.rating || 0,
      body.reviews_count || 0,
      body.estado || 'nuevo',
      body.notas || ''
    ).run();

    return json({ success: true, id: result.meta.last_row_id }, 201);
  } catch (err) {
    return json({ success: false, error: 'Error al crear lead' }, 500);
  }
};

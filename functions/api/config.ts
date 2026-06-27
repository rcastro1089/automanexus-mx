import { checkAuth, json, unauthorized, handleOptions, type Env } from '../_helpers';

// GET /api/config — returns the current app config
// PUT /api/config — updates the app config (requires auth)
export const onRequestOptions = handleOptions;

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { DB } = context.env;
  try {
    const result = await DB.prepare('SELECT data FROM app_config WHERE id = 1').first<{ data: string }>();
    const config = result?.data ? JSON.parse(result.data) : {};
    return json({ success: true, config });
  } catch (err) {
    return json({ success: false, error: 'Error al leer config' }, 500);
  }
};

export const onRequestPut: PagesFunction<Env> = async (context) => {
  if (!checkAuth(context.request)) return unauthorized();

  const { DB } = context.env;
  try {
    const body = await context.request.json();
    const dataStr = JSON.stringify(body);
    await DB.prepare('UPDATE app_config SET data = ?, updated_at = datetime(\'now\') WHERE id = 1')
      .bind(dataStr)
      .run();
    return json({ success: true, config: body });
  } catch (err) {
    return json({ success: false, error: 'Error al guardar config' }, 500);
  }
};

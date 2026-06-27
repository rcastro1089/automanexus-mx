// Shared auth helper for Pages Functions
// Simple API key check

const ADMIN_KEY = 'automanexus2026';

export function checkAuth(request: Request): boolean {
  const auth = request.headers.get('X-Admin-Key') || request.headers.get('x-admin-key');
  return auth === ADMIN_KEY;
}

export function json(data: any, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Key',
    },
  });
}

export function unauthorized(): Response {
  return json({ error: 'No autorizado' }, 401);
}

export function handleOptions(): Response {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Key',
    },
  });
}

export interface Env {
  DB: D1Database;
}

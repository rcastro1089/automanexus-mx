-- Migration: 0001_init.sql
-- AutomaNexus MX — D1 Schema
-- Tables: app_config, leads

-- ============================================================
-- app_config: Single-row table for site-wide configuration
-- ============================================================
CREATE TABLE IF NOT EXISTS app_config (
  id INTEGER PRIMARY KEY DEFAULT 1,
  data TEXT NOT NULL DEFAULT '{}',
  updated_at TEXT DEFAULT (datetime('now')),
  CHECK (id = 1)
);

-- Insert default config
INSERT INTO app_config (id, data) VALUES (
  1,
  json('{
    "whatsapp": "1234567890",
    "whatsappMessage": "Hola, vi su página AutomaNexus y quiero información sobre páginas web para mi negocio",
    "email": "hola@automanex.us",
    "brandName": "AutomaNexus",
    "city": "México",
    "showPrices": true,
    "prices": {
      "presencia": { "setup": 99, "monthly": 25 },
      "profesional": { "setup": 199, "monthly": 50 },
      "premium": { "setup": 399, "monthly": 80 }
    }
  }')
);

-- ============================================================
-- leads: CRM tracking table for outreach pipeline
-- ============================================================
CREATE TABLE IF NOT EXISTS leads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  -- Lead info
  nicho TEXT NOT NULL DEFAULT '',
  ciudad TEXT NOT NULL DEFAULT '',
  negocio TEXT NOT NULL DEFAULT '',
  telefono TEXT NOT NULL DEFAULT '',
  whatsapp_ok INTEGER DEFAULT 0,
  tiene_web INTEGER DEFAULT 0,
  tiene_fb INTEGER DEFAULT 0,
  rating REAL DEFAULT 0,
  reviews_count INTEGER DEFAULT 0,
  -- Pipeline state
  estado TEXT NOT NULL DEFAULT 'nuevo',
  -- Estados: nuevo, contactado, respondio, demo_enviada, negociando, cliente, rechazo, sin_respuesta
  -- Outreach tracking
  fecha_contacto TEXT,
  fecha_respuesta TEXT,
  -- Deal info
  paquete TEXT,
  setup_usd REAL,
  monthly_usd REAL,
  -- Notes
  notas TEXT DEFAULT '',
  -- Timestamps
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_leads_estado ON leads(estado);
CREATE INDEX IF NOT EXISTS idx_leads_nicho ON leads(nicho);
CREATE INDEX IF NOT EXISTS idx_leads_ciudad ON leads(ciudad);

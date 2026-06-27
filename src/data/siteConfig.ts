export interface SiteConfig {
  whatsapp: string;
  whatsappMessage: string;
  email: string;
  brandName: string;
  tagline: string;
  city: string;
  showPrices: boolean;
  prices: {
    presencia: { setup: number; monthly: number };
    profesional: { setup: number; monthly: number };
    premium: { setup: number; monthly: number };
  };
}

export const defaultConfig: SiteConfig = {
  whatsapp: '1234567890',
  whatsappMessage: 'Hola, vi su página AutomaNexus y quiero información sobre páginas web para mi negocio',
  email: 'hola@automanex.us',
  brandName: 'AutomaNexus',
  tagline: 'Tu web cuesta menos que tu Netflix',
  city: 'México',
  showPrices: true,
  prices: {
    presencia: { setup: 99, monthly: 25 },
    profesional: { setup: 199, monthly: 50 },
    premium: { setup: 399, monthly: 80 },
  },
};

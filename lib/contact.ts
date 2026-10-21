export type ContactInput = { name: string; email: string; message: string };

export const LIMITS = { name: 100, email: 254, message: 5000 } as const;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Returns the cleaned input, or null if anything is missing, too long or not a string.
export function validateContact(body: unknown): ContactInput | null {
  if (!body || typeof body !== 'object') return null;
  const raw = body as Record<string, unknown>;
  const out = {} as ContactInput;
  for (const key of ['name', 'email', 'message'] as const) {
    const value = raw[key];
    if (typeof value !== 'string') return null;
    const trimmed = value.trim();
    if (!trimmed || trimmed.length > LIMITS[key]) return null;
    out[key] = trimmed;
  }
  return EMAIL.test(out.email) ? out : null;
}

// Hidden "company" field: people never see it, bots fill it in.
export const isBot = (body: unknown) =>
  typeof (body as Record<string, unknown> | null)?.company === 'string' &&
  (body as Record<string, string>).company !== '';

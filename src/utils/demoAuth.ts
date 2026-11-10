import { STORAGE_KEYS } from '../data/mockData';

export async function hashDemoSecret(secret: string): Promise<string> {
  const normalized = `mgt-demo-salt::${secret}`;
  if (typeof crypto !== 'undefined' && crypto.subtle) {
    const encoder = new TextEncoder();
    const buffer = await crypto.subtle.digest('SHA-256', encoder.encode(normalized));
    return Array.from(new Uint8Array(buffer))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  }
  // Fallback non-cryptographic digest only when crypto.subtle is unavailable over plain LAN HTTP
  let h1 = 0x811c9dc5;
  for (let i = 0; i < normalized.length; i++) {
    h1 ^= normalized.charCodeAt(i);
    h1 = Math.imul(h1, 0x01000193);
  }
  return `fnv32-${(h1 >>> 0).toString(16)}`;
}

export function generateRuntimeDemoPasscode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const buf = new Uint8Array(10);
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    crypto.getRandomValues(buf);
  } else {
    for (let i = 0; i < buf.length; i++) {
      buf[i] = Math.floor(Math.random() * 256);
    }
  }
  return Array.from(buf, (b) => chars[b % chars.length]).join('');
}

export function hasConfiguredDemoPasscode(): boolean {
  try {
    return Boolean(localStorage.getItem(STORAGE_KEYS.ADMIN_PASSCODE_HASH));
  } catch {
    return false;
  }
}

export async function saveDemoPasscode(passcode: string): Promise<void> {
  const hash = await hashDemoSecret(passcode);
  try {
    localStorage.setItem(STORAGE_KEYS.ADMIN_PASSCODE_HASH, hash);
  } catch (err) {
    console.warn('Unable to store local demo passcode hash:', err);
  }
}

export async function verifyDemoPasscode(passcode: string): Promise<boolean> {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.ADMIN_PASSCODE_HASH);
    if (!stored) return false;
    const candidate = await hashDemoSecret(passcode);
    return candidate === stored;
  } catch {
    return false;
  }
}

export function clearDemoPasscode(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.ADMIN_PASSCODE_HASH);
  } catch {
    // ignore storage errors
  }
}


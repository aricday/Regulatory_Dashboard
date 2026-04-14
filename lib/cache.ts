/**
 * Server-side TTL cache for scraped guidelines pages.
 * Entries expire after 1 hour to avoid re-fetching on every selection change.
 */

interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

const TTL_MS = 60 * 60 * 1000; // 1 hour
const store = new Map<string, CacheEntry<unknown>>();

export function getCached<T>(key: string): T | undefined {
  const entry = store.get(key);
  if (!entry) return undefined;
  if (Date.now() > entry.expiresAt) {
    store.delete(key);
    return undefined;
  }
  return entry.data as T;
}

export function setCached<T>(key: string, data: T): void {
  store.set(key, { data, expiresAt: Date.now() + TTL_MS });
}

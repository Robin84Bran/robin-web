export interface GhostPost {
  title: string;
  url: string;
  excerpt?: string;
  published_at?: string;
}

const ghostConfig = {
  apiUrl: import.meta.env.GHOST_CONTENT_API_URL ?? '',
  apiKey: import.meta.env.GHOST_CONTENT_API_KEY ?? '',
};

export const isGhostConfigured = Boolean(ghostConfig.apiUrl && ghostConfig.apiKey);

export async function getLatestGhostPosts(limit = 3): Promise<GhostPost[]> {
  if (!isGhostConfigured) {
    return [];
  }

  const endpoint = new URL('/ghost/api/content/posts/', ghostConfig.apiUrl);
  endpoint.searchParams.set('key', ghostConfig.apiKey);
  endpoint.searchParams.set('limit', String(limit));
  endpoint.searchParams.set('fields', 'title,url,excerpt,published_at');

  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error(`Ghost Content API request failed with status ${response.status}.`);
  }

  const payload = (await response.json()) as { posts?: GhostPost[] };
  return payload.posts ?? [];
}

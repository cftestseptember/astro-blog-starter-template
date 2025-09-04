// src/pages/api/request-headers.json.ts
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ request, url, clientAddress, cookies }) => {
  const headersObj: Record<string, string> = {};
  for (const [k, v] of request.headers) headersObj[k] = v;

  const body = JSON.stringify(
    {
      method: request.method,
      url: url.href,
      ip: clientAddress,       // may be empty depending on adapter
      headers: headersObj,
      cookies: cookies.getAll().map(c => ({ name: c.name, value: c.value })),
    },
    null, 2
  );

  return new Response(body, {
    status: 200,
    headers: {
      // JSON + no cache so Cloudflare won’t serve a stale/static page
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store, no-cache, must-revalidate',
      'pragma': 'no-cache',

      // Security headers required by the homework (you can also set these via CF Rules)
      'content-security-policy': "default-src 'self'",
      'strict-transport-security': 'max-age=63072000; includeSubDomains; preload',
      'x-frame-options': 'DENY',
      'x-content-type-options': 'nosniff',
      'referrer-policy': 'no-referrer',
    },
  });
};

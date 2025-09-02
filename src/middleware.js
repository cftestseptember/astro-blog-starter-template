export async function onRequest(context) {
  const headers = {}
  for (const [key, value] of context.request.headers.entries()) {
    headers[key] = value
  }

  return new Response(JSON.stringify(headers, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Content-Security-Policy": "default-src 'self'",
      "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
      "X-Frame-Options": "DENY",
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "no-referrer"
    }
  })
}

// Only follow same-site redirects ("/x" but not "//evil.com" or "https://...")
export const safeRedirect = (value: unknown, fallback = '/') =>
  typeof value === 'string' && value.startsWith('/') && !value.startsWith('//') ? value : fallback

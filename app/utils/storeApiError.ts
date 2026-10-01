// Extracts the user-facing message from a store API error thrown by $fetch
export const storeApiError = (err: any, fallback: string): string =>
  err?.data?.data?.message || err?.data?.message || fallback

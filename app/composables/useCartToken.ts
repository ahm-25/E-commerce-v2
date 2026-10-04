// Random id of the current cart, kept in this browser. The checkout saves the cart under it
// (abandoned-cart follow-up) and the order sends it back so the saved cart is marked recovered.
const KEY = 'cart-token'

// randomUUID only exists on https/localhost; the fallback builds the same v4 format
const newToken = (): string => {
  if (typeof crypto.randomUUID === 'function') return crypto.randomUUID()
  const b = crypto.getRandomValues(new Uint8Array(16))
  b[6] = (b[6]! & 0x0f) | 0x40
  b[8] = (b[8]! & 0x3f) | 0x80
  const h = [...b].map(x => x.toString(16).padStart(2, '0')).join('')
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`
}

export const useCartToken = () => ({
  get(): string | null {
    if (import.meta.server) return null
    try {
      let token = localStorage.getItem(KEY)
      if (!token) {
        token = newToken()
        localStorage.setItem(KEY, token)
      }
      return token
    } catch {
      return null // storage blocked: no follow-up for this visitor
    }
  },

  // After an order, the next cart is a new one
  reset() {
    try {
      localStorage.setItem(KEY, newToken())
    } catch {}
  }
})

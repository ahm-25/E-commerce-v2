// Commerce events for the pixels loaded by plugins/02.tracking.client.ts.
// Every call is a no-op for a platform that isn't configured (or on the server).

const CURRENCY = 'EGP'

export interface TrackedItem {
  id: string
  name: string
  price: number
  quantity: number
  variant?: string
}

const send = (fn: (w: any) => void) => {
  if (import.meta.server) return
  try {
    fn(window)
  } catch {
    // A blocked or broken pixel must never break the store
  }
}

const sum = (items: TrackedItem[]) => Math.round(items.reduce((s, i) => s + i.price * i.quantity, 0) * 100) / 100
const count = (items: TrackedItem[]) => items.reduce((s, i) => s + i.quantity, 0)
const ga4Items = (items: TrackedItem[]) => items.map(i => ({ item_id: i.id, item_name: i.name, item_variant: i.variant, price: i.price, quantity: i.quantity }))
const tiktokContents = (items: TrackedItem[]) => items.map(i => ({ content_id: i.id, content_name: i.name, quantity: i.quantity, price: i.price }))

export const useTracking = () => ({
  viewItem(item: TrackedItem) {
    send(w => {
      w.fbq?.('track', 'ViewContent', { content_ids: [item.id], content_name: item.name, content_type: 'product', value: item.price, currency: CURRENCY })
      w.ttq?.track?.('ViewContent', { contents: tiktokContents([item]), content_type: 'product', value: item.price, currency: CURRENCY })
      w.snaptr?.('track', 'VIEW_CONTENT', { item_ids: [item.id], price: item.price, currency: CURRENCY })
      w.gtag?.('event', 'view_item', { currency: CURRENCY, value: item.price, items: ga4Items([item]) })
    })
  },

  addToCart(item: TrackedItem) {
    const value = sum([item])
    send(w => {
      w.fbq?.('track', 'AddToCart', { content_ids: [item.id], content_name: item.name, content_type: 'product', value, currency: CURRENCY })
      w.ttq?.track?.('AddToCart', { contents: tiktokContents([item]), content_type: 'product', value, currency: CURRENCY })
      w.snaptr?.('track', 'ADD_CART', { item_ids: [item.id], price: value, currency: CURRENCY, number_items: item.quantity })
      w.gtag?.('event', 'add_to_cart', { currency: CURRENCY, value, items: ga4Items([item]) })
    })
  },

  beginCheckout(items: TrackedItem[]) {
    if (!items.length) return
    const value = sum(items)
    send(w => {
      w.fbq?.('track', 'InitiateCheckout', { content_ids: items.map(i => i.id), content_type: 'product', num_items: count(items), value, currency: CURRENCY })
      w.ttq?.track?.('InitiateCheckout', { contents: tiktokContents(items), content_type: 'product', value, currency: CURRENCY })
      w.snaptr?.('track', 'START_CHECKOUT', { item_ids: items.map(i => i.id), price: value, currency: CURRENCY, number_items: count(items) })
      w.gtag?.('event', 'begin_checkout', { currency: CURRENCY, value, items: ga4Items(items) })
    })
  },

  // Sent once per order: the confirmation page can be reloaded or reopened from a link.
  // The order id doubles as the event id, so a server-side Conversions API can deduplicate later.
  purchase(order: { id: string, orderNumber: string, total: number, shipping: number, tax: number, items: TrackedItem[] }) {
    if (import.meta.server) return
    const key = `tracked-purchase:${order.id}`
    try {
      if (localStorage.getItem(key)) return
      localStorage.setItem(key, '1')
    } catch {
      // Storage blocked: a possible duplicate beats a lost conversion
    }
    send(w => {
      w.fbq?.('track', 'Purchase', { content_ids: order.items.map(i => i.id), content_type: 'product', num_items: count(order.items), value: order.total, currency: CURRENCY }, { eventID: order.id })
      w.ttq?.track?.('CompletePayment', { contents: tiktokContents(order.items), content_type: 'product', value: order.total, currency: CURRENCY }, { event_id: order.id })
      w.snaptr?.('track', 'PURCHASE', { item_ids: order.items.map(i => i.id), price: order.total, currency: CURRENCY, transaction_id: order.orderNumber, number_items: count(order.items) })
      w.gtag?.('event', 'purchase', { transaction_id: order.orderNumber, currency: CURRENCY, value: order.total, shipping: order.shipping, tax: order.tax, items: ga4Items(order.items) })
    })
  }
})

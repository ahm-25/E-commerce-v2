import type { Coupon, ShippingMethod, PaymentMethod, Product, Category, ReviewPayload, StoreMarketing } from '~/types'
import type { Order } from '~/types/order'

// Store data managed from the dashboard (E-commerce-dashboard /api/storefront).
// "/store-api" is proxied there by routeRules in nuxt.config.ts.
const BASE = '/store-api'

export interface CouponRequest {
  code: string
  items: { productId: string, category?: string, price: number, quantity: number }[]
  customerId?: string | null
}

export interface ProductQuery {
  search?: string
  category?: string
  brands?: string[]
  colors?: string[]
  minPrice?: number
  maxPrice?: number
  rating?: number
  inStock?: boolean
  onSale?: boolean
  ids?: string[]
  sort?: string
  page?: number
  perPage?: number
}

export interface ProductPage {
  items: Product[]
  total: number
  page: number
  perPage: number
}

export interface PlaceOrderPayload {
  customerId: string | null
  cartToken?: string | null // marks the saved checkout as recovered
  customer: { name: string, phone: string, email?: string }
  shippingAddress: { governorate: string, city: string, region?: string, addressDetails: string }
  shippingMethodId: string
  paymentMethodId: string
  orderNotes?: string
  couponCode?: string | null
  // Prices, names and stock come from the catalog on the server
  items: { productId: string, variantId?: string | null, quantity: number }[]
}

export interface CartCheckpoint {
  token: string
  customerId: string | null
  customer: { name: string, phone: string, email?: string }
  governorate?: string
  items: { productId: string, variantId: string | null, quantity: number }[]
}

export interface SavedCart {
  customer: { name: string, phone: string, email?: string }
  governorate?: string
  items: {
    productId: string
    variantId: string | null
    slug: string
    name: string
    image: string
    price: number
    compareAtPrice?: number
    color?: string
    size?: string
    quantity: number
    inStock: boolean
  }[]
}

// Arrays are sent comma-separated; empty values are dropped
const toQuery = (q: ProductQuery) => Object.fromEntries(
  Object.entries(q)
    .filter(([, v]) => v !== undefined && v !== null && v !== '' && !(Array.isArray(v) && v.length === 0) && v !== false)
    .map(([k, v]) => [k, Array.isArray(v) ? v.join(',') : v === true ? '1' : v])
)

export const storeApi = {
  getMarketing() {
    return $fetch<StoreMarketing>(`${BASE}/marketing`)
  },

  getCategories() {
    return $fetch<(Category & { productCount: number, description?: string })[]>(`${BASE}/categories`)
  },

  getProducts(query: ProductQuery = {}) {
    return $fetch<ProductPage>(`${BASE}/products`, { query: toQuery(query) })
  },

  getProduct(slug: string) {
    return $fetch<{ product: Product, related: Product[] }>(`${BASE}/products/${encodeURIComponent(slug)}`)
  },

  // Reviews are moderated: the new one shows on the product page once approved from the dashboard
  submitReview(slug: string, body: ReviewPayload) {
    return $fetch<{ id: string, status: 'pending' }>(`${BASE}/products/${encodeURIComponent(slug)}/reviews`, { method: 'POST', body })
  },

  validateCoupon(body: CouponRequest) {
    return $fetch<Coupon>(`${BASE}/coupons/validate`, { method: 'POST', body })
  },

  getGovernorates() {
    return $fetch<string[]>(`${BASE}/governorates`)
  },

  getShippingOptions(params: { governorate: string, subtotal: number, itemsCount: number }) {
    return $fetch<ShippingMethod[]>(`${BASE}/shipping-options`, { query: params })
  },

  getPaymentMethods() {
    return $fetch<PaymentMethod[]>(`${BASE}/payment-methods`)
  },

  // Totals are recomputed by the server; the returned order is the source of truth
  placeOrder(body: PlaceOrderPayload) {
    return $fetch<Order>(`${BASE}/orders`, { method: 'POST', body })
  },

  // Checkout in progress, so the store can follow up if it's abandoned (needs a valid phone)
  saveCartCheckpoint(body: CartCheckpoint) {
    return $fetch<{ saved: boolean }>(`${BASE}/carts/checkpoint`, { method: 'POST', body })
  },

  // Recovery link from the store (WhatsApp): the saved cart with current prices
  getSavedCart(token: string) {
    return $fetch<SavedCart>(`${BASE}/carts/${encodeURIComponent(token)}`)
  },

  // Guests: order number + the phone used at checkout
  trackOrder(orderNumber: string, phone: string) {
    return $fetch<Order>(`${BASE}/orders/track`, { query: { orderNumber, phone } })
  },

  getOrder(id: string) {
    return $fetch<Order>(`${BASE}/orders/${encodeURIComponent(id)}`)
  },

  // TODO: send the auth token instead of the id once auth is real
  getCustomerOrders(customerId: string) {
    return $fetch<Order[]>(`${BASE}/orders`, { query: { customerId } })
  },

  cancelOrder(id: string, customerId: string) {
    return $fetch<Order>(`${BASE}/orders/${encodeURIComponent(id)}/cancel`, { method: 'POST', body: { customerId } })
  }
}

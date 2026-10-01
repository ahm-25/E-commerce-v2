import type { Coupon, ShippingMethod, PaymentMethod } from '~/types'
import type { Order } from '~/types/order'

// Store data managed from the dashboard (E-commerce-dashboard /api/storefront).
// "/store-api" is proxied there by routeRules in nuxt.config.ts.
const BASE = '/store-api'

export interface CouponRequest {
  code: string
  items: { productId: string, category?: string, price: number, quantity: number }[]
  customerId?: string | null
}

export interface PlaceOrderPayload {
  customerId: string | null
  customer: { name: string, phone: string, email?: string }
  shippingAddress: { governorate: string, city: string, region?: string, addressDetails: string }
  shippingMethodId: string
  paymentMethodId: string
  orderNotes?: string
  couponCode?: string | null
  items: { productId: string, slug?: string, name: string, image?: string, price: number, quantity: number, color?: string, size?: string }[]
}

export const storeApi = {
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

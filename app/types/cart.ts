export interface CartItem {
  id: string
  productId: string
  slug: string
  name: string
  image: string
  price: number
  compareAtPrice?: number
  quantity: number
  color?: string
  size?: string
  variantId?: string
  isAvailable: boolean
}

export interface Coupon {
  code: string
  discountPercentage?: number
  discountAmount?: number
}

export interface CartTotals {
  subtotal: number
  discount: number
  shipping: number
  tax: number
  grandTotal: number
}

export interface CartState {
  items: CartItem[]
  loading: boolean
  error: string | null
  coupon: Coupon | null
  shippingCost: number
  taxRate: number
}

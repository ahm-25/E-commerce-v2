export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'

export type PaymentStatus =
  | 'pending'
  | 'paid'
  | 'failed'
  | 'refunded'

export interface OrderCustomer {
  name: string
  phone: string
  email: string
}

export interface OrderShippingAddress {
  governorate: string
  city: string
  region: string
  addressDetails: string
}

export interface OrderItem {
  id: string
  productId: string
  slug: string
  name: string
  image: string
  price: number
  quantity: number
  color?: string
  size?: string
}

export interface Order {
  id: string
  orderNumber: string
  createdAt: string
  status: OrderStatus
  paymentStatus: PaymentStatus
  paymentMethod: string
  shippingMethod: string
  estimatedDelivery?: string
  items: OrderItem[]
  customer: OrderCustomer
  shippingAddress: OrderShippingAddress
  subtotal: number
  discount: number
  shippingCost: number
  tax: number
  total: number
}

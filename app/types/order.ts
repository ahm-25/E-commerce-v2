export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled'
  | 'returned'

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

export interface TrackingInfo {
  carrier: string
  trackingNumber: string
  url?: string
  estimatedDelivery?: string
}

export interface OrderTimelineItem {
  status: OrderStatus
  title: string
  date?: string
  description?: string
  isCompleted: boolean
  isCurrent: boolean
}

export interface PaymentInfo {
  method: string
  status: PaymentStatus
  cardLast4?: string
  date?: string
  notes?: string
}

export interface Order {
  id: string
  orderNumber: string
  createdAt: string
  status: OrderStatus
  paymentStatus: PaymentStatus
  paymentMethod: string
  paymentInfo?: PaymentInfo
  shippingMethod: string
  estimatedDelivery?: string
  items: OrderItem[]
  customer: OrderCustomer
  shippingAddress: OrderShippingAddress
  tracking?: TrackingInfo
  timeline?: OrderTimelineItem[]
  subtotal: number
  discount: number
  shippingCost: number
  tax: number
  total: number
  notes?: string
}

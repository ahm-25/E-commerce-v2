export interface CustomerInfo {
  fullName: string
  phone: string
  email: string
  useAsBilling: boolean
}

export interface ShippingAddress {
  governorate: string
  city: string
  region: string
  addressDetails: string
  buildingNumber: string
  floorApt: string
  landmark: string
  saveAddress: boolean
}

export interface ShippingMethod {
  id: string
  name: string
  duration: string
  cost: number
  description?: string
}

export interface PaymentMethod {
  id: string
  name: string
  description: string
  icon: string // Lucide icon name or image url
}

export interface CheckoutState {
  customerInfo: CustomerInfo
  shippingAddress: ShippingAddress
  shippingMethodId: string | null
  paymentMethodId: string | null
  orderNotes: string
}

export interface ValidationErrors {
  [key: string]: string
}

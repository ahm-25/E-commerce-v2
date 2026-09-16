export interface Address {
  id: string
  label: string // المنزل، العمل، الخ
  recipientName: string
  phone: string
  governorate: string
  city: string
  area?: string
  addressLine: string // العنوان بالتفصيل
  postalCode?: string
  deliveryNotes?: string
  isDefault: boolean
}

export interface AddressFormData {
  label: string
  recipientName: string
  phone: string
  governorate: string
  city: string
  area?: string
  addressLine: string
  postalCode?: string
  deliveryNotes?: string
  isDefault: boolean
}

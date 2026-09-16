export interface UserAddress {
  id: string
  title: string
  recipientName: string
  phone: string
  street: string
  city: string
  governorate: string
  isDefault: boolean
}

export interface UserProfile {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  avatarUrl?: string
  governorate?: string
  city?: string
  birthDate?: string
  emailVerified: boolean
  phoneVerified?: boolean
  createdAt: string
  status: 'active' | 'inactive'
}

export interface AccountStats {
  totalOrders: number
  pendingOrders: number
  completedOrders: number
  wishlistCount: number
}

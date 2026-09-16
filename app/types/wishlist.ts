import type { Product } from './index'

export type WishlistSortOption = 'newest' | 'price_asc' | 'price_desc' | 'name_asc'

export interface WishlistItem {
  id: string
  productId: string
  addedAt: string
  product?: Product // populated when loaded
}

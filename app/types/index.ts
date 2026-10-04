export interface Store {
  name: string
  logo: string
  description: string
  socials: {
    facebook?: string
    twitter?: string
    instagram?: string
  }
  contact: {
    phone: string
    email: string
    address: string
  }
}

export interface ProductImage {
  id: string
  url: string
  alt: string
}

export interface ProductOptionValue {
  id: string
  label: string
  value: string
}

export interface ProductOption {
  id: string
  name: string
  type: 'color' | 'size' | 'button' | 'dropdown'
  values: ProductOptionValue[]
}

export interface ProductVariant {
  id: string
  sku: string
  price: number
  compareAtPrice?: number
  stock: number
  options: Record<string, string> // optionId -> valueId
}

export interface ProductSpecification {
  name: string
  value: string
}

export interface ProductReview {
  id: string
  author: string
  avatar?: string
  rating: number
  date: string
  title?: string
  content: string
  verified?: boolean // bought and received the product
  reply?: { content: string, date: string } // the store's answer
}

export interface RatingBucket {
  rating: number
  count: number
  percentage: number
}

export interface ReviewPayload {
  customerId?: string | null
  name: string
  email?: string
  rating: number
  title?: string
  content: string
}

export interface Product {
  id: string
  slug: string
  name: string
  description: string
  images: ProductImage[]
  price: number
  compareAtPrice?: number
  currency: string
  rating: number
  reviewsCount: number
  category?: Category
  variants?: ProductVariant[]
  options?: ProductOption[]
  specifications?: ProductSpecification[]
  reviews?: ProductReview[]
  ratingDistribution?: RatingBucket[]
  stock: number
  isNew?: boolean
  badge?: string
  colors?: string[]
  brand?: string
  hasVariants?: boolean // the customer must pick options on the product page
}

export interface ProductFilters {
  searchQuery?: string
  category?: string
  brands?: string[]
  colors?: string[]
  minPrice?: number
  maxPrice?: number
  rating?: number
  availability?: boolean
  sort?: string
  page?: number
}

export interface Category {
  id: string
  name: string
  image: string
  slug: string
}

export interface Banner {
  title: string
  description: string
  image: string
  ctaText: string
  ctaLink: string
  type: 'split' | 'overlay'
}

export interface Collection {
  id: string
  title: string
  description?: string
  image: string
  ctaText: string
  ctaLink: string
  layout: 'large' | 'small'
}

export interface Testimonial {
  id: string
  name: string
  quote: string
  rating: number
  avatar?: string
  location?: string
}

export interface Brand {
  id: string
  name: string
  logo: string
}

export interface HomepageData {
  store: Store
  hero: Banner
  categories: Category[]
  brands?: Brand[]
  featuredProducts: Product[]
  promotionalBanner: Banner
  bestSellers: Product[]
  collections: Collection[]
  testimonials: Testimonial[]
}

export * from './cart'
export * from './checkout'
export * from './order'
export * from './account'
export * from './wishlist'
export * from './address'

// WhatsApp button + pixel ids, managed from the dashboard (Marketing page)
export interface StoreMarketing {
  whatsapp: {
    enabled: boolean
    productButton: boolean
    number: string // international, no "+": 201012345678
    message: string
  }
  tracking: {
    metaPixelId: string | null
    tiktokPixelId: string | null
    snapPixelId: string | null
    ga4MeasurementId: string | null
  }
}

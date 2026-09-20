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
  stock: number
  isNew?: boolean
  badge?: string
  colors?: string[]
  brand?: string
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

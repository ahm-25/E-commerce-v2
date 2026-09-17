import { ref, computed } from 'vue'
import { useProductFiltersStore } from '~/stores/productFilters'
import type { Product, Category } from '~/types'

// Mock Data
const mockCategories: Category[] = [
  { id: '1', name: 'حقائب يد', slug: 'handbags', image: '/images/categories/handbags.jpg' },
  { id: '2', name: 'حقائب كتف', slug: 'shoulder-bags', image: '/images/categories/shoulder-bags.jpg' },
  { id: '3', name: 'حقائب ظهر', slug: 'backpacks', image: '/images/categories/backpacks.jpg' },
  { id: '4', name: 'حقائب مسائية', slug: 'evening-bags', image: '/images/categories/evening-bags.jpg' },
]

export const mockProducts: Product[] = Array.from({ length: 48 }).map((_, i) => ({
  id: `prod-${i + 1}`,
  slug: `product-${i + 1}`,
  name: `حقيبة ${i % 2 === 0 ? 'نسائية أنيقة' : 'يد كلاسيكية'} ${i + 1}`,
  description: 'اكتشفي مجموعة مختارة من الحقائب العصرية التي تجمع بين الأناقة والجودة.',
  images: [
    { id: `img-1`, url: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=600&auto=format&fit=crop', alt: 'Bag' },
    { id: `img-2`, url: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=600&auto=format&fit=crop', alt: 'Bag hover' }
  ],
  price: 2000 + Math.floor(Math.random() * 2000), // 2000 to 4000
  compareAtPrice: Math.random() > 0.5 ? 4000 + Math.floor(Math.random() * 1000) : undefined,
  currency: 'EGP',
  rating: Number((4 + Math.random()).toFixed(1)),
  reviewsCount: Math.floor(Math.random() * 200),
  category: mockCategories[i % 4],
  brand: ['Coach', 'Michael Kors', 'Charles & Keith', 'Guess', 'Other'][i % 5],
  colors: ['#000000', '#F5F5DC', '#8B4513', '#4682B4', '#FFC0CB'].slice(0, 1 + Math.floor(Math.random() * 3)), // 1 to 3 colors
  stock: 10,
  badge: Math.random() > 0.7 ? `-${Math.floor(Math.random() * 30 + 10)}%` : undefined,
  isNew: Math.random() > 0.8
}))

export const useProducts = () => {
  const filtersStore = useProductFiltersStore()
  
  const products = ref<Product[]>([])
  const totalProducts = ref(0)
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  
  // This would be replaced with actual API call
  const fetchProducts = async () => {
    isLoading.value = true
    error.value = null
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800))
      
      let filtered = [...mockProducts]
      
      // Apply filters
      const { searchQuery, category, brands, colors, minPrice, maxPrice, rating, sort } = filtersStore.filters
      
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        filtered = filtered.filter(p => 
          p.name.toLowerCase().includes(query) || 
          p.description.toLowerCase().includes(query) ||
          (p.brand && p.brand.toLowerCase().includes(query))
        )
      }

      if (category) {
        filtered = filtered.filter(p => p.category?.slug === category)
      }
      
      if (brands && brands.length > 0) {
        filtered = filtered.filter(p => p.brand && brands.includes(p.brand))
      }
      
      if (colors && colors.length > 0) {
        filtered = filtered.filter(p => p.colors?.some(c => colors.includes(c)))
      }
      
      if (minPrice) {
        filtered = filtered.filter(p => p.price >= minPrice)
      }
      
      if (maxPrice) {
        filtered = filtered.filter(p => p.price <= maxPrice)
      }
      
      if (rating) {
        filtered = filtered.filter(p => p.rating >= rating)
      }
      
      // Apply sorting
      if (sort) {
        switch (sort) {
          case 'price-asc':
            filtered.sort((a, b) => a.price - b.price)
            break
          case 'price-desc':
            filtered.sort((a, b) => b.price - a.price)
            break
          case 'rating-desc':
            filtered.sort((a, b) => b.rating - a.rating)
            break
          case 'newest':
            filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
            break
          default:
            // 'popular' or default, keeping original order for mock
            break
        }
      }
      
      // Pagination (assuming 12 items per page)
      const perPage = 12
      const page = filtersStore.filters.page || 1
      const start = (page - 1) * perPage
      const end = start + perPage
      
      totalProducts.value = filtered.length
      products.value = filtered.slice(start, end)
      
    } catch (e: any) {
      error.value = e.message || 'حدث خطأ أثناء جلب المنتجات'
    } finally {
      isLoading.value = false
    }
  }

  const getCategoryBySlug = (slug: string) => {
    return mockCategories.find(c => c.slug === slug) || null
  }

  return {
    products,
    totalProducts,
    isLoading,
    error,
    fetchProducts,
    getCategoryBySlug,
    mockCategories
  }
}

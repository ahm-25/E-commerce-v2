import { defineStore } from 'pinia'
import { ref } from 'vue'
import { mockProducts } from '~/composables/useProducts'
import type { Product, ProductFilters } from '~/types'

export interface OfferProduct extends Product {
  discountPercentage?: number
  expiresAt?: string
}

export const useOffersStore = defineStore('offers', () => {
  const offers = ref<OfferProduct[]>([])
  const featuredOffers = ref<OfferProduct[]>([])
  const total = ref(0)
  
  // Extend ProductFilters to include discount min
  const filters = ref<ProductFilters & { minDiscount?: number }>({
    page: 1,
    sort: 'discount-desc'
  })
  
  const isLoading = ref(false)
  const isLoadingMore = ref(false)
  const error = ref<string | null>(null)

  // fake data initialization
  const generateMockOffers = (): OfferProduct[] => {
    return mockProducts
      .filter(p => p.compareAtPrice && p.compareAtPrice > p.price)
      .map((p, index) => {
        const discountPercentage = Math.round(((p.compareAtPrice! - p.price) / p.compareAtPrice!) * 100)
        
        let expiresAt: string | undefined = undefined
        // Give some products a countdown (e.g. index 0 and 3)
        if (index === 0 || index === 3) {
           const futureDate = new Date()
           futureDate.setHours(futureDate.getHours() + Math.floor(Math.random() * 48) + 12) 
           expiresAt = futureDate.toISOString()
        }

        return {
          ...p,
          discountPercentage,
          expiresAt,
          badge: `خصم ${discountPercentage}%` // Arabic Badge
        }
      })
  }

  const allOffers = ref<OfferProduct[]>(generateMockOffers())

  const fetchFeaturedOffers = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 400))
      featuredOffers.value = allOffers.value.filter(p => p.expiresAt).slice(0, 2)
    } catch (e: any) {
      console.error(e)
    }
  }

  const fetchOffers = async (isLoadMore = false) => {
    if (isLoadMore) {
      isLoadingMore.value = true
    } else {
      isLoading.value = true
    }
    error.value = null
    
    try {
      await new Promise(resolve => setTimeout(resolve, 800))
      
      let filtered = [...allOffers.value]
      
      const { category, minPrice, maxPrice, minDiscount, sort, searchQuery } = filters.value
      
      if (searchQuery) {
        const q = searchQuery.toLowerCase()
        filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || (p.description && p.description.toLowerCase().includes(q)))
      }

      if (category) {
        filtered = filtered.filter(p => p.category?.slug === category)
      }
      
      if (minPrice) {
        filtered = filtered.filter(p => p.price >= minPrice)
      }
      if (maxPrice) {
        filtered = filtered.filter(p => p.price <= maxPrice)
      }
      if (minDiscount) {
        filtered = filtered.filter(p => (p.discountPercentage || 0) >= minDiscount)
      }

      // Sort
      if (sort) {
        switch (sort) {
          case 'discount-desc':
            filtered.sort((a, b) => (b.discountPercentage || 0) - (a.discountPercentage || 0))
            break
          case 'price-asc':
            filtered.sort((a, b) => a.price - b.price)
            break
          case 'price-desc':
            filtered.sort((a, b) => b.price - a.price)
            break
          case 'newest':
            filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
            break
        }
      }

      total.value = filtered.length
      
      const perPage = 12
      const page = filters.value.page || 1
      const start = (page - 1) * perPage
      const end = start + perPage
      
      const currentBatch = filtered.slice(start, end)

      if (isLoadMore) {
        offers.value = [...offers.value, ...currentBatch]
      } else {
        offers.value = currentBatch
      }
    } catch (e: any) {
      error.value = 'تعذر تحميل العروض. يرجى المحاولة مرة أخرى.'
    } finally {
      isLoading.value = false
      isLoadingMore.value = false
    }
  }

  const applyFilters = (newFilters: Partial<typeof filters.value>) => {
    filters.value = { ...filters.value, ...newFilters, page: 1 }
    fetchOffers()
  }

  const clearFilters = () => {
    filters.value = { page: 1, sort: 'discount-desc' }
    fetchOffers()
  }

  const setSort = (sort: string) => {
    filters.value.sort = sort
    filters.value.page = 1
    fetchOffers()
  }

  const loadMore = () => {
    if (offers.value.length < total.value) {
      filters.value.page = (filters.value.page || 1) + 1
      fetchOffers(true)
    }
  }

  const retry = () => {
    fetchOffers()
  }

  return {
    offers,
    featuredOffers,
    total,
    filters,
    isLoading,
    isLoadingMore,
    error,
    fetchOffers,
    fetchFeaturedOffers,
    applyFilters,
    clearFilters,
    setSort,
    loadMore,
    retry
  }
})

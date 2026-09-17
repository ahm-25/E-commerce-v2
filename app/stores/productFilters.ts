import { defineStore } from 'pinia'
import type { ProductFilters } from '~/types'

export const useProductFiltersStore = defineStore('productFilters', {
  state: (): { filters: ProductFilters, viewMode: 'grid' | 'list', isMobileFiltersOpen: boolean } => ({
    filters: {
      searchQuery: undefined,
      category: undefined,
      brands: [],
      colors: [],
      minPrice: undefined,
      maxPrice: undefined,
      rating: undefined,
      availability: undefined,
      sort: 'popular',
      page: 1,
    },
    viewMode: 'grid',
    isMobileFiltersOpen: false,
  }),

  actions: {
    setFilter<K extends keyof ProductFilters>(key: K, value: ProductFilters[K]) {
      this.filters[key] = value
      if (key !== 'page') {
        this.filters.page = 1 // Reset to page 1 on filter change
      }
    },
    
    toggleArrayFilter(key: 'brands' | 'colors', value: string) {
      const array = this.filters[key] || []
      const index = array.indexOf(value)
      if (index === -1) {
        this.filters[key] = [...array, value]
      } else {
        this.filters[key] = array.filter(item => item !== value)
      }
      this.filters.page = 1
    },

    clearFilters() {
      const currentCategory = this.filters.category
      const currentSearchQuery = this.filters.searchQuery
      this.filters = {
        searchQuery: currentSearchQuery,
        category: currentCategory, // Keep category if in category page
        brands: [],
        colors: [],
        minPrice: undefined,
        maxPrice: undefined,
        rating: undefined,
        availability: undefined,
        sort: 'popular',
        page: 1,
      }
    },

    setViewMode(mode: 'grid' | 'list') {
      this.viewMode = mode
    },

    toggleMobileFilters() {
      this.isMobileFiltersOpen = !this.isMobileFiltersOpen
    },

    syncWithQuery(query: any) {
      if (query.q) this.filters.searchQuery = query.q
      if (query.category) this.filters.category = query.category
      if (query.brands) this.filters.brands = Array.isArray(query.brands) ? query.brands : query.brands.split(',')
      if (query.colors) this.filters.colors = Array.isArray(query.colors) ? query.colors : query.colors.split(',')
      if (query.minPrice) this.filters.minPrice = Number(query.minPrice)
      if (query.maxPrice) this.filters.maxPrice = Number(query.maxPrice)
      if (query.rating) this.filters.rating = Number(query.rating)
      if (query.sort) this.filters.sort = query.sort
      if (query.page) this.filters.page = Number(query.page)
    }
  },

  getters: {
    activeFiltersCount: (state) => {
      let count = 0
      if (state.filters.brands?.length) count++
      if (state.filters.colors?.length) count++
      if (state.filters.minPrice || state.filters.maxPrice) count++
      if (state.filters.rating) count++
      return count
    },
    
    queryObject: (state) => {
      const query: Record<string, string> = {}
      
      if (state.filters.searchQuery) query.q = state.filters.searchQuery
      if (state.filters.category) query.category = state.filters.category
      if (state.filters.brands?.length) query.brands = state.filters.brands.join(',')
      if (state.filters.colors?.length) query.colors = state.filters.colors.join(',')
      if (state.filters.minPrice) query.minPrice = state.filters.minPrice.toString()
      if (state.filters.maxPrice) query.maxPrice = state.filters.maxPrice.toString()
      if (state.filters.rating) query.rating = state.filters.rating.toString()
      if (state.filters.sort && state.filters.sort !== 'popular') query.sort = state.filters.sort
      if (state.filters.page && state.filters.page > 1) query.page = state.filters.page.toString()

      return query
    }
  }
})

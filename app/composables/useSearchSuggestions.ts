import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useMockData } from '~/composables/useMockData'
import type { Product, Category } from '~/types'

const RECENT_SEARCHES_KEY = 'nexora_recent_searches'
const MAX_RECENT_SEARCHES = 5

export const useSearchSuggestions = () => {
  const router = useRouter()
  const { mockProducts, mockData } = useMockData()

  const query = ref('')
  const isSearchFocused = ref(false)
  const isLoading = ref(false)
  
  const suggestedProducts = ref<Product[]>([])
  const suggestedCategories = ref<Category[]>([])
  const recentSearches = ref<string[]>([])
  const hasError = ref(false)

  let debounceTimeout: any = null

  // Initialize recent searches
  const loadRecentSearches = () => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(RECENT_SEARCHES_KEY)
        if (stored) {
          recentSearches.value = JSON.parse(stored)
        }
      } catch (e) {
        console.error('Failed to load recent searches', e)
      }
    }
  }

  const saveRecentSearch = (term: string) => {
    if (!term || term.trim() === '') return
    const cleanTerm = term.trim()
    
    recentSearches.value = [
      cleanTerm,
      ...recentSearches.value.filter(s => s !== cleanTerm)
    ].slice(0, MAX_RECENT_SEARCHES)

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(recentSearches.value))
      } catch (e) {
        console.error('Failed to save recent search', e)
      }
    }
  }

  const removeRecentSearch = (term: string) => {
    recentSearches.value = recentSearches.value.filter(s => s !== term)
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(recentSearches.value))
      } catch (e) {}
    }
  }

  const clearSuggestions = () => {
    suggestedProducts.value = []
    suggestedCategories.value = []
    hasError.value = false
  }

  const fetchSuggestions = async (searchQuery: string) => {
    if (searchQuery.trim().length < 2) {
      clearSuggestions()
      return
    }

    isLoading.value = true
    hasError.value = false

    try {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 300))
      
      const q = searchQuery.toLowerCase().trim()
      
      // Filter Categories
      const categories = mockData.categories || []
      suggestedCategories.value = categories
        .filter(c => c.name.toLowerCase().includes(q))
        .slice(0, 3)

      // Filter Products
      suggestedProducts.value = mockProducts
        .filter(p => p.name.toLowerCase().includes(q) || (p.category?.name && p.category.name.toLowerCase().includes(q)))
        .slice(0, 4)

    } catch (e) {
      hasError.value = true
      clearSuggestions()
    } finally {
      isLoading.value = false
    }
  }

  const onInput = () => {
    if (debounceTimeout) clearTimeout(debounceTimeout)
    
    if (query.value.trim().length < 2) {
      clearSuggestions()
      return
    }

    isLoading.value = true // Show loading immediately while debouncing
    debounceTimeout = setTimeout(() => {
      fetchSuggestions(query.value)
    }, 350)
  }

  const submitSearch = (term?: string) => {
    const searchTerm = term || query.value
    if (searchTerm.trim().length === 0) return
    
    saveRecentSearch(searchTerm)
    isSearchFocused.value = false
    router.push({ path: '/search', query: { q: searchTerm } })
  }
  
  // Call on initialization
  loadRecentSearches()

  return {
    query,
    isSearchFocused,
    isLoading,
    hasError,
    suggestedProducts,
    suggestedCategories,
    recentSearches,
    onInput,
    submitSearch,
    removeRecentSearch,
    clearSuggestions
  }
}

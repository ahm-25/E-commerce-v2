import { ref } from 'vue'
import { useProductFiltersStore } from '~/stores/productFilters'
import { storeApi } from '~/services/storeApi'
import type { Product, Category } from '~/types'

// Old sort values used by links on the site
const SORT_ALIASES: Record<string, string> = { featured: 'newest', bestselling: 'popular' }

export const useProducts = () => {
  const filtersStore = useProductFiltersStore()

  const products = ref<Product[]>([])
  const totalProducts = ref(0)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Categories managed in the dashboard (shared across pages)
  const categories = useState<Category[]>('catalog:categories', () => [])

  const fetchCategories = async () => {
    if (categories.value.length) return
    try {
      categories.value = await storeApi.getCategories()
    } catch (e) {
      console.error('Failed to load categories', e)
    }
  }

  const fetchProducts = async () => {
    isLoading.value = true
    error.value = null

    try {
      const { searchQuery, category, brands, colors, minPrice, maxPrice, rating, availability, sort, page } = filtersStore.filters
      const [result] = await Promise.all([
        storeApi.getProducts({
          search: searchQuery,
          category,
          brands,
          colors,
          minPrice,
          maxPrice,
          rating,
          inStock: availability,
          sort: sort ? SORT_ALIASES[sort] ?? sort : undefined,
          page: page || 1,
          perPage: 12
        }),
        fetchCategories()
      ])
      products.value = result.items
      totalProducts.value = result.total
    } catch (e: any) {
      error.value = storeApiError(e, 'حدث خطأ أثناء جلب المنتجات')
    } finally {
      isLoading.value = false
    }
  }

  const getCategoryBySlug = (slug: string) => {
    return categories.value.find(c => c.slug === slug) || null
  }

  return {
    products,
    totalProducts,
    isLoading,
    error,
    fetchProducts,
    fetchCategories,
    getCategoryBySlug,
    categories
  }
}

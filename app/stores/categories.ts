import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useMockData } from '~/composables/useMockData'
import type { Category } from '~/types'

export const useCategoriesStore = defineStore('categories', () => {
  const categories = ref<Category[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const fetchCategories = async () => {
    isLoading.value = true
    error.value = null
    try {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 600))
      
      const { mockData } = useMockData()
      categories.value = mockData.categories || []
    } catch (e: any) {
      error.value = 'تعذر تحميل الأقسام. يرجى المحاولة مرة أخرى.'
      console.error(e)
    } finally {
      isLoading.value = false
    }
  }

  const retry = () => {
    fetchCategories()
  }

  return {
    categories,
    isLoading,
    error,
    fetchCategories,
    retry
  }
})

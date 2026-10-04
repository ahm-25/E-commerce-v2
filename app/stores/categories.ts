import { defineStore } from 'pinia'
import { ref } from 'vue'
import { storeApi } from '~/services/storeApi'
import type { Category } from '~/types'

export const useCategoriesStore = defineStore('categories', () => {
  const categories = ref<Category[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const fetchCategories = async () => {
    isLoading.value = true
    error.value = null
    try {
      categories.value = await storeApi.getCategories()
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

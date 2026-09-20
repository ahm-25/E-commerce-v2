<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCategoriesStore } from '~/stores/categories'
import { Search } from 'lucide-vue-next'
import CategoryCard from './CategoryCard.vue'

const store = useCategoriesStore()
const searchQuery = ref('')

const filteredCategories = computed(() => {
  if (!searchQuery.value) return store.categories
  const q = searchQuery.value.toLowerCase()
  return store.categories.filter(c => c.name.toLowerCase().includes(q))
})

const showSearch = computed(() => store.categories.length > 6)
</script>

<template>
  <div class="py-12 md:py-16 font-arabic">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="flex flex-col sm:flex-row items-center justify-between gap-6 mb-10">
        <h2 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white transition-colors shrink-0">
          تصفح حسب القسم
        </h2>

        <!-- Local Search -->
        <div v-if="showSearch && !store.isLoading && !store.error" class="relative w-full sm:max-w-sm">
          <div class="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
            <Search class="h-5 w-5 text-gray-400" />
          </div>
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="ابحث عن قسم..." 
            class="block w-full pr-12 pl-4 py-3.5 border border-gray-200 dark:border-gray-700 rounded-full leading-5 bg-white dark:bg-[#1a1a1a] placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm transition-all shadow-sm"
          >
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="store.isLoading" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        <div 
          v-for="i in 8" 
          :key="i"
          class="flex flex-col bg-white dark:bg-[#1a1a1a] rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden animate-pulse"
        >
          <div class="w-full aspect-[4/3] bg-gray-200 dark:bg-gray-800"></div>
          <div class="p-5 flex items-center justify-between">
            <div class="h-5 bg-gray-200 dark:bg-gray-800 rounded w-1/2"></div>
            <div class="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800"></div>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="store.error" class="flex flex-col items-center justify-center py-16 text-center">
        <div class="text-red-500 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2 transition-colors">تعذر تحميل الأقسام</h3>
        <p class="text-gray-500 dark:text-gray-400 mb-6 transition-colors">{{ store.error }}</p>
        <button @click="store.retry" class="px-6 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">
          إعادة المحاولة
        </button>
      </div>

      <!-- Empty State -->
      <div v-else-if="store.categories.length === 0" class="flex flex-col items-center justify-center py-16 text-center">
        <div class="w-20 h-20 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6 text-gray-400 dark:text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2 transition-colors">لا توجد أقسام حاليًا</h3>
        <p class="text-gray-500 dark:text-gray-400 transition-colors">لم تتم إضافة أي أقسام إلى المتجر بعد.</p>
      </div>
      
      <!-- No Search Results -->
      <div v-else-if="filteredCategories.length === 0" class="flex flex-col items-center justify-center py-16 text-center">
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2 transition-colors">لا توجد نتائج</h3>
        <p class="text-gray-500 dark:text-gray-400 transition-colors">لم نتمكن من العثور على أقسام مطابقة لبحثك.</p>
        <button @click="searchQuery = ''" class="mt-4 text-blue-600 dark:text-blue-400 hover:underline font-medium">
          مسح البحث
        </button>
      </div>

      <!-- Grid -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        <CategoryCard 
          v-for="category in filteredCategories" 
          :key="category.id" 
          :category="category" 
        />
      </div>

    </div>
  </div>
</template>

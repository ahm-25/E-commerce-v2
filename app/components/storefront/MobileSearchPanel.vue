<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { Search, X, History, ArrowUpLeft, AlertCircle } from 'lucide-vue-next'
import { useSearchSuggestions } from '~/composables/useSearchSuggestions'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const {
  query,
  isLoading,
  hasError,
  suggestedProducts,
  suggestedCategories,
  recentSearches,
  onInput,
  submitSearch,
  removeRecentSearch
} = useSearchSuggestions()

const searchInputRef = ref<HTMLInputElement | null>(null)
const router = useRouter()

// Focus input when opened
onMounted(() => {
  if (props.isOpen) {
    nextTick(() => {
      searchInputRef.value?.focus()
    })
  }
})

const close = () => {
  query.value = ''
  emit('close')
}

const handleSearch = (term?: string) => {
  submitSearch(term)
  close()
}

const navigateTo = (path: string) => {
  router.push(path)
  close()
}
</script>

<template>
  <div 
    v-if="isOpen" 
    class="fixed inset-0 z-[100] bg-surface flex flex-col font-arabic animate-in fade-in slide-in-from-top-4 duration-200"
  >
    <!-- Header / Input -->
    <div class="flex items-center gap-3 p-4 border-b border-border bg-surface">
      <div class="relative flex-1 flex items-center">
        <input 
          ref="searchInputRef"
          v-model="query"
          type="text" 
          placeholder="ابحث عن منتج، قسم..." 
          class="w-full bg-background border border-border rounded-full pl-10 pr-10 py-2.5 text-sm font-medium text-text-primary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
          @input="onInput"
          @keydown.enter="handleSearch()"
          @keydown.esc="close"
        >
        <Search class="absolute right-3 w-5 h-5 text-text-secondary pointer-events-none" />
        <button 
          v-if="query" 
          @click="query = ''; onInput()"
          class="absolute left-3 p-1 text-text-secondary hover:text-red-500 rounded-full transition-colors"
        >
          <X class="w-4 h-4" />
        </button>
      </div>
      <button 
        @click="close" 
        class="text-sm font-bold text-text-secondary hover:text-text-primary transition-colors whitespace-nowrap"
      >
        إلغاء
      </button>
    </div>

    <!-- Scrollable Content -->
    <div class="flex-1 overflow-y-auto bg-surface">
      
      <!-- Loading State -->
      <div v-if="isLoading" class="p-8 flex justify-center">
        <svg class="animate-spin h-6 w-6 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>

      <!-- Error State -->
      <div v-else-if="hasError" class="p-8 text-center text-red-500 flex flex-col items-center">
        <AlertCircle class="w-8 h-8 mb-2 opacity-50" />
        <p class="text-sm font-medium">تعذر تحميل اقتراحات البحث</p>
      </div>

      <!-- Recent Searches -->
      <div v-else-if="!query && recentSearches.length > 0" class="p-4">
        <h3 class="text-xs font-bold text-text-secondary mb-3">عمليات البحث الأخيرة</h3>
        <div class="flex flex-wrap gap-2">
          <div 
            v-for="term in recentSearches" 
            :key="term"
            class="flex items-center gap-1 bg-background border border-border rounded-full px-3 py-1.5"
          >
            <button 
              @click="handleSearch(term)"
              class="flex items-center gap-1.5 text-sm font-medium hover:text-primary transition-colors"
            >
              <History class="w-3.5 h-3.5 text-text-secondary" />
              {{ term }}
            </button>
            <button 
              @click="removeRecentSearch(term)"
              class="ml-1 text-text-secondary hover:text-red-500 transition-colors p-0.5"
            >
              <X class="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <!-- Search Suggestions -->
      <div v-else-if="query && query.trim().length >= 2">
        
        <!-- Categories -->
        <div v-if="suggestedCategories.length > 0" class="border-b border-border/50 pb-2">
          <h3 class="text-xs font-bold text-text-secondary px-4 pt-4 pb-2">الأقسام</h3>
          <button 
            v-for="category in suggestedCategories" 
            :key="category.id"
            @click="navigateTo(`/products?category=${category.slug}`)"
            class="w-full flex items-center justify-between px-4 py-3 hover:bg-background/80 transition-colors text-right"
          >
            <span class="text-sm font-semibold text-text-primary">{{ category.name }}</span>
            <ArrowUpLeft class="w-4 h-4 text-text-secondary rtl:-scale-x-100" />
          </button>
        </div>

        <!-- Products -->
        <div v-if="suggestedProducts.length > 0">
          <h3 class="text-xs font-bold text-text-secondary px-4 pt-4 pb-2">المنتجات</h3>
          <button 
            v-for="product in suggestedProducts" 
            :key="product.id"
            @click="navigateTo(`/products/${product.slug}`)"
            class="w-full flex items-center gap-3 px-4 py-3 hover:bg-background/80 transition-colors text-right"
          >
            <img :src="product.images[0]?.url" :alt="product.name" class="w-12 h-12 object-cover rounded-lg border border-border">
            <div class="flex-1 min-w-0">
              <p class="text-sm font-semibold text-text-primary truncate">{{ product.name }}</p>
              <p class="text-xs text-text-secondary truncate">{{ product.category?.name || product.brand }}</p>
            </div>
            <div class="text-left flex-shrink-0">
              <p class="text-sm font-bold text-primary" dir="ltr">{{ product.price }} {{ product.currency }}</p>
            </div>
          </button>
        </div>

        <!-- Empty State / See All -->
        <div class="p-4">
          <button 
            v-if="suggestedProducts.length > 0 || suggestedCategories.length > 0"
            @click="handleSearch()"
            class="w-full py-3 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
          >
            عرض جميع النتائج لـ "{{ query }}"
          </button>
          <div v-else class="text-center py-8">
            <Search class="w-10 h-10 mx-auto mb-3 text-border" />
            <p class="text-sm font-bold text-text-primary mb-1">لا توجد نتائج مطابقة</p>
            <button 
              @click="handleSearch()"
              class="text-sm text-primary hover:underline font-medium mt-2"
            >
              عرض نتائج البحث
            </button>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

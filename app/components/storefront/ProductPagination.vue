<script setup lang="ts">
import { ChevronRight, ChevronLeft } from 'lucide-vue-next'
import { computed } from 'vue'
import { useProductFiltersStore } from '~/stores/productFilters'

const props = defineProps<{
  totalItems: number
  itemsPerPage: number
}>()

const filtersStore = useProductFiltersStore()

const totalPages = computed(() => Math.ceil(props.totalItems / props.itemsPerPage))
const currentPage = computed(() => filtersStore.filters.page || 1)

const pages = computed(() => {
  const p = []
  for (let i = 1; i <= totalPages.value; i++) {
    p.push(i)
  }
  return p
})

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    filtersStore.setFilter('page', page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
</script>

<template>
  <div v-if="totalPages > 1" class="flex justify-center items-center mt-12 mb-8">
    <nav class="flex items-center gap-2" aria-label="Pagination">
      <!-- Previous Button (RTL aware) -->
      <button 
        @click="goToPage(currentPage - 1)"
        :disabled="currentPage === 1"
        class="w-10 h-10 flex items-center justify-center rounded-full border border-border text-text-secondary hover:border-primary hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="الصفحة السابقة"
      >
        <ChevronRight class="w-5 h-5" />
      </button>

      <!-- Page Numbers -->
      <div class="flex items-center gap-1">
        <button
          v-for="page in pages"
          :key="page"
          @click="goToPage(page)"
          class="w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold transition-all"
          :class="currentPage === page ? 'bg-primary text-surface shadow-md' : 'text-text-secondary hover:bg-surface hover:text-primary'"
          :aria-current="currentPage === page ? 'page' : undefined"
        >
          {{ page }}
        </button>
      </div>

      <!-- Next Button (RTL aware) -->
      <button 
        @click="goToPage(currentPage + 1)"
        :disabled="currentPage === totalPages"
        class="w-10 h-10 flex items-center justify-center rounded-full border border-border text-text-secondary hover:border-primary hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="الصفحة التالية"
      >
        <ChevronLeft class="w-5 h-5" />
      </button>
    </nav>
  </div>
</template>

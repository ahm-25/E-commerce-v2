<script setup lang="ts">
import { LayoutGrid, List, SlidersHorizontal, ChevronDown } from 'lucide-vue-next'
import { useProductFiltersStore } from '~/stores/productFilters'
import { ref } from 'vue'

defineProps<{
  totalProducts: number
}>()

const filtersStore = useProductFiltersStore()
const isSortOpen = ref(false)

const sortOptions = [
  { label: 'الأكثر مبيعاً', value: 'popular' },
  { label: 'الأحدث', value: 'newest' },
  { label: 'السعر: من الأقل للأعلى', value: 'price-asc' },
  { label: 'السعر: من الأعلى للأقل', value: 'price-desc' },
  { label: 'الأعلى تقييماً', value: 'rating-desc' },
]

const currentSortLabel = computed(() => {
  return sortOptions.find(opt => opt.value === (filtersStore.filters.sort || 'popular'))?.label || 'ترتيب حسب'
})

const selectSort = (value: string) => {
  filtersStore.setFilter('sort', value)
  isSortOpen.value = false
}

// Close dropdown when clicking outside (simple implementation, ideally use a directive like v-click-outside)
const closeDropdown = () => {
  isSortOpen.value = false
}
</script>

<template>
  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
    <!-- Mobile Filter Button & Count -->
    <div class="flex items-center justify-between w-full sm:w-auto">
      <button 
        @click="filtersStore.toggleMobileFilters()"
        class="lg:hidden flex items-center gap-2 px-4 py-2 bg-surface border border-border rounded-lg text-text-primary font-medium shadow-sm hover:border-primary transition-colors"
      >
        <SlidersHorizontal class="w-4 h-4" />
        الفلاتر
        <span v-if="filtersStore.activeFiltersCount" class="flex items-center justify-center w-5 h-5 bg-accent text-white text-xs rounded-full">
          {{ filtersStore.activeFiltersCount }}
        </span>
      </button>

      <div class="text-text-secondary text-sm font-medium hidden sm:block">
        <span class="text-text-primary font-bold">{{ totalProducts }}</span> منتج
      </div>
    </div>

    <!-- Right Side: View Mode & Sort -->
    <div class="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
      <div class="text-text-secondary text-sm font-medium sm:hidden block">
        <span class="text-text-primary font-bold">{{ totalProducts }}</span> منتج
      </div>

      <div class="flex items-center gap-4">
        <!-- View Mode Toggle -->
        <div class="hidden md:flex items-center bg-surface border border-border rounded-lg p-1">
          <button 
            @click="filtersStore.setViewMode('grid')"
            class="p-1.5 rounded-md transition-colors"
            :class="filtersStore.viewMode === 'grid' ? 'bg-background text-primary shadow-sm' : 'text-text-secondary hover:text-text-primary'"
            aria-label="Grid View"
          >
            <LayoutGrid class="w-4 h-4" />
          </button>
          <button 
            @click="filtersStore.setViewMode('list')"
            class="p-1.5 rounded-md transition-colors"
            :class="filtersStore.viewMode === 'list' ? 'bg-background text-primary shadow-sm' : 'text-text-secondary hover:text-text-primary'"
            aria-label="List View"
          >
            <List class="w-4 h-4" />
          </button>
        </div>

        <!-- Sort Dropdown -->
        <div class="relative min-w-[200px]">
          <!-- Dropdown Overlay -->
          <div v-if="isSortOpen" @click="isSortOpen = false" class="fixed inset-0 z-10"></div>
          
          <button 
            @click="isSortOpen = !isSortOpen"
            class="relative z-20 flex items-center justify-between w-full px-4 py-2.5 bg-surface border border-border rounded-lg text-sm font-medium text-text-primary hover:border-primary transition-colors focus:outline-none"
          >
            <div class="flex flex-col items-start gap-0.5">
              <span class="text-[10px] text-text-secondary uppercase tracking-wider">ترتيب حسب</span>
              <span>{{ currentSortLabel }}</span>
            </div>
            <ChevronDown class="w-4 h-4 text-text-secondary transition-transform" :class="{ 'rotate-180': isSortOpen }" />
          </button>

          <!-- Dropdown Menu -->
          <div 
            v-if="isSortOpen"
            class="absolute top-full right-0 mt-2 w-full bg-surface border border-border rounded-xl shadow-premium dark:shadow-premium-dark z-30 py-2 overflow-hidden"
          >
            <button
              v-for="option in sortOptions"
              :key="option.value"
              @click="selectSort(option.value)"
              class="w-full text-right px-4 py-2.5 text-sm transition-colors hover:bg-background"
              :class="filtersStore.filters.sort === option.value ? 'text-primary font-bold bg-background/50' : 'text-text-primary'"
            >
              {{ option.label }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

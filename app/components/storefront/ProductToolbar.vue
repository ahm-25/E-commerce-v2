<script setup lang="ts">
import { LayoutGrid, List, SlidersHorizontal, ChevronDown } from 'lucide-vue-next'
import { useProductFiltersStore } from '~/stores/productFilters'
import { ref, computed } from 'vue'

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
  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 bg-surface/50 p-3 rounded-[2rem] border border-border/40 shadow-sm">
    <!-- Mobile Filter Button & Count -->
    <div class="flex items-center justify-between w-full sm:w-auto px-2">
      <button 
        @click="filtersStore.toggleMobileFilters()"
        class="lg:hidden flex items-center gap-2 px-5 py-2.5 bg-white text-gray-900 border border-gray-200 rounded-full font-bold shadow-[0_2px_10px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_15px_rgba(0,0,0,0.1)] transition-all active:scale-95"
      >
        <SlidersHorizontal class="w-4 h-4" />
        الفلاتر
        <span v-if="filtersStore.activeFiltersCount" class="flex items-center justify-center w-5 h-5 bg-accent text-white text-xs rounded-full">
          {{ filtersStore.activeFiltersCount }}
        </span>
      </button>

      <div class="text-text-secondary text-sm font-medium hidden sm:flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">
        <span class="text-text-primary font-black text-lg">{{ totalProducts }}</span> منتج
      </div>
    </div>

    <!-- Right Side: View Mode & Sort -->
    <div class="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto px-2">
      <div class="text-text-secondary text-sm font-medium sm:hidden flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">
        <span class="text-text-primary font-black">{{ totalProducts }}</span> منتج
      </div>

      <div class="flex items-center gap-4">
        <!-- View Mode Toggle -->
        <div class="hidden md:flex items-center bg-white border border-gray-100 rounded-full p-1.5 shadow-sm">
          <button 
            @click="filtersStore.setViewMode('grid')"
            class="p-2 rounded-full transition-all duration-300 flex items-center justify-center"
            :class="filtersStore.viewMode === 'grid' ? 'bg-primary text-white shadow-md' : 'text-text-secondary hover:text-text-primary hover:bg-gray-50'"
            aria-label="Grid View"
          >
            <LayoutGrid class="w-4 h-4" />
          </button>
          <button 
            @click="filtersStore.setViewMode('list')"
            class="p-2 rounded-full transition-all duration-300 flex items-center justify-center"
            :class="filtersStore.viewMode === 'list' ? 'bg-primary text-white shadow-md' : 'text-text-secondary hover:text-text-primary hover:bg-gray-50'"
            aria-label="List View"
          >
            <List class="w-4 h-4" />
          </button>
        </div>

        <!-- Sort Dropdown -->
        <div class="relative min-w-[220px]">
          <!-- Dropdown Overlay -->
          <div v-if="isSortOpen" @click="isSortOpen = false" class="fixed inset-0 z-10"></div>
          
          <button 
            @click="isSortOpen = !isSortOpen"
            class="relative z-20 flex items-center justify-between w-full px-5 py-3 bg-white border border-gray-200 rounded-full text-sm font-medium text-text-primary hover:border-gray-300 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <div class="flex items-center gap-2">
              <span class="text-[11px] text-text-secondary font-bold uppercase tracking-wider bg-gray-100 px-2 py-0.5 rounded-full">ترتيب</span>
              <span class="font-bold">{{ currentSortLabel }}</span>
            </div>
            <ChevronDown class="w-4 h-4 text-text-secondary transition-transform" :class="{ 'rotate-180': isSortOpen }" />
          </button>

          <!-- Dropdown Menu -->
          <transition 
            enter-active-class="transition ease-out duration-200" 
            enter-from-class="opacity-0 translate-y-1" 
            enter-to-class="opacity-100 translate-y-0" 
            leave-active-class="transition ease-in duration-150" 
            leave-from-class="opacity-100 translate-y-0" 
            leave-to-class="opacity-0 translate-y-1"
          >
            <div 
              v-if="isSortOpen"
              class="absolute top-full mt-2 w-full bg-white border border-gray-100 rounded-[1.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.08)] z-30 p-2 overflow-hidden"
            >
              <button
                v-for="option in sortOptions"
                :key="option.value"
                @click="selectSort(option.value)"
                class="w-full text-right px-4 py-3 text-sm transition-all duration-200 rounded-xl flex items-center justify-between group"
                :class="filtersStore.filters.sort === option.value ? 'text-primary font-bold bg-primary/5' : 'text-text-secondary hover:bg-gray-50 hover:text-text-primary font-medium'"
              >
                {{ option.label }}
                <div v-if="filtersStore.filters.sort === option.value" class="w-2 h-2 rounded-full bg-primary"></div>
              </button>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

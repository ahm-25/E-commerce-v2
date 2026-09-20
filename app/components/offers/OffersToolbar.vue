<script setup lang="ts">
import { LayoutGrid, List, SlidersHorizontal } from 'lucide-vue-next'

const props = defineProps<{
  totalProducts: number
  currentSort: string
  viewMode: 'grid' | 'list'
}>()

const emit = defineEmits<{
  (e: 'update:sort', value: string): void
  (e: 'update:viewMode', value: 'grid' | 'list'): void
  (e: 'toggleFilters'): void
}>()

const sortOptions = [
  { value: 'discount-desc', label: 'الأكثر خصمًا' },
  { value: 'newest', label: 'الأحدث' },
  { value: 'price-asc', label: 'السعر: من الأقل للأعلى' },
  { value: 'price-desc', label: 'السعر: من الأعلى للأقل' }
]
</script>

<template>
  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-b border-gray-100 mb-6 bg-white sticky top-[72px] z-30 font-arabic">
    <!-- Results Count & Mobile Filter Toggle -->
    <div class="flex items-center justify-between sm:justify-start gap-4">
      <p class="text-sm text-gray-500 font-medium">
        <span class="text-gray-900 font-bold">{{ totalProducts }}</span> منتج ضمن العروض
      </p>
      
      <button 
        @click="emit('toggleFilters')"
        class="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
      >
        <SlidersHorizontal class="w-4 h-4" />
        تصفية
      </button>
    </div>

    <div class="flex items-center justify-between sm:justify-end gap-4 sm:gap-6">
      <!-- Sort -->
      <div class="flex items-center gap-2">
        <label for="sort" class="text-sm text-gray-500 hidden sm:block">الترتيب:</label>
        <select 
          id="sort"
          :value="currentSort"
          @change="emit('update:sort', ($event.target as HTMLSelectElement).value)"
          class="text-sm font-medium border-0 bg-transparent py-1.5 pl-8 pr-2 text-gray-900 focus:ring-0 cursor-pointer appearance-none hover:text-gray-600 transition-colors"
          style="background-image: url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 fill=%22none%22 viewBox=%220 0 20 20%22%3E%3Cpath stroke=%22%236b7280%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22 stroke-width=%221.5%22 d=%22m6 8 4 4 4-4%22/%3E%3C/svg%3E'); background-position: left 0.5rem center; background-repeat: no-repeat; background-size: 1.5em 1.5em;"
        >
          <option v-for="option in sortOptions" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
      </div>

      <!-- View Mode Toggle -->
      <div class="hidden md:flex items-center gap-1 border border-gray-200 rounded-lg p-1">
        <button 
          @click="emit('update:viewMode', 'grid')"
          class="p-1.5 rounded-md transition-colors"
          :class="viewMode === 'grid' ? 'bg-gray-100 text-gray-900' : 'text-gray-400 hover:text-gray-600'"
          aria-label="Grid view"
        >
          <LayoutGrid class="w-4 h-4" />
        </button>
        <button 
          @click="emit('update:viewMode', 'list')"
          class="p-1.5 rounded-md transition-colors"
          :class="viewMode === 'list' ? 'bg-gray-100 text-gray-900' : 'text-gray-400 hover:text-gray-600'"
          aria-label="List view"
        >
          <List class="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { X, Check, SlidersHorizontal, ChevronDown, ChevronUp } from 'lucide-vue-next'
import { useProductFiltersStore } from '~/stores/productFilters'
import { useRoute } from 'vue-router'

const props = defineProps<{
  categories: { id: string, name: string, slug: string }[]
}>()

const route = useRoute()
const filtersStore = useProductFiltersStore()

const brandsList = ['Coach', 'Michael Kors', 'Charles & Keith', 'Guess', 'Other']
const colorsList = [
  { name: 'أسود', value: '#000000' },
  { name: 'بيج', value: '#F5F5DC' },
  { name: 'بني', value: '#8B4513' },
  { name: 'أزرق', value: '#4682B4' },
  { name: 'وردي', value: '#FFC0CB' },
]

// Expand/Collapse state for filter sections
const expanded = ref({
  category: true,
  price: true,
  rating: true,
  brand: true,
  color: true
})

const toggleSection = (section: keyof typeof expanded.value) => {
  expanded.value[section] = !expanded.value[section]
}
</script>

<template>
  <div>
    <!-- Desktop Sidebar (Hidden on mobile) -->
    <aside class="hidden lg:block w-64 flex-shrink-0">
      <div class="sticky top-24 bg-surface rounded-2xl p-6 shadow-premium dark:shadow-premium-dark border border-border">
        
        <div class="flex items-center justify-between mb-6 pb-4 border-b border-border">
          <div class="flex items-center gap-2 text-primary font-bold text-lg">
            <SlidersHorizontal class="w-5 h-5" />
            <h2>تصفية النتائج</h2>
          </div>
          <button 
            v-if="filtersStore.activeFiltersCount > 0"
            @click="filtersStore.clearFilters()"
            class="text-sm text-text-secondary hover:text-accent transition-colors"
          >
            مسح الكل
          </button>
        </div>

        <div class="space-y-6">
          
          <!-- Category Filter -->
          <div v-if="!route.params.slug" class="filter-section">
            <button @click="toggleSection('category')" class="flex items-center justify-between w-full font-semibold text-text-primary mb-3">
              الفئة
              <ChevronUp v-if="expanded.category" class="w-4 h-4 text-text-secondary" />
              <ChevronDown v-else class="w-4 h-4 text-text-secondary" />
            </button>
            <div v-show="expanded.category" class="space-y-2">
              <label 
                v-for="cat in categories" 
                :key="cat.id" 
                class="flex items-center gap-3 cursor-pointer group"
              >
                <div class="relative flex items-center justify-center w-5 h-5 rounded border border-border group-hover:border-primary transition-colors" :class="{'bg-primary border-primary': filtersStore.filters.category === cat.slug}">
                  <Check v-if="filtersStore.filters.category === cat.slug" class="w-3.5 h-3.5 text-white" />
                  <input 
                    type="radio" 
                    :name="'category'" 
                    :value="cat.slug" 
                    class="sr-only"
                    @change="filtersStore.setFilter('category', cat.slug)"
                    :checked="filtersStore.filters.category === cat.slug"
                  >
                </div>
                <span class="text-sm text-text-secondary group-hover:text-text-primary transition-colors">{{ cat.name }}</span>
              </label>
            </div>
          </div>

          <!-- Price Filter -->
          <div class="filter-section">
            <button @click="toggleSection('price')" class="flex items-center justify-between w-full font-semibold text-text-primary mb-3">
              السعر
              <ChevronUp v-if="expanded.price" class="w-4 h-4 text-text-secondary" />
              <ChevronDown v-else class="w-4 h-4 text-text-secondary" />
            </button>
            <div v-show="expanded.price" class="space-y-4 pt-2">
              <!-- Simple Min/Max Inputs for now, can be replaced with a Range Slider library -->
              <div class="flex items-center gap-2">
                <input 
                  type="number" 
                  v-model.number="filtersStore.filters.minPrice" 
                  placeholder="من" 
                  class="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-primary transition-colors"
                >
                <span class="text-text-secondary">-</span>
                <input 
                  type="number" 
                  v-model.number="filtersStore.filters.maxPrice" 
                  placeholder="إلى" 
                  class="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-primary transition-colors"
                >
              </div>
            </div>
          </div>

          <!-- Rating Filter -->
          <div class="filter-section">
            <button @click="toggleSection('rating')" class="flex items-center justify-between w-full font-semibold text-text-primary mb-3">
              التقييم
              <ChevronUp v-if="expanded.rating" class="w-4 h-4 text-text-secondary" />
              <ChevronDown v-else class="w-4 h-4 text-text-secondary" />
            </button>
            <div v-show="expanded.rating" class="space-y-2">
              <label 
                v-for="rating in [5, 4, 3]" 
                :key="rating" 
                class="flex items-center gap-3 cursor-pointer group"
              >
                <div class="relative flex items-center justify-center w-5 h-5 rounded border border-border group-hover:border-primary transition-colors" :class="{'bg-primary border-primary': filtersStore.filters.rating === rating}">
                  <Check v-if="filtersStore.filters.rating === rating" class="w-3.5 h-3.5 text-white" />
                  <input 
                    type="radio" 
                    name="rating" 
                    :value="rating" 
                    class="sr-only"
                    @change="filtersStore.setFilter('rating', rating)"
                    :checked="filtersStore.filters.rating === rating"
                  >
                </div>
                <div class="flex items-center text-amber-400 text-sm">
                  <span v-if="rating === 5">5 نجوم</span>
                  <span v-else>{{ rating }} نجوم فأكثر</span>
                </div>
              </label>
            </div>
          </div>

          <!-- Brand Filter -->
          <div class="filter-section">
            <button @click="toggleSection('brand')" class="flex items-center justify-between w-full font-semibold text-text-primary mb-3">
              الماركات
              <ChevronUp v-if="expanded.brand" class="w-4 h-4 text-text-secondary" />
              <ChevronDown v-else class="w-4 h-4 text-text-secondary" />
            </button>
            <div v-show="expanded.brand" class="space-y-2">
              <label 
                v-for="brand in brandsList" 
                :key="brand" 
                class="flex items-center justify-between cursor-pointer group"
              >
                <span class="text-sm text-text-secondary group-hover:text-text-primary transition-colors">{{ brand }}</span>
                <div class="relative flex items-center justify-center w-5 h-5 rounded border border-border group-hover:border-primary transition-colors" :class="{'bg-primary border-primary': filtersStore.filters.brands?.includes(brand)}">
                  <Check v-if="filtersStore.filters.brands?.includes(brand)" class="w-3.5 h-3.5 text-white" />
                  <input 
                    type="checkbox" 
                    :value="brand" 
                    class="sr-only"
                    @change="filtersStore.toggleArrayFilter('brands', brand)"
                    :checked="filtersStore.filters.brands?.includes(brand)"
                  >
                </div>
              </label>
            </div>
          </div>

          <!-- Color Filter -->
          <div class="filter-section">
            <button @click="toggleSection('color')" class="flex items-center justify-between w-full font-semibold text-text-primary mb-3">
              اللون
              <ChevronUp v-if="expanded.color" class="w-4 h-4 text-text-secondary" />
              <ChevronDown v-else class="w-4 h-4 text-text-secondary" />
            </button>
            <div v-show="expanded.color" class="flex flex-wrap gap-3">
              <button
                v-for="color in colorsList"
                :key="color.value"
                @click="filtersStore.toggleArrayFilter('colors', color.value)"
                class="relative w-8 h-8 rounded-full border-2 transition-all"
                :class="filtersStore.filters.colors?.includes(color.value) ? 'border-primary scale-110' : 'border-transparent hover:scale-110'"
                :style="{ backgroundColor: color.value }"
                :title="color.name"
                :aria-label="color.name"
              >
                <!-- Inner border for light colors to be visible on white bg -->
                <div class="absolute inset-0 rounded-full border border-black/10"></div>
                <!-- Check icon for selected state, adjusting color based on bg darkness -->
                <Check 
                  v-if="filtersStore.filters.colors?.includes(color.value)" 
                  class="absolute inset-0 m-auto w-4 h-4 drop-shadow-md"
                  :class="color.value === '#F5F5DC' ? 'text-gray-800' : 'text-white'"
                />
              </button>
            </div>
          </div>

        </div>
      </div>
    </aside>

    <!-- Mobile Drawer -->
    <div 
      v-if="filtersStore.isMobileFiltersOpen"
      class="fixed inset-0 z-50 lg:hidden"
    >
      <!-- Backdrop -->
      <div 
        class="absolute inset-0 bg-black/50 backdrop-blur-sm"
        @click="filtersStore.toggleMobileFilters()"
      ></div>
      
      <!-- Drawer Content -->
      <div 
        class="absolute top-0 bottom-0 right-0 w-[85%] max-w-sm bg-surface shadow-2xl flex flex-col h-full transform transition-transform"
      >
        <div class="p-4 flex items-center justify-between border-b border-border bg-surface">
          <div class="flex items-center gap-2 font-bold text-lg text-primary">
            <SlidersHorizontal class="w-5 h-5" />
            <h2>تصفية النتائج</h2>
          </div>
          <button 
            @click="filtersStore.toggleMobileFilters()"
            class="p-2 text-text-secondary hover:text-primary transition-colors bg-background rounded-full"
          >
            <X class="w-5 h-5" />
          </button>
        </div>
        
        <div class="flex-1 overflow-y-auto p-6">
          <!-- Same filters content as desktop -->
          <!-- We could extract the filters content to a separate component to avoid duplication, but for this task, copying is fine -->
          <div class="space-y-8">
            
            <!-- Category Filter (Mobile) -->
            <div v-if="!route.params.slug" class="filter-section">
              <h3 class="font-semibold text-text-primary mb-4">الفئة</h3>
              <div class="space-y-3">
                <label 
                  v-for="cat in categories" 
                  :key="cat.id" 
                  class="flex items-center gap-3 cursor-pointer"
                >
                  <div class="relative flex items-center justify-center w-5 h-5 rounded border border-border" :class="{'bg-primary border-primary': filtersStore.filters.category === cat.slug}">
                    <Check v-if="filtersStore.filters.category === cat.slug" class="w-3.5 h-3.5 text-white" />
                    <input 
                      type="radio" 
                      :name="'mobile-category'" 
                      :value="cat.slug" 
                      class="sr-only"
                      @change="filtersStore.setFilter('category', cat.slug)"
                      :checked="filtersStore.filters.category === cat.slug"
                    >
                  </div>
                  <span class="text-text-secondary">{{ cat.name }}</span>
                </label>
              </div>
            </div>

            <!-- Price Filter (Mobile) -->
            <div class="filter-section">
              <h3 class="font-semibold text-text-primary mb-4">السعر</h3>
              <div class="flex items-center gap-2">
                <input 
                  type="number" 
                  v-model.number="filtersStore.filters.minPrice" 
                  placeholder="من" 
                  class="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-primary"
                >
                <span class="text-text-secondary">-</span>
                <input 
                  type="number" 
                  v-model.number="filtersStore.filters.maxPrice" 
                  placeholder="إلى" 
                  class="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-primary"
                >
              </div>
            </div>

            <!-- Brand Filter (Mobile) -->
            <div class="filter-section">
              <h3 class="font-semibold text-text-primary mb-4">الماركات</h3>
              <div class="space-y-3">
                <label 
                  v-for="brand in brandsList" 
                  :key="brand" 
                  class="flex items-center justify-between cursor-pointer"
                >
                  <span class="text-text-secondary">{{ brand }}</span>
                  <div class="relative flex items-center justify-center w-5 h-5 rounded border border-border" :class="{'bg-primary border-primary': filtersStore.filters.brands?.includes(brand)}">
                    <Check v-if="filtersStore.filters.brands?.includes(brand)" class="w-3.5 h-3.5 text-white" />
                    <input 
                      type="checkbox" 
                      :value="brand" 
                      class="sr-only"
                      @change="filtersStore.toggleArrayFilter('brands', brand)"
                      :checked="filtersStore.filters.brands?.includes(brand)"
                    >
                  </div>
                </label>
              </div>
            </div>

             <!-- Color Filter (Mobile) -->
             <div class="filter-section">
              <h3 class="font-semibold text-text-primary mb-4">اللون</h3>
              <div class="flex flex-wrap gap-4">
                <button
                  v-for="color in colorsList"
                  :key="color.value"
                  @click="filtersStore.toggleArrayFilter('colors', color.value)"
                  class="relative w-10 h-10 rounded-full border-2 transition-all"
                  :class="filtersStore.filters.colors?.includes(color.value) ? 'border-primary scale-110' : 'border-transparent'"
                  :style="{ backgroundColor: color.value }"
                >
                  <div class="absolute inset-0 rounded-full border border-black/10"></div>
                  <Check 
                    v-if="filtersStore.filters.colors?.includes(color.value)" 
                    class="absolute inset-0 m-auto w-5 h-5 drop-shadow-md"
                    :class="color.value === '#F5F5DC' ? 'text-gray-800' : 'text-white'"
                  />
                </button>
              </div>
            </div>

          </div>
        </div>

        <div class="p-4 border-t border-border bg-surface flex gap-3">
          <button 
            @click="filtersStore.toggleMobileFilters()"
            class="flex-1 py-3 bg-primary text-surface rounded-xl font-bold hover:bg-primary-hover transition-colors"
          >
            عرض النتائج
          </button>
          <button 
            v-if="filtersStore.activeFiltersCount > 0"
            @click="filtersStore.clearFilters()"
            class="px-4 py-3 bg-background border border-border text-text-secondary rounded-xl font-bold hover:bg-border transition-colors"
          >
            مسح
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

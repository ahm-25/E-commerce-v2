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
    <aside class="hidden lg:block w-72 flex-shrink-0">
      <div class="sticky top-28 bg-white rounded-[2rem] p-7 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
        
        <div class="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
          <div class="flex items-center gap-2.5 text-gray-900 font-black text-xl">
            <SlidersHorizontal class="w-5 h-5" />
            <h2>تصفية النتائج</h2>
          </div>
          <button 
            v-if="filtersStore.activeFiltersCount > 0"
            @click="filtersStore.clearFilters()"
            class="text-sm text-red-500 font-bold hover:text-red-600 transition-colors bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-full"
          >
            مسح الكل
          </button>
        </div>

        <div class="space-y-8">
          
          <!-- Category Filter -->
          <div v-if="!route.params.slug" class="filter-section">
            <button @click="toggleSection('category')" class="flex items-center justify-between w-full font-bold text-gray-900 mb-4 group">
              <span class="text-lg">الفئة</span>
              <div class="w-6 h-6 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                <ChevronUp v-if="expanded.category" class="w-4 h-4 text-gray-500" />
                <ChevronDown v-else class="w-4 h-4 text-gray-500" />
              </div>
            </button>
            <transition
              enter-active-class="transition-all duration-300 ease-out"
              enter-from-class="opacity-0 -translate-y-2 max-h-0"
              enter-to-class="opacity-100 translate-y-0 max-h-[500px]"
              leave-active-class="transition-all duration-200 ease-in"
              leave-from-class="opacity-100 translate-y-0 max-h-[500px]"
              leave-to-class="opacity-0 -translate-y-2 max-h-0"
            >
              <div v-show="expanded.category" class="space-y-1 overflow-hidden">
                <label 
                  v-for="cat in categories" 
                  :key="cat.id" 
                  class="flex items-center gap-3 cursor-pointer group p-2 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div class="relative flex items-center justify-center w-5 h-5 rounded-[6px] border-2 border-gray-200 group-hover:border-primary transition-colors" :class="{'bg-primary border-primary': filtersStore.filters.category === cat.slug}">
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
                  <span class="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors" :class="{'text-gray-900 font-bold': filtersStore.filters.category === cat.slug}">{{ cat.name }}</span>
                </label>
              </div>
            </transition>
          </div>

          <!-- Price Filter -->
          <div class="filter-section">
            <button @click="toggleSection('price')" class="flex items-center justify-between w-full font-bold text-gray-900 mb-4 group">
              <span class="text-lg">السعر</span>
              <div class="w-6 h-6 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                <ChevronUp v-if="expanded.price" class="w-4 h-4 text-gray-500" />
                <ChevronDown v-else class="w-4 h-4 text-gray-500" />
              </div>
            </button>
            <transition
              enter-active-class="transition-all duration-300 ease-out"
              enter-from-class="opacity-0 -translate-y-2 max-h-0"
              enter-to-class="opacity-100 translate-y-0 max-h-[200px]"
              leave-active-class="transition-all duration-200 ease-in"
              leave-from-class="opacity-100 translate-y-0 max-h-[200px]"
              leave-to-class="opacity-0 -translate-y-2 max-h-0"
            >
              <div v-show="expanded.price" class="pt-2 pb-2 overflow-hidden">
                <div class="flex items-center gap-3">
                  <div class="relative w-full">
                    <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-bold">ج.م</span>
                    <input 
                      type="number" 
                      v-model.number="filtersStore.filters.minPrice" 
                      placeholder="من" 
                      class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:font-normal"
                    >
                  </div>
                  <div class="w-4 h-[2px] bg-gray-300 rounded-full shrink-0"></div>
                  <div class="relative w-full">
                    <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-bold">ج.م</span>
                    <input 
                      type="number" 
                      v-model.number="filtersStore.filters.maxPrice" 
                      placeholder="إلى" 
                      class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:font-normal"
                    >
                  </div>
                </div>
              </div>
            </transition>
          </div>

          <!-- Rating Filter -->
          <div class="filter-section">
            <button @click="toggleSection('rating')" class="flex items-center justify-between w-full font-bold text-gray-900 mb-4 group">
              <span class="text-lg">التقييم</span>
              <div class="w-6 h-6 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                <ChevronUp v-if="expanded.rating" class="w-4 h-4 text-gray-500" />
                <ChevronDown v-else class="w-4 h-4 text-gray-500" />
              </div>
            </button>
            <transition
              enter-active-class="transition-all duration-300 ease-out"
              enter-from-class="opacity-0 -translate-y-2 max-h-0"
              enter-to-class="opacity-100 translate-y-0 max-h-[300px]"
              leave-active-class="transition-all duration-200 ease-in"
              leave-from-class="opacity-100 translate-y-0 max-h-[300px]"
              leave-to-class="opacity-0 -translate-y-2 max-h-0"
            >
              <div v-show="expanded.rating" class="space-y-1 overflow-hidden">
                <label 
                  v-for="rating in [5, 4, 3]" 
                  :key="rating" 
                  class="flex items-center gap-3 cursor-pointer group p-2 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div class="relative flex items-center justify-center w-5 h-5 rounded-[6px] border-2 border-gray-200 group-hover:border-primary transition-colors" :class="{'bg-primary border-primary': filtersStore.filters.rating === rating}">
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
                  <div class="flex items-center text-amber-400 text-sm gap-1">
                    <span v-if="rating === 5" class="font-bold text-gray-600 group-hover:text-gray-900 transition-colors mr-1">5 نجوم</span>
                    <span v-else class="font-bold text-gray-600 group-hover:text-gray-900 transition-colors mr-1">{{ rating }} نجوم فأكثر</span>
                  </div>
                </label>
              </div>
            </transition>
          </div>

          <!-- Brand Filter -->
          <div class="filter-section">
            <button @click="toggleSection('brand')" class="flex items-center justify-between w-full font-bold text-gray-900 mb-4 group">
              <span class="text-lg">الماركات</span>
              <div class="w-6 h-6 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                <ChevronUp v-if="expanded.brand" class="w-4 h-4 text-gray-500" />
                <ChevronDown v-else class="w-4 h-4 text-gray-500" />
              </div>
            </button>
            <transition
              enter-active-class="transition-all duration-300 ease-out"
              enter-from-class="opacity-0 -translate-y-2 max-h-0"
              enter-to-class="opacity-100 translate-y-0 max-h-[400px]"
              leave-active-class="transition-all duration-200 ease-in"
              leave-from-class="opacity-100 translate-y-0 max-h-[400px]"
              leave-to-class="opacity-0 -translate-y-2 max-h-0"
            >
              <div v-show="expanded.brand" class="space-y-1 overflow-hidden">
                <label 
                  v-for="brand in brandsList" 
                  :key="brand" 
                  class="flex items-center justify-between cursor-pointer group p-2 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <span class="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors" :class="{'text-gray-900 font-bold': filtersStore.filters.brands?.includes(brand)}">{{ brand }}</span>
                  <div class="relative flex items-center justify-center w-5 h-5 rounded-[6px] border-2 border-gray-200 group-hover:border-primary transition-colors shadow-sm" :class="{'bg-primary border-primary': filtersStore.filters.brands?.includes(brand)}">
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
            </transition>
          </div>

          <!-- Color Filter -->
          <div class="filter-section">
            <button @click="toggleSection('color')" class="flex items-center justify-between w-full font-bold text-gray-900 mb-4 group">
              <span class="text-lg">اللون</span>
              <div class="w-6 h-6 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                <ChevronUp v-if="expanded.color" class="w-4 h-4 text-gray-500" />
                <ChevronDown v-else class="w-4 h-4 text-gray-500" />
              </div>
            </button>
            <transition
              enter-active-class="transition-all duration-300 ease-out"
              enter-from-class="opacity-0 -translate-y-2 max-h-0"
              enter-to-class="opacity-100 translate-y-0 max-h-[200px]"
              leave-active-class="transition-all duration-200 ease-in"
              leave-from-class="opacity-100 translate-y-0 max-h-[200px]"
              leave-to-class="opacity-0 -translate-y-2 max-h-0"
            >
              <div v-show="expanded.color" class="flex flex-wrap gap-3 pb-2 overflow-hidden">
                <button
                  v-for="color in colorsList"
                  :key="color.value"
                  @click="filtersStore.toggleArrayFilter('colors', color.value)"
                  class="relative w-9 h-9 rounded-full border-2 transition-transform duration-300 shadow-sm"
                  :class="filtersStore.filters.colors?.includes(color.value) ? 'border-primary scale-110 shadow-md' : 'border-transparent hover:scale-110'"
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
            </transition>
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
        class="absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity"
        @click="filtersStore.toggleMobileFilters()"
      ></div>
      
      <!-- Drawer Content -->
      <div 
        class="absolute top-0 bottom-0 right-0 w-[85%] max-w-sm bg-white shadow-[0_0_40px_rgba(0,0,0,0.1)] flex flex-col h-full transform transition-transform"
      >
        <div class="p-6 flex items-center justify-between border-b border-gray-100">
          <div class="flex items-center gap-2.5 font-black text-xl text-gray-900">
            <SlidersHorizontal class="w-5 h-5" />
            <h2>تصفية النتائج</h2>
          </div>
          <button 
            @click="filtersStore.toggleMobileFilters()"
            class="p-2 text-gray-500 hover:text-gray-900 transition-colors bg-gray-50 rounded-full"
          >
            <X class="w-5 h-5" />
          </button>
        </div>
        
        <div class="flex-1 overflow-y-auto p-6 space-y-8">
          <!-- Mobile Category Filter -->
          <div v-if="!route.params.slug" class="filter-section">
            <h3 class="font-bold text-lg text-gray-900 mb-4">الفئة</h3>
            <div class="space-y-1">
              <label 
                v-for="cat in categories" 
                :key="cat.id" 
                class="flex items-center gap-3 cursor-pointer p-2 -mx-2 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div class="relative flex items-center justify-center w-5 h-5 rounded-[6px] border-2 border-gray-200" :class="{'bg-primary border-primary': filtersStore.filters.category === cat.slug}">
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
                <span class="text-gray-600 font-medium" :class="{'text-gray-900 font-bold': filtersStore.filters.category === cat.slug}">{{ cat.name }}</span>
              </label>
            </div>
          </div>

          <!-- Mobile Price Filter -->
          <div class="filter-section">
            <h3 class="font-bold text-lg text-gray-900 mb-4">السعر</h3>
            <div class="flex items-center gap-3">
              <div class="relative w-full">
                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-bold">ج.م</span>
                <input 
                  type="number" 
                  v-model.number="filtersStore.filters.minPrice" 
                  placeholder="من" 
                  class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
              </div>
              <div class="w-4 h-[2px] bg-gray-300 rounded-full shrink-0"></div>
              <div class="relative w-full">
                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-bold">ج.م</span>
                <input 
                  type="number" 
                  v-model.number="filtersStore.filters.maxPrice" 
                  placeholder="إلى" 
                  class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
              </div>
            </div>
          </div>

          <!-- Mobile Brand Filter -->
          <div class="filter-section">
            <h3 class="font-bold text-lg text-gray-900 mb-4">الماركات</h3>
            <div class="space-y-1">
              <label 
                v-for="brand in brandsList" 
                :key="brand" 
                class="flex items-center justify-between cursor-pointer p-2 -mx-2 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <span class="text-gray-600 font-medium" :class="{'text-gray-900 font-bold': filtersStore.filters.brands?.includes(brand)}">{{ brand }}</span>
                <div class="relative flex items-center justify-center w-5 h-5 rounded-[6px] border-2 border-gray-200 shadow-sm" :class="{'bg-primary border-primary': filtersStore.filters.brands?.includes(brand)}">
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

          <!-- Mobile Color Filter -->
          <div class="filter-section">
            <h3 class="font-bold text-lg text-gray-900 mb-4">اللون</h3>
            <div class="flex flex-wrap gap-4">
              <button
                v-for="color in colorsList"
                :key="color.value"
                @click="filtersStore.toggleArrayFilter('colors', color.value)"
                class="relative w-10 h-10 rounded-full border-2 transition-transform shadow-sm"
                :class="filtersStore.filters.colors?.includes(color.value) ? 'border-primary scale-110 shadow-md' : 'border-transparent'"
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

        <div class="p-6 border-t border-gray-100 flex gap-4">
          <button 
            @click="filtersStore.toggleMobileFilters()"
            class="flex-1 py-3.5 bg-gray-900 text-white rounded-[1rem] font-bold hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95"
          >
            عرض النتائج
          </button>
          <button 
            v-if="filtersStore.activeFiltersCount > 0"
            @click="filtersStore.clearFilters()"
            class="px-6 py-3.5 bg-white border border-gray-200 text-gray-900 rounded-[1rem] font-bold hover:bg-gray-50 transition-colors shadow-sm active:scale-95"
          >
            مسح
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

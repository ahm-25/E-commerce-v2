<script setup lang="ts">
import { ref, computed } from 'vue'
import { X, Check, SlidersHorizontal, ChevronDown, ChevronUp } from 'lucide-vue-next'
import { useOffersStore } from '~/stores/offers'
import { useRoute } from 'vue-router'
import { useProducts } from '~/composables/useProducts'

const route = useRoute()
const offersStore = useOffersStore()
const { mockCategories: categories } = useProducts()

const isMobileOpen = ref(false)
const toggleMobileFilters = () => {
  isMobileOpen.value = !isMobileOpen.value
}

defineExpose({
  toggleMobileFilters
})

// Expand/Collapse state
const expanded = ref({
  category: true,
  discount: true,
  price: true
})

const toggleSection = (section: keyof typeof expanded.value) => {
  expanded.value[section] = !expanded.value[section]
}

const activeFiltersCount = computed(() => {
  let count = 0
  const f = offersStore.filters
  if (f.category) count++
  if (f.minPrice) count++
  if (f.maxPrice) count++
  if (f.minDiscount) count++
  return count
})

const setFilter = (key: string, value: any) => {
  offersStore.applyFilters({ [key]: value })
}
</script>

<template>
  <div class="font-arabic">
    <!-- Desktop Sidebar -->
    <aside class="hidden lg:block w-72 flex-shrink-0">
      <div class="sticky top-28 bg-white rounded-[2rem] p-7 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
        
        <div class="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
          <div class="flex items-center gap-2.5 text-gray-900 font-black text-xl">
            <SlidersHorizontal class="w-5 h-5" />
            <h2>تصفية العروض</h2>
          </div>
          <button 
            v-if="activeFiltersCount > 0"
            @click="offersStore.clearFilters()"
            class="text-sm text-red-500 font-bold hover:text-red-600 transition-colors bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-full"
          >
            مسح الكل
          </button>
        </div>

        <div class="space-y-8">
          
          <!-- Category Filter -->
          <div class="filter-section">
            <button @click="toggleSection('category')" class="flex items-center justify-between w-full font-bold text-gray-900 mb-4 group">
              <span class="text-lg">الفئة</span>
              <div class="w-6 h-6 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                <ChevronUp v-if="expanded.category" class="w-4 h-4 text-gray-500" />
                <ChevronDown v-else class="w-4 h-4 text-gray-500" />
              </div>
            </button>
            <div v-show="expanded.category" class="space-y-1">
              <label 
                v-for="cat in categories" 
                :key="cat.id" 
                class="flex items-center gap-3 cursor-pointer group p-2 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div class="relative flex items-center justify-center w-5 h-5 rounded-[6px] border-2 border-gray-200 group-hover:border-primary transition-colors" :class="{'bg-primary border-primary': offersStore.filters.category === cat.slug}">
                  <Check v-if="offersStore.filters.category === cat.slug" class="w-3.5 h-3.5 text-white" />
                  <input 
                    type="radio" 
                    :name="'category'" 
                    :value="cat.slug" 
                    class="sr-only"
                    @change="setFilter('category', cat.slug)"
                    :checked="offersStore.filters.category === cat.slug"
                  >
                </div>
                <span class="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors" :class="{'text-gray-900 font-bold': offersStore.filters.category === cat.slug}">{{ cat.name }}</span>
              </label>
            </div>
          </div>

          <!-- Discount Filter -->
          <div class="filter-section">
            <button @click="toggleSection('discount')" class="flex items-center justify-between w-full font-bold text-gray-900 mb-4 group">
              <span class="text-lg">نسبة الخصم</span>
              <div class="w-6 h-6 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                <ChevronUp v-if="expanded.discount" class="w-4 h-4 text-gray-500" />
                <ChevronDown v-else class="w-4 h-4 text-gray-500" />
              </div>
            </button>
            <div v-show="expanded.discount" class="space-y-1">
              <label 
                v-for="discount in [10, 20, 30, 50]" 
                :key="discount" 
                class="flex items-center gap-3 cursor-pointer group p-2 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div class="relative flex items-center justify-center w-5 h-5 rounded-[6px] border-2 border-gray-200 group-hover:border-primary transition-colors" :class="{'bg-primary border-primary': offersStore.filters.minDiscount === discount}">
                  <Check v-if="offersStore.filters.minDiscount === discount" class="w-3.5 h-3.5 text-white" />
                  <input 
                    type="radio" 
                    :name="'discount'" 
                    :value="discount" 
                    class="sr-only"
                    @change="setFilter('minDiscount', discount)"
                    :checked="offersStore.filters.minDiscount === discount"
                  >
                </div>
                <span class="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors" :class="{'text-gray-900 font-bold': offersStore.filters.minDiscount === discount}">
                  خصم {{ discount }}% أو أكثر
                </span>
              </label>
            </div>
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
            <div v-show="expanded.price" class="pt-2 pb-2">
              <div class="flex items-center gap-3">
                <div class="relative w-full">
                  <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-bold">ج.م</span>
                  <input 
                    type="number" 
                    :value="offersStore.filters.minPrice"
                    @change="setFilter('minPrice', ($event.target as HTMLInputElement).value ? Number(($event.target as HTMLInputElement).value) : undefined)"
                    placeholder="من" 
                    class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:font-normal"
                  >
                </div>
                <div class="w-4 h-[2px] bg-gray-300 rounded-full shrink-0"></div>
                <div class="relative w-full">
                  <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-bold">ج.م</span>
                  <input 
                    type="number" 
                    :value="offersStore.filters.maxPrice"
                    @change="setFilter('maxPrice', ($event.target as HTMLInputElement).value ? Number(($event.target as HTMLInputElement).value) : undefined)"
                    placeholder="إلى" 
                    class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:font-normal"
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>

    <!-- Mobile Drawer -->
    <div v-if="isMobileOpen" class="fixed inset-0 z-50 lg:hidden">
      <div class="absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity" @click="toggleMobileFilters"></div>
      
      <div class="absolute top-0 bottom-0 right-0 w-[85%] max-w-sm bg-white shadow-[0_0_40px_rgba(0,0,0,0.1)] flex flex-col h-full transform transition-transform">
        <div class="p-6 flex items-center justify-between border-b border-gray-100">
          <div class="flex items-center gap-2.5 font-black text-xl text-gray-900">
            <SlidersHorizontal class="w-5 h-5" />
            <h2>تصفية العروض</h2>
          </div>
          <button @click="toggleMobileFilters" class="p-2 text-gray-500 hover:text-gray-900 transition-colors bg-gray-50 rounded-full">
            <X class="w-5 h-5" />
          </button>
        </div>
        
        <div class="flex-1 overflow-y-auto p-6 space-y-8">
          <!-- Mobile Categories -->
          <div class="filter-section">
            <h3 class="font-bold text-lg text-gray-900 mb-4">الفئة</h3>
            <div class="space-y-1">
              <label 
                v-for="cat in categories" 
                :key="cat.id" 
                class="flex items-center gap-3 cursor-pointer p-2 -mx-2 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div class="relative flex items-center justify-center w-5 h-5 rounded-[6px] border-2 border-gray-200" :class="{'bg-primary border-primary': offersStore.filters.category === cat.slug}">
                  <Check v-if="offersStore.filters.category === cat.slug" class="w-3.5 h-3.5 text-white" />
                  <input type="radio" :value="cat.slug" class="sr-only" @change="setFilter('category', cat.slug)" :checked="offersStore.filters.category === cat.slug">
                </div>
                <span class="text-gray-600 font-medium" :class="{'text-gray-900 font-bold': offersStore.filters.category === cat.slug}">{{ cat.name }}</span>
              </label>
            </div>
          </div>

          <!-- Mobile Discount -->
          <div class="filter-section">
            <h3 class="font-bold text-lg text-gray-900 mb-4">نسبة الخصم</h3>
            <div class="space-y-1">
              <label 
                v-for="discount in [10, 20, 30, 50]" 
                :key="discount" 
                class="flex items-center gap-3 cursor-pointer p-2 -mx-2 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div class="relative flex items-center justify-center w-5 h-5 rounded-[6px] border-2 border-gray-200" :class="{'bg-primary border-primary': offersStore.filters.minDiscount === discount}">
                  <Check v-if="offersStore.filters.minDiscount === discount" class="w-3.5 h-3.5 text-white" />
                  <input type="radio" :value="discount" class="sr-only" @change="setFilter('minDiscount', discount)" :checked="offersStore.filters.minDiscount === discount">
                </div>
                <span class="text-gray-600 font-medium" :class="{'text-gray-900 font-bold': offersStore.filters.minDiscount === discount}">
                  خصم {{ discount }}% أو أكثر
                </span>
              </label>
            </div>
          </div>

          <!-- Mobile Price -->
          <div class="filter-section">
            <h3 class="font-bold text-lg text-gray-900 mb-4">السعر</h3>
            <div class="flex items-center gap-3">
              <div class="relative w-full">
                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-bold">ج.م</span>
                <input 
                  type="number" 
                  :value="offersStore.filters.minPrice"
                  @change="setFilter('minPrice', ($event.target as HTMLInputElement).value ? Number(($event.target as HTMLInputElement).value) : undefined)"
                  placeholder="من" 
                  class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
              </div>
              <div class="w-4 h-[2px] bg-gray-300 rounded-full shrink-0"></div>
              <div class="relative w-full">
                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-bold">ج.م</span>
                <input 
                  type="number" 
                  :value="offersStore.filters.maxPrice"
                  @change="setFilter('maxPrice', ($event.target as HTMLInputElement).value ? Number(($event.target as HTMLInputElement).value) : undefined)"
                  placeholder="إلى" 
                  class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
              </div>
            </div>
          </div>
        </div>

        <div class="p-6 border-t border-gray-100 flex gap-4">
          <button @click="toggleMobileFilters" class="flex-1 py-3.5 bg-gray-900 text-white rounded-[1rem] font-bold hover:bg-gray-800 transition-colors shadow-lg">
            عرض النتائج
          </button>
          <button v-if="activeFiltersCount > 0" @click="offersStore.clearFilters()" class="px-6 py-3.5 bg-white border border-gray-200 text-gray-900 rounded-[1rem] font-bold hover:bg-gray-50 transition-colors shadow-sm">
            مسح
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { watch, onMounted, computed, ref } from 'vue'
import { Search, X, PackageSearch } from 'lucide-vue-next'
import { useProductFiltersStore } from '~/stores/productFilters'
import { useProducts } from '~/composables/useProducts'
import Breadcrumbs from '~/components/storefront/Breadcrumbs.vue'
import ProductFilters from '~/components/storefront/ProductFilters.vue'
import ProductToolbar from '~/components/storefront/ProductToolbar.vue'
import ProductGrid from '~/components/storefront/ProductGrid.vue'
import ProductPagination from '~/components/storefront/ProductPagination.vue'
import EmptyState from '~/components/common/EmptyState.vue'

const route = useRoute()
const router = useRouter()
const filtersStore = useProductFiltersStore()
const { products, totalProducts, isLoading, fetchProducts, mockCategories } = useProducts()

const localSearchQuery = ref((route.query.q as string) || '')

// Sync URL to State on mount
onMounted(() => {
  if (Object.keys(route.query).length > 0) {
    filtersStore.syncWithQuery(route.query)
  }
  // Initialize query in filter store if present in URL
  if (route.query.q) {
    filtersStore.filters.searchQuery = route.query.q as string
  }
  fetchProducts()
})

// Watch state changes and sync to URL, then fetch
watch(() => filtersStore.filters, () => {
  const query = filtersStore.queryObject
  
  router.push({
    path: route.path,
    query
  })
  
  fetchProducts()
}, { deep: true })

const submitSearch = () => {
  const q = localSearchQuery.value.trim()
  if (q) {
    filtersStore.filters.searchQuery = q
    filtersStore.filters.page = 1
  } else {
    clearSearch()
  }
}

const clearSearch = () => {
  localSearchQuery.value = ''
  filtersStore.filters.searchQuery = ''
  filtersStore.filters.page = 1
}

const breadcrumbItems = computed(() => {
  const q = filtersStore.filters.searchQuery
  if (q) {
    return [{ label: `نتائج البحث عن "${q}"` }]
  }
  return [{ label: 'البحث' }]
})

useHead({
  title: computed(() => {
    const q = filtersStore.filters.searchQuery
    return q ? `نتائج البحث عن "${q}" | Nexora` : 'البحث | Nexora'
  }),
  meta: [
    { name: 'description', content: 'ابحث عن منتجاتك المفضلة في متجر Nexora.' }
  ]
})
</script>

<template>
  <div class="min-h-screen flex flex-col bg-background text-text-primary">
    <main class="flex-grow pb-16">
      
      <!-- Search Hero Section -->
      <div class="bg-surface border-b border-border py-8 md:py-12 relative overflow-hidden">
        <!-- Minimal background pattern/overlay -->
        <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-5 dark:opacity-10 mix-blend-luminosity"></div>
        
        <div class="container mx-auto px-4 lg:px-8 relative z-10">
          <Breadcrumbs :items="breadcrumbItems" class="mb-6" />
          
          <div class="max-w-2xl mx-auto text-center">
            <h1 class="text-3xl md:text-4xl font-extrabold text-text-primary mb-4 tracking-tight">
              <template v-if="filtersStore.filters.searchQuery">
                نتائج البحث عن "<span class="text-primary">{{ filtersStore.filters.searchQuery }}</span>"
              </template>
              <template v-else>
                ابحث عن منتجاتك المفضلة
              </template>
            </h1>
            <p class="text-lg text-text-secondary mb-8">
              استخدم البحث للوصول إلى المنتجات التي تبحث عنها بسرعة.
            </p>
            
            <!-- Large Search Form -->
            <form @submit.prevent="submitSearch" class="relative max-w-xl mx-auto group">
              <input 
                v-model="localSearchQuery"
                type="text" 
                placeholder="اكتب اسم المنتج أو التصنيف..." 
                class="w-full pl-12 pr-12 py-4 bg-background border border-border rounded-full text-base sm:text-lg focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all shadow-sm"
              >
              <Search class="absolute right-5 top-1/2 -translate-y-1/2 w-6 h-6 text-text-secondary group-focus-within:text-primary transition-colors" />
              <button 
                v-if="localSearchQuery" 
                type="button"
                @click="clearSearch"
                class="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 p-1.5 rounded-full transition-colors"
                aria-label="مسح البحث"
              >
                <X class="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </div>

      <div class="container mx-auto px-4 md:px-6 py-8 max-w-7xl">
        <div class="flex flex-col lg:flex-row gap-8">
          
          <!-- Filters Sidebar -->
          <div v-if="filtersStore.filters.searchQuery || totalProducts > 0" class="lg:block">
            <ProductFilters :categories="mockCategories" />
          </div>

          <!-- Main Results Area -->
          <div class="flex-1 w-full min-w-0">
            
            <!-- Toolbar -->
            <div v-if="filtersStore.filters.searchQuery || totalProducts > 0">
              <ProductToolbar :total-products="totalProducts" />
            </div>

            <!-- Empty State -->
            <div v-if="!isLoading && products.length === 0" class="mt-6">
              <EmptyState 
                :title="filtersStore.filters.searchQuery ? 'لم نجد نتائج مطابقة لبحثك' : 'ابدأ البحث عن منتج'"
                :description="filtersStore.filters.searchQuery ? 'جرّب استخدام كلمات مختلفة أو إزالة بعض الفلاتر للوصول إلى المنتجات المطلوبة.' : 'اكتب اسم المنتج أو التصنيف الذي تبحث عنه في حقل البحث بالأعلى.'"
                icon="PackageSearch"
                :primary-action="filtersStore.activeFiltersCount > 0 || filtersStore.filters.searchQuery ? {
                  label: 'مسح البحث والفلاتر',
                  action: () => { clearSearch(); filtersStore.clearFilters() }
                } : undefined"
                :secondary-action="{
                  label: 'تصفح كل المنتجات',
                  link: '/products'
                }"
              />
            </div>

            <!-- Results -->
            <div v-else class="mt-6">
              <ProductGrid 
                :products="products" 
                :is-loading="isLoading" 
                :view-mode="filtersStore.viewMode" 
              />

              <div class="mt-12" v-if="totalProducts > 0">
                <ProductPagination 
                  :total-items="totalProducts" 
                  :items-per-page="12" 
                />
              </div>
            </div>
            
          </div>
        </div>
      </div>
      
    </main>
  </div>
</template>

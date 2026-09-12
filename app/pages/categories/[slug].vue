<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { watch, onMounted, computed } from 'vue'
import { useProductFiltersStore } from '~/stores/productFilters'
import { useProducts } from '~/composables/useProducts'
import StoreHeader from '~/components/storefront/StoreHeader.vue'
import StoreFooter from '~/components/storefront/StoreFooter.vue'
import Breadcrumbs from '~/components/storefront/Breadcrumbs.vue'
import CategoryHero from '~/components/storefront/CategoryHero.vue'
import ProductFilters from '~/components/storefront/ProductFilters.vue'
import ProductToolbar from '~/components/storefront/ProductToolbar.vue'
import ProductGrid from '~/components/storefront/ProductGrid.vue'
import EmptyProducts from '~/components/storefront/EmptyProducts.vue'
import ProductPagination from '~/components/storefront/ProductPagination.vue'
import PromotionalBanner from '~/components/storefront/PromotionalBanner.vue'

const route = useRoute()
const router = useRouter()
const categorySlug = route.params.slug as string

const filtersStore = useProductFiltersStore()
const { products, totalProducts, isLoading, fetchProducts, getCategoryBySlug, mockCategories } = useProducts()

const category = computed(() => getCategoryBySlug(categorySlug))

// Sync URL to State on mount
onMounted(() => {
  // Set initial category filter from slug
  filtersStore.setFilter('category', categorySlug)
  
  if (Object.keys(route.query).length > 0) {
    filtersStore.syncWithQuery(route.query)
  }
  fetchProducts()
})

// Watch state changes and sync to URL, then fetch
watch(() => filtersStore.filters, (newFilters) => {
  const query = filtersStore.queryObject
  // Remove category from query since it's in the path
  delete query.category
  
  router.push({
    path: route.path,
    query
  })
  
  fetchProducts()
}, { deep: true })

// If slug changes, update filter and refetch
watch(() => route.params.slug, (newSlug) => {
  filtersStore.clearFilters()
  filtersStore.setFilter('category', newSlug as string)
  fetchProducts()
})

const breadcrumbItems = computed(() => [
  { label: 'المنتجات', to: '/products' },
  { label: category.value?.name || 'القسم' }
])

const heroData = computed(() => ({
  title: category.value?.name || 'تصنيف المنتجات',
  description: 'اكتشف مجموعتنا الكاملة من المنتجات الفاخرة التي تم اختيارها بعناية لتناسب ذوقك الرفيع في هذا القسم.',
  image: category.value?.image || 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop'
}))

const promoBannerData = {
  title: 'اكتشفي المزيد من المنتجات',
  description: 'تسوقي أحدث المجموعات والإطلالات العصرية',
  image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=1600&auto=format&fit=crop',
  ctaText: 'تسوقي الآن',
  ctaLink: '/products',
  type: 'split' as const
}

</script>

<template>
  <div class="min-h-screen flex flex-col bg-background text-text-primary">
    <StoreHeader />

    <main class="flex-grow">
      <div class="container mx-auto px-4 md:px-6 py-6 max-w-7xl">
        <Breadcrumbs :items="breadcrumbItems" />
        
        <CategoryHero 
          v-bind="heroData"
          :count="totalProducts"
        />

        <div class="flex flex-col lg:flex-row gap-8 mt-8">
          <ProductFilters :categories="mockCategories" />

          <div class="flex-1 w-full">
            <ProductToolbar :total-products="totalProducts" />

            <div v-if="!isLoading && products.length === 0">
              <EmptyProducts />
            </div>

            <div v-else>
              <ProductGrid 
                :products="products" 
                :is-loading="isLoading" 
                :view-mode="filtersStore.viewMode" 
              />

              <ProductPagination 
                :total-items="totalProducts" 
                :items-per-page="12" 
              />
            </div>
          </div>
        </div>
      </div>
      
      <!-- Promotional Banner before footer -->
      <div class="container mx-auto px-4 md:px-6 py-12 max-w-7xl">
        <PromotionalBanner :banner="promoBannerData" />
      </div>
    </main>

    <StoreFooter />
  </div>
</template>

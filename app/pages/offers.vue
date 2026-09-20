<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSeoMeta } from '#imports'
import { useOffersStore } from '~/stores/offers'
import { useShopStore } from '~/stores/useStore'

import OffersHero from '~/components/offers/OffersHero.vue'
import OffersToolbar from '~/components/offers/OffersToolbar.vue'
import OffersFilters from '~/components/offers/OffersFilters.vue'
import FeaturedOfferCard from '~/components/offers/FeaturedOfferCard.vue'
import OffersEmptyState from '~/components/offers/OffersEmptyState.vue'
import ProductCard from '~/components/storefront/ProductCard.vue'
import ProductCardSkeleton from '~/components/storefront/ProductCardSkeleton.vue'

const route = useRoute()
const router = useRouter()
const offersStore = useOffersStore()
const shopStore = useShopStore()

// SEO
useSeoMeta({
  title: () => `العروض والخصومات | ${shopStore.storeData?.name || 'المتجر'}`,
  description: 'اكتشف أحدث العروض والخصومات على منتجاتنا واستفد من أفضل الأسعار قبل انتهائها.'
})

const viewMode = ref<'grid' | 'list'>('grid')
const filtersRef = ref<InstanceType<typeof OffersFilters> | null>(null)

// Initialize from URL
onMounted(async () => {
  const query = route.query
  if (query.sort) offersStore.filters.sort = query.sort as string
  if (query.category) offersStore.filters.category = query.category as string
  if (query.minPrice) offersStore.filters.minPrice = Number(query.minPrice)
  if (query.maxPrice) offersStore.filters.maxPrice = Number(query.maxPrice)
  if (query.minDiscount) offersStore.filters.minDiscount = Number(query.minDiscount)
  if (query.page) offersStore.filters.page = Number(query.page)

  await Promise.all([
    offersStore.fetchFeaturedOffers(),
    offersStore.fetchOffers()
  ])
})

// Sync URL
watch(
  () => offersStore.filters,
  (newFilters) => {
    const query: Record<string, any> = {}
    if (newFilters.sort && newFilters.sort !== 'discount-desc') query.sort = newFilters.sort
    if (newFilters.category) query.category = newFilters.category
    if (newFilters.minPrice) query.minPrice = newFilters.minPrice
    if (newFilters.maxPrice) query.maxPrice = newFilters.maxPrice
    if (newFilters.minDiscount) query.minDiscount = newFilters.minDiscount
    if (newFilters.page && newFilters.page > 1) query.page = newFilters.page

    router.replace({ query })
  },
  { deep: true }
)

const handleSortUpdate = (sort: string) => {
  offersStore.setSort(sort)
}

const toggleMobileFilters = () => {
  filtersRef.value?.toggleMobileFilters()
}

const removeFilter = (key: keyof typeof offersStore.filters) => {
  offersStore.applyFilters({ [key]: undefined })
}
</script>

<template>
  <div class="min-h-screen bg-white">
    <!-- Breadcrumb -->
    <div class="bg-white border-b border-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav class="flex text-sm text-gray-500 font-arabic" aria-label="Breadcrumb">
          <ol class="inline-flex items-center space-x-1 space-x-reverse md:space-x-2 md:space-x-reverse">
            <li class="inline-flex items-center">
              <NuxtLink to="/" class="hover:text-gray-900 transition-colors">الرئيسية</NuxtLink>
            </li>
            <li>
              <div class="flex items-center">
                <span class="mx-2 text-gray-400">/</span>
                <span class="text-gray-900 font-bold" aria-current="page">العروض</span>
              </div>
            </li>
          </ol>
        </nav>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <!-- Hero -->
      <OffersHero />

      <!-- Featured Offers -->
      <div v-if="offersStore.featuredOffers.length > 0" class="mb-12">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-gray-900 font-arabic">عروض مميزة</h2>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FeaturedOfferCard 
            v-for="offer in offersStore.featuredOffers" 
            :key="offer.id" 
            :offer="offer" 
          />
        </div>
      </div>

      <!-- Main Content -->
      <div class="flex flex-col lg:flex-row gap-8 lg:gap-12">
        <!-- Sidebar Filters -->
        <OffersFilters ref="filtersRef" />

        <!-- Products Area -->
        <div class="flex-1 min-w-0">
          
          <OffersToolbar 
            :totalProducts="offersStore.total"
            :currentSort="offersStore.filters.sort || 'discount-desc'"
            :viewMode="viewMode"
            @update:sort="handleSortUpdate"
            @update:viewMode="viewMode = $event"
            @toggleFilters="toggleMobileFilters"
          />

          <!-- Active Filters Chips -->
          <div v-if="offersStore.filters.category || offersStore.filters.minDiscount || offersStore.filters.minPrice || offersStore.filters.maxPrice" class="flex flex-wrap items-center gap-2 mb-6 font-arabic">
            <span class="text-sm text-gray-500 font-medium ml-2">الفلاتر النشطة:</span>
            
            <button v-if="offersStore.filters.category" @click="removeFilter('category')" class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition-colors">
              {{ offersStore.filters.category }}
              <span class="text-gray-400 hover:text-gray-900">&times;</span>
            </button>
            <button v-if="offersStore.filters.minDiscount" @click="removeFilter('minDiscount')" class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition-colors">
              خصم {{ offersStore.filters.minDiscount }}%+
              <span class="text-gray-400 hover:text-gray-900">&times;</span>
            </button>
            <button v-if="offersStore.filters.minPrice" @click="removeFilter('minPrice')" class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition-colors">
              من {{ offersStore.filters.minPrice }} ج.م
              <span class="text-gray-400 hover:text-gray-900">&times;</span>
            </button>
            <button v-if="offersStore.filters.maxPrice" @click="removeFilter('maxPrice')" class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition-colors">
              حتى {{ offersStore.filters.maxPrice }} ج.م
              <span class="text-gray-400 hover:text-gray-900">&times;</span>
            </button>
            
            <button @click="offersStore.clearFilters()" class="text-sm text-red-600 hover:text-red-700 font-medium mr-2">
              مسح الكل
            </button>
          </div>

          <!-- Loading State -->
          <div v-if="offersStore.isLoading" class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-x-6 md:gap-y-10">
            <ProductCardSkeleton v-for="i in 8" :key="i" :viewMode="viewMode" />
          </div>

          <!-- Error State -->
          <div v-else-if="offersStore.error" class="flex flex-col items-center justify-center py-16 text-center font-arabic">
            <div class="text-red-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">تعذر تحميل العروض</h3>
            <p class="text-gray-500 mb-6">{{ offersStore.error }}</p>
            <button @click="offersStore.retry" class="px-6 py-2 bg-gray-900 text-white rounded-full font-bold hover:bg-gray-800 transition-colors">
              إعادة المحاولة
            </button>
          </div>

          <!-- Empty State -->
          <OffersEmptyState 
            v-else-if="offersStore.offers.length === 0" 
            @clear-filters="offersStore.clearFilters()"
          />

          <!-- Products Grid -->
          <div v-else>
            <div 
              class="grid gap-4 md:gap-x-6 md:gap-y-10"
              :class="viewMode === 'grid' ? 'grid-cols-2 md:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'"
            >
              <ProductCard 
                v-for="product in offersStore.offers" 
                :key="product.id" 
                :product="product" 
                :viewMode="viewMode"
              />
            </div>

            <!-- Pagination / Load More -->
            <div v-if="offersStore.offers.length < offersStore.total" class="mt-12 flex justify-center">
              <button 
                @click="offersStore.loadMore"
                :disabled="offersStore.isLoadingMore"
                class="px-8 py-3 bg-white border border-gray-200 text-gray-900 text-sm font-bold tracking-widest uppercase rounded-full hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-arabic"
              >
                <svg v-if="offersStore.isLoadingMore" class="animate-spin -ml-1 mr-3 h-4 w-4 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                تحميل المزيد
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

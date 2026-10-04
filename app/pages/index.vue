<script setup lang="ts">
import { useMockData } from '~/composables/useMockData'
import { storeApi } from '~/services/storeApi'

const { mockData } = useMockData()

// Catalog sections come from the dashboard; hero/banners/testimonials stay as site content
const { data: catalog } = await useAsyncData('home:catalog', async () => {
  const [categories, featured, bestSellers] = await Promise.all([
    storeApi.getCategories(),
    storeApi.getProducts({ sort: 'newest', perPage: 8 }),
    storeApi.getProducts({ sort: 'popular', perPage: 8 })
  ])
  return { categories, featured: featured.items, bestSellers: bestSellers.items }
}, { default: () => ({ categories: [], featured: [], bestSellers: [] }) })

useHead({
  title: `${mockData.store.name} - الرئيسية`,
  meta: [
    { name: 'description', content: mockData.store.description }
  ]
})
</script>

<template>
  <div class="flex flex-col">
    <!-- Hero Section -->
    <StorefrontStoreHero :hero="mockData.hero" />
    
    <!-- Category Navigation Section -->
    <StorefrontCategorySection 
      title="تسوق حسب الفئة" 
      :categories="catalog.categories" 
    />
    
    <!-- Brands Section -->
    <HomeBrands />
    
    <!-- Featured Products Section -->
    <StorefrontProductSection 
      title="منتجات مميزة"
      :products="catalog.featured"
      viewAllLink="/products?sort=newest"
    />
    
    <!-- Promotional Banner -->
    <StorefrontPromotionalBanner :banner="mockData.promotionalBanner" />
    
    <!-- Best Sellers Section -->
    <StorefrontProductSection 
      title="الأكثر مبيعاً"
      :products="catalog.bestSellers"
      viewAllLink="/products?sort=popular"
    />
    
    <!-- Editorial Collections Section -->
    <StorefrontCollectionSection :collections="mockData.collections" v-if="mockData.collections.length > 0" />
    
    <!-- Customer Testimonials Section -->
    <StorefrontTestimonialSection :testimonials="mockData.testimonials" />
    
    <!-- Newsletter Section -->
    <StorefrontNewsletterSection />
  </div>
</template>

<script setup lang="ts">
import { useMockData } from '~/composables/useMockData'

const { mockData } = useMockData()

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
      :categories="mockData.categories" 
    />
    
    <!-- Featured Products Section -->
    <StorefrontProductSection 
      title="منتجات مميزة"
      :products="mockData.featuredProducts"
      viewAllLink="/products?sort=featured"
    />
    
    <!-- Promotional Banner -->
    <StorefrontPromotionalBanner :banner="mockData.promotionalBanner" />
    
    <!-- Best Sellers Section -->
    <StorefrontProductSection 
      title="الأكثر مبيعاً"
      :products="mockData.bestSellers"
      viewAllLink="/products?sort=bestselling"
    />
    
    <!-- Editorial Collections Section -->
    <StorefrontCollectionSection :collections="mockData.collections" v-if="mockData.collections.length > 0" />
    
    <!-- Customer Testimonials Section -->
    <StorefrontTestimonialSection :testimonials="mockData.testimonials" />
    
    <!-- Newsletter Section -->
    <StorefrontNewsletterSection />
  </div>
</template>

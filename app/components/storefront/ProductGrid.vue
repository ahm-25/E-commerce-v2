<script setup lang="ts">
import ProductCard from './ProductCard.vue'
import ProductCardSkeleton from './ProductCardSkeleton.vue'
import type { Product } from '~/types'

defineProps<{
  products: Product[]
  isLoading: boolean
  viewMode: 'grid' | 'list'
}>()
</script>

<template>
  <div 
    v-if="isLoading" 
    class="grid gap-6"
    :class="viewMode === 'grid' ? 'grid-cols-2 md:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'"
  >
    <ProductCardSkeleton v-for="i in 8" :key="i" :view-mode="viewMode" />
  </div>
  
  <div 
    v-else 
    class="grid gap-6"
    :class="viewMode === 'grid' ? 'grid-cols-2 md:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'"
  >
    <ProductCard 
      v-for="product in products" 
      :key="product.id" 
      :product="product" 
      :view-mode="viewMode"
    />
  </div>
</template>

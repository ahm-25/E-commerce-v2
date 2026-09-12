<script setup lang="ts">
import type { Product } from '~/types'

const props = defineProps<{
  products: Product[]
}>()
</script>

<template>
  <div class="mt-20 pt-16 border-t border-border">
    <div class="flex items-center justify-between mb-8">
      <div class="flex flex-col gap-1">
        <h2 class="text-2xl md:text-3xl font-bold text-text-primary">منتجات مشابهة</h2>
        <p class="text-text-secondary">قد تعجبك أيضاً</p>
      </div>
    </div>
    
    <div class="flex overflow-x-auto gap-6 pb-8 -mx-4 px-4 md:mx-0 md:px-0 snap-x no-scrollbar">
      <StorefrontProductCard 
        v-for="product in products" 
        :key="product.id" 
        :product="product" 
        class="w-[240px] md:w-[280px] flex-shrink-0 snap-start"
      />
    </div>
  </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>

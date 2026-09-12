<script setup lang="ts">
import { Star } from 'lucide-vue-next'
import type { Product } from '~/types'

const props = defineProps<{
  product: Product
}>()
</script>

<template>
  <div class="flex flex-col gap-4">
    <!-- Category Label -->
    <div class="text-sm font-medium text-text-secondary" v-if="product.category">
      <NuxtLink :to="`/category/${product.category.slug}`" class="hover:text-primary transition-colors">
        {{ product.category.name }}
      </NuxtLink>
    </div>

    <!-- Title -->
    <h1 class="text-2xl md:text-3xl lg:text-4xl font-bold text-text-primary leading-tight">
      {{ product.name }}
    </h1>

    <!-- Rating -->
    <div class="flex items-center gap-2 mt-1">
      <div class="flex items-center gap-1 bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded-md text-amber-500">
        <Star class="w-4 h-4 fill-current" />
        <Star class="w-4 h-4 fill-current" />
        <Star class="w-4 h-4 fill-current" />
        <Star class="w-4 h-4 fill-current" />
        <Star class="w-4 h-4 fill-current" />
      </div>
      <span class="text-sm font-medium text-text-primary">({{ product.rating }} تقييم)</span>
      <span class="text-sm text-text-secondary mx-2">•</span>
      <span class="text-sm text-text-secondary">{{ product.reviewsCount }} مراجعة</span>
    </div>

    <!-- Price -->
    <div class="flex items-end gap-4 mt-2">
      <div class="text-3xl font-bold text-primary">
        {{ product.price.toLocaleString('ar-EG') }} {{ product.currency }}
      </div>
      <div v-if="product.compareAtPrice" class="text-lg text-text-secondary line-through mb-1">
        {{ product.compareAtPrice.toLocaleString('ar-EG') }} {{ product.currency }}
      </div>
      <div v-if="product.badge" class="px-3 py-1 bg-accent/10 text-accent font-bold text-sm rounded-full mb-1">
        {{ product.badge }}
      </div>
    </div>

    <!-- Short Description -->
    <p class="text-base text-text-secondary leading-relaxed mt-2 line-clamp-3">
      {{ product.description }}
    </p>
  </div>
</template>

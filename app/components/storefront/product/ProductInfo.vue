<script setup lang="ts">
import { Star } from 'lucide-vue-next'
import type { Product } from '~/types'

const props = defineProps<{
  product: Product
}>()
</script>

<template>
  <div class="flex flex-col gap-5">
    <!-- Category Label -->
    <div class="flex items-center gap-3" v-if="product.category">
      <NuxtLink :to="`/category/${product.category.slug}`" class="text-sm font-bold tracking-wide text-primary uppercase hover:text-accent transition-colors flex items-center gap-2 group">
        <span class="w-2 h-2 rounded-full bg-primary group-hover:scale-150 transition-transform"></span>
        {{ product.category.name }}
      </NuxtLink>
    </div>

    <!-- Title -->
    <h1 class="text-3xl md:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-l from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 leading-[1.2] tracking-tight">
      {{ product.name }}
    </h1>

    <!-- Rating & Reviews -->
    <div class="flex flex-wrap items-center gap-4 mt-2">
      <div class="flex items-center gap-1.5 bg-amber-100/50 dark:bg-amber-900/30 px-3 py-1.5 rounded-full border border-amber-200/50 dark:border-amber-700/30 text-amber-500 shadow-sm">
        <Star class="w-4 h-4 fill-current" />
        <span class="text-sm font-bold text-amber-600 dark:text-amber-400 mt-0.5">{{ product.rating }}</span>
      </div>
      <span class="text-sm font-medium text-text-secondary hover:text-primary transition-colors cursor-pointer border-b border-dashed border-text-secondary/50 pb-0.5">
        {{ product.reviewsCount }} مراجعة
      </span>
    </div>

    <div class="w-full h-px bg-gradient-to-r from-border via-border/50 to-transparent my-2"></div>

    <!-- Price -->
    <div class="flex flex-wrap items-end gap-4 mt-2">
      <div class="text-4xl lg:text-5xl font-black text-primary drop-shadow-sm">
        {{ product.price.toLocaleString('ar-EG') }} <span class="text-2xl font-bold text-text-secondary">{{ product.currency }}</span>
      </div>
      <div v-if="product.compareAtPrice" class="text-xl lg:text-2xl text-text-secondary line-through font-medium mb-1.5 decoration-red-500/50 decoration-2">
        {{ product.compareAtPrice.toLocaleString('ar-EG') }}
      </div>
      <div v-if="product.badge" class="px-4 py-1.5 bg-gradient-to-r from-red-500 to-rose-500 text-white font-bold text-sm rounded-full mb-2 shadow-md animate-pulse">
        {{ product.badge }}
      </div>
    </div>

    <!-- Short Description -->
    <p class="text-lg text-text-secondary leading-relaxed mt-4 font-medium max-w-2xl">
      {{ product.description }}
    </p>
  </div>
</template>

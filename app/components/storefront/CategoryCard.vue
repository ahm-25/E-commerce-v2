<script setup lang="ts">
import type { Category } from '~/types'

defineProps<{
  category: Category
}>()
</script>

<template>
  <NuxtLink 
    :to="`/categories/${category.slug}`"
    class="group flex flex-col items-center gap-5 snap-start min-w-[120px] md:min-w-[160px] cursor-pointer"
  >
    <div class="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden bg-gray-100 group-hover:shadow-lg transition-all duration-500 group-hover:-translate-y-1">
      <NuxtImg 
        :src="category.image" 
        :alt="category.name"
        class="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        format="webp"
        quality="80"
        loading="lazy"
      />
      <div class="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
    <span class="text-sm md:text-lg font-bold text-text-primary text-center group-hover:text-primary transition-colors duration-300">
      {{ category.name }}
    </span>
  </NuxtLink>
</template>

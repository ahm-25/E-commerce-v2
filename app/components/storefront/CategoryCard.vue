<script setup lang="ts">
import type { Category } from '~/types'

defineProps<{
  category: Category
}>()
</script>

<template>
  <NuxtLink 
    :to="`/categories/${category.slug}`"
    class="group flex flex-col items-center min-w-[120px] md:min-w-[160px] gap-4 snap-start"
  >
    <div class="relative w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden bg-background shadow-premium transition-transform duration-300 group-hover:scale-105">
      <NuxtImg 
        :src="category.image" 
        :alt="category.name"
        class="w-full h-full object-cover object-center"
        format="webp"
        quality="80"
        loading="lazy"
      />
      <!-- Subtle overlay on hover -->
      <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
    </div>
    <span class="text-sm md:text-base font-semibold text-text-primary text-center">
      {{ category.name }}
    </span>
  </NuxtLink>
</template>

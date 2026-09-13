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
    <div class="relative w-28 h-28 md:w-36 md:h-36 p-[3px] rounded-full bg-gradient-to-tr from-border/60 to-border/30 group-hover:from-primary group-hover:to-accent transition-all duration-500 shadow-premium group-hover:shadow-primary/20 group-hover:-translate-y-2">
      <div class="relative w-full h-full rounded-full overflow-hidden bg-surface border-[3px] border-surface z-10">
        <NuxtImg 
          :src="category.image" 
          :alt="category.name"
          class="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
          format="webp"
          quality="80"
          loading="lazy"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
    </div>
    <span class="text-sm md:text-lg font-bold text-text-primary text-center group-hover:text-primary transition-colors duration-300">
      {{ category.name }}
    </span>
  </NuxtLink>
</template>

<script setup lang="ts">
import { ArrowLeft } from 'lucide-vue-next'
import type { Category } from '~/types'

defineProps<{
  category: Category
}>()
</script>

<template>
  <NuxtLink 
    :to="`/products?category=${category.slug}`"
    class="group flex flex-col bg-white dark:bg-[#1a1a1a] rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-lg hover:border-blue-100 dark:hover:border-blue-900/50 transition-all duration-300 overflow-hidden"
  >
    <!-- Image Area -->
    <div class="relative w-full aspect-[4/3] bg-gray-50 dark:bg-[#222] overflow-hidden">
      <NuxtImg 
        v-if="category.image"
        :src="category.image" 
        :alt="category.name"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
        format="webp"
        quality="80"
      />
      <!-- Fallback -->
      <div v-else class="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
        <span class="text-4xl opacity-20 font-black tracking-wider text-gray-400 dark:text-gray-600">
          {{ category.name.substring(0, 1) }}
        </span>
      </div>
    </div>
    
    <!-- Content Area -->
    <div class="p-5 flex items-center justify-between">
      <div>
        <h3 class="text-lg font-bold text-gray-900 dark:text-white transition-colors">
          {{ category.name }}
        </h3>
        <!-- Optional product count if it exists in future API -->
        <!-- <p v-if="category.productCount" class="text-sm text-gray-500 dark:text-gray-400 mt-1 transition-colors">
          {{ category.productCount }} منتج
        </p> -->
      </div>
      <div class="w-10 h-10 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-600 dark:group-hover:bg-blue-900/30 dark:group-hover:text-blue-400 transition-colors">
        <ArrowLeft class="w-5 h-5 rtl:rotate-180" stroke-width="2" />
      </div>
    </div>
  </NuxtLink>
</template>

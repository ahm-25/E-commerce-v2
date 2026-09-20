<script setup lang="ts">
import { useMockData } from '~/composables/useMockData'

const { mockData } = useMockData()
const brands = mockData.brands || []
</script>

<template>
  <section v-if="brands.length > 0" class="py-12 md:py-16 bg-white dark:bg-[#0a0a0a] transition-colors duration-300 font-arabic border-y border-gray-100 dark:border-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-10">
        <h2 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white transition-colors">
          أشهر العلامات التجارية
        </h2>
      </div>

      <div class="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16">
        <NuxtLink 
          v-for="brand in brands" 
          :key="brand.id"
          :to="`/products?brand=${brand.name.toLowerCase()}`"
          class="group relative flex items-center justify-center w-24 h-24 sm:w-32 sm:h-32 p-4 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
          :aria-label="`تصفح منتجات ${brand.name}`"
        >
          <img 
            :src="brand.logo" 
            :alt="brand.name"
            class="max-w-full max-h-full object-contain dark:invert transition-all"
            loading="lazy"
          />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

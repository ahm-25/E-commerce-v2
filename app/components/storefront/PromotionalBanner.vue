<script setup lang="ts">
import { ArrowLeft } from 'lucide-vue-next'
import type { Banner } from '~/types'

defineProps<{
  banner: Banner
}>()
</script>

<template>
  <section class="py-12 md:py-24 relative overflow-hidden">
    <div class="container mx-auto px-4 lg:px-8">
      <!-- Banner Container -->
      <div class="relative w-full overflow-hidden bg-[#f5f5f5] flex flex-col md:flex-row h-full min-h-[400px] group">
          
          <!-- Content Side -->
          <div class="flex-1 p-8 md:p-16 flex flex-col justify-center order-2 md:order-1 font-arabic">
            <!-- Decorative Badge -->
            <div class="inline-flex items-center justify-center px-3 py-1 bg-red-700 text-white text-[10px] font-bold tracking-widest uppercase mb-6 w-fit shadow-sm">
              عرض خاص
            </div>

            <h2 class="text-3xl md:text-5xl font-bold mb-4 text-gray-900 leading-tight">
              {{ banner.title }}
            </h2>
            <p class="text-base md:text-lg text-gray-600 mb-8 max-w-lg font-medium leading-relaxed">
              {{ banner.description }}
            </p>
            
            <NuxtLink 
              :to="banner.ctaLink"
              class="group/btn inline-flex items-center gap-3 px-8 py-3.5 bg-black text-white font-bold text-sm tracking-widest uppercase w-fit hover:bg-gray-800 transition-colors duration-300"
            >
              <span>{{ banner.ctaText }}</span>
              <ArrowLeft class="w-4 h-4 rtl-flip transition-transform duration-300 group-hover/btn:-translate-x-1" />
            </NuxtLink>
          </div>
          
          <!-- Image Side -->
          <div class="flex-1 relative order-1 md:order-2 h-[300px] md:h-auto overflow-hidden bg-gray-200">
            <NuxtImg 
              :src="banner.image" 
              :alt="banner.title"
              class="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
              format="webp"
              quality="90"
              loading="lazy"
            />
          </div>
      </div>
    </div>
  </section>
</template>

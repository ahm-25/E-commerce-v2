<script setup lang="ts">
import { ArrowLeft } from 'lucide-vue-next'
import type { Banner } from '~/types'

defineProps<{
  hero: Banner
}>()
</script>

<template>
  <section class="relative w-full h-[85vh] min-h-[600px] overflow-hidden bg-gray-900 flex items-center">
    <!-- Background Image -->
    <div class="absolute inset-0 w-full h-full">
      <NuxtImg 
        :src="hero.image" 
        :alt="hero.title"
        class="w-full h-full object-cover object-center scale-105 animate-[zoom-out_20s_ease-out_forwards]"
        format="webp"
        quality="90"
        preload
      />
      <!-- Editorial gradient overlay (darker on the sides for text readability) -->
      <div class="absolute inset-0 bg-black/40 md:bg-transparent md:bg-gradient-to-r md:from-black/70 md:via-black/20 md:to-transparent rtl:md:bg-gradient-to-l rtl:md:from-black/70 rtl:md:via-black/20 rtl:md:to-transparent z-10"></div>
    </div>

    <!-- Content -->
    <div class="relative container mx-auto px-4 lg:px-12 h-full flex items-center z-20">
      <div class="max-w-3xl text-white rtl:ml-auto ltr:mr-auto mt-20">
        
        <div class="animate-fade-in-up" style="animation-delay: 100ms;">
          <p class="text-sm md:text-base font-semibold tracking-widest uppercase mb-4 text-gray-300 font-arabic">
            تشكيلة جديدة
          </p>
          <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6 text-white font-arabic drop-shadow-md">
            {{ hero.title }}
          </h1>
        </div>
        
        <p class="animate-fade-in-up text-lg md:text-xl mb-10 text-gray-200 max-w-xl leading-relaxed font-arabic" style="animation-delay: 300ms;">
          {{ hero.description }}
        </p>
        
        <div class="animate-fade-in-up" style="animation-delay: 500ms;">
          <NuxtLink 
            :to="hero.ctaLink"
            class="inline-flex items-center justify-center gap-4 px-10 py-4 bg-white text-gray-900 text-sm md:text-base font-bold uppercase tracking-wider hover:bg-gray-100 transition-colors duration-300 font-arabic group"
          >
            {{ hero.ctaText }}
            <ArrowLeft class="w-5 h-5 rtl-flip group-hover:-translate-x-2 transition-transform duration-300" />
          </NuxtLink>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
.font-arabic {
  font-family: 'Cairo', 'IBM Plex Sans Arabic', sans-serif;
}
@keyframes zoom-out {
  0% { transform: scale(1.1); }
  100% { transform: scale(1); }
}
</style>

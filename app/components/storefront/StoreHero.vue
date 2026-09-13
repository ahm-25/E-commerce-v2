<script setup lang="ts">
import { ArrowLeft } from 'lucide-vue-next'
import type { Banner } from '~/types'

defineProps<{
  hero: Banner
}>()
</script>

<template>
  <section class="relative w-full h-[70vh] min-h-[600px] md:min-h-[800px] overflow-hidden bg-gray-900 flex items-center">
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
      <!-- Sophisticated gradient overlay -->
      <div class="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/30 to-transparent md:bg-gradient-to-r md:from-transparent md:via-gray-900/40 md:to-gray-900/90 rtl:md:bg-gradient-to-l rtl:md:from-gray-900/90 rtl:md:via-gray-900/40 rtl:md:to-transparent z-10"></div>
    </div>

    <!-- Content -->
    <div class="relative container mx-auto px-4 lg:px-12 h-full flex items-center z-20">
      <div class="max-w-3xl text-white rtl:ml-auto ltr:mr-auto p-8 md:p-14 lg:p-16 rounded-[2.5rem] bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.5)] relative overflow-hidden group hover:border-white/20 transition-colors duration-500">
        <!-- Subtle internal glow -->
        <div class="absolute -top-32 -left-32 w-64 h-64 bg-white/10 rounded-full blur-[80px] pointer-events-none"></div>
        <div class="absolute -bottom-32 -right-32 w-64 h-64 bg-accent/20 rounded-full blur-[80px] pointer-events-none"></div>

        <div class="relative z-10">
          <div class="animate-fade-in-up" style="animation-delay: 100ms;">
            <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 w-fit mb-6 shadow-sm">
              <span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span class="text-xs md:text-sm font-bold tracking-wider text-gray-200 uppercase">تشكيلة جديدة</span>
            </div>
            <h1 class="text-4xl md:text-6xl lg:text-7xl font-black leading-[1.1] mb-6 drop-shadow-2xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
              {{ hero.title }}
            </h1>
          </div>
          
          <p class="animate-fade-in-up text-lg md:text-2xl mb-10 text-gray-200 drop-shadow-md max-w-xl leading-relaxed font-medium" style="animation-delay: 300ms;">
            {{ hero.description }}
          </p>
          
          <div class="animate-fade-in-up" style="animation-delay: 500ms;">
            <NuxtLink 
              :to="hero.ctaLink"
              class="inline-flex items-center justify-center gap-4 px-10 py-4 md:py-5 md:text-lg bg-white text-gray-900 rounded-full font-bold hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(255,255,255,0.2)] active:scale-95 shadow-xl group/btn"
            >
              {{ hero.ctaText }}
              <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover/btn:bg-gray-200 transition-colors">
                <ArrowLeft class="w-5 h-5 rtl-flip group-hover/btn:-translate-x-1 transition-transform" />
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes zoom-out {
  0% { transform: scale(1.1); }
  100% { transform: scale(1); }
}
</style>

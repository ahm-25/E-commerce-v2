<script setup lang="ts">
import { ShieldCheck, Truck, RotateCcw } from 'lucide-vue-next'

defineProps<{
  title: string
  description: string
  image: string
  count?: number
}>()
</script>

<template>
  <div class="relative w-full h-[400px] lg:h-[500px] rounded-[2.5rem] overflow-hidden bg-gray-900 mb-12 flex items-center shadow-premium group">
    <!-- Background Image -->
    <div class="absolute inset-0 w-full h-full">
      <NuxtImg 
        :src="image"
        :alt="title"
        class="w-full h-full object-cover object-center transition-transform duration-[10s] group-hover:scale-110 ease-out"
        format="webp"
        quality="90"
      />
    </div>
    
    <!-- Sophisticated Gradient Overlay -->
    <div class="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/60 to-transparent"></div>
    <div class="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent"></div>

    <!-- Content -->
    <div class="relative z-10 p-8 md:p-16 lg:px-20 max-w-3xl h-full flex flex-col justify-center animate-[fadeIn_0.8s_ease-out]">
      <h1 class="text-4xl md:text-5xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 mb-6 leading-tight drop-shadow-sm">
        {{ title }}
      </h1>
      <p class="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed font-medium">
        {{ description }}
      </p>

      <!-- Trust Elements (Glassmorphism) -->
      <div class="flex flex-wrap items-center gap-4 text-sm text-white font-bold">
        <div class="flex items-center gap-2.5 bg-white/10 backdrop-blur-md border border-white/20 px-5 py-2.5 rounded-full hover:bg-white/20 transition-all cursor-default shadow-lg">
          <ShieldCheck class="w-5 h-5 text-accent drop-shadow-sm" />
          <span>جودة عالية</span>
        </div>
        <div class="flex items-center gap-2.5 bg-white/10 backdrop-blur-md border border-white/20 px-5 py-2.5 rounded-full hover:bg-white/20 transition-all cursor-default shadow-lg">
          <Truck class="w-5 h-5 text-accent drop-shadow-sm" />
          <span>توصيل سريع</span>
        </div>
        <div class="flex items-center gap-2.5 bg-white/10 backdrop-blur-md border border-white/20 px-5 py-2.5 rounded-full hover:bg-white/20 transition-all cursor-default shadow-lg">
          <RotateCcw class="w-5 h-5 text-accent drop-shadow-sm" />
          <span>إرجاع سهل</span>
        </div>
      </div>
    </div>
    
    <!-- Count Badge (Glassmorphism) -->
    <div v-if="count" class="absolute bottom-8 left-8 md:bottom-12 md:left-12 z-10 bg-white/10 backdrop-blur-xl px-6 py-3 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/20 flex items-center gap-2 hover:scale-105 transition-transform">
      <span class="flex h-3 w-3 relative">
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
        <span class="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
      </span>
      <span class="text-base font-bold text-white">{{ count }} منتج حصري</span>
    </div>
  </div>
</template>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>

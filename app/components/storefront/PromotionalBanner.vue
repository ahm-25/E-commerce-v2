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
      <div class="relative w-full overflow-hidden rounded-[2.5rem] bg-gray-950 shadow-[0_20px_50px_rgba(0,0,0,0.3)] group border border-gray-800/50">
        
        <!-- Abstract Glowing Background Orbs -->
        <div class="absolute top-0 right-0 w-[80%] h-[150%] bg-primary/20 rounded-full blur-[120px] pointer-events-none -translate-y-1/4 translate-x-1/3 transition-transform duration-1000 group-hover:scale-110"></div>
        <div class="absolute bottom-0 left-0 w-[60%] h-[120%] bg-accent/20 rounded-full blur-[120px] pointer-events-none translate-y-1/4 -translate-x-1/4 transition-transform duration-1000 group-hover:scale-110 delay-100"></div>
        <div class="absolute inset-0 bg-gradient-to-br from-gray-950/80 via-gray-900/50 to-transparent pointer-events-none z-0"></div>

        <div class="flex flex-col md:flex-row h-full min-h-[450px] relative z-10">
          <!-- Content Side -->
          <div class="flex-1 p-10 md:p-20 flex flex-col justify-center order-2 md:order-1 text-white relative">
            <!-- Decorative Badge -->
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 w-fit mb-8 shadow-sm">
              <span class="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
              <span class="text-xs md:text-sm font-bold tracking-wider text-gray-200">عرض خاص</span>
            </div>

            <h2 class="text-4xl md:text-6xl font-black mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-b from-white via-gray-100 to-gray-400">
              {{ banner.title }}
            </h2>
            <p class="text-lg md:text-2xl text-gray-300/90 mb-10 max-w-2xl font-medium leading-relaxed">
              {{ banner.description }}
            </p>
            
            <NuxtLink 
              :to="banner.ctaLink"
              class="group/btn inline-flex items-center gap-4 px-8 py-4 bg-primary text-white font-bold text-lg rounded-full w-fit hover:bg-primary-hover transition-all duration-300 shadow-[0_0_20px_rgba(var(--color-primary-rgb),0.4)] hover:shadow-[0_0_30px_rgba(var(--color-primary-rgb),0.6)] hover:-translate-y-1 overflow-hidden relative"
            >
              <!-- Button Shine Effect -->
              <div class="absolute inset-0 -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"></div>
              
              <span class="relative z-10">{{ banner.ctaText }}</span>
              <div class="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center relative z-10 group-hover/btn:bg-white/30 transition-colors">
                <ArrowLeft class="w-4 h-4 rtl-flip transition-transform duration-300 group-hover/btn:-translate-x-1" />
              </div>
            </NuxtLink>
          </div>
          
          <!-- Image Side -->
          <div class="flex-1 relative order-1 md:order-2 h-[350px] md:h-auto overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent md:bg-gradient-to-r md:from-gray-950 md:via-gray-950/50 md:to-transparent rtl:md:bg-gradient-to-l rtl:md:from-gray-950 rtl:md:via-gray-950/50 rtl:md:to-transparent z-10"></div>
            
            <NuxtImg 
              :src="banner.image" 
              :alt="banner.title"
              class="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105 opacity-80 mix-blend-lighten"
              format="webp"
              quality="90"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

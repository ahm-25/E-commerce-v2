<script setup lang="ts">
import { ArrowLeft } from 'lucide-vue-next'
import type { Banner } from '~/types'

defineProps<{
  hero: Banner
}>()
</script>

<template>
  <section class="relative w-full h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden bg-background">
    <!-- Background Image -->
    <div class="absolute inset-0 w-full h-full">
      <NuxtImg 
        :src="hero.image" 
        :alt="hero.title"
        class="w-full h-full object-cover object-center"
        format="webp"
        quality="90"
        preload
      />
      <!-- Gradient overlay for text readability, particularly on mobile or split layouts -->
      <div 
        class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent md:bg-gradient-to-r md:from-black/5 md:via-black/40 md:to-black/70 rtl:md:bg-gradient-to-l rtl:md:from-black/70 rtl:md:via-black/40 rtl:md:to-black/5"
      ></div>
    </div>

    <!-- Content -->
    <div class="relative container mx-auto px-4 lg:px-12 h-full flex items-end pb-24 md:items-center md:pb-0">
      <div class="max-w-2xl text-white rtl:ml-auto ltr:mr-auto md:px-10 md:bg-black/20 md:backdrop-blur-md md:py-16 md:rounded-3xl border border-white/10 shadow-2xl transition-all animate-fade-in-up">
        <h1 class="text-4xl md:text-5xl lg:text-7xl font-extrabold leading-tight mb-6 drop-shadow-lg tracking-tight">
          {{ hero.title }}
        </h1>
        <p class="text-lg md:text-2xl mb-10 text-white/90 drop-shadow-md max-w-lg leading-relaxed font-medium">
          {{ hero.description }}
        </p>
        <NuxtLink 
          :to="hero.ctaLink"
          class="inline-flex items-center justify-center gap-3 px-10 py-4 md:py-5 md:text-lg bg-surface text-primary rounded-full font-bold hover:bg-white hover:shadow-premium transition-all transform hover:-translate-y-1 active:scale-95 shadow-lg group"
        >
          {{ hero.ctaText }}
          <ArrowLeft class="w-5 h-5 rtl-flip group-hover:-translate-x-1 transition-transform" />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

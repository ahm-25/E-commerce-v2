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
  <div class="relative w-full h-[300px] md:h-[400px] rounded-3xl overflow-hidden bg-background mb-8 flex items-center shadow-premium dark:shadow-premium-dark transition-shadow duration-300">
    <!-- Background Image -->
    <NuxtImg 
      :src="image"
      :alt="title"
      class="absolute inset-0 w-full h-full object-cover object-center"
      format="webp"
      quality="80"
    />
    
    <!-- Gradient Overlay for readability -->
    <div class="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-transparent dark:from-surface/95 dark:via-surface/80"></div>

    <!-- Content -->
    <div class="relative z-10 p-8 md:p-16 max-w-2xl h-full flex flex-col justify-center">
      <h1 class="text-3xl md:text-5xl font-bold text-text-primary mb-4 leading-tight">
        {{ title }}
      </h1>
      <p class="text-base md:text-lg text-text-secondary mb-8 max-w-xl leading-relaxed">
        {{ description }}
      </p>

      <!-- Trust Elements -->
      <div class="flex flex-wrap items-center gap-6 text-sm text-text-primary font-medium">
        <div class="flex items-center gap-2">
          <ShieldCheck class="w-5 h-5 text-accent" />
          <span>جودة عالية</span>
        </div>
        <div class="flex items-center gap-2">
          <Truck class="w-5 h-5 text-accent" />
          <span>توصيل سريع</span>
        </div>
        <div class="flex items-center gap-2">
          <RotateCcw class="w-5 h-5 text-accent" />
          <span>إرجاع سهل</span>
        </div>
      </div>
    </div>
    
    <!-- Count Badge (Optional) -->
    <div v-if="count" class="absolute bottom-8 left-8 z-10 bg-surface/90 backdrop-blur-md px-4 py-2 rounded-full shadow-sm text-sm font-semibold text-text-primary border border-border">
      {{ count }} منتج
    </div>
  </div>
</template>

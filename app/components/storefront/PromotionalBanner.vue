<script setup lang="ts">
import { ArrowLeft } from 'lucide-vue-next'
import type { Banner } from '~/types'

defineProps<{
  banner: Banner
}>()
</script>

<template>
  <section class="py-8 md:py-16 bg-surface">
    <div class="container mx-auto px-4 lg:px-8">
      <div class="relative w-full overflow-hidden rounded-3xl bg-primary dark:bg-surface dark:border dark:border-border">
        <div class="flex flex-col md:flex-row h-full min-h-[400px]">
          <!-- Content Side -->
          <div class="flex-1 p-10 md:p-16 flex flex-col justify-center order-2 md:order-1 text-surface dark:text-text-primary z-10 relative">
            <h2 class="text-3xl md:text-5xl font-bold mb-4 drop-shadow-sm">{{ banner.title }}</h2>
            <p class="text-lg md:text-xl text-surface/80 dark:text-text-secondary mb-8 max-w-md">{{ banner.description }}</p>
            <NuxtLink 
              :to="banner.ctaLink"
              class="inline-flex items-center gap-2 text-sm font-bold hover:text-accent dark:hover:text-accent transition-colors self-start"
            >
              {{ banner.ctaText }}
              <ArrowLeft class="w-4 h-4 rtl-flip" />
            </NuxtLink>
          </div>
          
          <!-- Image Side -->
          <div class="flex-1 relative order-1 md:order-2 h-[300px] md:h-auto overflow-hidden">
            <NuxtImg 
              :src="banner.image" 
              :alt="banner.title"
              class="absolute inset-0 w-full h-full object-cover object-center"
              format="webp"
              quality="85"
              loading="lazy"
            />
            <!-- Soft gradient blend for split layout -->
            <div class="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent dark:from-surface dark:via-surface/20 md:bg-gradient-to-r md:from-primary md:via-primary/20 md:dark:from-surface md:dark:via-surface/20 rtl:md:bg-gradient-to-l rtl:md:from-primary rtl:md:via-primary/20 rtl:md:dark:from-surface rtl:md:dark:via-surface/20"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

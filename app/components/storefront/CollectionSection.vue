<script setup lang="ts">
import { ArrowLeft } from 'lucide-vue-next'
import type { Collection } from '~/types'

defineProps<{
  collections: Collection[]
}>()
</script>

<template>
  <section class="py-16 md:py-24">
    <div class="container mx-auto px-4 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <NuxtLink 
          v-for="(collection, index) in collections.slice(0, 2)" 
          :key="collection.id"
          :to="collection.ctaLink"
          class="group relative w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-3xl overflow-hidden bg-surface shadow-premium block"
        >
          <NuxtImg 
            :src="collection.image" 
            :alt="collection.title"
            class="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            format="webp"
            quality="85"
            loading="lazy"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          
          <div class="absolute inset-0 p-8 md:p-12 flex flex-col justify-end text-white">
            <h3 class="text-3xl md:text-4xl font-bold mb-3 drop-shadow-md">{{ collection.title }}</h3>
            <p v-if="collection.description" class="text-white/90 text-lg mb-6 max-w-sm drop-shadow-sm">{{ collection.description }}</p>
            <span class="inline-flex items-center gap-2 text-sm font-bold bg-white/20 backdrop-blur-md px-6 py-3 rounded-full w-fit hover:bg-white hover:text-primary transition-colors">
              {{ collection.ctaText }}
              <ArrowLeft class="w-4 h-4 rtl-flip" />
            </span>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowLeft } from 'lucide-vue-next'
import type { Collection } from '~/types'

defineProps<{
  collections: Collection[]
}>()
</script>

<template>
  <section class="py-20 md:py-32 bg-background relative overflow-hidden">
    <!-- Subtle background decoration -->
    <div class="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-border/50 to-transparent -translate-y-1/2 pointer-events-none"></div>

    <div class="container mx-auto px-4 lg:px-8 relative z-10">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <NuxtLink 
          v-for="(collection, index) in collections.slice(0, 2)" 
          :key="collection.id"
          :to="collection.ctaLink"
          class="group relative w-full h-[450px] md:h-[550px] lg:h-[650px] rounded-[2.5rem] overflow-hidden bg-surface shadow-premium block border border-border/20 transition-all duration-700 hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] hover:-translate-y-2"
        >
          <!-- Image -->
          <NuxtImg 
            :src="collection.image" 
            :alt="collection.title"
            class="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-110"
            format="webp"
            quality="90"
            loading="lazy"
          />
          
          <!-- Gradient Overlay -->
          <div class="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-900/40 to-black/10 transition-opacity duration-700 group-hover:opacity-90"></div>
          
          <!-- Border Highlight on Hover -->
          <div class="absolute inset-0 border-2 border-white/0 rounded-[2.5rem] group-hover:border-white/10 transition-colors duration-700 pointer-events-none"></div>

          <!-- Content -->
          <div class="absolute inset-0 p-8 md:p-12 lg:p-16 flex flex-col justify-end text-white z-10">
            <div class="transform transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
              <h3 class="text-3xl md:text-5xl font-black mb-4 tracking-tight drop-shadow-lg text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                {{ collection.title }}
              </h3>
              
              <p v-if="collection.description" class="text-gray-200/90 text-lg md:text-xl mb-8 max-w-md drop-shadow-md font-medium leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 h-0 group-hover:h-auto overflow-hidden">
                {{ collection.description }}
              </p>
              
              <span class="inline-flex items-center gap-3 text-sm md:text-base font-bold bg-white/10 backdrop-blur-md border border-white/20 px-8 py-4 rounded-full w-fit hover:bg-white hover:text-black hover:scale-105 transition-all duration-300 shadow-lg">
                {{ collection.ctaText }}
                <ArrowLeft class="w-5 h-5 rtl-flip transition-transform duration-300 group-hover:-translate-x-2" />
              </span>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

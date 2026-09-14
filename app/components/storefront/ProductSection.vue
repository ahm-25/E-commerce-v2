<script setup lang="ts">
import { ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-vue-next'
import type { Product } from '~/types'

const props = defineProps<{
  title: string
  description?: string
  products: Product[]
  viewAllLink?: string
}>()

const scrollContainer = ref<HTMLElement | null>(null)

const scroll = (direction: 'left' | 'right') => {
  if (scrollContainer.value) {
    const scrollAmount = 400
    const currentScroll = scrollContainer.value.scrollLeft
    
    // Adjust logic for RTL
    const isRtl = document.documentElement.dir === 'rtl'
    let targetScroll = 0
    
    if (isRtl) {
      targetScroll = direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount
    } else {
      targetScroll = direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount
    }

    scrollContainer.value.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    })
  }
}
</script>

<template>
  <section class="py-20 md:py-32 relative bg-surface">
    <!-- Subtle background pattern or blob if needed (keeping it clean for now) -->
    <div class="container mx-auto px-4 lg:px-8 relative z-10">
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div class="max-w-2xl relative">
          <!-- Decorative element behind title -->
          <div class="absolute -top-6 -right-6 w-12 h-12 bg-primary/10 rounded-full blur-xl pointer-events-none"></div>
          <h2 class="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4 font-arabic flex items-center gap-4">
            {{ title }}
            <span class="hidden md:block h-[2px] w-24 bg-gray-900 rounded-full mt-2"></span>
          </h2>
          <p v-if="description" class="text-text-secondary text-lg mt-6">{{ description }}</p>
        </div>
        
        <div class="flex items-center gap-6">
          <NuxtLink v-if="viewAllLink" :to="viewAllLink" class="group flex items-center gap-2 px-6 py-2.5 rounded-full bg-background border border-border/50 shadow-sm hover:shadow-md hover:border-primary transition-all duration-300 text-sm font-bold text-text-primary hover:text-primary">
            عرض الكل
            <ArrowLeft class="w-4 h-4 rtl-flip transition-transform duration-300 group-hover:-translate-x-1" />
          </NuxtLink>
          
          <!-- Desktop Navigation Controls -->
          <div class="hidden md:flex gap-3 rtl:mr-2">
            <button @click="scroll('right')" class="w-12 h-12 rounded-full bg-background shadow-premium flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 rtl-flip group border border-border/50 hover:border-primary hover:-translate-y-1" aria-label="Previous">
              <ChevronLeft class="w-6 h-6 text-text-primary group-hover:text-white transition-colors" />
            </button>
            <button @click="scroll('left')" class="w-12 h-12 rounded-full bg-background shadow-premium flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 rtl-flip group border border-border/50 hover:border-primary hover:-translate-y-1" aria-label="Next">
              <ChevronRight class="w-6 h-6 text-text-primary group-hover:text-white transition-colors" />
            </button>
          </div>
        </div>
      </div>

      <div class="relative -mx-4 px-4 md:mx-0 md:px-0">
        
        <div 
          ref="scrollContainer"
          class="flex gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-12 pt-4"
          style="scrollbar-width: none; -ms-overflow-style: none;"
        >
          <StorefrontProductCard 
            v-for="product in products" 
            :key="product.id" 
            :product="product" 
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>

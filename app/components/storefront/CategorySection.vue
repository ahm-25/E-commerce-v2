<script setup lang="ts">
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import type { Category } from '~/types'

defineProps<{
  title: string
  categories: Category[]
}>()

const scrollContainer = ref<HTMLElement | null>(null)

const scroll = (direction: 'left' | 'right') => {
  if (scrollContainer.value) {
    const scrollAmount = 300
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
  <section class="py-20 md:py-32 relative overflow-hidden bg-background">
    <!-- Decorative background elements -->
    <div class="absolute top-0 right-0 w-[40%] h-[60%] bg-primary/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/4"></div>
    <div class="absolute bottom-0 left-0 w-[40%] h-[60%] bg-accent/5 rounded-full blur-[100px] pointer-events-none translate-y-1/2 -translate-x-1/4"></div>
    
    <div class="container mx-auto px-4 lg:px-8 relative z-10">
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight font-arabic flex items-center gap-4">
            {{ title }}
            <span class="hidden md:block h-[2px] w-24 bg-gray-900 rounded-full mt-2"></span>
          </h2>
        </div>
        
        <!-- Desktop Navigation Controls -->
        <div class="hidden md:flex gap-3">
          <button @click="scroll('right')" class="w-12 h-12 rounded-full bg-surface shadow-premium flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 rtl-flip group border border-border/50 hover:border-primary hover:-translate-y-1" aria-label="Previous">
            <ChevronLeft class="w-6 h-6 text-text-primary group-hover:text-white transition-colors" />
          </button>
          <button @click="scroll('left')" class="w-12 h-12 rounded-full bg-surface shadow-premium flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 rtl-flip group border border-border/50 hover:border-primary hover:-translate-y-1" aria-label="Next">
            <ChevronRight class="w-6 h-6 text-text-primary group-hover:text-white transition-colors" />
          </button>
        </div>
      </div>

      <!-- Scrollable Container -->
      <div class="relative -mx-4 px-4 md:mx-0 md:px-0">
        <!-- Optional fading edges -->
        <div class="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none hidden md:block"></div>
        <div class="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none hidden md:block"></div>
        
        <div 
          ref="scrollContainer"
          class="flex gap-4 md:gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8 pt-4"
          style="scrollbar-width: none; -ms-overflow-style: none;"
        >
          <StorefrontCategoryCard 
            v-for="category in categories" 
            :key="category.id" 
            :category="category" 
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

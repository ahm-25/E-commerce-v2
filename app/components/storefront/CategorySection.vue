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
  <section class="py-16 md:py-24 bg-surface">
    <div class="container mx-auto px-4 lg:px-8">
      <div class="flex items-center justify-between mb-10">
        <h2 class="text-2xl md:text-3xl font-bold text-text-primary">{{ title }}</h2>
        
        <!-- Desktop Navigation Controls -->
        <div class="hidden md:flex gap-2">
          <!-- Flip icons for RTL context so arrows point naturally -->
          <button @click="scroll('right')" class="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-background transition-colors rtl-flip" aria-label="Previous">
            <ChevronLeft class="w-5 h-5 text-text-primary" />
          </button>
          <button @click="scroll('left')" class="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-background transition-colors rtl-flip" aria-label="Next">
            <ChevronRight class="w-5 h-5 text-text-primary" />
          </button>
        </div>
      </div>

      <!-- Scrollable Container -->
      <div 
        ref="scrollContainer"
        class="flex gap-4 md:gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 -mx-4 px-4 md:mx-0 md:px-0"
        style="scrollbar-width: none; -ms-overflow-style: none;"
      >
        <StorefrontCategoryCard 
          v-for="category in categories" 
          :key="category.id" 
          :category="category" 
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>

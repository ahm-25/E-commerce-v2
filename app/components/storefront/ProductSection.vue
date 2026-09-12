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
  <section class="py-16 md:py-24">
    <div class="container mx-auto px-4 lg:px-8">
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div class="max-w-2xl">
          <h2 class="text-3xl md:text-4xl font-bold text-text-primary mb-4">{{ title }}</h2>
          <p v-if="description" class="text-text-secondary text-lg">{{ description }}</p>
        </div>
        
        <div class="flex items-center gap-4">
          <NuxtLink v-if="viewAllLink" :to="viewAllLink" class="inline-flex items-center gap-2 text-sm font-bold hover:text-accent transition-colors">
            عرض الكل
            <ArrowLeft class="w-4 h-4 rtl-flip" />
          </NuxtLink>
          
          <!-- Desktop Navigation Controls -->
          <div class="hidden md:flex gap-2 mr-4 rtl:ml-4 rtl:mr-0">
            <button @click="scroll('right')" class="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-background transition-colors rtl-flip" aria-label="Previous">
              <ChevronLeft class="w-5 h-5 text-text-primary" />
            </button>
            <button @click="scroll('left')" class="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-background transition-colors rtl-flip" aria-label="Next">
              <ChevronRight class="w-5 h-5 text-text-primary" />
            </button>
          </div>
        </div>
      </div>

      <!-- Scrollable Container -->
      <div 
        ref="scrollContainer"
        class="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8 -mx-4 px-4 md:mx-0 md:px-0"
        style="scrollbar-width: none; -ms-overflow-style: none;"
      >
        <StorefrontProductCard 
          v-for="product in products" 
          :key="product.id" 
          :product="product" 
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

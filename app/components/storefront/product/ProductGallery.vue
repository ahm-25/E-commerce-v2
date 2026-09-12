<script setup lang="ts">
import { ref } from 'vue'
import { ChevronRight, ChevronLeft, Expand } from 'lucide-vue-next'
import type { ProductImage } from '~/types'

const props = defineProps<{
  images: ProductImage[]
}>()

const activeIndex = ref(0)

const nextImage = () => {
  if (activeIndex.value < props.images.length - 1) {
    activeIndex.value++
  } else {
    activeIndex.value = 0
  }
}

const prevImage = () => {
  if (activeIndex.value > 0) {
    activeIndex.value--
  } else {
    activeIndex.value = props.images.length - 1
  }
}

const setActiveImage = (index: number) => {
  activeIndex.value = index
}
</script>

<template>
  <div class="flex flex-col-reverse md:flex-row gap-4">
    <!-- Thumbnails (Bottom on mobile, Left on desktop) -->
    <div class="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible snap-x md:w-24 shrink-0 no-scrollbar">
      <button 
        v-for="(img, index) in images" 
        :key="img.id"
        @click="setActiveImage(index)"
        class="relative w-20 md:w-24 aspect-square rounded-xl overflow-hidden shrink-0 snap-start border-2 transition-all duration-200"
        :class="activeIndex === index ? 'border-primary' : 'border-transparent hover:border-border'"
        :aria-label="`عرض صورة ${index + 1}`"
      >
        <NuxtImg 
          :src="img.url" 
          :alt="img.alt"
          class="w-full h-full object-cover"
          format="webp"
          quality="60"
        />
        <div v-if="activeIndex !== index" class="absolute inset-0 bg-surface/20"></div>
      </button>
    </div>

    <!-- Main Image -->
    <div class="relative flex-grow bg-background rounded-2xl overflow-hidden aspect-[4/5] md:aspect-auto md:min-h-[600px] group">
      <!-- Main image with crossfade (using simple v-show for now, or just keying NuxtImg) -->
      <NuxtImg 
        :key="images[activeIndex].id"
        :src="images[activeIndex].url" 
        :alt="images[activeIndex].alt"
        class="w-full h-full object-cover object-center animate-fade-in-up"
        format="webp"
        quality="90"
        loading="lazy"
      />

      <!-- Expand Button -->
      <button class="absolute top-4 right-4 z-10 p-2 bg-surface/80 backdrop-blur-sm rounded-full text-text-secondary hover:text-primary transition-colors opacity-0 group-hover:opacity-100 hidden md:block">
        <Expand class="w-5 h-5" />
      </button>

      <!-- Navigation Arrows -->
      <button 
        @click="prevImage"
        class="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-surface/90 shadow-premium backdrop-blur-sm rounded-full text-text-primary hover:text-primary transition-all md:opacity-0 group-hover:opacity-100 hover:scale-105"
        aria-label="الصورة السابقة"
      >
        <ChevronLeft class="w-6 h-6" />
      </button>
      
      <button 
        @click="nextImage"
        class="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-surface/90 shadow-premium backdrop-blur-sm rounded-full text-text-primary hover:text-primary transition-all md:opacity-0 group-hover:opacity-100 hover:scale-105"
        aria-label="الصورة التالية"
      >
        <ChevronRight class="w-6 h-6" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>

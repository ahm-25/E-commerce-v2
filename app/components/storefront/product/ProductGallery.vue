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
  <div class="flex flex-col-reverse lg:flex-row gap-5 h-full">
    <!-- Thumbnails (Bottom on mobile/tablet, Left on desktop) -->
    <div class="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-y-auto snap-x w-full lg:w-28 shrink-0 no-scrollbar pb-2 lg:pb-0 lg:max-h-[700px]">
      <button 
        v-for="(img, index) in images" 
        :key="img.id"
        @click="setActiveImage(index)"
        class="relative w-20 lg:w-full aspect-[4/5] rounded-2xl overflow-hidden shrink-0 snap-start transition-all duration-300 group"
        :aria-label="`عرض صورة ${index + 1}`"
      >
        <NuxtImg 
          :src="img.url" 
          :alt="img.alt"
          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          :class="activeIndex === index ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'"
          format="webp"
          quality="60"
        />
        <!-- Active indicator -->
        <div 
          class="absolute inset-0 border-2 rounded-2xl transition-all duration-300 pointer-events-none"
          :class="activeIndex === index ? 'border-primary' : 'border-transparent'"
        ></div>
        <div v-if="activeIndex === index" class="absolute inset-0 bg-primary/10 pointer-events-none"></div>
      </button>
    </div>

    <!-- Main Image -->
    <div class="relative flex-grow bg-surface rounded-[2.5rem] overflow-hidden aspect-[4/5] lg:aspect-auto lg:h-[700px] group shadow-premium">
      <!-- Main image with crossfade -->
      <NuxtImg 
        :key="images[activeIndex].id"
        :src="images[activeIndex].url" 
        :alt="images[activeIndex].alt"
        class="w-full h-full object-cover object-center transition-all duration-700 animate-[fadeIn_0.5s_ease-out]"
        format="webp"
        quality="95"
        loading="lazy"
      />

      <!-- Expand Button -->
      <button class="absolute top-6 right-6 z-10 p-3 bg-white/20 backdrop-blur-xl rounded-full text-gray-800 hover:text-primary hover:bg-white transition-all duration-300 opacity-0 group-hover:opacity-100 hidden md:block shadow-lg hover:scale-110">
        <Expand class="w-5 h-5" />
      </button>

      <!-- Navigation Arrows -->
      <button 
        @click="prevImage"
        class="absolute left-6 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/40 backdrop-blur-xl shadow-lg rounded-full text-gray-900 hover:text-white hover:bg-primary transition-all duration-300 md:opacity-0 group-hover:opacity-100 hover:scale-110"
        aria-label="الصورة السابقة"
      >
        <ChevronLeft class="w-6 h-6" />
      </button>
      
      <button 
        @click="nextImage"
        class="absolute right-6 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/40 backdrop-blur-xl shadow-lg rounded-full text-gray-900 hover:text-white hover:bg-primary transition-all duration-300 md:opacity-0 group-hover:opacity-100 hover:scale-110"
        aria-label="الصورة التالية"
      >
        <ChevronRight class="w-6 h-6" />
      </button>
    </div>
  </div>
</template>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0.5; transform: scale(0.98); }
  to { opacity: 1; transform: scale(1); }
}
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>

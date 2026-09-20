<script setup lang="ts">
import { ArrowLeft } from 'lucide-vue-next'
import type { OfferProduct } from '~/stores/offers'
import OfferCountdown from './OfferCountdown.vue'

defineProps<{
  offer: OfferProduct
}>()

const handleExpired = () => {
  // Can trigger a refresh or hide the offer via parent
}
</script>

<template>
  <div class="group flex flex-col md:flex-row bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-300 transition-colors duration-300 shadow-sm hover:shadow-md">
    <!-- Image -->
    <div class="relative w-full md:w-2/5 aspect-[4/3] md:aspect-auto md:min-h-[240px] bg-[#f9f9f9] overflow-hidden">
      <!-- Badge -->
      <div class="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <span class="px-3 py-1.5 bg-red-600 text-white text-xs font-bold uppercase tracking-widest font-arabic rounded-full">
          {{ offer.badge }}
        </span>
      </div>

      <NuxtLink :to="`/products/${offer.slug}`" class="block w-full h-full">
        <NuxtImg 
          :src="offer.images[0].url" 
          :alt="offer.name"
          class="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          format="webp"
          quality="85"
          loading="lazy"
        />
      </NuxtLink>
    </div>

    <!-- Content -->
    <div class="flex flex-col justify-center p-6 md:p-8 w-full md:w-3/5">
      <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
        <div>
          <NuxtLink :to="`/categories/${offer.category?.slug}`" v-if="offer.category" class="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors mb-2 inline-block font-arabic">
            {{ offer.category.name }}
          </NuxtLink>
          <NuxtLink :to="`/products/${offer.slug}`">
            <h3 class="text-xl md:text-2xl font-bold text-gray-900 line-clamp-2 hover:text-gray-600 transition-colors font-arabic">
              {{ offer.name }}
            </h3>
          </NuxtLink>
        </div>
      </div>

      <!-- Price -->
      <div class="flex items-center gap-3 mb-6">
        <span class="text-2xl font-bold text-gray-900 font-arabic">{{ offer.price.toLocaleString('ar-EG') }} ج.م</span>
        <span v-if="offer.compareAtPrice" class="text-lg font-medium text-gray-400 line-through font-arabic">
          {{ offer.compareAtPrice.toLocaleString('ar-EG') }} ج.م
        </span>
      </div>

      <!-- Countdown -->
      <div class="mb-6 flex items-center justify-between" v-if="offer.expiresAt">
        <div class="flex flex-col gap-1.5">
          <span class="text-xs text-gray-500 font-medium font-arabic">ينتهي العرض خلال</span>
          <OfferCountdown :expiresAt="offer.expiresAt" @expired="handleExpired" />
        </div>
      </div>

      <!-- Action -->
      <div class="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
        <NuxtLink 
          :to="`/products/${offer.slug}`"
          class="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white text-sm font-bold tracking-wide rounded-full hover:bg-gray-800 transition-colors font-arabic w-full sm:w-auto"
        >
          تسوق الآن
          <ArrowLeft class="w-4 h-4" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

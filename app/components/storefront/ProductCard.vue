<script setup lang="ts">
import { Heart, ShoppingBag, Star } from 'lucide-vue-next'
import { useShopStore } from '~/stores/useStore'
import type { Product } from '~/types'

const props = withDefaults(defineProps<{
  product: Product
  viewMode?: 'grid' | 'list'
}>(), {
  viewMode: 'grid'
})

const shopStore = useShopStore()
</script>

<template>
  <div 
    class="group flex relative transition-all duration-300 ease-in-out"
    :class="viewMode === 'grid' 
      ? 'flex-col gap-3 bg-transparent' 
      : 'flex-row items-start gap-6 bg-transparent border-b border-gray-200 pb-6'"
  >
    <!-- Image Area -->
    <div 
      class="relative bg-[#f5f5f5] overflow-hidden flex-shrink-0 w-full"
      :class="[
        viewMode === 'grid' ? 'aspect-[3/4]' : 'w-32 h-40 md:w-48 md:h-60',
      ]"
    >
      <!-- Badges -->
      <div class="absolute top-3 right-3 z-20 flex flex-col gap-1.5">
        <span v-if="product.badge" class="px-2 py-1 bg-red-700 text-white text-[10px] font-bold uppercase tracking-widest font-arabic">
          {{ product.badge }}
        </span>
        <span v-if="product.isNew" class="px-2 py-1 bg-black text-white text-[10px] font-bold uppercase tracking-widest font-arabic">
          جديد
        </span>
      </div>

      <!-- Wishlist Action -->
      <button 
        @click.prevent="shopStore.toggleWishlist(product.id)"
        class="absolute top-3 left-3 z-20 p-2 bg-white/70 backdrop-blur-md rounded-full text-gray-900 hover:text-rose-600 transition-colors duration-300 shadow-sm"
        aria-label="Toggle Wishlist"
      >
        <Heart :class="{'fill-rose-600 text-rose-600': shopStore.isInWishlist(product.id)}" class="w-4 h-4 transition-colors" stroke-width="1.5" />
      </button>

      <NuxtLink :to="`/products/${product.slug}`" class="block w-full h-full">
        <NuxtImg 
          :src="product.images?.[0]?.url" 
          :alt="product.name"
          class="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
          format="webp"
          quality="85"
          loading="lazy"
        />
        <!-- Hover Image (if available) -->
        <NuxtImg 
          v-if="product.images?.[1]?.url"
          :src="product.images[1].url" 
          :alt="product.name"
          class="absolute inset-0 w-full h-full object-cover object-center opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          format="webp"
          quality="85"
          loading="lazy"
        />
      </NuxtLink>

      <!-- Add to Cart Action (Desktop Hover) -->
      <div class="absolute bottom-0 left-0 w-full translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out pointer-events-none md:block hidden z-20">
        <button 
          @click.prevent="shopStore.addToCart(product)"
          class="w-full py-3.5 bg-white/95 backdrop-blur-md text-black text-xs tracking-widest font-bold uppercase flex items-center justify-center gap-2 hover:bg-black hover:text-white transition-colors pointer-events-auto font-arabic border-t border-gray-200"
        >
          أضف للحقيبة
        </button>
      </div>
    </div>

    <!-- Product Info -->
    <div class="flex flex-col gap-1 pt-2 w-full text-start items-start font-arabic">
      
      <NuxtLink :to="`/products/${product.slug}`" class="group/title w-full">
        <h3 class="text-sm font-bold text-gray-900 line-clamp-1 group-hover/title:text-gray-500 transition-colors w-full">
          {{ product.name }}
        </h3>
      </NuxtLink>

      <div class="flex items-center gap-2 mt-0.5 w-full">
        <span class="text-sm font-medium text-gray-700">{{ product.price.toLocaleString('ar-EG') }} ج.م</span>
        <span v-if="product.compareAtPrice" class="text-xs font-medium text-gray-400 line-through">
          {{ product.compareAtPrice.toLocaleString('ar-EG') }} ج.م
        </span>
      </div>

      <!-- Colors (Minimalist) -->
      <div v-if="product.colors?.length" class="flex items-center gap-1.5 mt-2 w-full">
        <div 
          v-for="color in product.colors.slice(0, 4)" 
          :key="color"
          class="w-3 h-3 rounded-full border border-gray-300 cursor-pointer hover:border-gray-900 transition-colors"
          :style="{ backgroundColor: color }"
          :title="color"
        ></div>
      </div>

      <!-- Mobile Add to Cart -->
      <button 
        @click.prevent="shopStore.addToCart(product)"
        class="mt-3 w-full py-2 border border-gray-900 text-gray-900 text-xs font-bold uppercase tracking-widest flex items-center justify-center hover:bg-gray-900 hover:text-white transition-colors duration-300 md:hidden font-arabic"
      >
        إضافة
      </button>
    </div>
  </div>
</template>

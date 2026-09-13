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
    class="group flex relative transition-all duration-500 ease-out"
    :class="viewMode === 'grid' 
      ? 'flex-col gap-4 bg-surface rounded-[2rem] p-3 border border-border/30 hover:border-border hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:-translate-y-2' 
      : 'flex-row items-center gap-6 bg-surface border border-border/50 rounded-[2rem] p-4 hover:shadow-premium hover:-translate-y-1'"
  >
    <!-- Image Area -->
    <div 
      class="relative bg-background overflow-hidden flex-shrink-0"
      :class="[
        viewMode === 'grid' ? 'aspect-[4/5] w-full rounded-[1.5rem]' : 'w-32 h-32 md:w-48 md:h-48 rounded-2xl',
      ]"
    >
      <!-- Badges with Glassmorphism -->
      <div class="absolute top-3 right-3 z-20 flex flex-col gap-2">
        <span v-if="product.badge" class="px-3 py-1 bg-red-500/90 backdrop-blur-md text-white text-xs font-black rounded-full shadow-lg border border-red-500/20">
          {{ product.badge }}
        </span>
        <span v-if="product.isNew" class="px-3 py-1 bg-gray-900/90 backdrop-blur-md text-white text-xs font-bold rounded-full shadow-lg border border-white/10">
          جديد
        </span>
      </div>

      <!-- Wishlist Action with Glassmorphism -->
      <button 
        @click.prevent="shopStore.toggleWishlist(product.id)"
        class="absolute top-3 left-3 z-20 p-2.5 bg-white/20 backdrop-blur-md border border-white/40 rounded-full text-white hover:text-rose-500 hover:bg-white hover:border-white hover:scale-110 transition-all duration-300 shadow-sm"
        aria-label="Toggle Wishlist"
      >
        <Heart :class="{'fill-rose-500 text-rose-500': shopStore.isInWishlist(product.id)}" class="w-4 h-4 md:w-5 md:h-5 transition-colors" />
      </button>

      <NuxtLink :to="`/products/${product.slug}`" class="block w-full h-full bg-gray-100">
        <NuxtImg 
          :src="product.images?.[0]?.url" 
          :alt="product.name"
          class="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
          format="webp"
          quality="85"
          loading="lazy"
        />
        <!-- Hover Image (if available) -->
        <NuxtImg 
          v-if="product.images?.[1]?.url"
          :src="product.images[1].url" 
          :alt="product.name"
          class="absolute inset-0 w-full h-full object-cover object-center opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:scale-110"
          format="webp"
          quality="85"
          loading="lazy"
        />
        
        <!-- Gradient Overlay on Hover -->
        <div class="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      </NuxtLink>

      <!-- Add to Cart Action (Desktop Hover) -->
      <div class="absolute bottom-4 left-0 w-full px-3 translate-y-[120%] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out pointer-events-none md:block hidden z-20">
        <button 
          @click.prevent="shopStore.addToCart(product)"
          class="w-full py-3 bg-white/95 backdrop-blur-md text-gray-900 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-900 hover:text-white shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 pointer-events-auto border border-white/50"
        >
          <ShoppingBag class="w-5 h-5" />
          أضف للسلة
        </button>
      </div>
    </div>

    <!-- Product Info -->
    <div class="flex flex-col gap-2 pt-1 pb-2 px-2" :class="{'w-full': viewMode === 'list'}">
      <!-- Rating and Reviews -->
      <div class="flex items-center gap-2 mb-1">
        <div class="flex items-center gap-1 bg-amber-100/60 px-2 py-0.5 rounded-md border border-amber-200/50">
          <Star class="w-3 h-3 fill-amber-500 text-amber-500" />
          <span class="text-sm font-black text-amber-700">{{ product.rating }}</span>
        </div>
        <span class="text-xs font-bold text-text-secondary/70">({{ product.reviewsCount }})</span>
      </div>
      
      <NuxtLink :to="`/products/${product.slug}`" class="group/title">
        <h3 class="text-lg font-bold text-text-primary line-clamp-1 group-hover/title:text-primary transition-colors">
          {{ product.name }}
        </h3>
      </NuxtLink>

      <div class="flex flex-wrap items-center gap-3 mt-1.5">
        <span class="text-xl font-black text-primary tracking-tight drop-shadow-sm">{{ product.price.toLocaleString('ar-EG') }} ج.م</span>
        <span v-if="product.compareAtPrice" class="text-sm font-bold text-text-secondary/50 line-through decoration-red-500/30 decoration-2">
          {{ product.compareAtPrice.toLocaleString('ar-EG') }} ج.م
        </span>
      </div>

      <!-- Colors -->
      <div v-if="product.colors?.length" class="flex items-center gap-1.5 mt-3">
        <div 
          v-for="color in product.colors.slice(0, 4)" 
          :key="color"
          class="w-5 h-5 rounded-full border-2 border-white shadow-[0_2px_5px_rgba(0,0,0,0.1)] hover:scale-125 transition-transform duration-300 cursor-pointer"
          :style="{ backgroundColor: color }"
          :title="color"
        ></div>
        <span v-if="product.colors.length > 4" class="text-xs font-bold text-text-secondary ml-1 bg-surface px-2 py-1 rounded-full border border-border shadow-sm">
          +{{ product.colors.length - 4 }}
        </span>
      </div>

      <!-- Mobile Add to Cart (always visible on small screens) -->
      <button 
        @click.prevent="shopStore.addToCart(product)"
        class="mt-4 w-full py-3.5 bg-gray-900 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary transition-all duration-300 md:hidden active:scale-95 shadow-md"
      >
        <ShoppingBag class="w-5 h-5" />
        أضف للسلة
      </button>
    </div>
  </div>
</template>

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
    class="group flex gap-4 snap-start"
    :class="viewMode === 'grid' ? 'flex-col min-w-[200px] md:min-w-[280px]' : 'flex-row items-center bg-surface border border-border rounded-2xl p-4 transition-shadow hover:shadow-premium'"
  >
    <!-- Image Area -->
    <div 
      class="relative bg-background rounded-2xl overflow-hidden group-hover:shadow-premium transition-shadow duration-300 flex-shrink-0"
      :class="viewMode === 'grid' ? 'aspect-[3/4] w-full' : 'w-32 h-32 md:w-48 md:h-48'"
    >
      <!-- Badges -->
      <div class="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <span v-if="product.badge" class="px-2 py-1 bg-accent text-white text-xs font-bold rounded-full">
          {{ product.badge }}
        </span>
        <span v-if="product.isNew" class="px-2 py-1 bg-primary text-surface text-xs font-bold rounded-full">
          جديد
        </span>

      </div>

      <!-- Wishlist Action -->
      <button 
        @click.prevent="shopStore.toggleWishlist(product.id)"
        class="absolute top-4 left-4 z-10 p-2 bg-surface/80 backdrop-blur-sm rounded-full text-text-secondary hover:text-accent transition-colors"
        aria-label="Toggle Wishlist"
      >
        <Heart :class="{'fill-accent text-accent': shopStore.isInWishlist(product.id)}" class="w-5 h-5 transition-colors" />
      </button>

      <NuxtLink :to="`/products/${product.slug}`" class="block w-full h-full">
        <NuxtImg 
          :src="product.images?.[0]?.url" 
          :alt="product.name"
          class="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          format="webp"
          quality="80"
          loading="lazy"
        />
        <!-- Hover Image (if available) -->
        <!-- Hover Image (if available) -->
        <NuxtImg 
          v-if="product.images?.[1]?.url"
          :src="product.images[1].url" 
          :alt="product.name"
          class="absolute inset-0 w-full h-full object-cover object-center opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          format="webp"
          quality="80"
          loading="lazy"
        />
      </NuxtLink>

      <!-- Add to Cart Action (Desktop Hover) -->
      <div class="absolute bottom-4 left-0 w-full px-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none md:block hidden z-10">
        <button 
          @click.prevent="shopStore.addToCart(product)"
          class="w-full py-3 bg-primary text-surface rounded-full font-bold flex items-center justify-center gap-2 hover:bg-primary-hover pointer-events-auto"
        >
          <ShoppingBag class="w-4 h-4" />
          أضف للسلة
        </button>
      </div>
    </div>

    <!-- Product Info -->
    <div class="flex flex-col gap-2">
      <!-- Rating -->
      <div class="flex items-center gap-1.5">
        <Star class="w-4 h-4 fill-amber-400 text-amber-400" />
        <span class="text-sm font-medium text-text-primary">{{ product.rating }}</span>
        <span class="text-sm text-text-secondary">({{ product.reviewsCount }})</span>
      </div>
      
      <NuxtLink :to="`/products/${product.slug}`">
        <h3 class="text-base md:text-lg font-semibold text-text-primary line-clamp-1 group-hover:text-accent transition-colors">
          {{ product.name }}
        </h3>
      </NuxtLink>

      <div class="flex items-center gap-3">
        <span class="text-lg md:text-xl font-bold text-primary">{{ product.price.toLocaleString('ar-EG') }} ج.م</span>
        <span v-if="product.compareAtPrice" class="text-sm md:text-base text-text-secondary line-through">
          {{ product.compareAtPrice.toLocaleString('ar-EG') }} ج.م
        </span>
      </div>

      <!-- Colors -->
      <div v-if="product.colors?.length" class="flex items-center gap-1.5 mt-1">
        <div 
          v-for="color in product.colors.slice(0, 4)" 
          :key="color"
          class="w-3.5 h-3.5 rounded-full border border-black/10 shadow-sm"
          :style="{ backgroundColor: color }"
          :title="color"
        ></div>
        <span v-if="product.colors.length > 4" class="text-xs text-text-secondary ml-1">
          +{{ product.colors.length - 4 }}
        </span>
      </div>

      <!-- Mobile Add to Cart (always visible on small screens) -->
      <button 
        @click.prevent="shopStore.addToCart(product)"
        class="mt-2 w-full py-2.5 bg-background border border-border text-primary rounded-full font-medium flex items-center justify-center gap-2 hover:bg-border transition-colors md:hidden"
      >
        <ShoppingBag class="w-4 h-4" />
        أضف
      </button>
    </div>
  </div>
</template>

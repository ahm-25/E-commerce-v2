<script setup lang="ts">
import { Trash2, ShoppingBag } from 'lucide-vue-next'
import type { CartItem } from '~/types'
import CartItemComponent from './CartItem.vue'

const props = defineProps<{
  items: CartItem[]
}>()

const emit = defineEmits<{
  (e: 'update:quantity', id: string, quantity: number): void
  (e: 'remove', id: string): void
  (e: 'save-to-wishlist', id: string): void
  (e: 'clear-cart'): void
}>()
</script>

<template>
  <div class="bg-white rounded-3xl p-4 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6 pb-6 border-b border-gray-100">
      <div class="flex items-center gap-3">
        <ShoppingBag class="w-6 h-6 text-primary" />
        <h2 class="text-xl md:text-2xl font-black text-gray-900">المنتجات ({{ items.length }})</h2>
      </div>
      <button 
        @click="emit('clear-cart')"
        class="flex items-center gap-2 text-sm font-bold text-red-500 hover:text-red-600 transition-colors hover:bg-red-50 px-3 py-2 rounded-xl"
      >
        <Trash2 class="w-4 h-4" />
        <span class="hidden md:inline">إفراغ العربة</span>
      </button>
    </div>

    <!-- Items List -->
    <div class="flex flex-col">
      <CartItemComponent 
        v-for="item in items" 
        :key="item.id" 
        :item="item"
        @update:quantity="(id, q) => emit('update:quantity', id, q)"
        @remove="(id) => emit('remove', id)"
        @save-to-wishlist="(id) => emit('save-to-wishlist', id)"
      />
    </div>

    <!-- Mobile Footer Actions -->
    <div class="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row gap-4 items-center justify-between md:hidden">
      <NuxtLink 
        to="/products"
        class="w-full text-center py-3.5 bg-gray-50 hover:bg-gray-100 text-gray-900 rounded-xl font-bold transition-colors"
      >
        متابعة التسوق
      </NuxtLink>
    </div>
  </div>
</template>

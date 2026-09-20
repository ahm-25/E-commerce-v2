<script setup lang="ts">
import { ref } from 'vue'
import { Plus, Minus, Trash2, Heart } from 'lucide-vue-next'
import type { CartItem } from '~/types'

const props = defineProps<{
  item: CartItem
}>()

const emit = defineEmits<{
  (e: 'update:quantity', id: string, quantity: number): void
  (e: 'remove', id: string): void
  (e: 'save-to-wishlist', id: string): void
}>()

const updating = ref(false)

const increaseQuantity = () => {
  emit('update:quantity', props.item.id, props.item.quantity + 1)
}

const decreaseQuantity = () => {
  if (props.item.quantity > 1) {
    emit('update:quantity', props.item.id, props.item.quantity - 1)
  }
}
</script>

<template>
  <div class="flex gap-4 md:gap-6 py-6 border-b border-gray-100 last:border-0 group relative bg-white transition-colors hover:bg-gray-50/50 rounded-2xl p-4 md:p-6 -mx-4 md:mx-0">
    <!-- Product Image -->
    <NuxtLink :to="`/products/${item.slug}`" class="shrink-0">
      <div class="w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 shadow-sm relative group-hover:shadow-md transition-shadow">
        <NuxtImg 
          :src="item.image" 
          :alt="item.name"
          class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          format="webp"
          quality="80"
        />
        <div v-if="item.compareAtPrice" class="absolute top-2 right-2 bg-red-50 text-red-600 text-[10px] md:text-xs font-bold px-2 py-0.5 rounded-full border border-red-100">
          -{{ Math.round(((item.compareAtPrice - item.price) / item.compareAtPrice) * 100) }}%
        </div>
      </div>
    </NuxtLink>

    <!-- Product Details -->
    <div class="flex-1 flex flex-col justify-between">
      <div class="flex justify-between items-start gap-4">
        <div class="min-w-0 flex-1">
          <NuxtLink :to="`/products/${item.slug}`">
            <h3 class="text-sm md:text-base font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-2 leading-snug mb-1">
              {{ item.name }}
            </h3>
          </NuxtLink>
          
          <div v-if="item.color || item.size" class="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs md:text-sm text-gray-500 mt-2">
            <span v-if="item.color" class="flex items-center gap-1.5">
              اللون: <span class="font-medium text-gray-700">{{ item.color }}</span>
            </span>
            <span v-if="item.color && item.size" class="w-1 h-1 rounded-full bg-gray-300"></span>
            <span v-if="item.size" class="flex items-center gap-1.5">
              المقاس: <span class="font-medium text-gray-700">{{ item.size }}</span>
            </span>
          </div>

          <!-- Mobile Price -->
          <div class="md:hidden flex items-baseline flex-wrap gap-x-2 gap-y-0.5 mt-2">
            <span class="font-bold text-gray-900 text-sm whitespace-nowrap">{{ item.price.toLocaleString() }} ج.م</span>
            <span v-if="item.compareAtPrice" class="text-[11px] text-gray-400 line-through whitespace-nowrap">{{ item.compareAtPrice.toLocaleString() }} ج.م</span>
          </div>
        </div>

        <!-- Desktop Price (Hidden on mobile, shown in table format later if needed, but keeping here for standard layout) -->
        <div class="hidden md:flex flex-col items-end text-left min-w-[100px]">
          <span class="font-bold text-gray-900">{{ item.price.toLocaleString() }} ج.م</span>
          <span v-if="item.compareAtPrice" class="text-xs text-gray-400 line-through mt-0.5">{{ item.compareAtPrice.toLocaleString() }} ج.م</span>
        </div>
      </div>

      <div class="flex items-center justify-between gap-2 mt-4">
        <!-- Quantity Selector -->
        <div class="flex items-center shrink-0 bg-gray-50 border border-gray-200 rounded-lg p-1">
          <button 
            @click="increaseQuantity"
            class="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-md bg-white text-gray-600 hover:text-gray-900 hover:shadow-sm border border-transparent hover:border-gray-200 transition-all active:scale-95"
            aria-label="زيادة الكمية"
          >
            <Plus class="w-3.5 h-3.5 md:w-4 md:h-4" />
          </button>
          
          <span class="w-8 md:w-12 text-center text-sm md:text-base font-bold text-gray-900 select-none">
            {{ item.quantity }}
          </span>
          
          <button 
            @click="decreaseQuantity"
            :disabled="item.quantity <= 1"
            class="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-md bg-white text-gray-600 hover:text-gray-900 hover:shadow-sm border border-transparent hover:border-gray-200 transition-all active:scale-95 disabled:opacity-50 disabled:hover:shadow-none disabled:hover:border-transparent disabled:active:scale-100"
            aria-label="تقليل الكمية"
          >
            <Minus class="w-3.5 h-3.5 md:w-4 md:h-4" />
          </button>
        </div>

        <!-- Actions -->
        <div class="flex items-center gap-1 md:gap-2 shrink-0">
          <button 
            @click="emit('save-to-wishlist', item.productId)"
            class="p-2 text-gray-400 hover:text-primary transition-colors hover:bg-primary/5 rounded-full"
            aria-label="حفظ في المفضلة"
            title="حفظ في المفضلة"
          >
            <Heart class="w-4 h-4 md:w-5 md:h-5" />
          </button>
          <button 
            @click="emit('remove', item.id)"
            class="p-2 text-gray-400 hover:text-red-500 transition-colors hover:bg-red-50 rounded-full"
            aria-label="حذف المنتج"
            title="حذف المنتج"
          >
            <Trash2 class="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ShoppingBag, Heart, Check, Zap } from 'lucide-vue-next'
import { useShopStore } from '~/stores/useStore'
import type { Product } from '~/types'
import { useRouter } from 'vue-router'

const props = defineProps<{
  product: Product
  quantity: number
  options?: Record<string, string>
}>()

const shopStore = useShopStore()
const router = useRouter()

const isAdding = ref(false)
const isAdded = ref(false)

const handleAddToCart = async () => {
  if (isAdding.value) return
  
  isAdding.value = true
  
  // Simulate network request
  await new Promise(resolve => setTimeout(resolve, 600))
  
  shopStore.addToCart(props.product, props.quantity, props.options)
  
  isAdding.value = false
  isAdded.value = true
  
  setTimeout(() => {
    isAdded.value = false
  }, 2000)
}

const handleBuyNow = async () => {
  await handleAddToCart()
  // Navigate to checkout or cart
  router.push('/checkout')
}
</script>

<template>
  <div class="flex flex-col gap-3 w-full">
    <div class="flex items-stretch gap-3">
      <!-- Add to Cart (Primary) -->
      <button 
        @click="handleAddToCart"
        :disabled="isAdding || isAdded || product.stock === 0"
        class="flex-grow py-4 px-6 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-80"
        :class="isAdded ? 'bg-green-600 text-white' : 'bg-primary text-surface hover:bg-primary-hover shadow-premium'"
      >
        <template v-if="isAdded">
          <Check class="w-5 h-5" />
          تمت الإضافة
        </template>
        <template v-else-if="isAdding">
          <div class="w-5 h-5 border-2 border-surface border-t-transparent rounded-full animate-spin"></div>
          جاري الإضافة...
        </template>
        <template v-else-if="product.stock === 0">
          نفدت الكمية
        </template>
        <template v-else>
          <ShoppingBag class="w-5 h-5" />
          أضف إلى السلة
        </template>
      </button>

      <!-- Wishlist -->
      <button 
        @click="shopStore.toggleWishlist(product.id)"
        class="w-16 flex-shrink-0 flex items-center justify-center rounded-xl border-2 transition-colors duration-300 hover:border-primary group"
        :class="shopStore.isInWishlist(product.id) ? 'border-primary bg-primary/5' : 'border-border bg-surface'"
        aria-label="أضف للمفضلة"
      >
        <Heart 
          class="w-6 h-6 transition-colors duration-300"
          :class="shopStore.isInWishlist(product.id) ? 'fill-primary text-primary' : 'text-text-secondary group-hover:text-primary'" 
        />
      </button>
    </div>

    <!-- Buy Now (Secondary) -->
    <button 
      v-if="product.stock > 0"
      @click="handleBuyNow"
      :disabled="isAdding"
      class="w-full py-4 rounded-xl border-2 border-primary text-primary font-bold hover:bg-primary hover:text-surface transition-colors flex items-center justify-center gap-2"
    >
      <Zap class="w-5 h-5" />
      اشترِ الآن
    </button>
  </div>
</template>

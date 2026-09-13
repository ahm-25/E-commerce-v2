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
  <div class="flex flex-col gap-4 w-full">
    <div class="flex items-stretch gap-4">
      <!-- Add to Cart (Primary) -->
      <button 
        @click="handleAddToCart"
        :disabled="isAdding || isAdded || product.stock === 0"
        class="flex-grow py-4 px-8 rounded-[1.25rem] font-black text-lg flex items-center justify-center gap-3 transition-all duration-500 disabled:opacity-80 relative overflow-hidden group"
        :class="isAdded ? 'bg-green-500 text-white shadow-[0_10px_30px_rgba(34,197,94,0.3)]' : 'bg-gray-900 text-white hover:bg-gray-800 shadow-[0_15px_40px_rgba(0,0,0,0.15)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)] hover:-translate-y-1'"
      >
        <!-- Shine effect on hover -->
        <div v-if="!isAdded && !isAdding && product.stock > 0" class="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10 pointer-events-none"></div>

        <template v-if="isAdded">
          <Check class="w-6 h-6 animate-[scaleIn_0.3s_ease-out]" />
          تمت الإضافة بنجاح
        </template>
        <template v-else-if="isAdding">
          <div class="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
          جاري الإضافة...
        </template>
        <template v-else-if="product.stock === 0">
          نفدت الكمية
        </template>
        <template v-else>
          <ShoppingBag class="w-6 h-6 group-hover:-translate-y-1 transition-transform duration-300" />
          <span>أضف إلى السلة</span>
        </template>
      </button>

      <!-- Wishlist -->
      <button 
        @click="shopStore.toggleWishlist(product.id)"
        class="w-[72px] flex-shrink-0 flex items-center justify-center rounded-[1.25rem] border-2 transition-all duration-300 group"
        :class="shopStore.isInWishlist(product.id) ? 'border-rose-500 bg-rose-500/10 shadow-[0_10px_30px_rgba(244,63,94,0.15)]' : 'border-border bg-surface hover:border-gray-900 hover:shadow-lg'"
        aria-label="أضف للمفضلة"
      >
        <Heart 
          class="w-7 h-7 transition-all duration-300"
          :class="shopStore.isInWishlist(product.id) ? 'fill-rose-500 text-rose-500 scale-110' : 'text-text-secondary group-hover:text-gray-900 group-hover:scale-110'" 
        />
      </button>
    </div>

    <!-- Buy Now (Secondary) -->
    <button 
      v-if="product.stock > 0"
      @click="handleBuyNow"
      :disabled="isAdding"
      class="w-full py-4 rounded-[1.25rem] border-2 border-gray-900 bg-surface text-gray-900 font-bold hover:bg-gray-900 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg hover:-translate-y-1"
    >
      <Zap class="w-5 h-5" />
      اشترِ الآن بسرعة
    </button>
  </div>
</template>

<style scoped>
@keyframes shimmer {
  100% { transform: translateX(100%); }
}
@keyframes scaleIn {
  from { transform: scale(0); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
</style>

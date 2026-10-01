<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCart } from '~/composables/useCart'
import Breadcrumbs from '~/components/storefront/Breadcrumbs.vue'
import CartHero from '~/components/storefront/CartHero.vue'
import CartItemsList from '~/components/storefront/CartItemsList.vue'
import OrderSummary from '~/components/storefront/OrderSummary.vue'
import TrustFeatures from '~/components/storefront/TrustFeatures.vue'
import EmptyCart from '~/components/storefront/EmptyCart.vue'
import CartSkeleton from '~/components/storefront/CartSkeleton.vue'
import ConfirmationDialog from '~/components/storefront/ConfirmationDialog.vue'
import PromotionalBanner from '~/components/storefront/PromotionalBanner.vue'

// Mock data for the promotional banner
import { useMockData } from '~/composables/useMockData'

const router = useRouter()
const { items, loading, hasItems, updateCartItem, removeFromCart, clearCart } = useCart()
const { mockData } = useMockData()

// Dialog State
const isClearCartDialogOpen = ref(false)
const isInitialLoading = ref(true)

onMounted(() => {
  // Short skeleton while the cart is restored from localStorage
  setTimeout(() => {
    isInitialLoading.value = false
  }, 300)
})

const handleUpdateQuantity = (id: string, quantity: number) => {
  updateCartItem(id, quantity)
}

const handleRemoveItem = (id: string) => {
  removeFromCart(id)
}

const handleClearCartRequest = () => {
  isClearCartDialogOpen.value = true
}

const confirmClearCart = () => {
  clearCart()
  isClearCartDialogOpen.value = false
}

const handleCheckout = () => {
  if (hasItems.value) {
    router.push('/checkout')
  }
}

useHead({
  title: 'عربة التسوق | Nexora'
})
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-50/30 selection:bg-primary/20 selection:text-primary">
    <main class="flex-1">
      <Breadcrumbs 
        :items="[
          { label: 'الرئيسية', to: '/' },
          { label: 'عربة التسوق', to: '/cart' }
        ]" 
      />

      <CartHero />

      <div class="container mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-20 max-w-7xl">
        
        <!-- Loading State -->
        <CartSkeleton v-if="isInitialLoading" />

        <!-- Empty State -->
        <EmptyCart v-else-if="!hasItems" />

        <!-- Cart Content -->
        <div v-else class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative">
          <!-- Main Area: Items List -->
          <div class="lg:col-span-8">
            <CartItemsList 
              :items="items"
              @update:quantity="handleUpdateQuantity"
              @remove="handleRemoveItem"
              @clear-cart="handleClearCartRequest"
              @save-to-wishlist="(id) => console.log('Saved to wishlist:', id)"
            />
            
            <TrustFeatures class="mt-8" />
          </div>

          <!-- Sidebar: Order Summary -->
          <div class="lg:col-span-4 relative">
            <OrderSummary 
              @checkout="handleCheckout"
            />
          </div>
        </div>

        <!-- Promotional Banner at the bottom -->
        <div class="mt-20">
          <PromotionalBanner :banner="mockData.promotionalBanner" />
        </div>
      </div>
    </main>

    <ConfirmationDialog 
      :is-open="isClearCartDialogOpen"
      title="إفراغ العربة"
      message="هل أنت متأكد أنك تريد حذف جميع المنتجات من عربة التسوق؟ لا يمكن التراجع عن هذا الإجراء."
      confirm-text="نعم، احذف الكل"
      cancel-text="تراجع"
      is-destructive
      @confirm="confirmClearCart"
      @cancel="isClearCartDialogOpen = false"
    />
  </div>
</template>

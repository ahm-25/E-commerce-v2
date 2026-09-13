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

// Mock Data import for initial load (optional, to see some items if cart is empty initially)
import { useMockData } from '~/composables/useMockData'

const router = useRouter()
const { items, loading, hasItems, updateCartItem, removeFromCart, clearCart, addToCart } = useCart()
const { mockData } = useMockData()

// Dialog State
const isClearCartDialogOpen = ref(false)
const isInitialLoading = ref(true)

// Add some mock items if cart is empty on mount just to showcase the design
onMounted(async () => {
  // Simulate initial load
  setTimeout(async () => {
    isInitialLoading.value = false
    
    // Add mock items if cart is empty (For presentation purposes)
    if (!hasItems.value) {
      await addToCart({
        id: '1',
        productId: 'p-1',
        slug: 'elegant-leather-bag',
        name: 'حقيبة يد جلدية فاخرة',
        image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=2030&auto=format&fit=crop',
        price: 2499,
        compareAtPrice: 3499,
        quantity: 1,
        color: 'بيج',
        size: 'متوسط',
        isAvailable: true
      })
      await addToCart({
        id: '2',
        productId: 'p-2',
        slug: 'black-crossbody',
        name: 'حقيبة كروس سوداء',
        image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=2069&auto=format&fit=crop',
        price: 1899,
        quantity: 2,
        color: 'أسود',
        size: 'صغير',
        isAvailable: true
      })
    }
  }, 800)
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

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Loader2, ShoppingCart } from 'lucide-vue-next'
import { storeApi } from '~/services/storeApi'
import { storeApiError } from '~/utils/storeApiError'
import { useCartStore } from '~/stores/cart'
import { useCheckoutStore } from '~/stores/checkout'

// Link the store sends to a customer who left the checkout (from the dashboard's abandoned carts):
// puts the saved cart back, prefills their details and continues to checkout.
useSeoMeta({ title: 'استرجاع السلة | Nexora', robots: 'noindex' })

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()
const checkoutStore = useCheckoutStore()
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    const saved = await storeApi.getSavedCart(String(route.params.token))
    const items = saved.items.filter(i => i.inStock)
    if (!items.length) {
      error.value = 'المنتجات التي كانت في سلتك لم تعد متوفرة حالياً.'
      return
    }

    // Replaces the current cart (no add-to-cart pixel events: nothing new was added)
    cartStore.initCart(items.map(i => ({
      id: `${i.productId}-${i.variantId ?? 'default'}`,
      productId: i.productId,
      slug: i.slug,
      name: i.name,
      image: i.image,
      price: i.price,
      compareAtPrice: i.compareAtPrice,
      quantity: i.quantity,
      color: i.color,
      size: i.size,
      variantId: i.variantId ?? undefined,
      isAvailable: true
    })))
    // Same browser keeps following the same saved cart
    try { localStorage.setItem('cart-token', String(route.params.token)) } catch {}

    checkoutStore.setCustomerInfo({ fullName: saved.customer.name, phone: saved.customer.phone, email: saved.customer.email ?? '' })
    if (saved.governorate) checkoutStore.setShippingAddress({ governorate: saved.governorate })

    router.replace(saved.items.length > items.length ? '/cart' : '/checkout')
  } catch (err) {
    error.value = storeApiError(err, 'تعذر استرجاع السلة، حاول مرة أخرى')
  }
})
</script>

<template>
  <div class="min-h-[60vh] flex items-center justify-center px-4">
    <div v-if="!error" class="text-center">
      <Loader2 class="w-10 h-10 animate-spin text-primary mx-auto mb-4" />
      <p class="text-text-secondary font-medium">جاري استرجاع سلتك...</p>
    </div>
    <div v-else class="text-center max-w-md">
      <div class="w-20 h-20 mx-auto mb-6 rounded-full bg-background flex items-center justify-center">
        <ShoppingCart class="w-10 h-10 text-text-secondary" />
      </div>
      <h1 class="text-2xl font-bold text-text-primary mb-2">لم نتمكن من استرجاع السلة</h1>
      <p class="text-text-secondary mb-8">{{ error }}</p>
      <NuxtLink to="/products" class="inline-block px-8 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-hover transition-colors">
        تصفح المنتجات
      </NuxtLink>
    </div>
  </div>
</template>

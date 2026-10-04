import { defineStore, skipHydrate } from 'pinia'
import { ref, computed, watch } from 'vue'
import type { CartItem, Coupon, CartState } from '~/types'
import { storeApi } from '~/services/storeApi'
import { useAuthStore } from '~/stores/auth'

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)
  const coupon = ref<Coupon | null>(null)
  const couponError = ref<string | null>(null)
  const couponLoading = ref(false)
  const shippingCost = ref<number>(0)
  const taxRate = ref<number>(0.14) // 14% VAT example

  // Getters
  const cartCount = computed(() => {
    return items.value.reduce((total, item) => total + item.quantity, 0)
  })

  const subtotal = computed(() => {
    return items.value.reduce((total, item) => total + (item.price * item.quantity), 0)
  })

  const discountAmount = computed(() => {
    if (!coupon.value) return 0
    return Math.min(coupon.value.discountAmount, subtotal.value)
  })

  const subtotalAfterDiscount = computed(() => {
    return Math.max(0, subtotal.value - discountAmount.value)
  })

  const taxAmount = computed(() => {
    return subtotalAfterDiscount.value * taxRate.value
  })

  // shippingCost is the selected method's price; a free-shipping coupon zeroes what's charged
  const shippingTotal = computed(() => {
    return coupon.value?.freeShipping ? 0 : shippingCost.value
  })

  const grandTotal = computed(() => {
    return subtotalAfterDiscount.value + taxAmount.value + shippingTotal.value
  })
  
  const hasItems = computed(() => items.value.length > 0)

  // Actions
  function initCart(savedItems: CartItem[]) {
    items.value = savedItems
  }

  function addItem(item: CartItem) {
    useTracking().addToCart({
      id: item.productId, name: item.name, price: item.price, quantity: item.quantity,
      variant: [item.color, item.size].filter(Boolean).join(' / ') || undefined
    })
    const existingItem = items.value.find(i => i.id === item.id)
    if (existingItem) {
      existingItem.quantity += item.quantity
    } else {
      items.value.push(item)
    }
  }

  function removeItem(id: string) {
    items.value = items.value.filter(item => item.id !== id)
  }

  function updateQuantity(id: string, quantity: number) {
    const item = items.value.find(i => i.id === id)
    if (item) {
      item.quantity = quantity
    }
  }

  function clearCart() {
    items.value = []
    coupon.value = null
  }

  // Validates the code against the discounts managed in the dashboard
  function validateCoupon(code: string) {
    return storeApi.validateCoupon({
      code,
      items: items.value.map(i => ({ productId: i.productId, price: i.price, quantity: i.quantity })),
      customerId: useAuthStore().user?.id ?? null
    })
  }

  async function applyCoupon(code: string) {
    couponLoading.value = true
    couponError.value = null
    try {
      coupon.value = await validateCoupon(code)
      return true
    } catch (err: any) {
      couponError.value = storeApiError(err, 'حدث خطأ أثناء تطبيق كود الخصم')
      return false
    } finally {
      couponLoading.value = false
    }
  }

  function removeCoupon() {
    coupon.value = null
    couponError.value = null
  }

  // Re-check the applied coupon whenever the cart changes (amount, min order, scope...)
  async function refreshCoupon() {
    if (!coupon.value) return
    if (items.value.length === 0) return removeCoupon()
    try {
      coupon.value = await validateCoupon(coupon.value.code)
    } catch (err: any) {
      // Drop it only when the API rejected the coupon, not on a network hiccup
      if (err?.statusCode === 422) {
        coupon.value = null
        couponError.value = storeApiError(err, 'لم يعد كود الخصم صالحاً')
      }
    }
  }

  // Watch for changes to persist
  watch(
    () => ({ items: items.value, coupon: coupon.value }),
    (state) => {
      if (import.meta.client) {
        localStorage.setItem('cart-storage', JSON.stringify(state))
      }
    },
    { deep: true }
  )

  // Initialize from storage
  if (import.meta.client) {
    const saved = localStorage.getItem('cart-storage')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (parsed.items) items.value = parsed.items
        if (parsed.coupon) coupon.value = parsed.coupon
      } catch (e) {
        console.error('Failed to parse cart storage', e)
      }
    }

    // A saved coupon may have expired or been disabled since
    refreshCoupon()

    let refreshTimer: ReturnType<typeof setTimeout> | undefined
    watch(
      () => items.value.map(i => `${i.productId}:${i.price}:${i.quantity}`).join('|'),
      () => {
        clearTimeout(refreshTimer)
        refreshTimer = setTimeout(refreshCoupon, 400)
      }
    )
  }

  return {
    // Restored from localStorage on the client: don't let the (empty) server state overwrite them
    items: skipHydrate(items),
    loading,
    error,
    coupon: skipHydrate(coupon),
    couponError,
    couponLoading,
    shippingCost,
    shippingTotal,
    taxRate,
    cartCount,
    subtotal,
    discountAmount,
    subtotalAfterDiscount,
    taxAmount,
    grandTotal,
    hasItems,
    initCart,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    applyCoupon,
    removeCoupon,
    refreshCoupon
  }
})

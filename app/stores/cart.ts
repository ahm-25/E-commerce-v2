import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import type { CartItem, Coupon, CartState } from '~/types'

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)
  const coupon = ref<Coupon | null>(null)
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
    if (coupon.value.discountAmount) return coupon.value.discountAmount
    if (coupon.value.discountPercentage) return subtotal.value * (coupon.value.discountPercentage / 100)
    return 0
  })

  const subtotalAfterDiscount = computed(() => {
    return Math.max(0, subtotal.value - discountAmount.value)
  })

  const taxAmount = computed(() => {
    return subtotalAfterDiscount.value * taxRate.value
  })

  const grandTotal = computed(() => {
    return subtotalAfterDiscount.value + taxAmount.value + shippingCost.value
  })
  
  const hasItems = computed(() => items.value.length > 0)

  // Actions
  function initCart(savedItems: CartItem[]) {
    items.value = savedItems
  }

  function addItem(item: CartItem) {
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

  function applyCoupon(newCoupon: Coupon) {
    coupon.value = newCoupon
  }

  function removeCoupon() {
    coupon.value = null
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
  }

  return {
    items,
    loading,
    error,
    coupon,
    shippingCost,
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
    removeCoupon
  }
})

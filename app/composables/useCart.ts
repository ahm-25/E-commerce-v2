import { storeToRefs } from 'pinia'
import { useCartStore } from '~/stores/cart'
import type { CartItem } from '~/types'

export function useCart() {
  const store = useCartStore()
  const { 
    items, 
    loading, 
    error, 
    cartCount, 
    subtotal, 
    discountAmount, 
    subtotalAfterDiscount, 
    taxAmount, 
    grandTotal, 
    shippingCost,
    hasItems
  } = storeToRefs(store)

  const addToCart = async (item: CartItem) => {
    store.loading = true
    store.error = null
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 500))
      store.addItem(item)
    } catch (err: any) {
      store.error = err.message || 'Failed to add item to cart'
    } finally {
      store.loading = false
    }
  }

  const updateCartItem = async (id: string, quantity: number) => {
    store.loading = true
    store.error = null
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 300))
      if (quantity <= 0) {
        store.removeItem(id)
      } else {
        store.updateQuantity(id, quantity)
      }
    } catch (err: any) {
      store.error = err.message || 'Failed to update cart item'
    } finally {
      store.loading = false
    }
  }

  const removeFromCart = async (id: string) => {
    store.loading = true
    store.error = null
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 300))
      store.removeItem(id)
    } catch (err: any) {
      store.error = err.message || 'Failed to remove item from cart'
    } finally {
      store.loading = false
    }
  }

  const clearCart = async () => {
    store.loading = true
    store.error = null
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 500))
      store.clearCart()
    } catch (err: any) {
      store.error = err.message || 'Failed to clear cart'
    } finally {
      store.loading = false
    }
  }

  return {
    items,
    loading,
    error,
    cartCount,
    subtotal,
    discountAmount,
    subtotalAfterDiscount,
    taxAmount,
    grandTotal,
    shippingCost,
    hasItems,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart
  }
}

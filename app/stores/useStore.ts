import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface CartItem {
  id: string // unique combination of product id and variant/options
  productId: string
  name: string
  price: number
  quantity: number
  image: string
  options?: Record<string, string>
}

export const useShopStore = defineStore('shop', () => {
  const cartItems = ref<CartItem[]>([])
  const wishlistItems = ref<string[]>([])
  const isMobileMenuOpen = ref(false)

  const cartItemCount = computed(() => {
    return cartItems.value.reduce((total, item) => total + item.quantity, 0)
  })

  const toggleWishlist = (productId: string) => {
    const index = wishlistItems.value.indexOf(productId)
    if (index > -1) {
      wishlistItems.value.splice(index, 1)
    } else {
      wishlistItems.value.push(productId)
    }
  }

  const isInWishlist = (productId: string) => wishlistItems.value.includes(productId)

  const addToCart = (product: any, quantity: number = 1, options?: Record<string, string>) => {
    const optionsKey = options ? JSON.stringify(options) : 'default'
    const cartItemId = `${product.id}-${optionsKey}`

    const existingItem = cartItems.value.find(item => item.id === cartItemId)
    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      cartItems.value.push({
        id: cartItemId,
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity,
        image: product.images?.[0]?.url || product.image,
        options
      })
    }
  }

  const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
  }

  return {
    cartItems,
    cartItemCount,
    wishlistItems,
    isMobileMenuOpen,
    toggleWishlist,
    isInWishlist,
    addToCart,
    toggleMobileMenu
  }
})

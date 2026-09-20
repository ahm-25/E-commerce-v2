import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useCartStore } from '~/stores/cart'

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

    // Sync to main Cart Store
    const cartStore = useCartStore()
    cartStore.addItem({
      id: cartItemId,
      productId: product.id,
      slug: product.slug || product.id,
      name: product.name || product.title || '',
      image: product.images?.[0]?.url || product.image || '',
      price: product.price,
      compareAtPrice: product.compareAtPrice,
      quantity,
      color: options?.color,
      size: options?.size,
      variantId: options?.variantId,
      isAvailable: product.isAvailable ?? true
    })
  }

  const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
  }

  const closeMobileMenu = () => {
    isMobileMenuOpen.value = false
  }

  const mergeCart = () => {
    // Mock implementation for merging guest cart with user cart after login
    console.log('Merging guest cart with user cart...');
    // In a real app, this would send the local cart to the backend and update the store
  }

  return {
    cartItems,
    cartItemCount,
    wishlistItems,
    isMobileMenuOpen,
    toggleWishlist,
    isInWishlist,
    addToCart,
    toggleMobileMenu,
    closeMobileMenu,
    mergeCart
  }
})

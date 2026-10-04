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

  // options: optionId -> selected value. Products with variants need a full selection,
  // so quick-add buttons (no options) open the product page instead.
  const addToCart = (product: any, quantity: number = 1, options?: Record<string, string>) => {
    const variant = product.variants?.find((v: any) =>
      Object.entries(v.options).every(([optionId, value]) => options?.[optionId] === value)
    )
    if (product.hasVariants && !variant) {
      navigateTo(`/products/${product.slug || product.id}`)
      return false
    }

    const optionLabel = (type: string) => {
      const option = product.options?.find((o: any) => o.type === type)
      return option?.values.find((v: any) => v.id === options?.[option.id])?.label
    }
    const price = variant?.price ?? product.price
    const cartItemId = `${product.id}-${variant?.id ?? 'default'}`

    const existingItem = cartItems.value.find(item => item.id === cartItemId)
    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      cartItems.value.push({
        id: cartItemId,
        productId: product.id,
        name: product.name,
        price,
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
      price,
      compareAtPrice: variant?.compareAtPrice ?? product.compareAtPrice,
      quantity,
      color: optionLabel('color'),
      size: optionLabel('size'),
      variantId: variant?.id,
      isAvailable: product.isAvailable ?? true
    })
    return true
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

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useCartStore } from '~/stores/cart'
import { useMockData } from '~/composables/useMockData'
import type { WishlistItem, WishlistSortOption, Product } from '~/types'

export const useWishlistStore = defineStore('wishlist', () => {
  const items = ref<WishlistItem[]>([])
  const isLoading = ref(false)
  const sortBy = ref<WishlistSortOption>('newest')
  const { mockData } = useMockData()
  
  // All possible products for mock purposes (bestSellers + featuredProducts + a dummy)
  const allMockProducts = [
    ...mockData.bestSellers,
    ...mockData.featuredProducts
  ]

  const itemsCount = computed(() => items.value.length)
  
  const sortedItems = computed(() => {
    const list = [...items.value]
    
    list.sort((a, b) => {
      if (sortBy.value === 'newest') {
        return new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime()
      }
      
      if (!a.product || !b.product) return 0
      
      if (sortBy.value === 'price_asc') {
        return a.product.price - b.product.price
      }
      
      if (sortBy.value === 'price_desc') {
        return b.product.price - a.product.price
      }
      
      if (sortBy.value === 'name_asc') {
        return a.product.name.localeCompare(b.product.name, 'ar')
      }
      
      return 0
    })
    
    return list
  })

  const loadWishlist = async () => {
    isLoading.value = true
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // Populate product details for items that just have IDs
    items.value = items.value.map(item => {
      if (!item.product) {
        const found = allMockProducts.find(p => p.id === item.productId)
        return {
          ...item,
          product: found
        }
      }
      return item
    })
    
    isLoading.value = false
  }

  const toggleItem = (product: Product) => {
    const index = items.value.findIndex(item => item.productId === product.id)
    if (index > -1) {
      items.value.splice(index, 1)
    } else {
      items.value.push({
        id: `wishlist_${Date.now()}_${product.id}`,
        productId: product.id,
        addedAt: new Date().toISOString(),
        product
      })
    }
  }

  const removeItem = (productId: string) => {
    const index = items.value.findIndex(item => item.productId === productId)
    if (index > -1) {
      items.value.splice(index, 1)
    }
  }

  const isInWishlist = (productId: string) => {
    return items.value.some(item => item.productId === productId)
  }

  const clearWishlist = () => {
    items.value = []
  }

  const addAllToCart = () => {
    const cartStore = useCartStore()
    let addedCount = 0
    
    items.value.forEach(item => {
      if (item.product && item.product.stock > 0) {
        cartStore.addItem({
          id: item.product.id,
          title: item.product.name,
          price: item.product.price,
          quantity: 1,
          image: item.product.images?.[0]?.url || '',
          seller: { name: 'المتجر الرئيسي' }
        })
        addedCount++
      }
    })
    
    return addedCount
  }
  
  const setSortBy = (option: WishlistSortOption) => {
    sortBy.value = option
  }

  return {
    items,
    sortedItems,
    itemsCount,
    isLoading,
    sortBy,
    loadWishlist,
    toggleItem,
    removeItem,
    isInWishlist,
    clearWishlist,
    addAllToCart,
    setSortBy
  }
})

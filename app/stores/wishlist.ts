import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useCartStore } from '~/stores/cart'
import { storeApi } from '~/services/storeApi'
import type { WishlistItem, WishlistSortOption, Product } from '~/types'

export const useWishlistStore = defineStore('wishlist', () => {
  const items = ref<WishlistItem[]>([])
  const isLoading = ref(false)
  const sortBy = ref<WishlistSortOption>('newest')

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

  // Refreshes the saved products from the catalog (price, stock); removed products drop out
  const loadWishlist = async () => {
    if (!items.value.length) return
    isLoading.value = true
    try {
      const { items: products } = await storeApi.getProducts({ ids: items.value.map(i => i.productId), perPage: 100 })
      items.value = items.value
        .map(item => ({ ...item, product: products.find(p => p.id === item.productId) }))
        .filter(item => item.product)
    } catch (e) {
      console.error('Failed to load wishlist products', e)
    } finally {
      isLoading.value = false
    }
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

  // Adds in-stock simple products; products with options need a choice on their page
  const addAllToCart = () => {
    const cartStore = useCartStore()
    let addedCount = 0

    items.value.forEach(item => {
      const p = item.product
      if (p && p.stock > 0 && !p.hasVariants) {
        cartStore.addItem({
          id: `${p.id}-default`,
          productId: p.id,
          slug: p.slug,
          name: p.name,
          image: p.images?.[0]?.url || '',
          price: p.price,
          compareAtPrice: p.compareAtPrice,
          quantity: 1,
          isAvailable: true
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

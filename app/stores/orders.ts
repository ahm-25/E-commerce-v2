import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Order, OrderStatus } from '~/types/order'
import { storeApi } from '~/services/storeApi'
import { useAuthStore } from '~/stores/auth'

export const useOrdersStore = defineStore('orders', () => {
  const currentOrder = ref<Order | null>(null)
  const orders = ref<Order[]>([])
  const isLoading = ref(false)
  const isLoadingMore = ref(false)
  const error = ref<string | null>(null)
  
  // Pagination & Filtering state
  const total = ref(0)
  const page = ref(1)
  const limit = ref(5) // smaller limit to easily test pagination with mock data
  const search = ref('')
  const filters = ref({
    status: 'all' as OrderStatus | 'all'
  })
  const sort = ref('newest')
  
  const summary = ref({
    total: 0,
    processing: 0,
    delivered: 0,
    cancelled: 0
  })

  // The signed-in customer's orders (from the dashboard API); list filtering happens locally
  const allOrders = ref<Order[]>([])
  let inflight: Promise<void> | null = null

  const loadCustomerOrders = (force = false) => {
    if (inflight) return inflight
    if (!force && allOrders.value.length > 0) return Promise.resolve()
    const customerId = useAuthStore().user?.id
    if (!customerId) {
      allOrders.value = []
      return Promise.resolve()
    }
    inflight = storeApi.getCustomerOrders(customerId)
      .then(list => { allOrders.value = list })
      .finally(() => { inflight = null })
    return inflight
  }

  const computeSummary = () => {
    summary.value = {
      total: allOrders.value.length,
      processing: allOrders.value.filter(o => ['pending', 'confirmed', 'processing'].includes(o.status)).length,
      delivered: allOrders.value.filter(o => o.status === 'delivered').length,
      cancelled: allOrders.value.filter(o => o.status === 'cancelled').length,
    }
  }

  const fetchOrderSummary = async () => {
    try {
      await loadCustomerOrders()
      computeSummary()
    } catch (e: any) {
      error.value = storeApiError(e, 'حدث خطأ أثناء تحميل الطلبات')
    }
  }

  const fetchOrders = async (reset = false) => {
    if (reset) {
      page.value = 1
      orders.value = []
      isLoading.value = true
    } else {
      isLoadingMore.value = true
    }
    error.value = null
    
    try {
      // A fresh list on reset (filters changed / page opened), cached for "load more"
      await loadCustomerOrders(reset)
      computeSummary()

      let filtered = [...allOrders.value]
      
      // Search
      if (search.value) {
        const q = search.value.toLowerCase()
        filtered = filtered.filter(o => 
          o.orderNumber.includes(q) || 
          o.items.some(i => i.name.toLowerCase().includes(q)) ||
          o.id.includes(q)
        )
      }
      
      // Filter
      if (filters.value.status !== 'all') {
        filtered = filtered.filter(o => o.status === filters.value.status)
      }
      
      // Sort
      filtered.sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime()
        const dateB = new Date(b.createdAt).getTime()
        if (sort.value === 'newest') return dateB - dateA
        if (sort.value === 'oldest') return dateA - dateB
        if (sort.value === 'highest_price') return b.total - a.total
        if (sort.value === 'lowest_price') return a.total - b.total
        return 0
      })
      
      total.value = filtered.length
      
      // Pagination
      const start = (page.value - 1) * limit.value
      const paginated = filtered.slice(start, start + limit.value)
      
      if (reset) {
        orders.value = paginated
      } else {
        orders.value = [...orders.value, ...paginated]
      }
      
    } catch (e: any) {
      error.value = storeApiError(e, 'حدث خطأ أثناء تحميل الطلبات')
    } finally {
      isLoading.value = false
      isLoadingMore.value = false
    }
  }

  const loadMore = async () => {
    if (orders.value.length < total.value) {
      page.value++
      await fetchOrders()
    }
  }

  const retryFetch = async () => {
    await fetchOrders(true)
  }

  const fetchOrderById = async (id: string) => {
    isLoading.value = true
    error.value = null
    
    try {
      // Looked up in the customer's own orders, so other customers' orders are never shown
      await loadCustomerOrders(true)
      const order = allOrders.value.find(o => o.id === id || o.orderNumber === id)
      
      if (!order) {
        throw new Error('الطلب غير موجود')
      }
      
      currentOrder.value = order
      return order
    } catch (e: any) {
      error.value = e.message || 'حدث خطأ أثناء تحميل تفاصيل الطلب'
      currentOrder.value = null
      throw e
    } finally {
      isLoading.value = false
    }
  }

  const cancelOrder = async (id: string) => {
    isLoading.value = true
    error.value = null
    try {
      const customerId = useAuthStore().user?.id
      const target = allOrders.value.find(o => o.id === id || o.orderNumber === id)
      if (!customerId || !target) throw new Error('الطلب غير موجود')

      const updated = await storeApi.cancelOrder(target.id, customerId)
      const replace = (list: Order[]) => list.map(o => (o.id === updated.id ? updated : o))
      allOrders.value = replace(allOrders.value)
      orders.value = replace(orders.value)
      if (currentOrder.value?.id === updated.id) currentOrder.value = updated

      computeSummary()
    } catch (e: any) {
      error.value = storeApiError(e, 'حدث خطأ أثناء إلغاء الطلب')
    } finally {
      isLoading.value = false
    }
  }

  const reorder = async (id: string) => {
    // In a real app, this would add the items back to the cart
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log(`Reordering ${id}`)
    return true
  }

  return {
    currentOrder,
    orders,
    isLoading,
    isLoadingMore,
    error,
    total,
    page,
    limit,
    search,
    filters,
    sort,
    summary,
    fetchOrderSummary,
    fetchOrders,
    loadMore,
    retryFetch,
    fetchOrderById,
    cancelOrder,
    reorder
  }
})

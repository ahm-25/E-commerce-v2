import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Order, OrderStatus } from '~/types/order'
import { mockOrders } from '~/data/mock-order'

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

  // Create a slightly larger mock data set to test search, filters, pagination
  const extendedMockOrders = [
    ...mockOrders, 
    ...mockOrders.map(o => ({...o, id: o.id + '_2', orderNumber: o.orderNumber + '-2', status: 'cancelled' as OrderStatus})),
    ...mockOrders.map(o => ({...o, id: o.id + '_3', orderNumber: o.orderNumber + '-3', status: 'shipped' as OrderStatus, total: o.total + 500})),
  ]

  const fetchOrderSummary = async () => {
    // Mock API Call
    summary.value = {
      total: extendedMockOrders.length,
      processing: extendedMockOrders.filter(o => ['pending', 'confirmed', 'processing'].includes(o.status)).length,
      delivered: extendedMockOrders.filter(o => o.status === 'delivered').length,
      cancelled: extendedMockOrders.filter(o => o.status === 'cancelled').length,
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
      await new Promise(resolve => setTimeout(resolve, 800))
      
      let filtered = [...extendedMockOrders]
      
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
      error.value = e.message || 'حدث خطأ أثناء تحميل الطلبات'
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
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const order = extendedMockOrders.find(o => o.orderNumber === id || o.id === id)
      
      if (!order) {
        throw new Error('Order not found')
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
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Update in orders list
      const orderInList = orders.value.find(o => o.id === id || o.orderNumber === id)
      if (orderInList) {
        orderInList.status = 'cancelled'
      }
      
      if (currentOrder.value && (currentOrder.value.id === id || currentOrder.value.orderNumber === id)) {
        currentOrder.value.status = 'cancelled'
        if (currentOrder.value.timeline) {
          currentOrder.value.timeline.push({
            status: 'cancelled',
            title: 'تم إلغاء الطلب',
            date: new Date().toLocaleDateString('ar-EG', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
            isCompleted: true,
            isCurrent: true
          })
        }
      }
      
      await fetchOrderSummary() // update summary
    } catch (e: any) {
      error.value = 'حدث خطأ أثناء إلغاء الطلب'
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

import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Order } from '~/types/order'
import { mockOrders } from '~/data/mock-order'

export const useOrdersStore = defineStore('orders', () => {
  const currentOrder = ref<Order | null>(null)
  const orders = ref<Order[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const fetchOrderById = async (id: string) => {
    isLoading.value = true
    error.value = null
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const order = mockOrders.find(o => o.orderNumber === id || o.id === id)
      
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
      if (currentOrder.value && (currentOrder.value.id === id || currentOrder.value.orderNumber === id)) {
        currentOrder.value.status = 'cancelled'
        // Add cancelled timeline event
        currentOrder.value.timeline?.push({
          status: 'cancelled',
          title: 'تم إلغاء الطلب',
          date: new Date().toLocaleDateString('ar-EG', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
          isCompleted: true,
          isCurrent: true
        })
      }
    } catch (e: any) {
      error.value = 'حدث خطأ أثناء إلغاء الطلب'
    } finally {
      isLoading.value = false
    }
  }

  const reorder = async (id: string) => {
    // In a real app, this would add the items back to the cart
    console.log(`Reordering ${id}`)
    return true
  }

  return {
    currentOrder,
    orders,
    isLoading,
    error,
    fetchOrderById,
    cancelOrder,
    reorder
  }
})

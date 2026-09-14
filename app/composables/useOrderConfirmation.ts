import { ref, readonly } from 'vue'
import type { Order } from '~/types'
import { orderService } from '~/services/orderService'

export function useOrderConfirmation() {
  const order = ref<Order | null>(null)
  const timeline = ref<{ status: string, stages: any[] } | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const isDownloading = ref(false)
  const isCopied = ref(false)

  const fetchOrder = async (orderId: string) => {
    loading.value = true
    error.value = null
    
    try {
      const [orderData, timelineData] = await Promise.all([
        orderService.getOrder(orderId),
        orderService.trackOrder(orderId)
      ])
      
      order.value = orderData
      timeline.value = timelineData
    } catch (e: any) {
      error.value = e.message || 'حدث خطأ أثناء تحميل بيانات الطلب'
      order.value = null
      timeline.value = null
    } finally {
      loading.value = false
    }
  }

  const copyOrderNumber = async (orderNumber: string) => {
    try {
      await navigator.clipboard.writeText(orderNumber)
      isCopied.value = true
      setTimeout(() => {
        isCopied.value = false
      }, 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const downloadInvoice = async (orderId: string) => {
    if (isDownloading.value) return
    
    isDownloading.value = true
    try {
      const blob = await orderService.downloadInvoice(orderId)
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.style.display = 'none'
      a.href = url
      a.download = `invoice-${orderId}.pdf`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
    } catch (e) {
      console.error('Failed to download invoice:', e)
    } finally {
      isDownloading.value = false
    }
  }

  return {
    order: readonly(order),
    timeline: readonly(timeline),
    loading: readonly(loading),
    error: readonly(error),
    isDownloading: readonly(isDownloading),
    isCopied: readonly(isCopied),
    fetchOrder,
    copyOrderNumber,
    downloadInvoice
  }
}

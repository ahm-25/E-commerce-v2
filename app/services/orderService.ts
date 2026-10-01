import type { Order } from '~/types'
import { storeApi } from '~/services/storeApi'

export interface TrackingStage {
  id: string
  title: string
  date: string | null
  status: 'completed' | 'current' | 'upcoming'
}

export class OrderService {
  async getOrder(orderId: string): Promise<Order> {
    try {
      return await storeApi.getOrder(orderId)
    } catch (err: any) {
      throw new Error(storeApiError(err, 'حدث خطأ أثناء تحميل بيانات الطلب'))
    }
  }

  // Progress bar stages for the confirmation page, derived from the order's timeline
  trackOrder(order: Order): { status: string, stages: TrackingStage[] } {
    const timeline = order.timeline ?? []
    const stages = timeline.map((item, index) => ({
      id: item.status,
      title: item.title,
      // The last pending stage shows the expected delivery day
      date: item.date ?? (index === timeline.length - 1 && !item.isCompleted ? order.estimatedDelivery ?? null : null),
      status: (item.isCurrent && !item.isCompleted ? 'current' : item.isCompleted ? 'completed' : 'upcoming') as TrackingStage['status']
    }))
    return { status: order.status, stages }
  }

  async downloadInvoice(orderId: string): Promise<Blob> {
    // TODO: Generate the invoice on the server
    await new Promise(resolve => setTimeout(resolve, 1500))
    return new Blob(['Fake PDF Content'], { type: 'application/pdf' })
  }
}

export const orderService = new OrderService()

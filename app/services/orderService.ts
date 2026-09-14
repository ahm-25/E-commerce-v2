import type { Order } from '~/types'

// Mock order data
const mockOrders: Record<string, Order> = {
  '10248': {
    id: '10248',
    orderNumber: '10248',
    createdAt: '2025-09-12T10:24:00Z',
    status: 'processing',
    paymentStatus: 'paid',
    paymentMethod: 'بطاقة بنكية',
    shippingMethod: 'شحن عادي',
    estimatedDelivery: 'من 2 إلى 3 أيام',
    customer: {
      name: 'أحمد محمود',
      phone: '+20 123 456 7890',
      email: 'ahmed@example.com'
    },
    shippingAddress: {
      governorate: 'القاهرة',
      city: 'مدينة نصر',
      region: 'المنطقة السادسة',
      addressDetails: 'شارع مكرم عبيد، عمارة 15، شقة 42'
    },
    items: [
      {
        id: '1',
        productId: 'p1',
        slug: 'elegant-leather-bag',
        name: 'حقيبة يد جلدية أنيقة',
        image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        price: 2799,
        quantity: 1,
        color: 'بيج',
        size: 'متوسط'
      },
      {
        id: '2',
        productId: 'p2',
        slug: 'stylish-shoulder-bag',
        name: 'حقيبة كتف أنيقة',
        image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        price: 3599,
        quantity: 1,
        color: 'أسود',
        size: 'كبير'
      },
      {
        id: '3',
        productId: 'p3',
        slug: 'comfortable-backpack',
        name: 'حقيبة ظهر مريحة',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        price: 2799,
        quantity: 1,
        color: 'رمادي',
        size: 'كبير'
      }
    ],
    subtotal: 9197,
    discount: 500,
    shippingCost: 50,
    tax: 1353,
    total: 10600
  }
}

export class OrderService {
  async getOrder(orderId: string): Promise<Order> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800))
    
    const order = mockOrders[orderId]
    if (!order) {
      throw new Error('Order not found')
    }
    
    return order
  }

  async trackOrder(orderId: string): Promise<{ status: string, stages: any[] }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const order = mockOrders[orderId]
    if (!order) {
      throw new Error('Order not found')
    }
    
    // Return mock timeline data
    return {
      status: order.status,
      stages: [
        {
          id: 'received',
          title: 'تم استلام الطلب',
          date: '12 سبتمبر 2025 - 10:24 ص',
          status: 'completed'
        },
        {
          id: 'confirmed',
          title: 'تم تأكيد الطلب',
          date: '12 سبتمبر 2025 - 11:05 ص',
          status: 'completed'
        },
        {
          id: 'processing',
          title: 'قيد التجهيز',
          date: '12 سبتمبر 2025 - 01:30 م',
          status: 'current'
        },
        {
          id: 'shipped',
          title: 'تم الشحن',
          date: null,
          status: 'upcoming'
        },
        {
          id: 'delivered',
          title: 'في الطريق إليك',
          date: 'من 2 إلى 3 أيام',
          status: 'upcoming'
        }
      ]
    }
  }

  async downloadInvoice(orderId: string): Promise<Blob> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    return new Blob(['Fake PDF Content'], { type: 'application/pdf' })
  }
}

export const orderService = new OrderService()

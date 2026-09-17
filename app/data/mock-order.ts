import type { Order } from '~/types/order'

export const mockOrders: Order[] = [
  {
    id: '10248',
    orderNumber: '10248',
    createdAt: '2026-09-12T04:32:00Z',
    status: 'processing',
    paymentStatus: 'paid',
    paymentMethod: 'بطاقة بنكية',
    paymentInfo: {
      method: 'بطاقة بنكية',
      status: 'paid',
      cardLast4: '4242',
      date: '2026-09-12T04:32:00Z'
    },
    shippingMethod: 'شحن عادي',
    estimatedDelivery: 'من 2 إلى 5 أيام',
    subtotal: 10500,
    discount: 500,
    shippingCost: 50,
    tax: 1190,
    total: 11240,
    notes: 'يرجى الاتصال بي قبل التوصيل بنصف ساعة للتأكيد.',
    customer: {
      name: 'أحمد عبد الناصر',
      email: 'ahmed@example.com',
      phone: '01017865860'
    },
    shippingAddress: {
      governorate: 'الدقهلية',
      city: 'المنصورة',
      region: 'الجامعة',
      addressDetails: 'شارع الجمهورية - بجوار كلية الهندسة'
    },
    tracking: {
      carrier: 'ارامكس',
      trackingNumber: 'AR123456789EG',
      url: 'https://aramex.com/track/AR123456789EG'
    },
    items: [
      {
        id: '1',
        productId: 'p-luxury-bag-01',
        slug: 'luxury-leather-bag',
        name: 'حقيبة ظهر أنيقة',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        price: 2800,
        quantity: 1,
        color: 'بيج',
        size: 'متوسط'
      },
      {
        id: '2',
        productId: 'p-wireless-earbuds-01',
        slug: 'wireless-earbuds',
        name: 'سماعات لاسلكية',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        price: 3500,
        quantity: 1,
        color: 'أبيض',
        size: 'قياسي'
      },
      {
        id: '3',
        productId: 'p-smart-watch-01',
        slug: 'smart-watch',
        name: 'ساعة ذكية',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        price: 4200,
        quantity: 1,
        color: 'أسود',
        size: 'قياسي'
      }
    ],
    timeline: [
      {
        status: 'pending',
        title: 'تم استلام الطلب',
        date: '12 سبتمبر 2026 - 04:32 م',
        isCompleted: true,
        isCurrent: false
      },
      {
        status: 'processing',
        title: 'قيد التجهيز',
        date: '12 سبتمبر 2026 - 06:15 م',
        isCompleted: false,
        isCurrent: true
      },
      {
        status: 'shipped',
        title: 'تم الشحن',
        isCompleted: false,
        isCurrent: false
      },
      {
        status: 'out_for_delivery',
        title: 'خرج للتوصيل',
        isCompleted: false,
        isCurrent: false
      },
      {
        status: 'delivered',
        title: 'تم التوصيل',
        isCompleted: false,
        isCurrent: false
      }
    ]
  },
  {
    id: '10245',
    orderNumber: '10245',
    createdAt: '2026-09-01T10:00:00Z',
    status: 'delivered',
    paymentStatus: 'paid',
    paymentMethod: 'الدفع عند الاستلام',
    paymentInfo: {
      method: 'الدفع عند الاستلام',
      status: 'paid',
      date: '2026-09-05T14:30:00Z'
    },
    shippingMethod: 'شحن سريع',
    subtotal: 3500,
    discount: 0,
    shippingCost: 100,
    tax: 490,
    total: 4090,
    customer: {
      name: 'أحمد عبد الناصر',
      email: 'ahmed@example.com',
      phone: '01017865860'
    },
    shippingAddress: {
      governorate: 'القاهرة',
      city: 'المعادي',
      region: 'شارع 9',
      addressDetails: 'مبنى 15، شقة 3'
    },
    items: [
      {
        id: '2',
        productId: 'p-wireless-earbuds-01',
        slug: 'wireless-earbuds',
        name: 'سماعات لاسلكية',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        price: 3500,
        quantity: 1,
        color: 'أبيض',
        size: 'قياسي'
      }
    ],
    timeline: [
      {
        status: 'pending',
        title: 'تم استلام الطلب',
        date: '01 سبتمبر 2026 - 10:00 ص',
        isCompleted: true,
        isCurrent: false
      },
      {
        status: 'processing',
        title: 'قيد التجهيز',
        date: '01 سبتمبر 2026 - 11:30 ص',
        isCompleted: true,
        isCurrent: false
      },
      {
        status: 'shipped',
        title: 'تم الشحن',
        date: '02 سبتمبر 2026 - 09:00 ص',
        isCompleted: true,
        isCurrent: false
      },
      {
        status: 'out_for_delivery',
        title: 'خرج للتوصيل',
        date: '05 سبتمبر 2026 - 08:00 ص',
        isCompleted: true,
        isCurrent: false
      },
      {
        status: 'delivered',
        title: 'تم التوصيل',
        date: '05 سبتمبر 2026 - 02:30 م',
        isCompleted: true,
        isCurrent: true
      }
    ]
  }
]

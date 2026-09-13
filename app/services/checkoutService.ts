import type { ShippingMethod, PaymentMethod } from '~/types'

// Mock Data for Governorates and Cities
export const GOVERNORATES = [
  'القاهرة',
  'الجيزة',
  'الإسكندرية',
  'الدقهلية',
  'البحر الأحمر',
  'الغربية',
  'الشرقية',
  'أسيوط'
]

export const CITIES: Record<string, string[]> = {
  'القاهرة': ['مدينة نصر', 'مصر الجديدة', 'المعادي', 'التجمع الخامس', 'شبرا'],
  'الجيزة': ['الدقي', 'المهندسين', 'الهرم', 'فيصل', 'الشيخ زايد', '6 أكتوبر'],
  'الإسكندرية': ['سموحة', 'ميامي', 'المنتزه', 'محطة الرمل', 'سيدي بشر'],
  'الدقهلية': ['المنصورة', 'طلخا', 'ميت غمر', 'دكرنس'],
  'البحر الأحمر': ['الغردقة', 'الجونة', 'سفاجا', 'مرسى علم'],
  'الغربية': ['طنطا', 'المحلة الكبرى', 'زفتى'],
  'الشرقية': ['الزقازيق', 'العاشر من رمضان', 'بلبيس'],
  'أسيوط': ['أسيوط', 'ديروط', 'منفلوط']
}

const mockShippingMethods: ShippingMethod[] = [
  {
    id: 'standard',
    name: 'شحن عادي',
    duration: 'خلال 3 إلى 5 أيام عمل',
    cost: 50
  },
  {
    id: 'express',
    name: 'شحن سريع',
    duration: 'خلال 1 إلى 2 يوم عمل',
    cost: 100
  },
  {
    id: 'premium',
    name: 'شحن مميز',
    duration: 'خلال 24 ساعة',
    cost: 150
  }
]

const mockPaymentMethods: PaymentMethod[] = [
  {
    id: 'cod',
    name: 'الدفع عند الاستلام',
    description: 'ادفع نقداً عند استلام طلبك',
    icon: 'Banknote'
  },
  {
    id: 'card',
    name: 'بطاقة بنكية',
    description: 'Visa / Mastercard',
    icon: 'CreditCard'
  },
  {
    id: 'wallet',
    name: 'محفظة إلكترونية',
    description: 'فودافون كاش - أورانج كاش',
    icon: 'Wallet'
  }
]

export const checkoutService = {
  async getGovernorates(): Promise<string[]> {
    return new Promise(resolve => setTimeout(() => resolve(GOVERNORATES), 300))
  },

  async getCities(governorate: string): Promise<string[]> {
    return new Promise(resolve => setTimeout(() => resolve(CITIES[governorate] || []), 300))
  },

  async getShippingMethods(governorate: string): Promise<ShippingMethod[]> {
    // In a real app, available shipping methods and costs might depend on the governorate
    return new Promise(resolve => setTimeout(() => resolve(mockShippingMethods), 400))
  },

  async getPaymentMethods(): Promise<PaymentMethod[]> {
    return new Promise(resolve => setTimeout(() => resolve(mockPaymentMethods), 300))
  },
  
  async createOrder(orderData: any): Promise<{ success: boolean, orderId?: string, error?: string }> {
    return new Promise(resolve => {
      setTimeout(() => {
        // Simulate a successful order creation
        const orderId = `ORD-${Math.floor(Math.random() * 1000000)}`
        resolve({ success: true, orderId })
      }, 1500)
    })
  }
}

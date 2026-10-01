import type { ShippingMethod, PaymentMethod } from '~/types'
import { storeApi, type PlaceOrderPayload } from '~/services/storeApi'

// Mock cities (the dashboard only manages governorates). Governorates missing
// here fall back to a free-text city field in the checkout form.
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

export const checkoutService = {
  // Governorates covered by an active shipping zone in the dashboard
  async getGovernorates(): Promise<string[]> {
    return storeApi.getGovernorates()
  },

  async getCities(governorate: string): Promise<string[]> {
    return new Promise(resolve => setTimeout(() => resolve(CITIES[governorate] || []), 300))
  },

  // Rates of the zone covering the governorate (free-shipping thresholds depend on the subtotal)
  async getShippingMethods(governorate: string, subtotal: number, itemsCount: number): Promise<ShippingMethod[]> {
    return storeApi.getShippingOptions({ governorate, subtotal, itemsCount })
  },

  // Active methods only, ordered as in the dashboard
  async getPaymentMethods(): Promise<PaymentMethod[]> {
    return storeApi.getPaymentMethods()
  },
  
  async createOrder(payload: PlaceOrderPayload): Promise<{ success: boolean, orderId?: string, error?: string }> {
    try {
      const order = await storeApi.placeOrder(payload)
      return { success: true, orderId: order.id }
    } catch (err: any) {
      return { success: false, error: storeApiError(err, 'حدث خطأ أثناء إنشاء الطلب') }
    }
  }
}

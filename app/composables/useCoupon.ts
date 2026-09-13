import { ref, computed } from 'vue'
import { useCartStore } from '~/stores/cart'

export function useCoupon() {
  const store = useCartStore()
  const applying = ref(false)
  const error = ref<string | null>(null)
  const success = ref(false)

  const applyCoupon = async (code: string) => {
    if (!code) return
    
    applying.value = true
    error.value = null
    success.value = false
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // Mock validation
      if (code.toUpperCase() === 'NEXORA20') {
        store.applyCoupon({
          code: code.toUpperCase(),
          discountPercentage: 20
        })
        success.value = true
      } else if (code.toUpperCase() === 'SAVE50') {
         store.applyCoupon({
          code: code.toUpperCase(),
          discountAmount: 50
        })
        success.value = true
      } else {
        error.value = 'كود الخصم غير صالح أو منتهي الصلاحية'
      }
    } catch (err: any) {
      error.value = 'حدث خطأ أثناء تطبيق كود الخصم'
    } finally {
      applying.value = false
    }
  }

  const removeCoupon = async () => {
    applying.value = true
    error.value = null
    try {
      await new Promise(resolve => setTimeout(resolve, 400))
      store.removeCoupon()
      success.value = false
    } catch (err: any) {
      error.value = 'حدث خطأ أثناء إزالة كود الخصم'
    } finally {
      applying.value = false
    }
  }

  return {
    coupon: computed(() => store.coupon),
    applying,
    error,
    success,
    applyCoupon,
    removeCoupon
  }
}

import { ref, computed } from 'vue'
import { useCartStore } from '~/stores/cart'

export function useCoupon() {
  const store = useCartStore()
  const success = ref(false)

  const applyCoupon = async (code: string) => {
    if (!code) return
    success.value = await store.applyCoupon(code)
  }

  const removeCoupon = () => {
    store.removeCoupon()
    success.value = false
  }

  return {
    coupon: computed(() => store.coupon),
    applying: computed(() => store.couponLoading),
    error: computed(() => store.couponError),
    success,
    applyCoupon,
    removeCoupon
  }
}

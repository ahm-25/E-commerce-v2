import { ref, watch, computed } from 'vue'
import { useCheckoutStore } from '~/stores/checkout'
import { useCartStore } from '~/stores/cart'
import { checkoutService } from '~/services/checkoutService'
import type { ShippingMethod, PaymentMethod } from '~/types'
import { useRouter } from 'vue-router'

export function useCheckout() {
  const checkoutStore = useCheckoutStore()
  const cartStore = useCartStore()
  const router = useRouter()

  const governorates = ref<string[]>([])
  const cities = ref<string[]>([])
  const shippingMethods = ref<ShippingMethod[]>([])
  const paymentMethods = ref<PaymentMethod[]>([])

  const isLoadingGovernorates = ref(false)
  const isLoadingCities = ref(false)
  const isLoadingShipping = ref(false)
  const isLoadingPayment = ref(false)

  // Fetch initial data
  const initCheckout = async () => {
    isLoadingGovernorates.value = true
    try {
      governorates.value = await checkoutService.getGovernorates()
    } finally {
      isLoadingGovernorates.value = false
    }

    isLoadingPayment.value = true
    try {
      paymentMethods.value = await checkoutService.getPaymentMethods()
      if (paymentMethods.value.length > 0 && !checkoutStore.paymentMethodId) {
        checkoutStore.setPaymentMethod(paymentMethods.value[0].id)
      }
    } finally {
      isLoadingPayment.value = false
    }
  }

  // Watch for governorate changes to fetch cities and shipping methods
  watch(() => checkoutStore.shippingAddress.governorate, async (newGov) => {
    if (newGov) {
      isLoadingCities.value = true
      isLoadingShipping.value = true
      try {
        const [fetchedCities, fetchedShipping] = await Promise.all([
          checkoutService.getCities(newGov),
          checkoutService.getShippingMethods(newGov)
        ])
        
        cities.value = fetchedCities
        shippingMethods.value = fetchedShipping
        
        // Reset city if not in new list
        if (!cities.value.includes(checkoutStore.shippingAddress.city)) {
          checkoutStore.setShippingAddress({ city: '' })
        }
        
        // Set default shipping method if none selected or if selected is not available
        if (shippingMethods.value.length > 0) {
          const methodExists = shippingMethods.value.some(m => m.id === checkoutStore.shippingMethodId)
          if (!checkoutStore.shippingMethodId || !methodExists) {
            checkoutStore.setShippingMethod(shippingMethods.value[0].id)
          }
        } else {
          checkoutStore.setShippingMethod('')
        }
      } finally {
        isLoadingCities.value = false
        isLoadingShipping.value = false
      }
    } else {
      cities.value = []
      shippingMethods.value = []
      checkoutStore.setShippingAddress({ city: '' })
      checkoutStore.setShippingMethod('')
    }
  }, { immediate: true })

  // Update Cart Shipping Cost when shipping method changes
  watch(() => checkoutStore.shippingMethodId, (newId) => {
    if (newId) {
      const selectedMethod = shippingMethods.value.find(m => m.id === newId)
      if (selectedMethod) {
        cartStore.shippingCost = selectedMethod.cost
      } else {
        cartStore.shippingCost = 0
      }
    } else {
      cartStore.shippingCost = 0
    }
  })

  // Submit Order
  const submitOrder = async () => {
    checkoutStore.isSubmitting = true
    try {
      // Validate all steps again before submitting
      const isInfoValid = checkoutStore.validateCustomerInfo()
      const isShippingValid = checkoutStore.validateShippingAddress()
      
      if (!isInfoValid || !isShippingValid || !checkoutStore.shippingMethodId || !checkoutStore.paymentMethodId || cartStore.items.length === 0) {
        throw new Error('الرجاء التأكد من إدخال جميع البيانات المطلوبة وصحتها')
      }

      const orderData = {
        customerInfo: checkoutStore.customerInfo,
        shippingAddress: checkoutStore.shippingAddress,
        shippingMethodId: checkoutStore.shippingMethodId,
        paymentMethodId: checkoutStore.paymentMethodId,
        orderNotes: checkoutStore.orderNotes,
        items: cartStore.items,
        totals: {
          subtotal: cartStore.subtotal,
          discount: cartStore.discountAmount,
          shipping: cartStore.shippingCost,
          tax: cartStore.taxAmount,
          grandTotal: cartStore.grandTotal
        }
      }

      const response = await checkoutService.createOrder(orderData)

      if (response.success && response.orderId) {
        // Clear cart after successful order
        cartStore.clearCart()
        checkoutStore.resetCheckout()
        router.push(`/order-success/${response.orderId}`)
      } else {
        throw new Error(response.error || 'حدث خطأ أثناء إنشاء الطلب')
      }

    } catch (error: any) {
      console.error('Submit order error:', error)
      alert(error.message)
    } finally {
      checkoutStore.isSubmitting = false
    }
  }

  return {
    governorates,
    cities,
    shippingMethods,
    paymentMethods,
    isLoadingGovernorates,
    isLoadingCities,
    isLoadingShipping,
    isLoadingPayment,
    initCheckout,
    submitOrder
  }
}

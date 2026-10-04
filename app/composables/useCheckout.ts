import { watch } from 'vue'
import { useCheckoutStore } from '~/stores/checkout'
import { useCartStore } from '~/stores/cart'
import { useAuthStore } from '~/stores/auth'
import { checkoutService } from '~/services/checkoutService'
import { storeApi } from '~/services/storeApi'
import type { ShippingMethod, PaymentMethod } from '~/types'
import { useRouter } from 'vue-router'

export function useCheckout() {
  const checkoutStore = useCheckoutStore()
  const cartStore = useCartStore()
  const router = useRouter()
  const cartToken = useCartToken()

  // Shared by every component that calls useCheckout() (page, address form, methods...)
  const governorates = useState<string[]>('checkout:governorates', () => [])
  const cities = useState<string[]>('checkout:cities', () => [])
  const shippingMethods = useState<ShippingMethod[]>('checkout:shippingMethods', () => [])
  const paymentMethods = useState<PaymentMethod[]>('checkout:paymentMethods', () => [])

  const isLoadingGovernorates = useState('checkout:loadingGovernorates', () => false)
  const isLoadingCities = useState('checkout:loadingCities', () => false)
  const isLoadingShipping = useState('checkout:loadingShipping', () => false)
  const isLoadingPayment = useState('checkout:loadingPayment', () => false)

  // Called once by the checkout page: starts the watchers (tied to the page's
  // lifetime) and loads the initial data
  const initCheckout = async () => {
    startWatchers()

    isLoadingGovernorates.value = true
    try {
      governorates.value = await checkoutService.getGovernorates()
    } catch (err) {
      console.error('Failed to load governorates', err)
    } finally {
      isLoadingGovernorates.value = false
    }

    isLoadingPayment.value = true
    try {
      paymentMethods.value = await checkoutService.getPaymentMethods()
      const selectedExists = paymentMethods.value.some(m => m.id === checkoutStore.paymentMethodId)
      if (paymentMethods.value.length > 0 && !selectedExists) {
        const preferred = paymentMethods.value.find(m => m.isDefault) ?? paymentMethods.value[0]!
        checkoutStore.setPaymentMethod(preferred.id)
      }
    } catch (err) {
      console.error('Failed to load payment methods', err)
    } finally {
      isLoadingPayment.value = false
    }
  }

  // Keep the cart's shipping cost in sync with the selected method's current price
  const syncShippingCost = () => {
    const selectedMethod = shippingMethods.value.find(m => m.id === checkoutStore.shippingMethodId)
    cartStore.shippingCost = selectedMethod ? selectedMethod.cost : 0
  }

  function startWatchers() {
    // Refetch cities and shipping rates when the governorate changes, and rates when
    // the cart changes (free-shipping thresholds and weight-based prices depend on it)
    // (separate sources so Vue compares the values, not a fresh array on every read)
    watch([() => checkoutStore.shippingAddress.governorate, () => cartStore.subtotal, () => cartStore.cartCount], async ([newGov]) => {
      if (newGov) {
        isLoadingCities.value = true
        isLoadingShipping.value = true
        try {
          const [fetchedCities, fetchedShipping] = await Promise.all([
            checkoutService.getCities(newGov),
            checkoutService.getShippingMethods(newGov, cartStore.subtotal, cartStore.cartCount)
          ])
        
          cities.value = fetchedCities
          shippingMethods.value = fetchedShipping
        
          // Reset city if not in new list (free-text cities are kept when there is no list)
          if (cities.value.length > 0 && !cities.value.includes(checkoutStore.shippingAddress.city)) {
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
          syncShippingCost()
        } catch (err) {
          console.error('Failed to load shipping options', err)
          shippingMethods.value = []
          checkoutStore.setShippingMethod('')
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
    watch(() => checkoutStore.shippingMethodId, syncShippingCost)

    // Save the checkout once there's a valid phone, so the store can follow up if it's abandoned.
    // Debounced, fire-and-forget: it must never slow down or block the checkout.
    let saveTimer: ReturnType<typeof setTimeout> | undefined
    watch(
      () => [
        checkoutStore.customerInfo.fullName, checkoutStore.customerInfo.phone, checkoutStore.customerInfo.email,
        checkoutStore.shippingAddress.governorate,
        cartStore.items.map(i => `${i.productId}:${i.variantId ?? ''}:${i.quantity}`).join('|')
      ].join('~'),
      () => {
        clearTimeout(saveTimer)
        saveTimer = setTimeout(saveCheckpoint, 1500)
      },
      { immediate: true }
    )
  }

  const saveCheckpoint = () => {
    const info = checkoutStore.customerInfo
    const token = cartToken.get()
    if (!token || !/^01[0125][0-9]{8}$/.test(info.phone.trim()) || cartStore.items.length === 0) return
    storeApi.saveCartCheckpoint({
      token,
      customerId: useAuthStore().user?.id ?? null,
      customer: { name: info.fullName.trim(), phone: info.phone.trim(), email: info.email.trim() || undefined },
      governorate: checkoutStore.shippingAddress.governorate || undefined,
      items: cartStore.items.map(i => ({ productId: i.productId, variantId: i.variantId ?? null, quantity: i.quantity }))
    }).catch(() => {})
  }

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

      const address = checkoutStore.shippingAddress
      const response = await checkoutService.createOrder({
        customerId: useAuthStore().user?.id ?? null,
        cartToken: cartToken.get(),
        customer: {
          name: checkoutStore.customerInfo.fullName,
          phone: checkoutStore.customerInfo.phone,
          email: checkoutStore.customerInfo.email
        },
        shippingAddress: {
          governorate: address.governorate,
          city: address.city,
          region: address.region,
          addressDetails: [
            address.addressDetails,
            address.buildingNumber && `مبنى ${address.buildingNumber}`,
            address.floorApt && `الدور/الشقة ${address.floorApt}`,
            address.landmark && `علامة مميزة: ${address.landmark}`
          ].filter(Boolean).join('، ')
        },
        shippingMethodId: checkoutStore.shippingMethodId!,
        paymentMethodId: checkoutStore.paymentMethodId!,
        orderNotes: checkoutStore.orderNotes,
        couponCode: cartStore.coupon?.code ?? null,
        items: cartStore.items.map(i => ({
          productId: i.productId,
          variantId: i.variantId ?? null,
          quantity: i.quantity
        }))
      })

      if (response.success && response.orderId) {
        // Clear cart after successful order
        cartStore.clearCart()
        checkoutStore.resetCheckout()
        cartToken.reset()
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

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { CustomerInfo, ShippingAddress, ValidationErrors } from '~/types'

export const useCheckoutStore = defineStore('checkout', () => {
  const customerInfo = ref<CustomerInfo>({
    fullName: '',
    phone: '',
    email: '',
    useAsBilling: true
  })

  const shippingAddress = ref<ShippingAddress>({
    governorate: '',
    city: '',
    region: '',
    addressDetails: '',
    buildingNumber: '',
    floorApt: '',
    landmark: '',
    saveAddress: false
  })

  const shippingMethodId = ref<string | null>(null)
  const paymentMethodId = ref<string | null>('cod') // Default to Cash on Delivery
  const orderNotes = ref<string>('')
  
  const validationErrors = ref<ValidationErrors>({})
  const isSubmitting = ref(false)
  const currentStep = ref(1)

  // Actions
  function setCustomerInfo(info: Partial<CustomerInfo>) {
    customerInfo.value = { ...customerInfo.value, ...info }
  }

  function setShippingAddress(address: Partial<ShippingAddress>) {
    shippingAddress.value = { ...shippingAddress.value, ...address }
  }

  function setShippingMethod(id: string) {
    shippingMethodId.value = id
  }

  function setPaymentMethod(id: string) {
    paymentMethodId.value = id
  }

  function setOrderNotes(notes: string) {
    orderNotes.value = notes
  }
  
  function setStep(step: number) {
    currentStep.value = step
  }

  function validateCustomerInfo(): boolean {
    const errors: ValidationErrors = {}
    
    if (!customerInfo.value.fullName.trim()) {
      errors.fullName = 'الاسم بالكامل مطلوب'
    }
    
    if (!customerInfo.value.phone.trim()) {
      errors.phone = 'رقم الهاتف مطلوب'
    } else if (!/^01[0125][0-9]{8}$/.test(customerInfo.value.phone)) {
      errors.phone = 'رقم الهاتف غير صحيح'
    }

    if (customerInfo.value.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerInfo.value.email)) {
      errors.email = 'البريد الإلكتروني غير صحيح'
    }

    validationErrors.value = { ...validationErrors.value, ...errors }
    return Object.keys(errors).length === 0
  }

  function validateShippingAddress(): boolean {
    const errors: ValidationErrors = {}
    
    if (!shippingAddress.value.governorate) {
      errors.governorate = 'المحافظة مطلوبة'
    }
    if (!shippingAddress.value.city) {
      errors.city = 'المدينة مطلوبة'
    }
    if (!shippingAddress.value.region) {
      errors.region = 'المنطقة مطلوبة'
    }
    if (!shippingAddress.value.addressDetails.trim()) {
      errors.addressDetails = 'العنوان بالتفصيل مطلوب'
    }
    if (!shippingAddress.value.buildingNumber.trim()) {
      errors.buildingNumber = 'رقم المبنى مطلوب'
    }

    validationErrors.value = { ...validationErrors.value, ...errors }
    return Object.keys(errors).length === 0
  }

  function clearErrors() {
    validationErrors.value = {}
  }

  function resetCheckout() {
    // Keep customer info and address if we want to save them for next time,
    // but typically we'd reset payment/shipping selections and step
    shippingMethodId.value = null
    paymentMethodId.value = 'cod'
    orderNotes.value = ''
    validationErrors.value = {}
    currentStep.value = 1
  }

  return {
    customerInfo,
    shippingAddress,
    shippingMethodId,
    paymentMethodId,
    orderNotes,
    validationErrors,
    isSubmitting,
    currentStep,
    setCustomerInfo,
    setShippingAddress,
    setShippingMethod,
    setPaymentMethod,
    setOrderNotes,
    setStep,
    validateCustomerInfo,
    validateShippingAddress,
    clearErrors,
    resetCheckout
  }
})

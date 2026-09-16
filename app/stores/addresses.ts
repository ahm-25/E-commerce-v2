import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Address, AddressFormData } from '~/types'
import { mockAddresses } from '~/data/mock-addresses'

export const useAddressesStore = defineStore('addresses', () => {
  const addresses = ref<Address[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Get default address
  const defaultAddress = computed(() => addresses.value.find(a => a.isDefault))

  const fetchAddresses = async () => {
    isLoading.value = true
    error.value = null
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // Load mock data if empty
      if (addresses.value.length === 0) {
         // Deep copy to avoid mutating the original mock data directly
         addresses.value = JSON.parse(JSON.stringify(mockAddresses))
      }
    } catch (err: any) {
      error.value = err.message || 'حدث خطأ أثناء تحميل العناوين'
    } finally {
      isLoading.value = false
    }
  }

  const addAddress = async (formData: AddressFormData) => {
    isLoading.value = true
    error.value = null
    try {
      await new Promise(resolve => setTimeout(resolve, 600))
      
      const newAddress: Address = {
        id: `addr-${Date.now()}`,
        ...formData
      }

      if (newAddress.isDefault) {
        addresses.value.forEach(a => { a.isDefault = false })
      } else if (addresses.value.length === 0) {
        // If it's the first address, make it default anyway
        newAddress.isDefault = true
      }

      addresses.value.push(newAddress)
    } catch (err: any) {
      error.value = err.message || 'حدث خطأ أثناء إضافة العنوان'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const updateAddress = async (id: string, formData: AddressFormData) => {
    isLoading.value = true
    error.value = null
    try {
      await new Promise(resolve => setTimeout(resolve, 600))
      
      const index = addresses.value.findIndex(a => a.id === id)
      if (index === -1) throw new Error('العنوان غير موجود')

      if (formData.isDefault) {
        addresses.value.forEach(a => { a.isDefault = false })
      } else if (addresses.value[index].isDefault && addresses.value.length > 1) {
        // User is trying to unset default, don't allow if it's the only one or require picking another.
        // For simplicity, we just allow it or keep it true if they have only one.
        if (addresses.value.length === 1) {
           formData.isDefault = true
        }
      }

      addresses.value[index] = { ...addresses.value[index], ...formData }
      
      // If we unset default, and there is no default now, make the first one default
      if (!addresses.value.some(a => a.isDefault) && addresses.value.length > 0) {
        addresses.value[0].isDefault = true
      }
    } catch (err: any) {
      error.value = err.message || 'حدث خطأ أثناء تحديث العنوان'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const deleteAddress = async (id: string) => {
    isLoading.value = true
    error.value = null
    try {
      await new Promise(resolve => setTimeout(resolve, 600))
      
      const address = addresses.value.find(a => a.id === id)
      if (!address) throw new Error('العنوان غير موجود')

      addresses.value = addresses.value.filter(a => a.id !== id)

      // If we deleted the default address, make the first one default
      if (address.isDefault && addresses.value.length > 0) {
        addresses.value[0].isDefault = true
      }
    } catch (err: any) {
      error.value = err.message || 'حدث خطأ أثناء حذف العنوان'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const setDefaultAddress = async (id: string) => {
    isLoading.value = true
    error.value = null
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const index = addresses.value.findIndex(a => a.id === id)
      if (index === -1) throw new Error('العنوان غير موجود')

      addresses.value.forEach(a => { a.isDefault = false })
      addresses.value[index].isDefault = true
    } catch (err: any) {
      error.value = err.message || 'حدث خطأ أثناء تعيين العنوان الافتراضي'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  return {
    addresses,
    isLoading,
    error,
    defaultAddress,
    fetchAddresses,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress
  }
})

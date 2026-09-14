<script setup lang="ts">
import { MapPin, User, Mail, Phone } from 'lucide-vue-next'
import type { OrderCustomer, OrderShippingAddress } from '~/types'

defineProps<{
  customer: OrderCustomer
  shippingAddress: OrderShippingAddress
}>()
</script>

<template>
  <div class="py-8 border-b border-gray-100 dark:border-gray-800">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      
      <!-- Shipping Address -->
      <div>
        <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <MapPin class="w-5 h-5 text-gray-400" />
          عنوان الشحن
        </h3>
        
        <div class="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 border border-gray-100 dark:border-gray-700">
          <p class="font-medium text-gray-900 dark:text-white mb-2">{{ customer.name }}</p>
          <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
            {{ shippingAddress.addressDetails }}<br>
            {{ shippingAddress.region }}، {{ shippingAddress.city }}<br>
            {{ shippingAddress.governorate }}
          </p>
          <div class="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm dir-ltr justify-end">
            <span>{{ customer.phone }}</span>
            <Phone class="w-4 h-4" />
          </div>
        </div>
      </div>

      <!-- Contact Information -->
      <div>
        <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <User class="w-5 h-5 text-gray-400" />
          بيانات التواصل
        </h3>
        
        <div class="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 border border-gray-100 dark:border-gray-700 space-y-4">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-white dark:bg-gray-900 flex items-center justify-center shrink-0 border border-gray-200 dark:border-gray-700">
              <Mail class="w-4 h-4 text-gray-500" />
            </div>
            <div>
              <p class="text-xs text-gray-500 dark:text-gray-400 mb-0.5">البريد الإلكتروني</p>
              <p class="text-sm font-medium text-gray-900 dark:text-white">{{ customer.email }}</p>
            </div>
          </div>
          
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-white dark:bg-gray-900 flex items-center justify-center shrink-0 border border-gray-200 dark:border-gray-700">
              <Phone class="w-4 h-4 text-gray-500" />
            </div>
            <div>
              <p class="text-xs text-gray-500 dark:text-gray-400 mb-0.5">رقم الهاتف</p>
              <p class="text-sm font-medium text-gray-900 dark:text-white dir-ltr">{{ customer.phone }}</p>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<style scoped>
.dir-ltr {
  direction: ltr;
  display: inline-flex;
}
</style>

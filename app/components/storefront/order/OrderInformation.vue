<script setup lang="ts">
import { Calendar, Truck, CreditCard, ShieldCheck } from 'lucide-vue-next'
import type { Order } from '~/types'

defineProps<{
  order: Order
}>()

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' }
  return new Date(dateString).toLocaleDateString('ar-EG', options)
}
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 py-8 border-b border-gray-100 dark:border-gray-800">
    
    <!-- Payment Status -->
    <div class="flex items-start gap-4">
      <div class="w-10 h-10 rounded-full bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 flex items-center justify-center shrink-0">
        <ShieldCheck class="w-5 h-5" />
      </div>
      <div>
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">حالة الدفع</p>
        <p class="font-medium text-gray-900 dark:text-white">
          {{ order.paymentStatus === 'paid' ? 'تم الدفع' : 'قيد الانتظار' }}
        </p>
      </div>
    </div>

    <!-- Payment Method -->
    <div class="flex items-start gap-4">
      <div class="w-10 h-10 rounded-full bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 flex items-center justify-center shrink-0">
        <CreditCard class="w-5 h-5" />
      </div>
      <div>
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">طريقة الدفع</p>
        <p class="font-medium text-gray-900 dark:text-white">{{ order.paymentMethod }}</p>
      </div>
    </div>

    <!-- Shipping Method & Expected Delivery -->
    <div class="flex items-start gap-4">
      <div class="w-10 h-10 rounded-full bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 flex items-center justify-center shrink-0">
        <Truck class="w-5 h-5" />
      </div>
      <div>
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">التوصيل المتوقع</p>
        <p class="font-medium text-gray-900 dark:text-white">{{ order.estimatedDelivery || 'يحدد لاحقاً' }}</p>
      </div>
    </div>

    <!-- Order Date -->
    <div class="flex items-start gap-4">
      <div class="w-10 h-10 rounded-full bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 flex items-center justify-center shrink-0">
        <Calendar class="w-5 h-5" />
      </div>
      <div>
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">تاريخ الطلب</p>
        <p class="font-medium text-gray-900 dark:text-white">{{ formatDate(order.createdAt) }}</p>
      </div>
    </div>

  </div>
</template>

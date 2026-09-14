<script setup lang="ts">
import { Wallet, ShieldCheck, AlertCircle } from 'lucide-vue-next'
import type { Order } from '~/types'

const props = defineProps<{
  order: Order
}>()

const formatPrice = (price: number) => {
  return price.toLocaleString('en-US')
}
</script>

<template>
  <div class="py-8">
    <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
      <Wallet class="w-5 h-5 text-gray-400" />
      معلومات الدفع
    </h3>
    
    <div class="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 border border-gray-100 dark:border-gray-700">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
        
        <!-- Payment Details -->
        <div class="space-y-4">
          <div class="flex items-center gap-3">
            <div class="w-2 h-2 rounded-full" :class="order.paymentStatus === 'paid' ? 'bg-green-500' : 'bg-yellow-500'"></div>
            <p class="text-sm text-gray-700 dark:text-gray-300">
              <span class="text-gray-500 dark:text-gray-400">وسيلة الدفع:</span> 
              <span class="font-medium mr-1">{{ order.paymentMethod }}</span>
            </p>
          </div>
          <div class="flex items-center gap-3">
            <div class="w-2 h-2 rounded-full" :class="order.paymentStatus === 'paid' ? 'bg-green-500' : 'bg-yellow-500'"></div>
            <p class="text-sm text-gray-700 dark:text-gray-300">
              <span class="text-gray-500 dark:text-gray-400">حالة الدفع:</span> 
              <span class="font-medium mr-1">{{ order.paymentStatus === 'paid' ? 'تم الدفع بنجاح' : 'قيد الانتظار' }}</span>
            </p>
          </div>
        </div>

        <!-- Payment Amount -->
        <div class="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700 min-w-[200px] text-center md:text-right">
          <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">المبلغ الإجمالي</p>
          <p class="text-xl font-bold text-gray-900 dark:text-white dir-ltr">
            {{ formatPrice(order.total) }} ج.م
          </p>
        </div>
      </div>

      <!-- COD Warning (If applicable) -->
      <div v-if="order.paymentMethod.includes('عند الاستلام')" class="mt-6 flex items-start gap-3 text-amber-600 dark:text-amber-500 bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
        <AlertCircle class="w-5 h-5 shrink-0" />
        <p class="text-sm">
          يرجى تجهيز المبلغ نقدًا عند استلام الطلب. قد يتم تطبيق رسوم إضافية لخدمة الدفع عند الاستلام.
        </p>
      </div>
      
      <!-- Secure Payment Note -->
      <div v-else class="mt-6 flex items-center justify-center gap-2 text-green-600 dark:text-green-500 text-sm">
        <ShieldCheck class="w-4 h-4" />
        <span>تمت عملية الدفع بشكل آمن</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dir-ltr {
  direction: ltr;
  display: inline-block;
}
</style>

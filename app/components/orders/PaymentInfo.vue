<script setup lang="ts">
import { CreditCard, Wallet, Banknote } from 'lucide-vue-next'
import type { PaymentInfo } from '~/types/order'

const props = defineProps<{
  payment: PaymentInfo
}>()

const getIcon = () => {
  if (props.payment.method.includes('بطاقة') || props.payment.method.toLowerCase().includes('card')) {
    return CreditCard
  }
  if (props.payment.method.includes('نقدي') || props.payment.method.includes('استلام') || props.payment.method.toLowerCase().includes('cash')) {
    return Banknote
  }
  return Wallet
}
</script>

<template>
  <div class="bg-surface rounded-2xl border border-border shadow-sm p-6">
    <div class="flex items-center gap-3 mb-6">
      <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
        <component :is="getIcon()" class="w-5 h-5" />
      </div>
      <h3 class="text-lg font-bold text-text-primary">معلومات الدفع</h3>
    </div>

    <div class="space-y-3">
      <div class="flex justify-between items-start">
        <span class="text-sm text-text-secondary shrink-0">طريقة الدفع</span>
        <div class="flex items-center gap-2 text-left">
          <span class="font-medium text-text-primary">{{ payment.method }}</span>
          <span v-if="payment.cardLast4" class="text-text-secondary" dir="ltr">**** {{ payment.cardLast4 }}</span>
        </div>
      </div>

      <div class="flex justify-between items-start">
        <span class="text-sm text-text-secondary shrink-0">حالة الدفع</span>
        <span 
          class="inline-block px-3 py-1 rounded-full text-xs font-bold text-left"
          :class="{
            'bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400': payment.status === 'paid',
            'bg-yellow-50 text-yellow-600 dark:bg-yellow-500/10 dark:text-yellow-400': payment.status === 'pending',
            'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400': payment.status === 'failed',
            'bg-gray-50 text-gray-600 dark:bg-gray-500/10 dark:text-gray-400': payment.status === 'refunded',
          }"
        >
          {{ 
            payment.status === 'paid' ? 'تم الدفع' :
            payment.status === 'pending' ? 'قيد الانتظار' :
            payment.status === 'failed' ? 'فشل الدفع' :
            payment.status === 'refunded' ? 'مسترد' : payment.status
          }}
        </span>
      </div>
      
      <div v-if="payment.date" class="flex justify-between items-start">
        <span class="text-sm text-text-secondary shrink-0">تاريخ الدفع</span>
        <span class="font-medium text-text-primary text-left" dir="ltr">{{ new Date(payment.date).toLocaleDateString('ar-EG') }}</span>
      </div>
      
      <div v-if="payment.notes" class="flex flex-col gap-1 pt-1">
        <span class="text-sm text-text-secondary">ملاحظات</span>
        <span class="font-medium text-text-primary">{{ payment.notes }}</span>
      </div>
    </div>
  </div>
</template>

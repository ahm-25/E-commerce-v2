<script setup lang="ts">
import { Receipt } from 'lucide-vue-next'

const props = defineProps<{
  subtotal: number
  discount: number
  shippingCost: number
  tax: number
  total: number
  itemCount: number
}>()

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('ar-EG', {
    style: 'currency',
    currency: 'EGP'
  }).format(amount).replace('EGP', 'ج.م')
}
</script>

<template>
  <div class="bg-surface rounded-2xl border border-border shadow-sm p-6">
    <div class="flex items-center gap-3 mb-6">
      <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
        <Receipt class="w-5 h-5" />
      </div>
      <h3 class="text-lg font-bold text-text-primary">ملخص الطلب</h3>
    </div>

    <div class="space-y-4">
      <div class="flex justify-between items-center text-text-secondary">
        <span>إجمالي المنتجات ({{ itemCount }})</span>
        <span class="font-medium text-text-primary" dir="ltr">{{ formatCurrency(subtotal) }}</span>
      </div>
      
      <div v-if="discount > 0" class="flex justify-between items-center text-green-600 dark:text-green-400">
        <span>الخصم</span>
        <span class="font-medium" dir="ltr">- {{ formatCurrency(discount) }}</span>
      </div>
      
      <div class="flex justify-between items-center text-text-secondary">
        <span>الشحن</span>
        <span class="font-medium text-text-primary" dir="ltr">{{ formatCurrency(shippingCost) }}</span>
      </div>
      
      <div v-if="tax > 0" class="flex justify-between items-center text-text-secondary">
        <span>الضريبة</span>
        <span class="font-medium text-text-primary" dir="ltr">{{ formatCurrency(tax) }}</span>
      </div>

      <div class="pt-4 border-t border-border">
        <div class="flex justify-between items-center">
          <span class="font-bold text-lg text-text-primary">الإجمالي الكلي</span>
          <span class="font-bold text-xl text-primary" dir="ltr">{{ formatCurrency(total) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

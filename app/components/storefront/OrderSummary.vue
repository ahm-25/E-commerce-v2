<script setup lang="ts">
import { Lock, ArrowLeft } from 'lucide-vue-next'
import CouponInput from './CouponInput.vue'
import { useCart } from '~/composables/useCart'

const { 
  cartCount, 
  subtotal, 
  discountAmount, 
  subtotalAfterDiscount, 
  taxAmount, 
  grandTotal, 
  shippingCost 
} = useCart()

const emit = defineEmits<{
  (e: 'checkout'): void
}>()
</script>

<template>
  <div class="bg-white rounded-3xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 sticky top-28">
    <h2 class="text-xl font-black text-gray-900 mb-6">ملخص الطلب</h2>

    <CouponInput />

    <div class="space-y-4 my-8 pb-8 border-b border-gray-100 text-sm">
      <div class="flex justify-between items-center text-gray-600">
        <span>إجمالي المنتجات ({{ cartCount }} قطع)</span>
        <span class="font-bold text-gray-900">{{ subtotal.toLocaleString() }} ج.م</span>
      </div>
      
      <div v-if="discountAmount > 0" class="flex justify-between items-center text-green-600 font-medium">
        <span>الخصم</span>
        <span>-{{ discountAmount.toLocaleString() }} ج.م</span>
      </div>

      <div class="flex justify-between items-center text-gray-600">
        <span>الشحن</span>
        <span v-if="shippingCost === 0" class="text-green-600 font-medium">مجاني</span>
        <span v-else class="font-bold text-gray-900">{{ shippingCost.toLocaleString() }} ج.م</span>
      </div>

      <div class="flex justify-between items-center text-gray-600">
        <span>ضريبة القيمة المضافة (14%)</span>
        <span class="font-bold text-gray-900">{{ taxAmount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }) }} ج.م</span>
      </div>
    </div>

    <div class="flex justify-between items-end mb-8">
      <span class="text-lg font-bold text-gray-900">الإجمالي الكلي</span>
      <div class="text-left">
        <span class="block text-3xl font-black text-primary">{{ grandTotal.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }) }} <span class="text-lg">ج.م</span></span>
        <span class="text-xs text-gray-500 mt-1 block">شامل ضريبة القيمة المضافة</span>
      </div>
    </div>

    <button 
      @click="emit('checkout')"
      class="w-full py-4 bg-primary text-white rounded-xl font-bold text-lg hover:bg-primary-dark transition-colors shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 flex items-center justify-center gap-2 hover:-translate-y-0.5 active:scale-95"
    >
      <Lock class="w-5 h-5" />
      إتمام الشراء
    </button>

    <NuxtLink 
      to="/products"
      class="w-full mt-4 py-3.5 bg-white border border-gray-200 text-gray-900 hover:bg-gray-50 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 active:scale-95 hidden md:flex"
    >
      <ArrowLeft class="w-4 h-4" />
      متابعة التسوق
    </NuxtLink>
    
    <div class="mt-6 flex items-center justify-center gap-4 text-gray-400">
      <!-- Mocks for payment icons -->
      <div class="flex gap-2 opacity-60 grayscale">
        <div class="w-10 h-6 bg-gray-100 rounded border border-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-600">VISA</div>
        <div class="w-10 h-6 bg-gray-100 rounded border border-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-600">MC</div>
        <div class="w-10 h-6 bg-gray-100 rounded border border-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-600">MADA</div>
        <div class="w-10 h-6 bg-gray-100 rounded border border-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-600">APPLE</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ShoppingCart, Edit2, ShieldCheck, RefreshCcw, Truck, Award } from 'lucide-vue-next'
import { useCartStore } from '~/stores/cart'
import CouponInput from '~/components/storefront/CouponInput.vue'

const cartStore = useCartStore()
</script>

<template>
  <div class="bg-surface border border-border/50 rounded-[2rem] p-6 sm:p-8 shadow-sm lg:sticky lg:top-32">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6 pb-6 border-b border-border/50">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <ShoppingCart class="w-5 h-5" />
        </div>
        <div>
          <h2 class="text-xl font-bold text-gray-900">ملخص الطلب</h2>
          <p class="text-sm text-text-secondary mt-1">{{ cartStore.cartCount }} منتجات</p>
        </div>
      </div>
    </div>

    <!-- Items List (Mini) -->
    <div class="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
      <div v-for="item in cartStore.items" :key="item.id" class="flex gap-4 p-2 rounded-xl hover:bg-gray-50 transition-colors">
        <!-- Image -->
        <div class="w-16 h-16 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-200">
          <NuxtImg 
            :src="item.image" 
            :alt="item.title"
            class="w-full h-full object-cover"
            format="webp"
            width="64"
            height="64"
          />
        </div>
        
        <!-- Info -->
        <div class="flex-grow flex flex-col justify-center min-w-0">
          <h4 class="font-bold text-sm text-gray-900 line-clamp-1" :title="item.title">{{ item.title }}</h4>
          
          <div v-if="item.attributes" class="text-xs text-gray-500 mt-1 flex flex-wrap gap-1">
            <span v-for="(value, key) in item.attributes" :key="key" class="bg-gray-100 px-1.5 py-0.5 rounded-md">
              {{ value }}
            </span>
          </div>

          <div class="flex items-center justify-between mt-1">
            <span class="text-xs font-bold text-gray-500">{{ item.quantity }} ×</span>
            <span class="text-sm font-black text-primary">{{ item.price.toLocaleString('ar-EG') }} ج.م</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Cart Link -->
    <NuxtLink to="/cart" class="flex items-center justify-center gap-2 text-sm font-bold text-primary hover:text-accent transition-colors mb-6 pb-6 border-b border-border/50">
      <Edit2 class="w-4 h-4" />
      تعديل سلة التسوق
    </NuxtLink>

    <!-- Coupon -->
    <div class="mb-6 pb-6 border-b border-border/50">
      <CouponInput />
    </div>

    <!-- Totals -->
    <div class="space-y-3 mb-6">
      <div class="flex items-center justify-between text-sm">
        <span class="text-gray-500 font-medium">إجمالي المنتجات</span>
        <span class="font-bold text-gray-900">{{ cartStore.subtotal.toLocaleString('ar-EG') }} ج.م</span>
      </div>
      
      <div v-if="cartStore.discountAmount > 0" class="flex items-center justify-between text-sm text-green-600">
        <span class="font-medium">الخصم</span>
        <span class="font-bold">-{{ cartStore.discountAmount.toLocaleString('ar-EG') }} ج.م</span>
      </div>
      
      <div class="flex items-center justify-between text-sm">
        <span class="text-gray-500 font-medium">الشحن</span>
        <span class="font-bold text-gray-900">{{ cartStore.shippingCost > 0 ? cartStore.shippingCost.toLocaleString('ar-EG') + ' ج.م' : 'اختر طريقة الشحن' }}</span>
      </div>
      
      <div v-if="cartStore.taxAmount > 0" class="flex items-center justify-between text-sm">
        <span class="text-gray-500 font-medium">ضريبة القيمة المضافة ({{ cartStore.taxRate * 100 }}%)</span>
        <span class="font-bold text-gray-900">{{ cartStore.taxAmount.toLocaleString('ar-EG') }} ج.م</span>
      </div>
    </div>

    <!-- Grand Total -->
    <div class="flex items-center justify-between pt-6 border-t-2 border-dashed border-border mb-6">
      <span class="text-lg font-black text-gray-900">الإجمالي الكلي</span>
      <span class="text-2xl font-black text-primary">{{ cartStore.grandTotal.toLocaleString('ar-EG') }} ج.م</span>
    </div>

    <!-- Trust Badges (Mini) -->
    <div class="grid grid-cols-3 gap-2 mt-8">
      <div class="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl bg-gray-50 text-center">
        <ShieldCheck class="w-5 h-5 text-gray-400" />
        <span class="text-[10px] font-bold text-gray-500 leading-tight">دفع آمن</span>
      </div>
      <div class="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl bg-gray-50 text-center">
        <RefreshCcw class="w-5 h-5 text-gray-400" />
        <span class="text-[10px] font-bold text-gray-500 leading-tight">إرجاع سهل</span>
      </div>
      <div class="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl bg-gray-50 text-center">
        <Truck class="w-5 h-5 text-gray-400" />
        <span class="text-[10px] font-bold text-gray-500 leading-tight">شحن سريع</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #E5E7EB;
  border-radius: 20px;
}
.custom-scrollbar:hover::-webkit-scrollbar-thumb {
  background-color: #D1D5DB;
}
</style>

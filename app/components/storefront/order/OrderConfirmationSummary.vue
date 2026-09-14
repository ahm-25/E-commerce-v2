<script setup lang="ts">
import { ref } from 'vue'
import { ChevronDown, ChevronUp } from 'lucide-vue-next'
import type { Order } from '~/types'

defineProps<{
  order: Order
}>()

const isExpanded = ref(true)

const formatPrice = (price: number) => {
  return price.toLocaleString('en-US')
}
</script>

<template>
  <div class="bg-gray-50 dark:bg-gray-800/30 rounded-2xl p-6 lg:p-8 sticky top-24">
    <!-- Mobile Toggle Header -->
    <button 
      @click="isExpanded = !isExpanded"
      class="w-full flex items-center justify-between lg:hidden mb-2"
    >
      <h2 class="text-xl font-bold text-gray-900 dark:text-white">ملخص الطلب</h2>
      <component :is="isExpanded ? ChevronUp : ChevronDown" class="w-5 h-5 text-gray-500" />
    </button>
    
    <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-6 hidden lg:block">ملخص الطلب</h2>

    <div v-show="isExpanded || $screens?.lg">
      <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
        {{ order.items.length }} منتجات ({{ order.items.reduce((acc, item) => acc + item.quantity, 0) }} قطع)
      </p>

      <!-- Items List -->
      <div class="space-y-4 mb-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        <div 
          v-for="item in order.items" 
          :key="item.id"
          class="flex gap-4 py-4 border-b border-gray-200 dark:border-gray-700 last:border-0"
        >
          <div class="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700">
            <NuxtImg 
              :src="item.image" 
              :alt="item.name"
              class="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div class="flex-grow flex flex-col justify-between">
            <div>
              <h4 class="text-sm font-medium text-gray-900 dark:text-white line-clamp-2 mb-1">
                {{ item.name }}
              </h4>
              <div class="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <span v-if="item.color">اللون: {{ item.color }}</span>
                <span v-if="item.color && item.size">|</span>
                <span v-if="item.size">المقاس: {{ item.size }}</span>
              </div>
            </div>
            <div class="flex items-center justify-between mt-2">
              <span class="text-xs text-gray-500 dark:text-gray-400">&times; {{ item.quantity }}</span>
              <span class="text-sm font-bold text-gray-900 dark:text-white dir-ltr">
                {{ formatPrice(item.price) }} ج.م
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Price Breakdown -->
      <div class="space-y-3 py-4 border-t border-gray-200 dark:border-gray-700">
        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">تفاصيل السعر</h3>
        
        <div class="flex justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>إجمالي المنتجات ({{ order.items.reduce((acc, item) => acc + item.quantity, 0) }} قطع)</span>
          <span class="dir-ltr">{{ formatPrice(order.subtotal) }} ج.م</span>
        </div>
        
        <div v-if="order.discount > 0" class="flex justify-between text-sm text-green-600 dark:text-green-400">
          <span>الخصم</span>
          <span class="dir-ltr">- {{ formatPrice(order.discount) }} ج.م</span>
        </div>
        
        <div class="flex justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>الشحن</span>
          <span class="dir-ltr">{{ order.shippingCost === 0 ? 'مجانًا' : `${formatPrice(order.shippingCost)} ج.م` }}</span>
        </div>
        
        <div class="flex justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>ضريبة القيمة المضافة (14%)</span>
          <span class="dir-ltr">{{ formatPrice(order.tax) }} ج.م</span>
        </div>
      </div>

      <!-- Total -->
      <div class="flex justify-between items-center py-4 border-t border-gray-200 dark:border-gray-700">
        <span class="text-lg font-bold text-gray-900 dark:text-white">الإجمالي الكلي</span>
        <span class="text-2xl font-bold text-gray-900 dark:text-white dir-ltr">
          {{ formatPrice(order.total) }} ج.م
        </span>
      </div>

      <!-- Support Card -->
      <div class="mt-6 bg-white dark:bg-gray-900 rounded-xl p-4 flex items-start gap-4 border border-gray-100 dark:border-gray-800">
        <div class="text-gray-400 mt-1">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
            <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
          </svg>
        </div>
        <div>
          <h4 class="font-medium text-gray-900 dark:text-white text-sm mb-1">تحتاج إلى مساعدة؟</h4>
          <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">فريق الدعم متاح على مدار الساعة</p>
          <NuxtLink to="/contact" class="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium">
            تواصل معنا
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dir-ltr {
  direction: ltr;
  display: inline-block;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  @apply bg-gray-200 dark:bg-gray-700;
  border-radius: 4px;
}
</style>

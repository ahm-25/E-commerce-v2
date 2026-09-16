<script setup lang="ts">
import type { OrderItem } from '~/types/order'
import { NuxtImg } from '#components'

const props = defineProps<{
  items: OrderItem[]
}>()

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('ar-EG', {
    style: 'currency',
    currency: 'EGP'
  }).format(amount).replace('EGP', 'ج.م')
}
</script>

<template>
  <div class="bg-surface rounded-2xl border border-border shadow-sm overflow-hidden">
    <div class="p-4 md:p-6 border-b border-border">
      <h3 class="text-lg font-bold text-text-primary">
        المنتجات المطلوبة <span class="text-text-secondary text-base font-normal">({{ items.length }} منتجات)</span>
      </h3>
    </div>

    <!-- Desktop View: Table-like structure -->
    <div class="hidden md:block">
      <div class="flex items-center p-4 bg-background border-b border-border text-sm font-semibold text-text-secondary">
        <div class="flex-1">المنتج</div>
        <div class="w-24 text-center">الكمية</div>
        <div class="w-32 text-center">السعر</div>
        <div class="w-32 text-center">الإجمالي</div>
      </div>
      
      <div class="divide-y divide-border">
        <div v-for="item in items" :key="item.id" class="flex items-center p-4 hover:bg-background/50 transition-colors">
          <div class="flex-1 flex items-center gap-4">
            <div class="w-16 h-16 rounded-xl overflow-hidden bg-background shrink-0 border border-border">
              <NuxtImg :src="item.image" :alt="item.name" class="w-full h-full object-cover" />
            </div>
            <div>
              <NuxtLink :to="`/products/${item.slug}`" class="font-bold text-text-primary hover:text-primary transition-colors line-clamp-1 mb-1">
                {{ item.name }}
              </NuxtLink>
              <div class="text-sm text-text-secondary flex gap-2">
                <span v-if="item.color">اللون: {{ item.color }}</span>
                <span v-if="item.color && item.size">|</span>
                <span v-if="item.size">المقاس: {{ item.size }}</span>
              </div>
            </div>
          </div>
          
          <div class="w-24 text-center font-medium text-text-primary">
            {{ item.quantity }}
          </div>
          
          <div class="w-32 text-center text-text-secondary" dir="ltr">
            {{ formatCurrency(item.price) }}
          </div>
          
          <div class="w-32 text-center font-bold text-text-primary" dir="ltr">
            {{ formatCurrency(item.price * item.quantity) }}
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile View: Cards -->
    <div class="md:hidden divide-y divide-border">
      <div v-for="item in items" :key="item.id" class="p-4 flex gap-4">
        <div class="w-20 h-20 rounded-xl overflow-hidden bg-background shrink-0 border border-border">
          <NuxtImg :src="item.image" :alt="item.name" class="w-full h-full object-cover" />
        </div>
        
        <div class="flex-1 flex flex-col justify-between">
          <div>
            <NuxtLink :to="`/products/${item.slug}`" class="font-bold text-text-primary hover:text-primary transition-colors line-clamp-2 text-sm mb-1">
              {{ item.name }}
            </NuxtLink>
            <div class="text-xs text-text-secondary flex flex-wrap gap-x-2 gap-y-1">
              <span v-if="item.color">اللون: {{ item.color }}</span>
              <span v-if="item.size">المقاس: {{ item.size }}</span>
              <span>الكمية: {{ item.quantity }}</span>
            </div>
          </div>
          <div class="font-bold text-text-primary mt-2" dir="ltr">
            {{ formatCurrency(item.price * item.quantity) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

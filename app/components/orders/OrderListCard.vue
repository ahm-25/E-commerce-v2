<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Order } from '~/types/order'
import OrderStatusBadge from './OrderStatusBadge.vue'
import { ChevronLeft, Package, RotateCcw, Truck, Loader2 } from 'lucide-vue-next'

const props = defineProps<{
  order: Order
}>()

const emit = defineEmits<{
  reorder: [id: string]
  cancel: [id: string]
}>()

const isReordering = ref(false)
const isCancelling = ref(false)

const handleReorder = async () => {
  isReordering.value = true
  await new Promise(resolve => setTimeout(resolve, 300)) // ensure UI shows loading briefly if store is too fast
  emit('reorder', props.order.id)
  isReordering.value = false
}

const handleCancel = async () => {
  isCancelling.value = true
  await new Promise(resolve => setTimeout(resolve, 300))
  emit('cancel', props.order.id)
  isCancelling.value = false
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('ar-EG', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('ar-EG', {
    style: 'currency',
    currency: 'EGP',
    maximumFractionDigits: 0
  }).format(value)
}

const isCancelable = computed(() => {
  return ['pending', 'confirmed', 'processing'].includes(props.order.status)
})

const isTrackable = computed(() => {
  return ['shipped', 'out_for_delivery'].includes(props.order.status) && props.order.tracking?.url
})

const displayedItems = computed(() => {
  return props.order.items.slice(0, 3)
})

const extraItemsCount = computed(() => {
  return Math.max(0, props.order.items.length - 3)
})
</script>

<template>
  <div class="bg-surface border border-border rounded-2xl overflow-hidden hover:border-primary/30 transition-colors shadow-sm group">
    <!-- Header Section -->
    <div class="p-5 md:p-6 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-background/50">
      <div class="flex flex-col gap-2">
        <div class="flex items-center gap-3">
          <span class="text-lg font-bold text-text-primary">طلب #{{ order.orderNumber }}</span>
          <OrderStatusBadge :status="order.status" />
        </div>
        <div class="flex items-center text-sm text-text-secondary gap-2">
          <span>تم الطلب في {{ formatDate(order.createdAt) }}</span>
          <span class="w-1 h-1 rounded-full bg-border"></span>
          <span>{{ order.items.reduce((acc, item) => acc + item.quantity, 0) }} منتجات</span>
        </div>
      </div>
      <div class="flex items-center gap-4 sm:flex-col sm:items-end sm:gap-1">
        <span class="text-sm text-text-secondary">الإجمالي</span>
        <span class="text-lg font-extrabold text-primary">{{ formatCurrency(order.total) }}</span>
      </div>
    </div>

    <!-- Body Section (Items) -->
    <div class="p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
      
      <!-- Products Preview -->
      <div class="flex items-center gap-3">
        <div class="flex -space-x-4 -space-x-reverse rtl:space-x-reverse">
          <div 
            v-for="item in displayedItems" 
            :key="item.id"
            class="w-14 h-14 rounded-xl bg-background border-2 border-surface overflow-hidden shadow-sm relative z-10"
          >
            <img :src="item.image" :alt="item.name" class="w-full h-full object-cover" />
          </div>
          <div 
            v-if="extraItemsCount > 0"
            class="w-14 h-14 rounded-xl bg-background border-2 border-surface flex items-center justify-center shadow-sm relative z-0"
          >
            <span class="text-xs font-bold text-text-secondary">+{{ extraItemsCount }}</span>
          </div>
        </div>
        
        <div class="hidden sm:flex flex-col gap-1">
          <span class="text-sm font-semibold text-text-primary truncate max-w-[200px]">
            {{ displayedItems.map(i => i.name).join('، ') }}
          </span>
          <span v-if="extraItemsCount > 0" class="text-xs text-text-secondary">
            و {{ extraItemsCount }} منتجات أخرى
          </span>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex flex-wrap items-center gap-3 w-full md:w-auto">
        <NuxtLink 
          :to="`/account/orders/${order.orderNumber}`"
          class="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-background border border-border text-text-primary hover:border-primary hover:text-primary rounded-xl text-sm font-semibold transition-colors"
        >
          التفاصيل
          <ChevronLeft class="w-4 h-4" />
        </NuxtLink>

        <a 
          v-if="isTrackable"
          :href="order.tracking?.url"
          target="_blank"
          rel="noopener noreferrer"
          class="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-500/10 dark:hover:bg-indigo-500/20 dark:text-indigo-400 rounded-xl text-sm font-semibold transition-colors"
        >
          <Truck class="w-4 h-4" />
          تتبع الطلب
        </a>

        <button 
          @click="handleReorder"
          :disabled="isReordering"
          class="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-background border border-border text-text-primary hover:bg-surface disabled:opacity-50 disabled:cursor-not-allowed rounded-xl text-sm font-semibold transition-colors"
        >
          <Loader2 v-if="isReordering" class="w-4 h-4 animate-spin" />
          <RotateCcw v-else class="w-4 h-4" />
          إعادة الطلب
        </button>

        <button 
          v-if="isCancelable"
          @click="handleCancel"
          :disabled="isCancelling"
          class="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 text-red-500 bg-red-50 hover:bg-red-100 dark:bg-red-500/10 dark:hover:bg-red-500/20 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl text-sm font-semibold transition-colors"
        >
          <Loader2 v-if="isCancelling" class="w-4 h-4 animate-spin" />
          <span v-else>إلغاء</span>
        </button>
      </div>
      
    </div>
  </div>
</template>

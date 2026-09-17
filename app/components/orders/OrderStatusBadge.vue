<script setup lang="ts">
import { computed } from 'vue'
import type { OrderStatus } from '~/types/order'
import { 
  Clock, 
  CheckCircle2, 
  Package, 
  Truck, 
  MapPin, 
  XCircle, 
  RefreshCcw 
} from 'lucide-vue-next'

const props = defineProps<{
  status: OrderStatus
}>()

const statusMap = {
  pending: { label: 'قيد المراجعة', icon: Clock, class: 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400 border-amber-200 dark:border-amber-500/20' },
  confirmed: { label: 'تم التأكيد', icon: CheckCircle2, class: 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 border-blue-200 dark:border-blue-500/20' },
  processing: { label: 'قيد التجهيز', icon: Package, class: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400 border-indigo-200 dark:border-indigo-500/20' },
  shipped: { label: 'تم الشحن', icon: Truck, class: 'bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400 border-purple-200 dark:border-purple-500/20' },
  out_for_delivery: { label: 'خرج للتوصيل', icon: MapPin, class: 'bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400 border-sky-200 dark:border-sky-500/20' },
  delivered: { label: 'تم التوصيل', icon: CheckCircle2, class: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20' },
  cancelled: { label: 'ملغي', icon: XCircle, class: 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400 border-red-200 dark:border-red-500/20' },
  returned: { label: 'مرتجع', icon: RefreshCcw, class: 'bg-slate-50 text-slate-600 dark:bg-slate-500/10 dark:text-slate-400 border-slate-200 dark:border-slate-500/20' },
}

const currentStatus = computed(() => statusMap[props.status] || statusMap.pending)
</script>

<template>
  <span 
    class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border transition-colors whitespace-nowrap"
    :class="currentStatus.class"
  >
    <component :is="currentStatus.icon" class="w-3.5 h-3.5" />
    {{ currentStatus.label }}
  </span>
</template>

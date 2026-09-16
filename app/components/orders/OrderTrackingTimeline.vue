<script setup lang="ts">
import { Package, Clock, Truck, Home, CheckCircle2, XCircle } from 'lucide-vue-next'
import type { OrderTimelineItem } from '~/types/order'

const props = defineProps<{
  timeline: OrderTimelineItem[]
}>()

const getIcon = (status: string) => {
  switch (status) {
    case 'pending':
      return Package
    case 'processing':
      return Clock
    case 'shipped':
      return Truck
    case 'out_for_delivery':
      return Home
    case 'delivered':
      return CheckCircle2
    case 'cancelled':
    case 'returned':
      return XCircle
    default:
      return CheckCircle2
  }
}
</script>

<template>
  <div class="bg-surface rounded-2xl p-6 md:p-8 border border-border shadow-sm">
    <div class="relative">
      <!-- Desktop Line -->
      <div class="hidden md:block absolute top-7 left-[10%] right-[10%] h-1 -translate-y-1/2 bg-border"></div>
      
      <!-- Mobile Line -->
      <div class="md:hidden absolute top-0 bottom-0 right-7 w-1 bg-border rounded-full"></div>

      <div class="relative flex flex-col md:flex-row justify-between z-10">
        <!-- We use an explicit line to connect items with exact width based on completed status on desktop -->
        <div class="hidden md:block absolute top-7 right-1/2 left-1/2 h-1 -translate-y-1/2 bg-green-500 transition-all duration-500 origin-right" :style="{ transform: `scaleX(${(timeline.filter(t => t.isCompleted || t.isCurrent).length - 1) / (timeline.length - 1)})` }"></div>
        <div class="md:hidden absolute top-0 right-7 w-1 bg-green-500 transition-all duration-500 rounded-full origin-top" :style="{ transform: `scaleY(${(timeline.filter(t => t.isCompleted || t.isCurrent).length - 1) / (timeline.length - 1)})` }"></div>

        <div 
          v-for="(item, index) in timeline" 
          :key="index"
          class="flex-1 flex md:flex-col items-center gap-4 md:gap-3 relative z-10"
        >
          <div 
            class="flex items-center justify-center w-14 h-14 rounded-full border-4 shrink-0 transition-colors duration-300 bg-surface"
            :class="[
              item.isCompleted ? 'border-green-500 text-green-500' : 
              item.isCurrent ? 'border-primary text-primary' : 
              'border-border text-text-secondary'
            ]"
          >
            <component :is="getIcon(item.status)" class="w-6 h-6" />
          </div>

          <div class="flex flex-col md:items-center text-right md:text-center w-full">
            <span 
              class="font-bold text-sm md:text-base mb-1"
              :class="[
                item.isCompleted || item.isCurrent ? 'text-text-primary' : 'text-text-secondary'
              ]"
            >
              {{ item.title }}
            </span>
            <span v-if="item.date" class="text-xs text-text-secondary" dir="ltr">{{ item.date }}</span>
            <span v-else class="text-xs text-text-secondary">لم يتم بعد</span>
            <p v-if="item.description" class="text-xs text-text-secondary mt-1">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

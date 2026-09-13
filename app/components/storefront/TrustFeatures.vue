<script setup lang="ts">
import { ShieldCheck, Truck, RefreshCw, BadgeCheck } from 'lucide-vue-next'

const features = [
  {
    icon: ShieldCheck,
    title: 'دفع آمن',
    description: 'جميع وسائل الدفع'
  },
  {
    icon: Truck,
    title: 'شحن سريع',
    description: 'خلال 2-5 أيام'
  },
  {
    icon: RefreshCw,
    title: 'إرجاع سهل',
    description: 'خلال 14 يومًا'
  },
  {
    icon: BadgeCheck,
    title: 'منتجات أصلية',
    description: 'جودة مضمونة'
  }
]
</script>

<template>
  <div class="bg-gray-50 rounded-3xl p-8 border border-gray-100 my-8">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
      <div 
        v-for="(feature, index) in features" 
        :key="index"
        class="flex flex-col md:flex-row items-center md:items-start text-center md:text-right gap-4 group"
      >
        <div class="w-12 h-12 rounded-2xl bg-white border border-gray-200 flex items-center justify-center text-gray-700 group-hover:text-primary group-hover:border-primary/30 group-hover:shadow-md transition-all">
          <component :is="feature.icon" class="w-6 h-6" />
        </div>
        <div>
          <h4 class="font-bold text-gray-900 mb-1">{{ feature.title }}</h4>
          <p class="text-xs text-gray-500 font-medium">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

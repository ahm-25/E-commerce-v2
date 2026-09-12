<script setup lang="ts">
import { Truck, RotateCcw, ShieldCheck, Leaf } from 'lucide-vue-next'

// The features can be configurable by tenant, but for now we'll use props or static defaults
const features = [
  { id: 'shipping', title: 'شحن سريع', description: 'خلال 2–5 أيام', icon: Truck },
  { id: 'returns', title: 'إرجاع سهل', description: 'خلال 14 يوم', icon: RotateCcw },
  { id: 'secure', title: 'دفع آمن', description: 'جميع وسائل الدفع', icon: ShieldCheck },
  { id: 'quality', title: 'جودة عالية', description: 'مواد ممتازة', icon: Leaf },
]
</script>

<template>
  <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 py-6 border-y border-border">
    <div v-for="feature in features" :key="feature.id" class="flex flex-col items-center justify-center text-center p-4 bg-surface/50 rounded-2xl">
      <component :is="feature.icon" class="w-8 h-8 text-text-primary mb-3 stroke-[1.5]" />
      <h4 class="font-bold text-sm text-text-primary mb-1">{{ feature.title }}</h4>
      <p class="text-xs text-text-secondary">{{ feature.description }}</p>
    </div>
  </div>
</template>

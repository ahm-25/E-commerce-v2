<script setup lang="ts">
import { useCheckoutStore } from '~/stores/checkout'
import { Check } from 'lucide-vue-next'

const checkoutStore = useCheckoutStore()

const steps = [
  { id: 1, name: 'معلوماتك' },
  { id: 2, name: 'عنوان الشحن' },
  { id: 3, name: 'طريقة الدفع' },
  { id: 4, name: 'تأكيد الطلب' }
]
</script>

<template>
  <div class="w-full max-w-4xl mx-auto mb-10 overflow-hidden px-4 md:px-0">
    <!-- Desktop / Tablet Steps -->
    <div class="hidden sm:flex items-center justify-between relative">
      <!-- Background Line -->
      <div class="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-border/50 -z-10 mx-[12%]"></div>
      
      <!-- Active Line -->
      <div 
        class="absolute right-0 top-1/2 -translate-y-1/2 h-1 bg-primary -z-10 transition-all duration-500 ease-in-out"
        :style="{ width: `calc(${((checkoutStore.currentStep - 1) / (steps.length - 1)) * 100}% - ${checkoutStore.currentStep === 1 ? '0%' : '12%'})` }"
      ></div>

      <div 
        v-for="step in steps" 
        :key="step.id"
        class="flex flex-col items-center gap-3 relative z-10"
      >
        <div 
          class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-500 shadow-sm"
          :class="[
            step.id < checkoutStore.currentStep ? 'bg-primary text-white border-2 border-primary' : 
            step.id === checkoutStore.currentStep ? 'bg-primary text-white border-4 border-primary/20 ring-4 ring-primary/10' : 
            'bg-surface text-text-secondary border-2 border-border'
          ]"
        >
          <Check v-if="step.id < checkoutStore.currentStep" class="w-5 h-5 animate-[scaleIn_0.3s_ease-out]" />
          <span v-else>{{ step.id }}</span>
        </div>
        <span 
          class="text-sm font-bold transition-colors duration-300"
          :class="step.id <= checkoutStore.currentStep ? 'text-primary' : 'text-text-secondary'"
        >
          {{ step.name }}
        </span>
      </div>
    </div>

    <!-- Mobile Steps (Simplified) -->
    <div class="sm:hidden flex flex-col items-center gap-2">
      <div class="flex items-center gap-2 text-sm font-bold text-primary">
        <span>الخطوة {{ checkoutStore.currentStep }} من {{ steps.length }}</span>
        <span>-</span>
        <span>{{ steps[checkoutStore.currentStep - 1].name }}</span>
      </div>
      <div class="w-full h-2 bg-border/50 rounded-full overflow-hidden mt-2">
        <div 
          class="h-full bg-primary transition-all duration-500 ease-in-out"
          :style="{ width: `${(checkoutStore.currentStep / steps.length) * 100}%` }"
        ></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes scaleIn {
  from { transform: scale(0); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
</style>

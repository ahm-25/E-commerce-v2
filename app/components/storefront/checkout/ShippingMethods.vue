<script setup lang="ts">
import { useCheckoutStore } from '~/stores/checkout'
import { useCheckout } from '~/composables/useCheckout'
import { Truck } from 'lucide-vue-next'

const store = useCheckoutStore()
const { shippingMethods, isLoadingShipping } = useCheckout()
</script>

<template>
  <section class="bg-surface border border-border/50 rounded-[2rem] p-6 sm:p-8 shadow-sm mt-6">
    <!-- Header -->
    <div class="flex items-center gap-3 mb-6">
      <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
        <Truck class="w-5 h-5" />
      </div>
      <h2 class="text-xl font-bold text-gray-900">طريقة الشحن</h2>
    </div>

    <div v-if="isLoadingShipping" class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div v-for="i in 3" :key="i" class="h-32 bg-gray-100 animate-pulse rounded-2xl border border-gray-200"></div>
    </div>
    
    <div v-else-if="shippingMethods.length === 0" class="text-center py-8 text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-300">
      الرجاء اختيار المحافظة أولاً لعرض طرق الشحن المتاحة.
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <label 
        v-for="method in shippingMethods" 
        :key="method.id"
        class="relative flex flex-col p-5 cursor-pointer rounded-2xl border-2 transition-all duration-300 group hover:shadow-md"
        :class="store.shippingMethodId === method.id ? 'border-primary bg-primary/5 shadow-sm' : 'border-border bg-background hover:border-primary/50'"
      >
        <div class="flex items-start justify-between mb-2">
          <div class="flex items-center gap-3">
            <div 
              class="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors flex-shrink-0"
              :class="store.shippingMethodId === method.id ? 'border-primary' : 'border-gray-300 group-hover:border-primary/50'"
            >
              <div v-if="store.shippingMethodId === method.id" class="w-2.5 h-2.5 bg-primary rounded-full animate-[scaleIn_0.2s_ease-out]"></div>
            </div>
            <span class="font-bold text-gray-900 group-hover:text-primary transition-colors">{{ method.name }}</span>
          </div>
        </div>
        
        <div class="mt-1 mr-8 text-sm text-gray-500">{{ method.duration }}</div>
        <div class="mt-4 mr-8 font-black text-primary text-lg">{{ method.cost.toLocaleString('ar-EG') }} ج.م</div>

        <input 
          type="radio" 
          :value="method.id" 
          v-model="store.shippingMethodId" 
          class="sr-only" 
        />
      </label>
    </div>
  </section>
</template>

<style scoped>
@keyframes scaleIn {
  from { transform: scale(0); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
</style>

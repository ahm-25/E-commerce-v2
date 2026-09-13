<script setup lang="ts">
import { useCheckoutStore } from '~/stores/checkout'
import { useCheckout } from '~/composables/useCheckout'
import { CreditCard, Banknote, Wallet, ShieldCheck } from 'lucide-vue-next'
import { computed } from 'vue'

const store = useCheckoutStore()
const { paymentMethods, isLoadingPayment } = useCheckout()

// Define a map for icon components based on the string returned from API
const iconMap: Record<string, any> = {
  'Banknote': Banknote,
  'CreditCard': CreditCard,
  'Wallet': Wallet
}

const getIcon = (iconName: string) => {
  return iconMap[iconName] || CreditCard // fallback
}
</script>

<template>
  <section class="bg-surface border border-border/50 rounded-[2rem] p-6 sm:p-8 shadow-sm mt-6">
    <!-- Header -->
    <div class="flex items-center gap-3 mb-6">
      <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
        <CreditCard class="w-5 h-5" />
      </div>
      <h2 class="text-xl font-bold text-gray-900">طريقة الدفع</h2>
    </div>

    <div v-if="isLoadingPayment" class="space-y-4">
      <div v-for="i in 3" :key="i" class="h-20 bg-gray-100 animate-pulse rounded-2xl border border-gray-200"></div>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <label 
        v-for="method in paymentMethods" 
        :key="method.id"
        class="relative flex items-center p-5 cursor-pointer rounded-2xl border-2 transition-all duration-300 group hover:shadow-md"
        :class="store.paymentMethodId === method.id ? 'border-primary bg-primary/5 shadow-sm' : 'border-border bg-background hover:border-primary/50'"
      >
        <div 
          class="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors flex-shrink-0 ml-4"
          :class="store.paymentMethodId === method.id ? 'border-primary' : 'border-gray-300 group-hover:border-primary/50'"
        >
          <div v-if="store.paymentMethodId === method.id" class="w-2.5 h-2.5 bg-primary rounded-full animate-[scaleIn_0.2s_ease-out]"></div>
        </div>
        
        <div class="flex-grow">
          <div class="font-bold text-gray-900 group-hover:text-primary transition-colors text-lg">{{ method.name }}</div>
          <div class="text-sm text-gray-500 mt-1">{{ method.description }}</div>
        </div>

        <div class="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm border border-border/50 text-primary mr-4 flex-shrink-0">
          <component :is="getIcon(method.icon)" class="w-6 h-6" />
        </div>

        <input 
          type="radio" 
          :value="method.id" 
          v-model="store.paymentMethodId" 
          class="sr-only" 
        />
      </label>
    </div>

    <!-- Security Note -->
    <div class="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500 bg-gray-50 py-3 rounded-xl border border-gray-200">
      <ShieldCheck class="w-4 h-4 text-green-500" />
      <span>جميع عمليات الدفع مشفرة وآمنة 100%</span>
    </div>
  </section>
</template>

<style scoped>
@keyframes scaleIn {
  from { transform: scale(0); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
</style>

<script setup lang="ts">
import { Check, Copy, CheckCircle2 } from 'lucide-vue-next'

defineProps<{
  orderNumber: string
  isCopied: boolean
}>()

defineEmits<{
  (e: 'copy'): void
}>()
</script>

<template>
  <div class="flex flex-col items-center text-center pb-8 border-b border-gray-100 dark:border-gray-800">
    <!-- Success Icon Container -->
    <div class="relative mb-6">
      <div class="absolute inset-0 bg-green-100 dark:bg-green-900/30 rounded-full animate-ping opacity-20"></div>
      <div class="w-20 h-20 bg-green-50 dark:bg-green-900/20 text-green-500 rounded-full flex items-center justify-center relative z-10">
        <Check class="w-10 h-10" stroke-width="3" />
      </div>
    </div>
    
    <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-3">
      تم تأكيد طلبك بنجاح
    </h1>
    
    <p class="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-6 leading-relaxed">
      شكرًا لك على ثقتك بنا، تم استلام طلبك وسيتم مراجعته وتجهيزه في أقرب وقت ممكن.
    </p>

    <!-- Order Number Badge -->
    <div class="inline-flex flex-col items-center bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 min-w-[200px]">
      <span class="text-sm text-gray-500 dark:text-gray-400 mb-2">رقم الطلب</span>
      <div class="flex items-center gap-3">
        <span class="text-xl font-bold text-gray-900 dark:text-white dir-ltr">
          #{{ orderNumber }}
        </span>
        <button 
          @click="$emit('copy')"
          class="text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors relative focus:outline-none focus:ring-2 focus:ring-primary-500/50 rounded-md p-1"
          aria-label="نسخ رقم الطلب"
          title="نسخ رقم الطلب"
        >
          <CheckCircle2 v-if="isCopied" class="w-5 h-5 text-green-500" />
          <Copy v-else class="w-5 h-5" />
          
          <!-- Toast for Copy -->
          <Transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="opacity-0 translate-y-1"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 translate-y-1"
          >
            <span v-if="isCopied" class="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1.5 px-3 rounded shadow-lg whitespace-nowrap z-50">
              تم النسخ!
              <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
            </span>
          </Transition>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dir-ltr {
  direction: ltr;
  display: inline-block;
}
</style>

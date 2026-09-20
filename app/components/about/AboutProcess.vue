<script setup lang="ts">
const steps = [
  { number: '01', title: 'اختر منتجاتك' },
  { number: '02', title: 'أضفها إلى السلة' },
  { number: '03', title: 'أكمل طلبك' },
  { number: '04', title: 'نستلمك طلبك ونوصله إليك' }
]
</script>

<template>
  <div class="py-16 md:py-24 font-arabic">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-2xl mx-auto mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">كيف نعمل؟</h2>
        <p class="text-gray-500 dark:text-gray-400 text-lg transition-colors">
          خطوات بسيطة تفصلك عن الحصول على ما تتمناه.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div 
          v-for="(step, index) in steps" 
          :key="step.number"
          class="relative flex flex-col items-center text-center group"
        >
          <!-- Connecting Line (Desktop) -->
          <div 
            v-if="index !== steps.length - 1" 
            class="hidden lg:block absolute top-10 rtl:right-1/2 ltr:left-1/2 w-[calc(100%+2rem)] h-[1px] bg-gray-200 dark:bg-gray-700"
          ></div>
          
          <div class="relative z-10 w-20 h-20 bg-white dark:bg-[#1a1a1a] border-2 border-gray-100 dark:border-gray-800 rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:border-gray-900 dark:group-hover:border-white transition-colors duration-300">
            <span class="text-2xl font-black text-gray-300 dark:text-gray-600 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300 font-sans">
              {{ step.number }}
            </span>
          </div>
          <h3 class="text-lg font-bold text-gray-900 dark:text-white transition-colors">{{ step.title }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

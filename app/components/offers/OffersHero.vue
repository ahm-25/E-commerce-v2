<script setup lang="ts">
import { Tag } from 'lucide-vue-next'
</script>

<template>
  <div class="relative bg-[#fafafa] overflow-hidden rounded-2xl mb-8 border border-gray-100">
    <!-- Abstract pattern background -->
    <div class="absolute inset-0 opacity-[0.03] pointer-events-none" style="background-image: radial-gradient(#000 1px, transparent 1px); background-size: 24px 24px;"></div>
    
    <div class="relative px-6 py-16 md:py-20 flex flex-col items-center justify-center text-center">
      <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 text-blue-600 mb-6 shadow-sm">
        <Tag class="w-8 h-8" stroke-width="1.5" />
      </div>
      
      <h1 class="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight font-arabic">
        العروض والخصومات
      </h1>
      
      <p class="max-w-2xl text-gray-500 text-lg md:text-xl leading-relaxed font-arabic">
        اكتشف أفضل العروض والخصومات المتاحة حاليًا واستفد من الأسعار المميزة قبل انتهائها.
      </p>
    </div>
  </div>
</template>

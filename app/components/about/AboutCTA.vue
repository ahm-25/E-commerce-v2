<script setup lang="ts">
import { ArrowLeft } from 'lucide-vue-next'
</script>

<template>
  <div class="py-20 md:py-32 font-arabic border-t border-gray-100 dark:border-gray-800 transition-colors">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 class="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 transition-colors">جاهز لاكتشاف منتجاتنا؟</h2>
      <p class="text-xl text-gray-500 dark:text-gray-400 mb-10 max-w-2xl mx-auto transition-colors">
        تصفح مجموعتنا واكتشف المنتجات التي تناسبك.
      </p>
      
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <NuxtLink 
          to="/products"
          class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-base font-bold rounded-full hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95"
        >
          تسوق الآن
          <ArrowLeft class="w-5 h-5" />
        </NuxtLink>
        <NuxtLink 
          to="/contact"
          class="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-white dark:bg-transparent border-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-base font-bold rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-300 active:scale-95"
        >
          تواصل معنا
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

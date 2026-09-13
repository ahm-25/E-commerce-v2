<script setup lang="ts">
import { ShoppingBag, ArrowLeft } from 'lucide-vue-next'
</script>

<template>
  <div class="bg-white rounded-3xl p-12 md:p-24 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col items-center text-center">
    <div class="relative mb-8 group">
      <div class="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gray-50 flex items-center justify-center border-4 border-white shadow-xl shadow-gray-200/50 relative z-10 group-hover:scale-105 transition-transform duration-500">
        <ShoppingBag class="w-12 h-12 md:w-16 md:h-16 text-gray-300 group-hover:text-primary transition-colors duration-500" />
      </div>
      <!-- Decorative background elements -->
      <div class="absolute inset-0 bg-primary/5 rounded-full scale-150 blur-2xl z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
    </div>
    
    <h2 class="text-2xl md:text-3xl font-black text-gray-900 mb-4">عربة التسوق فارغة</h2>
    <p class="text-gray-500 md:text-lg mb-10 max-w-sm">
      لم تقم بإضافة أي منتجات إلى سلة التسوق بعد. اكتشف أحدث المنتجات وأضفها لعربتك.
    </p>
    
    <NuxtLink 
      to="/products"
      class="px-8 py-4 bg-primary text-white rounded-xl font-bold text-lg hover:bg-primary-dark transition-all shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 active:scale-95 flex items-center gap-2"
    >
      تصفح المنتجات
    </NuxtLink>
    
    <NuxtLink 
      to="/"
      class="mt-6 text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-1.5"
    >
      <ArrowLeft class="w-4 h-4" />
      العودة إلى الرئيسية
    </NuxtLink>
  </div>
</template>

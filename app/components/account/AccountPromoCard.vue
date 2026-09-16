<script setup lang="ts">
import { Sparkles, ArrowLeft } from 'lucide-vue-next'
</script>

<template>
  <div class="bg-gradient-to-r from-primary to-indigo-600 rounded-2xl shadow-premium overflow-hidden relative group">
    <!-- Decorative elements -->
    <div class="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
    <div class="absolute bottom-0 left-0 w-40 h-40 bg-black/10 rounded-full blur-2xl -ml-10 -mb-10"></div>
    
    <div class="relative p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
      <div class="flex items-center gap-4 text-white z-10 w-full md:w-auto">
        <div class="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
          <Sparkles class="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 class="text-xl font-bold mb-1">اكتشف أحدث المنتجات والعروض المميزة</h3>
          <p class="text-white/80 text-sm">خصومات حصرية للأعضاء تصل إلى 40%</p>
        </div>
      </div>
      
      <NuxtLink to="/products" class="w-full md:w-auto px-6 py-3 bg-white text-primary rounded-xl font-bold text-sm text-center shadow-lg hover:bg-gray-50 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 z-10 group-hover:shadow-white/20">
        تسوق الآن
        <ArrowLeft class="w-4 h-4 transition-transform group-hover:-translate-x-1" />
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Tag } from 'lucide-vue-next'
</script>

<template>
  <div class="flex flex-col items-center justify-center py-20 text-center font-arabic px-4">
    <div class="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
      <Tag class="w-10 h-10 text-gray-300" stroke-width="1.5" />
    </div>
    
    <h3 class="text-2xl font-bold text-gray-900 mb-3">
      لا توجد عروض متاحة حاليًا
    </h3>
    
    <p class="text-gray-500 max-w-md mb-8">
      تابعنا باستمرار لاكتشاف العروض والخصومات الجديدة، أو قم بتغيير الفلاتر للبحث عن المزيد من المنتجات.
    </p>
    
    <div class="flex items-center gap-4">
      <button 
        @click="$emit('clear-filters')" 
        class="px-6 py-2.5 border border-gray-200 text-gray-700 font-bold text-sm rounded-full hover:bg-gray-50 transition-colors"
      >
        مسح الفلاتر
      </button>
      <NuxtLink 
        to="/products"
        class="px-6 py-2.5 bg-gray-900 text-white font-bold text-sm rounded-full hover:bg-gray-800 transition-colors"
      >
        تصفح جميع المنتجات
      </NuxtLink>
    </div>
  </div>
</template>

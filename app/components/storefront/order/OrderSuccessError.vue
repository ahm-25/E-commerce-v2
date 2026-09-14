<script setup lang="ts">
import { AlertCircle } from 'lucide-vue-next'

defineProps<{
  error: string
}>()
</script>

<template>
  <div class="py-20 flex flex-col items-center text-center">
    <div class="w-20 h-20 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-full flex items-center justify-center mb-6">
      <AlertCircle class="w-10 h-10" />
    </div>
    
    <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-3">
      عذراً، لم نتمكن من العثور على الطلب
    </h1>
    
    <p class="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-8 leading-relaxed">
      {{ error || 'رقم الطلب غير صحيح أو أنك لا تملك صلاحية الوصول إليه. يرجى التأكد من الرابط والمحاولة مرة أخرى.' }}
    </p>
    
    <div class="flex items-center gap-4">
      <NuxtLink 
        to="/"
        class="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl transition-colors"
      >
        العودة للرئيسية
      </NuxtLink>
      <button 
        @click="$emit('retry')"
        class="px-6 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium rounded-xl transition-colors"
      >
        إعادة المحاولة
      </button>
    </div>
  </div>
</template>

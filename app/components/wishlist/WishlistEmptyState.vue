<script setup lang="ts">
import { Heart } from 'lucide-vue-next'
</script>

<template>
  <div class="flex flex-col items-center justify-center py-16 px-4 text-center bg-surface rounded-2xl border border-border shadow-sm">
    <div class="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
      <Heart class="w-10 h-10 text-primary" stroke-width="1.5" />
    </div>
    
    <h3 class="text-2xl font-bold text-text-primary mb-3">قائمة المفضلة فارغة</h3>
    <p class="text-text-secondary max-w-md mx-auto mb-8">
      أضف المنتجات التي تعجبك إلى المفضلة لتجدها هنا بسهولة وتتمكن من شرائها لاحقاً.
    </p>
    
    <div class="flex flex-col sm:flex-row gap-4">
      <NuxtLink 
        to="/products"
        class="inline-flex items-center justify-center px-8 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-colors"
      >
        تصفح المنتجات
      </NuxtLink>
      
      <NuxtLink 
        to="/"
        class="inline-flex items-center justify-center px-8 py-3 bg-background text-text-primary border border-border font-semibold rounded-xl hover:bg-border/50 transition-colors"
      >
        العودة إلى الرئيسية
      </NuxtLink>
    </div>
  </div>
</template>

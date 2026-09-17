<script setup lang="ts">
import type { NuxtError } from '#app'
import { useRouter } from 'vue-router'
import { Home, ArrowRight, ShoppingBag } from 'lucide-vue-next'

const props = defineProps({
  error: Object as () => NuxtError
})

const router = useRouter()

const handleError = () => clearError({ redirect: '/' })
const goBack = () => router.back()
</script>

<template>
  <div class="min-h-screen bg-background flex flex-col items-center justify-center p-4 text-center">
    <!-- Visual Element -->
    <div class="relative mb-8">
      <div class="text-[12rem] md:text-[16rem] font-black text-primary/5 leading-none select-none">
        404
      </div>
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="w-32 h-32 md:w-40 md:h-40 bg-surface rounded-full shadow-premium flex items-center justify-center">
          <ShoppingBag class="w-16 h-16 md:w-20 md:h-20 text-primary" stroke-width="1.5" />
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="max-w-md">
      <h1 class="text-3xl md:text-4xl font-extrabold text-text-primary mb-4 tracking-tight">
        الصفحة غير موجودة
      </h1>
      
      <p class="text-lg text-text-secondary mb-10 leading-relaxed">
        عذرًا، الصفحة التي تبحث عنها غير موجودة أو ربما تم نقلها أو حذفها.
      </p>
      
      <!-- Actions -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <button 
          @click="handleError"
          class="px-8 py-3.5 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 hover:shadow-[0_8px_20px_rgba(var(--color-primary),0.3)] transition-all flex items-center justify-center gap-2"
        >
          <Home class="w-5 h-5" />
          العودة للرئيسية
        </button>
        
        <NuxtLink 
          to="/products"
          class="px-8 py-3.5 bg-surface border border-border text-text-primary rounded-xl font-bold hover:bg-background transition-all flex items-center justify-center gap-2"
        >
          متابعة التسوق
        </NuxtLink>
      </div>
      
      <button 
        @click="goBack"
        class="mt-8 text-text-secondary hover:text-primary font-medium text-sm inline-flex items-center gap-1.5 transition-colors"
      >
        <ArrowRight class="w-4 h-4" />
        العودة للصفحة السابقة
      </button>

      <!-- Dev mode specific details -->
      <div v-if="error?.message && error.statusCode !== 404" class="mt-12 p-4 bg-red-50 dark:bg-red-900/10 rounded-xl text-left border border-red-100 dark:border-red-900/30 overflow-auto max-w-2xl mx-auto hidden sm:block">
        <p class="text-red-800 dark:text-red-400 font-mono text-xs">{{ error.message }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import * as lucideIcons from 'lucide-vue-next'

const props = defineProps<{
  title?: string
  description?: string
  icon?: string // Must match a lucide icon name like 'AlertTriangle'
  onRetry?: () => void
  onHome?: () => void
}>()

const displayTitle = computed(() => props.title || 'حدث خطأ غير متوقع')
const displayDescription = computed(() => props.description || 'تعذر إكمال العملية الآن. حاول مرة أخرى بعد قليل.')

// Dynamically resolve the Lucide icon if provided
const IconComponent = computed(() => {
  if (props.icon && (lucideIcons as any)[props.icon]) {
    return (lucideIcons as any)[props.icon]
  }
  return (lucideIcons as any)['AlertOctagon'] // Fallback
})
</script>

<template>
  <div class="flex flex-col items-center justify-center py-16 text-center px-4 bg-red-50/50 dark:bg-red-950/10 rounded-3xl border border-red-100 dark:border-red-900/30" role="alert" aria-live="polite">
    <div class="w-20 h-20 bg-red-100 dark:bg-red-500/20 rounded-full flex items-center justify-center mb-6">
      <component :is="IconComponent" class="w-10 h-10 text-red-500" />
    </div>
    
    <h2 class="text-2xl font-bold text-red-700 dark:text-red-400 mb-3">{{ displayTitle }}</h2>
    
    <p class="text-red-600/80 dark:text-red-300/80 max-w-md mx-auto mb-8 text-lg">
      {{ displayDescription }}
    </p>
    
    <div class="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-sm">
      <button 
        v-if="onRetry"
        @click="onRetry"
        class="px-6 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 hover:shadow-lg transition-all flex-1"
      >
        إعادة المحاولة
      </button>
      
      <button 
        v-if="onHome"
        @click="onHome"
        class="px-6 py-3 bg-white dark:bg-surface border border-red-200 dark:border-red-900 text-red-700 dark:text-red-400 rounded-xl font-bold hover:bg-red-50 dark:hover:bg-red-900/30 transition-all flex-1"
      >
        العودة للرئيسية
      </button>

      <NuxtLink 
        v-if="!onHome && !onRetry"
        to="/"
        class="px-6 py-3 bg-white dark:bg-surface border border-red-200 dark:border-red-900 text-red-700 dark:text-red-400 rounded-xl font-bold hover:bg-red-50 dark:hover:bg-red-900/30 transition-all flex-1 inline-flex items-center justify-center"
      >
        العودة للرئيسية
      </NuxtLink>
    </div>
  </div>
</template>

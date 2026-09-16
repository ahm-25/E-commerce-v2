<script setup lang="ts">
import { ref } from 'vue'
import { AlertTriangle, X, LogOut } from 'lucide-vue-next'

const props = defineProps<{
  isOpen: boolean
  isLoading?: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'confirm'): void
}>()
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
    <div class="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" @click="!isLoading && emit('close')"></div>
    
    <div class="bg-surface rounded-2xl shadow-premium w-full max-w-md relative z-10 overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">
      <!-- Header -->
      <div class="flex items-center justify-between p-5 border-b border-border">
        <h3 class="text-lg font-bold text-text-primary">تسجيل الخروج من جميع الأجهزة</h3>
        <button 
          @click="!isLoading && emit('close')" 
          :disabled="isLoading"
          class="p-2 hover:bg-background rounded-full transition-colors text-text-secondary disabled:opacity-50"
        >
          <X class="w-5 h-5" />
        </button>
      </div>
      
      <!-- Body -->
      <div class="p-6">
        <div class="flex items-start gap-4">
          <div class="w-12 h-12 bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center shrink-0">
            <AlertTriangle class="w-6 h-6" />
          </div>
          <div>
            <h4 class="font-bold text-text-primary mb-2 text-lg">تأكيد تسجيل الخروج</h4>
            <p class="text-text-secondary leading-relaxed">
              سيتم تسجيل الخروج من جميع الأجهزة والجلسات النشطة الأخرى، باستثناء جلستك الحالية. قد تحتاج إلى تسجيل الدخول مرة أخرى على تلك الأجهزة.
            </p>
          </div>
        </div>
      </div>
      
      <!-- Footer -->
      <div class="p-5 border-t border-border bg-background/50 flex gap-3">
        <button 
          @click="emit('confirm')" 
          :disabled="isLoading"
          class="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-red-600/50 disabled:cursor-not-allowed text-white px-4 py-2.5 rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
        >
          <span v-if="isLoading" class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
          <LogOut v-else class="w-5 h-5" />
          <span>{{ isLoading ? 'جاري تسجيل الخروج...' : 'تأكيد تسجيل الخروج' }}</span>
        </button>
        <button 
          @click="emit('close')" 
          :disabled="isLoading"
          class="flex-1 bg-surface border border-border hover:bg-background disabled:opacity-50 text-text-primary px-4 py-2.5 rounded-xl font-bold transition-colors"
        >
          إلغاء
        </button>
      </div>
    </div>
  </div>
</template>

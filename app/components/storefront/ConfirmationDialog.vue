<script setup lang="ts">
import { watch } from 'vue'
import { AlertCircle, X } from 'lucide-vue-next'

const props = defineProps<{
  isOpen: boolean
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  isDestructive?: boolean
}>()

const emit = defineEmits<{
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()

// Prevent scrolling when modal is open
watch(() => props.isOpen, (val) => {
  if (import.meta.client) {
    if (val) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }
})
</script>

<template>
  <Teleport to="body">
    <transition
      enter-active-class="transition-opacity duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div 
        v-if="isOpen" 
        class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0"
      >
        <!-- Backdrop -->
        <div 
          class="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
          @click="emit('cancel')"
        ></div>
        
        <!-- Dialog -->
        <div 
          class="relative bg-white rounded-3xl shadow-[0_20px_60px_rgb(0,0,0,0.1)] w-full max-w-md p-6 overflow-hidden text-center transform transition-all scale-100"
        >
          <button 
            @click="emit('cancel')"
            class="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-900 transition-colors bg-gray-50 rounded-full hover:bg-gray-100"
          >
            <X class="w-5 h-5" />
          </button>

          <div 
            class="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center"
            :class="isDestructive ? 'bg-red-50 text-red-500' : 'bg-primary/10 text-primary'"
          >
            <AlertCircle class="w-8 h-8" />
          </div>

          <h3 class="text-xl font-black text-gray-900 mb-2">{{ title }}</h3>
          <p class="text-gray-500 mb-8">{{ message }}</p>

          <div class="flex gap-3">
            <button 
              @click="emit('cancel')"
              class="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-colors"
            >
              {{ cancelText || 'إلغاء' }}
            </button>
            <button 
              @click="emit('confirm')"
              class="flex-1 py-3 px-4 text-white rounded-xl font-bold transition-colors shadow-lg"
              :class="isDestructive ? 'bg-red-500 hover:bg-red-600 shadow-red-500/20' : 'bg-primary hover:bg-primary-dark shadow-primary/20'"
            >
              {{ confirmText || 'تأكيد' }}
            </button>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

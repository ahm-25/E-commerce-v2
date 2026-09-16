<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue'
import { AlertTriangle, X } from 'lucide-vue-next'

const props = defineProps<{
  isOpen: boolean
  isLoading?: boolean
  isDefault?: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'confirm'): void
}>()

const dialogOverlay = ref<HTMLElement | null>(null)

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.isOpen && !props.isLoading) {
    emit('close')
  }
}

watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeydown)
  } else {
    document.body.style.overflow = ''
    document.removeEventListener('keydown', handleKeydown)
  }
})

onUnmounted(() => {
  document.body.style.overflow = ''
  document.removeEventListener('keydown', handleKeydown)
})

const handleBackdropClick = (e: MouseEvent) => {
  if (e.target === dialogOverlay.value && !props.isLoading) {
    emit('close')
  }
}
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div 
        v-if="isOpen" 
        ref="dialogOverlay"
        class="fixed inset-0 z-50 bg-black/50 dark:bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
        @click="handleBackdropClick"
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-dialog-title"
      >
        <div 
          class="bg-background w-full max-w-md rounded-2xl shadow-2xl p-6 relative transform transition-all text-center"
          @click.stop
        >
          <button 
            @click="!isLoading && emit('close')" 
            class="absolute top-4 right-4 p-1.5 text-text-secondary hover:bg-surface rounded-full transition-colors focus:outline-none"
            :disabled="isLoading"
            aria-label="إغلاق"
          >
            <X class="w-5 h-5" />
          </button>

          <div class="w-16 h-16 bg-red-100 dark:bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-red-50 dark:border-red-500/10">
            <AlertTriangle class="w-8 h-8 text-red-600 dark:text-red-500" />
          </div>

          <h3 id="delete-dialog-title" class="text-xl font-bold text-text-primary mb-2">حذف العنوان</h3>
          
          <p class="text-text-secondary mb-2">
            هل أنت متأكد من حذف هذا العنوان؟ لا يمكن التراجع عن هذا الإجراء.
          </p>

          <div v-if="isDefault" class="bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-200 dark:border-yellow-500/20 rounded-lg p-3 mb-4 text-sm text-yellow-800 dark:text-yellow-400 font-medium">
            هذا هو العنوان الافتراضي حاليًا. سيتم اختيار عنوان آخر كافتراضي إذا كان متاحًا.
          </div>

          <div class="mt-6 flex items-center gap-3 w-full">
            <button 
              @click="emit('confirm')" 
              :disabled="isLoading"
              class="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-xl transition-colors disabled:opacity-70 flex items-center justify-center"
            >
              <div v-if="isLoading" class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span v-else>حذف العنوان</span>
            </button>
            <button 
              @click="emit('close')" 
              :disabled="isLoading"
              class="flex-1 bg-surface border border-border hover:bg-border/50 text-text-primary font-bold py-3 px-4 rounded-xl transition-colors disabled:opacity-70"
            >
              إلغاء
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

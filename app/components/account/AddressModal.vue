<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { X } from 'lucide-vue-next'
import AddressForm from './AddressForm.vue'
import type { AddressFormData, Address } from '~/types'

const props = defineProps<{
  isOpen: boolean
  title: string
  initialData?: Address | null
  isLoading?: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'submit', data: AddressFormData): void
}>()

const modalOverlay = ref<HTMLElement | null>(null)

// Focus trap and escape key handling
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.isOpen) {
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
  if (e.target === modalOverlay.value) {
    emit('close')
  }
}

const handleSubmit = (data: AddressFormData) => {
  emit('submit', data)
}
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div 
        v-if="isOpen" 
        ref="modalOverlay"
        class="fixed inset-0 z-50 bg-black/50 dark:bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
        @click="handleBackdropClick"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="title"
      >
        <div 
          class="bg-background w-full max-w-xl max-h-[90vh] flex flex-col rounded-2xl shadow-2xl overflow-hidden relative transform transition-all"
          @click.stop
        >
          <!-- Header -->
          <div class="px-6 py-5 border-b border-border flex items-center justify-between shrink-0">
            <h3 class="text-xl font-black text-text-primary">{{ title }}</h3>
            <button 
              @click="emit('close')" 
              class="p-2 text-text-secondary hover:bg-surface rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20"
              aria-label="إغلاق"
            >
              <X class="w-5 h-5" />
            </button>
          </div>

          <!-- Body -->
          <div class="p-6 overflow-y-auto custom-scrollbar relative" style="max-height: calc(90vh - 70px);">
            <div v-if="isLoading" class="absolute inset-0 z-10 bg-background/50 backdrop-blur-sm flex items-center justify-center">
              <div class="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
            
            <AddressForm 
              :initial-data="initialData" 
              @submit="handleSubmit" 
              @cancel="emit('close')" 
            />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Modal slide animation for inner content could be added by targeting the inner div in the transition hook if needed, but fade on overlay usually suffices */

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: var(--border);
  border-radius: 20px;
}
</style>

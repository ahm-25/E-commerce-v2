<script setup lang="ts">
import { Minus, Plus } from 'lucide-vue-next'

const props = defineProps<{
  modelValue: number
  max?: number
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()

const decrease = () => {
  if (props.modelValue > 1) {
    emit('update:modelValue', props.modelValue - 1)
  }
}

const increase = () => {
  if (!props.max || props.modelValue < props.max) {
    emit('update:modelValue', props.modelValue + 1)
  }
}
</script>

<template>
  <div class="flex items-center w-32 border-2 border-border rounded-xl bg-surface/50">
    <button 
      @click="decrease" 
      :disabled="modelValue <= 1"
      class="p-3 text-text-secondary hover:text-primary disabled:opacity-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-r-xl"
      aria-label="تقليل الكمية"
    >
      <Minus class="w-4 h-4" />
    </button>
    
    <div class="flex-grow text-center font-semibold text-lg">
      {{ modelValue }}
    </div>
    
    <button 
      @click="increase" 
      :disabled="max !== undefined && modelValue >= max"
      class="p-3 text-text-secondary hover:text-primary disabled:opacity-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-l-xl"
      aria-label="زيادة الكمية"
    >
      <Plus class="w-4 h-4" />
    </button>
  </div>
</template>

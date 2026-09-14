<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  id: string
  label: string
  type?: string
  modelValue: string
  placeholder?: string
  error?: string
  disabled?: boolean
  required?: boolean
  autocomplete?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const inputType = computed(() => props.type || 'text')

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div class="mb-4">
    <label :for="id" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 font-arabic">
      {{ label }} <span v-if="required" class="text-red-500">*</span>
    </label>
    <div class="relative">
      <input
        :id="id"
        :type="inputType"
        :value="modelValue"
        @input="updateValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :autocomplete="autocomplete"
        class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:outline-none transition-all duration-300 font-arabic text-right disabled:bg-gray-100 disabled:text-gray-500 dark:disabled:bg-gray-800 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
        :class="[
          error 
            ? 'border-red-500 focus:ring-red-100 dark:focus:ring-red-900/30' 
            : 'focus:bg-white dark:focus:bg-gray-800 focus:border-blue-500 focus:ring-blue-100 dark:focus:ring-blue-900/30'
        ]"
        :aria-invalid="!!error"
        :aria-describedby="error ? `${id}-error` : undefined"
      />
      <div v-if="$slots.icon" class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
        <slot name="icon" />
      </div>
      <div v-if="$slots.append" class="absolute inset-y-0 left-0 flex items-center pr-2">
        <slot name="append" />
      </div>
    </div>
    <p v-if="error" :id="`${id}-error`" class="mt-1 text-xs text-red-500 font-arabic text-right">
      {{ error }}
    </p>
  </div>
</template>

<style scoped>
.font-arabic {
  font-family: 'Cairo', 'IBM Plex Sans Arabic', sans-serif;
}
/* Adjust padding if append is present - handled roughly by absolute positioning, but usually needs class bindings. For now this is fine. */
input:not(:has(~ .absolute)) {
  padding-left: 1rem;
}
</style>

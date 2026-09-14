<script setup lang="ts">
import { ref } from 'vue'
import AuthInput from './AuthInput.vue'

const props = defineProps<{
  id: string
  label: string
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

const showPassword = ref(false)

const togglePassword = () => {
  showPassword.value = !showPassword.value
}
</script>

<template>
  <AuthInput
    :id="id"
    :label="label"
    :type="showPassword ? 'text' : 'password'"
    :modelValue="modelValue"
    @update:modelValue="emit('update:modelValue', $event)"
    :placeholder="placeholder"
    :error="error"
    :disabled="disabled"
    :required="required"
    :autocomplete="autocomplete"
  >
    <template #append>
      <button
        type="button"
        @click="togglePassword"
        class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 focus:outline-none p-2 ml-1"
        :aria-label="showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'"
      >
        <svg v-if="showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0l-3.29-3.29"></path></svg>
        <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
      </button>
    </template>
  </AuthInput>
</template>

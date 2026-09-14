<script setup lang="ts">
import { toRef } from 'vue'
import { usePasswordValidation } from '~/composables/usePasswordValidation'

const props = defineProps<{
  password: string
}>()

const passwordRef = toRef(props, 'password')
const { strengthLabel, strengthColor, strengthScore } = usePasswordValidation(passwordRef)
</script>

<template>
  <div v-if="password.length > 0" class="mt-2 text-right font-arabic">
    <div class="flex items-center justify-between text-xs mb-1">
      <span class="text-gray-600 dark:text-gray-400">قوة كلمة المرور:</span>
      <span :class="[
        strengthScore <= 1 ? 'text-red-500' : '',
        strengthScore === 2 || strengthScore === 3 ? 'text-yellow-600' : '',
        strengthScore >= 4 ? 'text-green-500' : ''
      ]">{{ strengthLabel }}</span>
    </div>
    <div class="flex gap-1 h-1.5 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
      <div 
        class="h-full transition-all duration-300"
        :class="strengthColor"
        :style="{ width: '25%' }"
        v-if="strengthScore >= 1"
      ></div>
      <div 
        class="h-full transition-all duration-300"
        :class="strengthColor"
        :style="{ width: '25%' }"
        v-if="strengthScore >= 2"
      ></div>
      <div 
        class="h-full transition-all duration-300"
        :class="strengthColor"
        :style="{ width: '25%' }"
        v-if="strengthScore >= 3"
      ></div>
      <div 
        class="h-full transition-all duration-300"
        :class="strengthColor"
        :style="{ width: '25%' }"
        v-if="strengthScore >= 4"
      ></div>
    </div>
    <p class="text-[10px] text-gray-500 dark:text-gray-400 mt-1">
      يجب أن تحتوي على 8 أحرف، حرف كبير، رقم، ورمز خاص.
    </p>
  </div>
</template>

<style scoped>
.font-arabic {
  font-family: 'Cairo', 'IBM Plex Sans Arabic', sans-serif;
}
</style>

<script setup lang="ts">
import { computed } from 'vue'
import { CheckCircle2, Circle } from 'lucide-vue-next'

const props = defineProps<{
  password: string
}>()

// Conditions
const hasMinLength = computed(() => props.password.length >= 8)
const hasUpperCase = computed(() => /[A-Z]/.test(props.password))
const hasLowerCase = computed(() => /[a-z]/.test(props.password))
const hasNumber = computed(() => /[0-9]/.test(props.password))
const hasSpecialChar = computed(() => /[^A-Za-z0-9]/.test(props.password))

// Array of conditions for rendering
const conditions = computed(() => [
  { label: '8 أحرف على الأقل', met: hasMinLength.value },
  { label: 'حرف كبير واحد على الأقل', met: hasUpperCase.value },
  { label: 'حرف صغير واحد على الأقل', met: hasLowerCase.value },
  { label: 'رقم واحد على الأقل', met: hasNumber.value },
  { label: 'رمز خاص واحد على الأقل', met: hasSpecialChar.value },
])

// Calculate score (0 to 5)
const score = computed(() => {
  if (!props.password) return 0
  let s = 0
  if (hasMinLength.value) s++
  if (hasUpperCase.value) s++
  if (hasLowerCase.value) s++
  if (hasNumber.value) s++
  if (hasSpecialChar.value) s++
  return s
})

// Strength level and color
const strengthInfo = computed(() => {
  if (score.value === 0) return { label: 'أدخل كلمة المرور', color: 'bg-border', textClass: 'text-text-secondary' }
  if (score.value <= 2) return { label: 'ضعيفة', color: 'bg-red-500', textClass: 'text-red-500' }
  if (score.value === 3 || score.value === 4) return { label: 'متوسطة', color: 'bg-amber-500', textClass: 'text-amber-500' }
  return { label: 'قوية جدًا', color: 'bg-green-500', textClass: 'text-green-500' } // 5
})

// Used by parent to know if valid
const isValid = computed(() => score.value === 5)

defineExpose({
  isValid
})
</script>

<template>
  <div class="space-y-4 bg-background/50 p-4 rounded-xl border border-border">
    <!-- Strength Bar -->
    <div>
      <div class="flex justify-between items-center mb-2">
        <span class="text-xs font-bold text-text-primary">قوة كلمة المرور</span>
        <span class="text-xs font-bold transition-colors duration-300" :class="strengthInfo.textClass">
          {{ strengthInfo.label }}
        </span>
      </div>
      <div class="flex gap-1 h-1.5">
        <div 
          class="flex-1 rounded-full transition-colors duration-300"
          :class="score >= 1 ? strengthInfo.color : 'bg-border'"
        ></div>
        <div 
          class="flex-1 rounded-full transition-colors duration-300"
          :class="score >= 3 ? strengthInfo.color : 'bg-border'"
        ></div>
        <div 
          class="flex-1 rounded-full transition-colors duration-300"
          :class="score >= 4 ? strengthInfo.color : 'bg-border'"
        ></div>
        <div 
          class="flex-1 rounded-full transition-colors duration-300"
          :class="score === 5 ? strengthInfo.color : 'bg-border'"
        ></div>
      </div>
    </div>
    
    <!-- Requirements List -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
      <div 
        v-for="(condition, index) in conditions" 
        :key="index"
        class="flex items-center gap-2 text-xs transition-colors duration-300"
        :class="condition.met ? 'text-green-600 dark:text-green-400' : 'text-text-secondary'"
      >
        <CheckCircle2 v-if="condition.met" class="w-4 h-4 shrink-0" />
        <Circle v-else class="w-4 h-4 shrink-0 opacity-50" />
        <span>{{ condition.label }}</span>
      </div>
    </div>
  </div>
</template>

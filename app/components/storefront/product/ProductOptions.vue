<script setup lang="ts">
import type { ProductOption } from '~/types'

const props = defineProps<{
  options: ProductOption[]
  modelValue: Record<string, string>
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: Record<string, string>): void
}>()

const selectOption = (optionId: string, valueId: string) => {
  const newValue = { ...props.modelValue, [optionId]: valueId }
  emit('update:modelValue', newValue)
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <div v-for="option in options" :key="option.id" class="flex flex-col gap-3">
      <div class="flex items-center gap-2">
        <span class="font-semibold text-text-primary">{{ option.name }}</span>
        <span v-if="modelValue[option.id]" class="text-text-secondary text-sm">
          {{ option.values.find(v => v.id === modelValue[option.id])?.label }}
        </span>
      </div>

      <div class="flex flex-wrap gap-3">
        <!-- Color Option -->
        <template v-if="option.type === 'color'">
          <button
            v-for="val in option.values"
            :key="val.id"
            @click="selectOption(option.id, val.id)"
            class="relative w-10 h-10 rounded-full border-2 transition-all"
            :class="modelValue[option.id] === val.id ? 'border-primary ring-2 ring-primary ring-offset-2 ring-offset-background' : 'border-border hover:border-text-secondary'"
            :style="{ backgroundColor: val.value }"
            :aria-label="`اختر لون ${val.label}`"
          ></button>
        </template>

        <!-- Size / Button Option -->
        <template v-else-if="option.type === 'size' || option.type === 'button'">
          <button
            v-for="val in option.values"
            :key="val.id"
            @click="selectOption(option.id, val.id)"
            class="px-5 py-2.5 rounded-xl border-2 font-medium transition-all"
            :class="modelValue[option.id] === val.id ? 'border-primary bg-primary/5 text-primary' : 'border-border text-text-secondary hover:border-text-secondary hover:text-text-primary'"
          >
            {{ val.label }}
          </button>
        </template>
        
        <!-- Fallback to button if type unknown -->
        <template v-else>
          <button
            v-for="val in option.values"
            :key="val.id"
            @click="selectOption(option.id, val.id)"
            class="px-4 py-2 border border-border rounded-md hover:bg-surface"
            :class="{ 'bg-primary text-surface border-primary': modelValue[option.id] === val.id }"
          >
            {{ val.label }}
          </button>
        </template>
      </div>
    </div>
  </div>
</template>

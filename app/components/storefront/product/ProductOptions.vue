<script setup lang="ts">
import type { ProductOption, ProductVariant } from '~/types'

const props = defineProps<{
  options: ProductOption[]
  modelValue: Record<string, string>
  variants?: ProductVariant[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: Record<string, string>): void
}>()

const inStock = (v: ProductVariant) => v.stock > 0

// A value is available when it's in stock combined with the other options as currently selected
const isAvailable = (optionId: string, valueId: string) => {
  if (!props.variants?.length) return true
  return props.variants.some(v => inStock(v) && v.options[optionId] === valueId &&
    Object.entries(props.modelValue).every(([id, selected]) => id === optionId || v.options[id] === selected))
}

// Sold out in every combination (e.g. a color with no size left)
const isSoldOut = (optionId: string, valueId: string) =>
  !!props.variants?.length && !props.variants.some(v => inStock(v) && v.options[optionId] === valueId)

const selectOption = (optionId: string, valueId: string) => {
  let newValue = { ...props.modelValue, [optionId]: valueId }
  // Picking a value that isn't available with the current choices switches the other
  // options to an in-stock combination, instead of leaving the customer on a dead end
  if (!isAvailable(optionId, valueId)) {
    const match = props.variants?.find(v => inStock(v) && v.options[optionId] === valueId)
    if (match) newValue = { ...newValue, ...match.options }
  }
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
        <span v-if="modelValue[option.id] && !isAvailable(option.id, modelValue[option.id]!)" class="text-xs font-semibold text-red-600">
          (غير متوفر)
        </span>
      </div>

      <div class="flex flex-wrap gap-3">
        <!-- Color Option -->
        <template v-if="option.type === 'color'">
          <button
            v-for="val in option.values"
            :key="val.id"
            @click="selectOption(option.id, val.id)"
            class="relative w-10 h-10 rounded-full border-2 transition-all overflow-hidden"
            :class="[
              modelValue[option.id] === val.id ? 'border-primary ring-2 ring-primary ring-offset-2 ring-offset-background' : 'border-border hover:border-text-secondary',
              { 'opacity-40': !isAvailable(option.id, val.id) }
            ]"
            :style="{ backgroundColor: val.value }"
            :aria-label="isSoldOut(option.id, val.id) ? `${val.label} - نفذت الكمية` : `اختر لون ${val.label}`"
            :title="isSoldOut(option.id, val.id) ? `${val.label} - نفذت الكمية` : val.label"
          >
            <!-- Diagonal strike for sold-out colors -->
            <span
              v-if="!isAvailable(option.id, val.id)"
              class="absolute inset-0 m-auto h-0.5 w-[140%] -translate-x-[15%] rotate-45 bg-red-600"
              aria-hidden="true"
            ></span>
          </button>
        </template>

        <!-- Size / Button Option -->
        <template v-else-if="option.type === 'size' || option.type === 'button'">
          <button
            v-for="val in option.values"
            :key="val.id"
            @click="selectOption(option.id, val.id)"
            class="px-5 py-2.5 rounded-xl border-2 font-medium transition-all"
            :class="[
              modelValue[option.id] === val.id ? 'border-primary bg-primary/5 text-primary' : 'border-border text-text-secondary hover:border-text-secondary hover:text-text-primary',
              { 'line-through decoration-red-600 decoration-2 opacity-50 border-dashed': !isAvailable(option.id, val.id) }
            ]"
            :aria-label="isAvailable(option.id, val.id) ? val.label : `${val.label} - غير متوفر`"
            :title="isAvailable(option.id, val.id) ? val.label : 'غير متوفر بالاختيار الحالي'"
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

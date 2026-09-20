<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { Clock } from 'lucide-vue-next'

const props = defineProps<{
  expiresAt: string
}>()

const emit = defineEmits(['expired'])

const timeRemaining = ref(0)
let timer: ReturnType<typeof setInterval> | null = null

const calculateTime = () => {
  const end = new Date(props.expiresAt).getTime()
  const now = new Date().getTime()
  const diff = end - now
  
  if (diff <= 0) {
    timeRemaining.value = 0
    if (timer) clearInterval(timer)
    emit('expired')
  } else {
    timeRemaining.value = diff
  }
}

onMounted(() => {
  calculateTime()
  timer = setInterval(calculateTime, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})

const days = computed(() => Math.floor(timeRemaining.value / (1000 * 60 * 60 * 24)))
const hours = computed(() => Math.floor((timeRemaining.value % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)))
const minutes = computed(() => Math.floor((timeRemaining.value % (1000 * 60 * 60)) / (1000 * 60)))
const seconds = computed(() => Math.floor((timeRemaining.value % (1000 * 60)) / 1000))

const formatNumber = (num: number) => num.toString().padStart(2, '0')
</script>

<template>
  <div v-if="timeRemaining > 0" class="inline-flex items-center gap-2 bg-rose-50 border border-rose-100 text-rose-700 px-3 py-1.5 rounded-full text-xs font-bold tracking-widest font-arabic" dir="ltr">
    <Clock class="w-3.5 h-3.5" stroke-width="2" />
    <div class="flex items-center gap-1">
      <span v-if="days > 0">{{ days }}d</span>
      <span v-if="days > 0">:</span>
      <span>{{ formatNumber(hours) }}</span>
      <span>:</span>
      <span>{{ formatNumber(minutes) }}</span>
      <span>:</span>
      <span>{{ formatNumber(seconds) }}</span>
    </div>
  </div>
  <div v-else class="inline-flex items-center gap-2 bg-gray-100 text-gray-500 px-3 py-1.5 rounded-full text-xs font-bold font-arabic">
    انتهى العرض
  </div>
</template>

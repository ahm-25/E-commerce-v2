<script setup lang="ts">
import { ref, computed } from 'vue'
import { Tag, Loader2, Check, X } from 'lucide-vue-next'
import { useCoupon } from '~/composables/useCoupon'

const { coupon, applying, error, success, applyCoupon, removeCoupon } = useCoupon()
const code = ref('')

const handleSubmit = () => {
  if (code.value.trim()) {
    applyCoupon(code.value.trim())
  }
}

const handleRemove = () => {
  code.value = ''
  removeCoupon()
}
</script>

<template>
  <div class="mt-6">
    <label class="block text-sm font-bold text-gray-900 mb-3">كود الخصم</label>
    
    <div v-if="coupon" class="flex items-center justify-between bg-green-50 border border-green-200 rounded-xl p-4">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
          <Check class="w-4 h-4" />
        </div>
        <div>
          <span class="block font-bold text-green-800">{{ coupon.code }}</span>
          <span class="text-xs text-green-600 font-medium">تم تطبيق الخصم بنجاح</span>
        </div>
      </div>
      <button 
        @click="handleRemove"
        :disabled="applying"
        class="text-red-500 hover:text-red-600 transition-colors p-2 hover:bg-red-50 rounded-full disabled:opacity-50"
      >
        <X class="w-4 h-4" />
      </button>
    </div>

    <form v-else @submit.prevent="handleSubmit" class="relative">
      <div class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
        <Tag class="w-5 h-5" />
      </div>
      <input 
        v-model="code"
        type="text" 
        placeholder="أدخل كود الخصم"
        class="w-full bg-gray-50 border border-gray-200 rounded-xl pr-10 pl-24 py-3.5 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:font-normal uppercase"
        :class="{ 'border-red-300 focus:ring-red-500/20 focus:border-red-500': error, 'border-green-300 focus:ring-green-500/20 focus:border-green-500': success }"
        :disabled="applying"
      >
      <button 
        type="submit"
        :disabled="!code.trim() || applying"
        class="absolute left-2 top-1/2 -translate-y-1/2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[70px]"
      >
        <Loader2 v-if="applying" class="w-4 h-4 animate-spin" />
        <span v-else>تطبيق</span>
      </button>
    </form>
    
    <transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-2 max-h-0"
      enter-to-class="opacity-100 translate-y-0 max-h-[50px]"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0 max-h-[50px]"
      leave-to-class="opacity-0 -translate-y-2 max-h-0"
    >
      <p v-if="error" class="text-sm text-red-500 font-medium mt-2 flex items-center gap-1.5 overflow-hidden">
        <X class="w-3.5 h-3.5 shrink-0" />
        {{ error }}
      </p>
    </transition>
  </div>
</template>

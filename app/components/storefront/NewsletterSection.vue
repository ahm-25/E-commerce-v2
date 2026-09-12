<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const status = ref<'idle' | 'loading' | 'success' | 'error'>('idle')

const subscribe = () => {
  if (!email.value || !email.value.includes('@')) {
    status.value = 'error'
    return
  }
  
  status.value = 'loading'
  
  // Mock API call
  setTimeout(() => {
    status.value = 'success'
    email.value = ''
    setTimeout(() => {
      status.value = 'idle'
    }, 3000)
  }, 1000)
}
</script>

<template>
  <section class="py-16 md:py-24 bg-surface border-t border-border relative overflow-hidden">
    <!-- Decorative subtle botanical illustration element (mocked with SVG) -->
    <div class="absolute bottom-0 right-0 opacity-10 pointer-events-none transform translate-x-1/4 translate-y-1/4 rtl:-scale-x-100">
      <svg width="400" height="400" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 200C100 144.772 55.2285 100 0 100C55.2285 100 100 55.2285 100 0C100 55.2285 144.772 100 200 100C144.772 100 100 144.772 100 200Z" fill="currentColor"/>
      </svg>
    </div>

    <div class="container mx-auto px-4 lg:px-8 relative z-10">
      <div class="max-w-2xl mx-auto text-center">
        <h2 class="text-2xl md:text-3xl font-bold text-text-primary mb-4">اشترك في نشرتنا البريدية</h2>
        <p class="text-text-secondary mb-8">كن أول من يعرف عن أحدث العروض والمنتجات الحصرية</p>
        
        <form @submit.prevent="subscribe" class="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
          <input 
            v-model="email"
            type="email" 
            placeholder="أدخل بريدك الإلكتروني" 
            class="flex-1 px-6 py-3.5 bg-background border border-border rounded-full text-text-primary focus:outline-none focus:border-primary transition-colors text-center sm:text-start"
            :class="{'border-red-500': status === 'error'}"
            :disabled="status === 'loading' || status === 'success'"
          >
          <button 
            type="submit"
            :disabled="status === 'loading' || status === 'success'"
            class="px-8 py-3.5 bg-primary text-surface rounded-full font-bold hover:bg-primary-hover transition-colors disabled:opacity-70 min-w-[140px]"
          >
            <span v-if="status === 'idle' || status === 'error'">اشترك الآن</span>
            <span v-else-if="status === 'loading'" class="inline-block animate-spin border-2 border-surface border-t-transparent rounded-full w-5 h-5"></span>
            <span v-else-if="status === 'success'">تم الاشتراك</span>
          </button>
        </form>
        <p v-if="status === 'error'" class="text-red-500 text-sm mt-3 font-medium">الرجاء إدخال بريد إلكتروني صحيح</p>
      </div>
    </div>
  </section>
</template>

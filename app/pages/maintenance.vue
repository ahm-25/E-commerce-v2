<script setup lang="ts">
import { RefreshCw, Wrench } from 'lucide-vue-next'

// Disable default layout (header/footer) to keep maintenance page lightweight and isolated
definePageMeta({
  layout: false
})

useHead({
  title: 'المتجر تحت الصيانة | Nexora',
  meta: [
    { name: 'description', content: 'نقوم حاليًا ببعض التحسينات على المتجر. شكرًا لصبرك.' }
  ]
})

const handleReload = () => {
  window.location.reload()
}
</script>

<template>
  <div class="min-h-screen bg-background flex flex-col items-center justify-center p-4 text-center">
    
    <!-- Header Minimal -->
    <div class="absolute top-0 left-0 right-0 p-6 flex justify-center">
      <div class="flex items-center gap-2.5 text-primary">
        <svg class="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 3L20 7.5V16.5L12 21L4 16.5V7.5L12 3Z" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/>
          <path d="M12 12L20 7.5M12 12V21M12 12L4 7.5" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/>
        </svg>
        <span class="text-2xl font-extrabold tracking-tight text-text-primary">Nexora</span>
      </div>
    </div>

    <!-- Visual Element -->
    <div class="relative mb-10 mt-16">
      <div class="absolute inset-0 bg-primary/5 rounded-full scale-150 blur-3xl"></div>
      <div class="w-32 h-32 md:w-40 md:h-40 bg-surface rounded-full shadow-premium flex items-center justify-center relative z-10 border border-border">
        <Wrench class="w-14 h-14 md:w-16 md:h-16 text-primary" stroke-width="1.5" />
      </div>
    </div>

    <!-- Content -->
    <div class="max-w-md relative z-10">
      <div class="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-full text-xs font-bold mb-6 border border-amber-200 dark:border-amber-900/30">
        <span class="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
        المتجر تحت الصيانة مؤقتًا
      </div>

      <h1 class="text-3xl md:text-4xl font-extrabold text-text-primary mb-4 tracking-tight">
        نعود إليك قريبًا
      </h1>
      
      <p class="text-lg text-text-secondary mb-10 leading-relaxed">
        نقوم حاليًا ببعض التحسينات والصيانة الدورية على المتجر لتقديم تجربة أفضل لك. شكرًا لصبرك وتفهمك.
      </p>
      
      <!-- Actions -->
      <button 
        @click="handleReload"
        class="px-8 py-3.5 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 hover:shadow-[0_8px_20px_rgba(var(--color-primary),0.3)] transition-all flex items-center justify-center gap-2 mx-auto w-full sm:w-auto"
      >
        <RefreshCw class="w-5 h-5" />
        إعادة تحميل الصفحة
      </button>
    </div>

    <!-- Footer Minimal -->
    <div class="absolute bottom-0 left-0 right-0 p-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-text-secondary">
      <p>© 2024 Nexora. جميع الحقوق محفوظة.</p>
      <div class="hidden sm:block w-1 h-1 rounded-full bg-border"></div>
      <a href="mailto:support@nexora.com" class="hover:text-primary transition-colors">الدعم الفني: support@nexora.com</a>
    </div>
  </div>
</template>

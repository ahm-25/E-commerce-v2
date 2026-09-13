<script setup lang="ts">
import { ShieldCheck, ArrowRight } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import { useCart } from '~/composables/useCart'

const router = useRouter()
const { hasItems } = useCart()

onMounted(() => {
  if (!hasItems.value) {
    router.replace('/cart')
  }
})

useHead({
  title: 'إتمام الشراء | Nexora'
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center">
    <div class="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-8 mx-auto">
      <ShieldCheck class="w-10 h-10" />
    </div>
    <h1 class="text-3xl font-black text-gray-900 mb-4">إتمام الشراء</h1>
    <p class="text-gray-500 max-w-md mx-auto mb-10 text-lg">
      هذه الصفحة تحت الإنشاء. سيتم ربطها بنظام الدفع الفعلي قريبًا.
    </p>
    
    <NuxtLink 
      to="/cart"
      class="inline-flex items-center gap-2 px-8 py-4 bg-white border border-gray-200 text-gray-900 rounded-xl font-bold hover:bg-gray-100 transition-colors shadow-sm"
    >
      <ArrowRight class="w-5 h-5" />
      العودة إلى عربة التسوق
    </NuxtLink>
  </div>
</template>

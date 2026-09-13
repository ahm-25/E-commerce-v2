<script setup lang="ts">
import { useRoute } from 'vue-router'
import { CheckCircle2, Package, ArrowRight, ShoppingBag } from 'lucide-vue-next'

const route = useRoute()
const orderId = route.params.orderId

useHead({
  title: 'تم تأكيد الطلب | Nexora'
})
</script>

<template>
  <div class="min-h-screen bg-background flex flex-col">
    <main class="flex-grow flex items-center justify-center p-6 pt-24 pb-20">
      <div class="bg-surface border border-border/50 rounded-[2rem] p-8 md:p-12 shadow-sm max-w-2xl w-full text-center">
        
        <div class="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
          <CheckCircle2 class="w-12 h-12" />
        </div>
        
        <h1 class="text-3xl md:text-4xl font-black text-gray-900 mb-4">تم استلام طلبك بنجاح!</h1>
        <p class="text-gray-500 text-lg mb-8 max-w-lg mx-auto">
          شكراً لتسوقك معنا. تم تأكيد طلبك وجاري تجهيزه للشحن. سنقوم بإرسال تفاصيل الطلب والتتبع عبر البريد الإلكتروني قريباً.
        </p>

        <div class="bg-gray-50 border border-gray-200 rounded-2xl p-6 mb-10 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12">
          <div class="flex flex-col items-center gap-2">
            <span class="text-sm text-gray-500 font-bold">رقم الطلب</span>
            <span class="text-xl font-black text-gray-900 flex items-center gap-2">
              <Package class="w-5 h-5 text-primary" />
              {{ orderId }}
            </span>
          </div>
          <div class="hidden md:block w-px h-12 bg-gray-300"></div>
          <div class="flex flex-col items-center gap-2">
            <span class="text-sm text-gray-500 font-bold">حالة الطلب</span>
            <span class="px-3 py-1 bg-green-100 text-green-700 font-bold rounded-full text-sm">
              قيد التجهيز
            </span>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <NuxtLink 
            to="/products"
            class="w-full sm:w-auto px-8 py-4 bg-primary text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary-dark transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1"
          >
            <ShoppingBag class="w-5 h-5" />
            الاستمرار في التسوق
          </NuxtLink>
          <NuxtLink 
            to="/"
            class="w-full sm:w-auto px-8 py-4 bg-white text-gray-900 border border-gray-200 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-50 transition-all duration-300"
          >
            العودة للرئيسية
            <ArrowRight class="w-5 h-5" />
          </NuxtLink>
        </div>
      </div>
    </main>
  </div>
</template>

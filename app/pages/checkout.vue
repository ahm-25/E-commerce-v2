<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '~/stores/cart'
import { useCheckoutStore } from '~/stores/checkout'
import { useCheckout } from '~/composables/useCheckout'
import { Lock } from 'lucide-vue-next'

import Breadcrumbs from '~/components/storefront/Breadcrumbs.vue'
import CheckoutSteps from '~/components/storefront/checkout/CheckoutSteps.vue'
import CustomerInformationForm from '~/components/storefront/checkout/CustomerInformationForm.vue'
import ShippingAddressForm from '~/components/storefront/checkout/ShippingAddressForm.vue'
import ShippingMethods from '~/components/storefront/checkout/ShippingMethods.vue'
import PaymentMethods from '~/components/storefront/checkout/PaymentMethods.vue'
import OrderNotes from '~/components/storefront/checkout/OrderNotes.vue'
import CheckoutOrderSummary from '~/components/storefront/checkout/CheckoutOrderSummary.vue'
import CheckoutSkeleton from '~/components/storefront/checkout/CheckoutSkeleton.vue'

const router = useRouter()
const cartStore = useCartStore()
const checkoutStore = useCheckoutStore()
const { initCheckout, submitOrder, isLoadingGovernorates } = useCheckout()

const isInitializing = ref(true)

const breadcrumbItems = [
  { label: 'الرئيسية', to: '/' },
  { label: 'عربة التسوق', to: '/cart' },
  { label: 'إتمام الشراء' }
]

onMounted(async () => {
  // 1. Check if cart has items, if not redirect to cart
  if (!cartStore.hasItems) {
    router.replace('/cart')
    return
  }

  // 2. Initialize checkout data
  try {
    await initCheckout()
  } finally {
    isInitializing.value = false
  }
})

useHead({
  title: 'إتمام الشراء | Nexora'
})
</script>

<template>
  <div class="min-h-screen bg-background flex flex-col">
    <main class="flex-grow pt-4 pb-20">
      <CheckoutSkeleton v-if="isInitializing" />
      
      <div v-else class="container mx-auto px-4 lg:px-8 py-8 md:py-12 max-w-7xl">
        <Breadcrumbs :items="breadcrumbItems" class="mb-8" />
        
        <!-- Hero Section -->
        <div class="flex flex-col items-center justify-center mb-12 text-center">
          <h1 class="text-3xl md:text-4xl font-black text-gray-900 mb-4 tracking-tight">إتمام الشراء</h1>
          <p class="text-text-secondary text-lg max-w-2xl">أكمل بياناتك لإتمام طلبك بأمان وسهولة</p>
        </div>

        <CheckoutSteps />

        <div class="flex flex-col lg:flex-row gap-8 lg:gap-12 relative">
          
          <!-- Forms Area (Left) -->
          <div class="flex-grow order-2 lg:order-1 flex flex-col">
            <CustomerInformationForm />
            <ShippingAddressForm />
            <ShippingMethods />
            <PaymentMethods />
            <OrderNotes />
            
            <!-- Terms & Conditions -->
            <div class="mt-8 mb-8 flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <input 
                id="terms" 
                type="checkbox" 
                class="mt-1 w-5 h-5 text-primary bg-white border-gray-300 rounded focus:ring-primary focus:ring-2"
                checked
              >
              <label for="terms" class="text-sm text-gray-700 leading-relaxed font-medium">
                أوافق على 
                <NuxtLink to="/terms" class="text-primary hover:underline font-bold">الشروط والأحكام</NuxtLink> و 
                <NuxtLink to="/privacy" class="text-primary hover:underline font-bold">سياسة الخصوصية</NuxtLink> 
                و 
                <NuxtLink to="/returns" class="text-primary hover:underline font-bold">سياسة الإرجاع</NuxtLink>.
              </label>
            </div>

            <!-- Main CTA (Desktop & Mobile) -->
            <button 
              @click="submitOrder"
              :disabled="checkoutStore.isSubmitting"
              class="w-full py-5 px-8 bg-primary text-white rounded-[1.25rem] font-black text-xl flex items-center justify-center gap-3 transition-all duration-300 hover:bg-primary-dark shadow-[0_15px_30px_rgba(37,99,235,0.2)] hover:shadow-[0_20px_40px_rgba(37,99,235,0.3)] hover:-translate-y-1 disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none"
            >
              <template v-if="checkoutStore.isSubmitting">
                <div class="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                جاري تأكيد الطلب...
              </template>
              <template v-else>
                <Lock class="w-6 h-6" />
                تأكيد الطلب والدفع
              </template>
            </button>
            <p class="text-center text-xs text-gray-400 mt-4 font-bold flex items-center justify-center gap-1">
              <Lock class="w-3 h-3" />
              العملية محمية ومشفرة بـ SSL
            </p>
          </div>

          <!-- Order Summary Area (Right) -->
          <div class="w-full lg:w-[400px] xl:w-[450px] flex-shrink-0 order-1 lg:order-2">
            <CheckoutOrderSummary />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>


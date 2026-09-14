<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useOrderConfirmation } from '~/composables/useOrderConfirmation'
import { ArrowRight, Download } from 'lucide-vue-next'

const route = useRoute()
const orderId = route.params.orderId as string

const {
  order,
  timeline,
  loading,
  error,
  isDownloading,
  isCopied,
  fetchOrder,
  copyOrderNumber,
  downloadInvoice
} = useOrderConfirmation()

const breadcrumbs = [
  { label: 'الرئيسية', to: '/' },
  { label: 'عربة التسوق', to: '/cart' },
  { label: 'إتمام الشراء', to: '/checkout' },
  { label: 'تأكيد الطلب', to: '#' }
]

onMounted(() => {
  if (orderId) {
    fetchOrder(orderId)
  }
})

useHead({
  title: 'تم تأكيد الطلب | Nexora'
})
</script>

<template>
  <div class="bg-white dark:bg-background min-h-screen pb-12">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <!-- Loading State -->
      <StorefrontOrderSuccessSkeleton v-if="loading" />

      <!-- Error State -->
      <StorefrontOrderSuccessError 
        v-else-if="error || !order" 
        :error="error || ''" 
        @retry="fetchOrder(orderId)"
      />

      <!-- Success State -->
      <div v-else>
        <StorefrontBreadcrumbs :items="breadcrumbs" class="mb-8" />
        
        <div class="flex flex-col lg:flex-row gap-8 lg:gap-12 relative">
          
          <!-- Main Content Column -->
          <div class="lg:w-2/3">
            <StorefrontOrderSuccessHero 
              :order-number="order.orderNumber"
              :is-copied="isCopied"
              @copy="copyOrderNumber(order.orderNumber)"
            />
            
            <StorefrontOrderInformation :order="order" />
            
            <!-- Actions (Mobile & Desktop) -->
            <div class="flex flex-col sm:flex-row items-center gap-4 py-8 border-b border-gray-100 dark:border-gray-800">
              <NuxtLink 
                :to="`/orders/${order.id}`"
                class="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl transition-colors"
              >
                تتبع الطلب
              </NuxtLink>
              
              <NuxtLink 
                to="/products"
                class="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium rounded-xl transition-colors"
              >
                متابعة التسوق
                <ArrowRight class="w-4 h-4 rotate-180" /> <!-- Rotate for RTL -->
              </NuxtLink>
              
              <button 
                @click="downloadInvoice(order.id)"
                :disabled="isDownloading"
                class="w-full sm:w-auto sm:mr-auto flex items-center justify-center gap-2 px-6 py-3.5 text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium rounded-xl transition-colors disabled:opacity-50"
              >
                <Download class="w-4 h-4" />
                {{ isDownloading ? 'جاري التحميل...' : 'تحميل تفاصيل الطلب' }}
              </button>
            </div>
            
            <StorefrontOrderTimeline :timeline="timeline" />
            <StorefrontOrderItemsList :items="order.items" />
            <StorefrontOrderShippingInformation :customer="order.customer" :shipping-address="order.shippingAddress" />
            <StorefrontOrderPaymentInformation :order="order" />
          </div>

          <!-- Sidebar Column -->
          <div class="lg:w-1/3">
            <StorefrontOrderConfirmationSummary :order="order" />
          </div>

          
        </div>
        
      </div>
    </div>
    
    <!-- Recommended Products & Promotional Banner -->
    <div v-if="!loading && !error && order" class="mt-16 border-t border-gray-100 dark:border-gray-800 pt-16">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <StorefrontPromotionalBanner />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useOrdersStore } from '~/stores/orders'
import { ArrowRight, Download, RefreshCcw, Headset, MessageSquareWarning } from 'lucide-vue-next'
import AccountSidebar from '~/components/account/AccountSidebar.vue'
import OrderTrackingTimeline from '~/components/orders/OrderTrackingTimeline.vue'
import OrderItems from '~/components/orders/OrderItems.vue'
import OrderSummary from '~/components/orders/OrderSummary.vue'
import PaymentInfo from '~/components/orders/PaymentInfo.vue'
import ShippingInfo from '~/components/orders/ShippingInfo.vue'

definePageMeta({
  layout: 'default',
  // middleware: ['auth'] // Uncomment when auth middleware is ready
})

const route = useRoute()
const ordersStore = useOrdersStore()
const orderId = route.params.orderId as string

onMounted(async () => {
  await ordersStore.fetchOrderById(orderId)
})

const order = computed(() => ordersStore.currentOrder)
const isLoading = computed(() => ordersStore.isLoading)
const error = computed(() => ordersStore.error)

const handleCancel = async () => {
  if (confirm('هل أنت متأكد من رغبتك في إلغاء هذا الطلب؟')) {
    await ordersStore.cancelOrder(orderId)
  }
}

const handleReorder = async () => {
  await ordersStore.reorder(orderId)
  // Navigate to cart or show success toast
  alert('تم إضافة المنتجات إلى السلة')
}

const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case 'delivered':
      return 'bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400'
    case 'pending':
    case 'confirmed':
      return 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400'
    case 'processing':
    case 'shipped':
    case 'out_for_delivery':
      return 'bg-yellow-50 text-yellow-600 dark:bg-yellow-500/10 dark:text-yellow-400'
    case 'cancelled':
    case 'returned':
      return 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400'
    default:
      return 'bg-gray-50 text-gray-600 dark:bg-gray-500/10 dark:text-gray-400'
  }
}

const getStatusName = (status: string) => {
  switch (status) {
    case 'pending': return 'قيد الانتظار'
    case 'confirmed': return 'مؤكد'
    case 'processing': return 'قيد التجهيز'
    case 'shipped': return 'تم الشحن'
    case 'out_for_delivery': return 'خرج للتوصيل'
    case 'delivered': return 'تم التوصيل'
    case 'cancelled': return 'ملغي'
    case 'returned': return 'مرتجع'
    default: return status
  }
}
</script>

<template>
  <div class="min-h-screen bg-background">
    <!-- Hero / Breadcrumb -->
    <div class="bg-surface border-b border-border py-8">
      <div class="container mx-auto px-4">
        <div class="flex items-center gap-2 text-sm text-text-secondary mb-4">
          <NuxtLink to="/" class="hover:text-primary transition-colors">الرئيسية</NuxtLink>
          <span class="text-xs">/</span>
          <NuxtLink to="/account" class="hover:text-primary transition-colors">حسابي</NuxtLink>
          <span class="text-xs">/</span>
          <NuxtLink to="/account/orders" class="hover:text-primary transition-colors">طلباتي</NuxtLink>
          <span class="text-xs">/</span>
          <span class="text-text-primary">تفاصيل الطلب</span>
        </div>
        <h1 class="text-3xl font-bold text-text-primary mb-2">تفاصيل الطلب</h1>
        <p class="text-text-secondary">يمكنك متابعة حالة طلبك ومعرفة جميع التفاصيل المتعلقة به.</p>
      </div>
    </div>

    <!-- Main Content -->
    <div class="container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        <!-- Sidebar -->
        <div class="lg:col-span-1">
          <!-- Mobile Sidebar as Tabs -->
          <div class="lg:hidden mb-6 overflow-x-auto pb-2 scrollbar-hide">
            <div class="flex gap-2 min-w-max">
              <NuxtLink to="/account" class="px-4 py-2 rounded-full border border-border text-sm font-medium text-text-secondary">لوحة التحكم</NuxtLink>
              <NuxtLink to="/account/orders" class="px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-bold">طلباتي</NuxtLink>
              <NuxtLink to="/account/profile" class="px-4 py-2 rounded-full border border-border text-sm font-medium text-text-secondary">البيانات الشخصية</NuxtLink>
            </div>
          </div>
          <!-- Desktop Sidebar -->
          <div class="hidden lg:block sticky top-8">
            <AccountSidebar />
          </div>
        </div>

        <!-- Order Content -->
        <div class="lg:col-span-3 space-y-6">
          
          <!-- Loading State -->
          <template v-if="isLoading">
            <div class="bg-surface rounded-2xl p-6 border border-border animate-pulse flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div class="space-y-3">
                <div class="h-6 w-32 bg-border rounded"></div>
                <div class="h-4 w-48 bg-border rounded"></div>
              </div>
              <div class="h-10 w-24 bg-border rounded-xl"></div>
            </div>
            <div class="h-32 bg-surface rounded-2xl border border-border animate-pulse"></div>
            <div class="h-64 bg-surface rounded-2xl border border-border animate-pulse"></div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="h-48 bg-surface rounded-2xl border border-border animate-pulse"></div>
              <div class="h-48 bg-surface rounded-2xl border border-border animate-pulse"></div>
            </div>
          </template>

          <!-- Error State -->
          <template v-else-if="error || !order">
            <div class="bg-surface rounded-2xl p-12 border border-border text-center flex flex-col items-center">
              <div class="w-20 h-20 bg-red-50 dark:bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mb-6">
                <MessageSquareWarning class="w-10 h-10" />
              </div>
              <h2 class="text-2xl font-bold text-text-primary mb-2">لم نتمكن من العثور على هذا الطلب</h2>
              <p class="text-text-secondary mb-8">{{ error || 'قد يكون رقم الطلب غير صحيح أو لم يعد متاحًا.' }}</p>
              <div class="flex gap-4">
                <NuxtLink to="/account/orders" class="px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-hover transition-colors">
                  العودة إلى الطلبات
                </NuxtLink>
                <button v-if="error" @click="ordersStore.fetchOrderById(orderId)" class="px-6 py-3 border border-border text-text-primary rounded-xl font-bold hover:bg-background transition-colors">
                  إعادة المحاولة
                </button>
              </div>
            </div>
          </template>

          <!-- Success State -->
          <template v-else>
            <!-- Order Header -->
            <div class="bg-surface rounded-2xl p-6 border border-border shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div class="flex flex-col gap-2">
                <div class="flex items-center gap-3">
                  <h2 class="text-2xl font-bold text-text-primary" dir="ltr">#{{ order.orderNumber }}</h2>
                  <span 
                    class="px-3 py-1 rounded-full text-xs font-bold"
                    :class="getStatusBadgeClass(order.status)"
                  >
                    {{ getStatusName(order.status) }}
                  </span>
                </div>
                <p class="text-sm text-text-secondary">
                  تم إنشاء الطلب في {{ new Date(order.createdAt).toLocaleDateString('ar-EG', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }) }}
                </p>
              </div>
              
              <div class="flex flex-wrap items-center gap-3 w-full md:w-auto">
                <NuxtLink 
                  to="/account/orders" 
                  class="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 border border-border text-text-primary rounded-xl font-bold hover:bg-background transition-colors text-sm"
                >
                  <ArrowRight class="w-4 h-4" />
                  العودة
                </NuxtLink>
                <button 
                  class="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-primary/5 text-primary border border-primary/20 rounded-xl font-bold hover:bg-primary/10 transition-colors text-sm"
                >
                  <Download class="w-4 h-4" />
                  الفاتورة
                </button>
              </div>
            </div>

            <!-- Timeline -->
            <OrderTrackingTimeline v-if="order.timeline" :timeline="order.timeline" />

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div class="lg:col-span-2 space-y-6">
                <!-- Products List -->
                <OrderItems :items="order.items" />
                
                <!-- Shipping Info -->
                <ShippingInfo 
                  :shippingAddress="order.shippingAddress" 
                  :customer="order.customer" 
                  :tracking="order.tracking" 
                />
              </div>
              
              <div class="space-y-6">
                <!-- Summary -->
                <OrderSummary 
                  :subtotal="order.subtotal"
                  :discount="order.discount"
                  :shippingCost="order.shippingCost"
                  :tax="order.tax"
                  :total="order.total"
                  :itemCount="order.items.length"
                />
                
                <!-- Payment Info -->
                <PaymentInfo v-if="order.paymentInfo" :payment="order.paymentInfo" />

                <!-- Action Buttons based on status -->
                <div class="bg-surface rounded-2xl border border-border shadow-sm p-6 space-y-3">
                  <button 
                    v-if="['delivered', 'cancelled', 'returned'].includes(order.status)"
                    @click="handleReorder"
                    class="w-full flex items-center justify-center gap-2 px-5 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-hover transition-colors"
                  >
                    <RefreshCcw class="w-5 h-5" />
                    إعادة الطلب
                  </button>

                  <button 
                    v-if="['pending', 'processing'].includes(order.status)"
                    @click="handleCancel"
                    class="w-full flex items-center justify-center gap-2 px-5 py-3 border border-red-500/30 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl font-bold transition-colors"
                  >
                    إلغاء الطلب
                  </button>

                  <button 
                    class="w-full flex items-center justify-center gap-2 px-5 py-3 border border-border text-text-primary rounded-xl font-bold hover:bg-background transition-colors"
                  >
                    <Headset class="w-5 h-5" />
                    التواصل مع الدعم
                  </button>
                  
                  <button 
                    v-if="['delivered'].includes(order.status)"
                    class="w-full text-sm font-bold text-text-secondary hover:text-text-primary text-center py-2 transition-colors"
                  >
                    الإبلاغ عن مشكلة في الطلب
                  </button>
                </div>
              </div>
            </div>

          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Hide scrollbar for mobile tabs */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { PackageSearch, Search, Loader2, AlertCircle, Truck } from 'lucide-vue-next'
import type { Order } from '~/types/order'
import { storeApi } from '~/services/storeApi'
import { storeApiError } from '~/utils/storeApiError'
import OrderTrackingTimeline from '~/components/orders/OrderTrackingTimeline.vue'
import OrderItems from '~/components/orders/OrderItems.vue'
import OrderSummary from '~/components/orders/OrderSummary.vue'
import ShippingInfo from '~/components/orders/ShippingInfo.vue'
import PaymentInfo from '~/components/orders/PaymentInfo.vue'

useSeoMeta({
  title: 'تتبع طلبك | Nexora',
  description: 'تابع حالة طلبك برقم الطلب ورقم الموبايل، بدون تسجيل دخول.',
  robots: 'noindex' // results are personal
})

const route = useRoute()
const router = useRouter()

// Prefilled from links like /track-order?order=10482&phone=010... (SMS / WhatsApp messages)
const orderNumber = ref(String(route.query.order ?? ''))
const phone = ref(String(route.query.phone ?? ''))
const loading = ref(false)
const error = ref<string | null>(null)
const order = ref<Order | null>(null)

const phoneDigits = computed(() => phone.value.replace(/\D/g, ''))
const phoneValid = computed(() => /^(?:\+?20|0)?1[0125]\d{8}$/.test(phoneDigits.value))
const canSubmit = computed(() => orderNumber.value.replace(/\D/g, '').length > 0 && phoneValid.value && !loading.value)

const STATUS: Record<string, { label: string, classes: string }> = {
  pending: { label: 'قيد المراجعة', classes: 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400' },
  confirmed: { label: 'مؤكد', classes: 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400' },
  processing: { label: 'قيد التجهيز', classes: 'bg-yellow-50 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400' },
  shipped: { label: 'تم الشحن', classes: 'bg-yellow-50 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400' },
  out_for_delivery: { label: 'خرج للتوصيل', classes: 'bg-yellow-50 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400' },
  delivered: { label: 'تم التوصيل', classes: 'bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400' },
  cancelled: { label: 'ملغي', classes: 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400' },
  returned: { label: 'مرتجع', classes: 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400' }
}
const status = computed(() => order.value ? STATUS[order.value.status] ?? { label: order.value.status, classes: 'bg-gray-100 text-gray-600' } : null)

const track = async () => {
  if (!canSubmit.value) return
  loading.value = true
  error.value = null
  order.value = null
  try {
    order.value = await storeApi.trackOrder(orderNumber.value.trim(), phoneDigits.value)
    // Keep the URL shareable / refresh-safe
    router.replace({ query: { order: orderNumber.value.trim(), phone: phoneDigits.value } })
  } catch (err) {
    error.value = storeApiError(err, 'تعذر البحث عن الطلب، حاول مرة أخرى')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  if (canSubmit.value) track()
})
</script>

<template>
  <div class="min-h-screen bg-background">
    <div class="bg-surface border-b border-border py-10">
      <div class="container mx-auto px-4 text-center max-w-2xl">
        <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
          <PackageSearch class="w-8 h-8" />
        </div>
        <h1 class="text-3xl font-bold text-text-primary mb-2">تتبع طلبك</h1>
        <p class="text-text-secondary">أدخل رقم الطلب ورقم الموبايل اللذين استخدمتهما عند الطلب. لا تحتاج إلى تسجيل الدخول.</p>
      </div>
    </div>

    <div class="container mx-auto px-4 py-8 max-w-5xl">
      <form class="bg-surface rounded-2xl border border-border shadow-sm p-6 grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-4 items-end" novalidate @submit.prevent="track">
        <div>
          <label for="track-order" class="block text-sm font-semibold text-text-primary mb-1.5">رقم الطلب</label>
          <input
            id="track-order"
            v-model="orderNumber"
            type="text"
            inputmode="numeric"
            dir="ltr"
            placeholder="EDX-10482"
            class="w-full px-4 py-3 bg-background border border-border rounded-xl text-right focus:ring-2 focus:ring-primary/30 focus:border-primary focus:outline-none"
          />
          <p class="text-xs text-text-secondary mt-1">موجود في رسالة تأكيد الطلب</p>
        </div>
        <div>
          <label for="track-phone" class="block text-sm font-semibold text-text-primary mb-1.5">رقم الموبايل</label>
          <input
            id="track-phone"
            v-model="phone"
            type="tel"
            dir="ltr"
            autocomplete="tel"
            placeholder="01012345678"
            :aria-invalid="phone.length > 0 && !phoneValid"
            class="w-full px-4 py-3 bg-background border rounded-xl text-right focus:ring-2 focus:ring-primary/30 focus:outline-none"
            :class="phone.length > 0 && !phoneValid ? 'border-red-400' : 'border-border focus:border-primary'"
          />
          <p class="text-xs mt-1" :class="phone.length > 0 && !phoneValid ? 'text-red-600' : 'text-text-secondary'">
            {{ phone.length > 0 && !phoneValid ? 'رقم موبايل مصري غير صحيح' : 'الرقم المستخدم في الطلب' }}
          </p>
        </div>
        <button
          type="submit"
          :disabled="!canSubmit"
          class="md:mb-6 h-[50px] px-8 flex items-center justify-center gap-2 bg-primary text-white rounded-xl font-bold hover:bg-primary-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Loader2 v-if="loading" class="w-5 h-5 animate-spin" />
          <Search v-else class="w-5 h-5" />
          تتبع
        </button>
      </form>

      <div v-if="error" class="mt-6 p-5 rounded-2xl bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400 flex items-start gap-3" role="alert">
        <AlertCircle class="w-5 h-5 flex-shrink-0 mt-0.5" />
        <div>
          <p class="font-semibold">{{ error }}</p>
          <p class="text-sm mt-1">إذا احتجت مساعدة <NuxtLink to="/contact" class="underline font-semibold">تواصل معنا</NuxtLink>.</p>
        </div>
      </div>

      <div v-if="order && status" class="mt-8 space-y-6">
        <div class="bg-surface rounded-2xl p-6 border border-border shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div class="flex items-center gap-3 mb-1">
              <h2 class="text-2xl font-bold text-text-primary" dir="ltr">{{ order.orderNumber }}</h2>
              <span class="px-3 py-1 rounded-full text-xs font-bold" :class="status.classes">{{ status.label }}</span>
            </div>
            <p class="text-sm text-text-secondary">
              تم الطلب في {{ new Date(order.createdAt).toLocaleDateString('ar-EG', { day: 'numeric', month: 'long', year: 'numeric' }) }}
            </p>
          </div>
          <div v-if="order.estimatedDelivery && !['delivered', 'cancelled', 'returned'].includes(order.status)" class="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/5 text-primary">
            <Truck class="w-5 h-5" />
            <div>
              <div class="text-xs">التوصيل المتوقع</div>
              <div class="font-bold">{{ order.estimatedDelivery }}</div>
            </div>
          </div>
        </div>

        <OrderTrackingTimeline v-if="order.timeline" :timeline="order.timeline" />

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div class="lg:col-span-2 space-y-6">
            <OrderItems :items="order.items" />
            <ShippingInfo :shipping-address="order.shippingAddress" :customer="order.customer" :tracking="order.tracking" />
          </div>
          <div class="space-y-6">
            <OrderSummary
              :subtotal="order.subtotal"
              :discount="order.discount"
              :shipping-cost="order.shippingCost"
              :tax="order.tax"
              :total="order.total"
              :item-count="order.items.length"
            />
            <PaymentInfo v-if="order.paymentInfo" :payment="order.paymentInfo" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

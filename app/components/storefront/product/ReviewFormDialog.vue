<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { Star, X, CheckCircle2 } from 'lucide-vue-next'
import { storeApi } from '~/services/storeApi'
import { useAuthStore } from '~/stores/auth'
import { storeApiError } from '~/utils/storeApiError'

const props = defineProps<{
  isOpen: boolean
  productSlug: string
  productName: string
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const auth = useAuthStore()

const RATING_LABELS = ['', 'سيء', 'مقبول', 'جيد', 'جيد جداً', 'ممتاز']

const rating = ref(0)
const hoverRating = ref(0)
const name = ref('')
const title = ref('')
const content = ref('')
const submitting = ref(false)
const error = ref<string | null>(null)
const submitted = ref(false)

const shownRating = computed(() => hoverRating.value || rating.value)
const contentLength = computed(() => content.value.trim().length)
const canSubmit = computed(() => rating.value > 0 && name.value.trim().length >= 2 && contentLength.value >= 10 && !submitting.value)

// Fresh form each time it opens; logged-in customers don't retype their name
watch(() => props.isOpen, (open) => {
  if (import.meta.client) document.body.style.overflow = open ? 'hidden' : ''
  if (!open) return
  rating.value = 0
  hoverRating.value = 0
  name.value = auth.user?.name ?? ''
  title.value = ''
  content.value = ''
  error.value = null
  submitted.value = false
})

const submit = async () => {
  if (!canSubmit.value) return
  submitting.value = true
  error.value = null
  try {
    await storeApi.submitReview(props.productSlug, {
      customerId: auth.user?.id ?? null,
      name: name.value.trim(),
      email: auth.user?.email,
      rating: rating.value,
      title: title.value.trim() || undefined,
      content: content.value.trim()
    })
    submitted.value = true
  } catch (err) {
    error.value = storeApiError(err, 'تعذر إرسال التقييم، حاول مرة أخرى')
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <Teleport to="body">
    <transition
      enter-active-class="transition-opacity duration-300 ease-out"
      enter-from-class="opacity-0"
      leave-active-class="transition-opacity duration-200 ease-in"
      leave-to-class="opacity-0"
    >
      <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4" @keydown.esc="emit('close')">
        <div class="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" @click="emit('close')"></div>

        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="review-dialog-title"
          class="relative bg-surface rounded-3xl shadow-[0_20px_60px_rgb(0,0,0,0.1)] w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 sm:p-8"
        >
          <button
            type="button"
            class="absolute top-4 left-4 p-2 text-text-secondary hover:text-text-primary transition-colors bg-background rounded-full"
            aria-label="إغلاق"
            @click="emit('close')"
          >
            <X class="w-5 h-5" />
          </button>

          <!-- Sent -->
          <div v-if="submitted" class="text-center py-6">
            <CheckCircle2 class="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h3 class="text-2xl font-bold text-text-primary mb-2">شكراً على تقييمك!</h3>
            <p class="text-text-secondary leading-relaxed mb-6">
              تقييمك قيد المراجعة، وسيظهر على صفحة المنتج بعد مراجعته من فريقنا.
            </p>
            <button type="button" class="px-8 py-3 bg-gray-900 text-white font-bold rounded-2xl hover:bg-gray-800 transition-colors" @click="emit('close')">
              حسناً
            </button>
          </div>

          <form v-else novalidate @submit.prevent="submit">
            <h3 id="review-dialog-title" class="text-2xl font-bold text-text-primary mb-1">أضف تقييمك</h3>
            <p class="text-text-secondary text-sm mb-6 line-clamp-1">{{ productName }}</p>

            <!-- Stars -->
            <fieldset class="mb-6">
              <legend class="block text-sm font-semibold text-text-primary mb-3">تقييمك للمنتج <span class="text-red-500">*</span></legend>
              <div class="flex items-center gap-3">
                <div class="flex items-center gap-1" dir="ltr" @mouseleave="hoverRating = 0">
                  <button
                    v-for="i in 5"
                    :key="i"
                    type="button"
                    class="p-1 transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
                    :aria-label="`${i} من 5 - ${RATING_LABELS[i]}`"
                    :aria-pressed="rating === i"
                    @mouseenter="hoverRating = i"
                    @click="rating = i"
                  >
                    <Star class="w-9 h-9" :class="i <= shownRating ? 'text-amber-500 fill-amber-500' : 'text-gray-300'" />
                  </button>
                </div>
                <span class="text-sm font-semibold text-amber-600 min-w-16">{{ RATING_LABELS[shownRating] }}</span>
              </div>
            </fieldset>

            <div class="mb-4">
              <label for="review-name" class="block text-sm font-semibold text-text-primary mb-1.5">الاسم <span class="text-red-500">*</span></label>
              <input
                id="review-name"
                v-model="name"
                type="text"
                maxlength="60"
                autocomplete="name"
                class="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary focus:outline-none transition"
                placeholder="الاسم الذي سيظهر مع التقييم"
              />
            </div>

            <div class="mb-4">
              <label for="review-title" class="block text-sm font-semibold text-text-primary mb-1.5">عنوان التقييم <span class="text-text-secondary font-normal">(اختياري)</span></label>
              <input
                id="review-title"
                v-model="title"
                type="text"
                maxlength="100"
                class="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary focus:outline-none transition"
                placeholder="مثلاً: خامة ممتازة"
              />
            </div>

            <div class="mb-2">
              <label for="review-content" class="block text-sm font-semibold text-text-primary mb-1.5">رأيك في المنتج <span class="text-red-500">*</span></label>
              <textarea
                id="review-content"
                v-model="content"
                rows="4"
                maxlength="1000"
                class="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary focus:outline-none transition resize-none"
                placeholder="أخبرنا عن الخامة والمقاس والتوصيل..."
              ></textarea>
              <div class="flex justify-between text-xs mt-1" :class="contentLength > 0 && contentLength < 10 ? 'text-red-600' : 'text-text-secondary'">
                <span>{{ contentLength > 0 && contentLength < 10 ? 'اكتب 10 أحرف على الأقل' : '' }}</span>
                <span dir="ltr">{{ content.length }}/1000</span>
              </div>
            </div>

            <p v-if="error" class="mb-4 p-3 rounded-xl bg-red-50 text-red-700 text-sm" role="alert">{{ error }}</p>

            <button
              type="submit"
              :disabled="!canSubmit"
              class="w-full mt-2 py-3.5 bg-gray-900 text-white font-bold rounded-2xl hover:bg-gray-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {{ submitting ? 'جاري الإرسال...' : 'إرسال التقييم' }}
            </button>
            <p class="text-xs text-text-secondary text-center mt-3">تتم مراجعة التقييمات قبل نشرها</p>
          </form>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

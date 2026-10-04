<script setup lang="ts">
import { ref, computed } from 'vue'
import { Star, BadgeCheck, Store } from 'lucide-vue-next'
import type { Product } from '~/types'

const props = defineProps<{
  product: Product
}>()

const isFormOpen = ref(false)

const distribution = computed(() => props.product.ratingDistribution
  ?? [5, 4, 3, 2, 1].map(rating => ({ rating, count: 0, percentage: 0 })))

// Fill of each summary star (0–1), so 4.6 shows four full stars and a 60% one
const starFill = (i: number) => Math.min(Math.max(props.product.rating - (i - 1), 0), 1)
</script>

<template>
  <div class="mt-20 pt-16 border-t border-border/50">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
      <div class="flex items-center gap-4">
        <h2 class="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-l from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
          آراء العملاء
        </h2>
        <div class="px-4 py-1.5 rounded-full bg-surface shadow-sm border border-border/50 text-text-secondary font-bold text-lg">
          {{ product.reviewsCount }} تقييم
        </div>
      </div>
      <button type="button" @click="isFormOpen = true" class="px-8 py-3.5 bg-gray-900 text-white font-bold rounded-[1.5rem] hover:bg-gray-800 transition-all shadow-[0_10px_25px_rgba(0,0,0,0.1)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.15)] hover:-translate-y-1 w-full md:w-auto">
        أضف تقييمك
      </button>
    </div>

    <div class="flex flex-col lg:flex-row gap-12">
      <!-- Rating Summary -->
      <div class="w-full lg:w-1/3 bg-surface p-8 rounded-[2.5rem] shadow-premium border border-border/50 h-fit">
        <div class="flex items-center gap-6 mb-8">
          <div class="text-7xl font-black text-primary drop-shadow-sm">{{ product.reviewsCount ? product.rating.toFixed(1) : '—' }}</div>
          <div class="flex flex-col gap-2">
            <div class="flex items-center gap-1.5" dir="ltr" :aria-label="`${product.rating} من 5`">
              <span v-for="i in 5" :key="i" class="relative w-6 h-6">
                <Star class="absolute inset-0 w-6 h-6 text-amber-200 fill-amber-200 dark:text-amber-900 dark:fill-amber-900" />
                <span class="absolute inset-0 overflow-hidden" :style="{ width: `${starFill(i) * 100}%` }">
                  <Star class="w-6 h-6 text-amber-400 fill-amber-400" />
                </span>
              </span>
            </div>
            <div class="text-text-secondary font-medium">بناءً على {{ product.reviewsCount }} تقييم</div>
          </div>
        </div>

        <!-- Distribution -->
        <div class="flex flex-col gap-4">
          <div v-for="item in distribution" :key="item.rating" class="flex items-center gap-4 group">
            <div class="w-12 text-text-secondary font-bold group-hover:text-primary transition-colors">{{ item.rating }} نجوم</div>
            <div class="flex-grow h-3 bg-background rounded-full overflow-hidden shadow-inner">
              <div class="h-full bg-gradient-to-r from-amber-300 to-amber-500 rounded-full transition-all duration-1000 ease-out" :style="{ width: `${item.percentage}%` }"></div>
            </div>
            <div class="w-10 text-left text-text-secondary font-medium">{{ item.percentage }}%</div>
          </div>
        </div>
      </div>

      <!-- Reviews List -->
      <div class="w-full lg:w-2/3 flex flex-col gap-6">
        <div v-if="product.reviews && product.reviews.length" class="space-y-6">
          <div v-for="review in product.reviews" :key="review.id" class="bg-surface p-6 rounded-[2rem] shadow-sm border border-border/50 hover:shadow-md transition-all duration-300">
            <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-gradient-to-tr from-primary to-accent rounded-full flex items-center justify-center text-white font-black text-xl shadow-md">
                  {{ review.author.charAt(0) }}
                </div>
                <div class="flex flex-col">
                  <span class="font-bold text-text-primary text-lg flex items-center gap-2">
                    {{ review.author }}
                    <span v-if="review.verified" class="inline-flex items-center gap-1 text-xs font-semibold text-green-700 bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded-full">
                      <BadgeCheck class="w-3.5 h-3.5" /> مشتري موثق
                    </span>
                  </span>
                  <span class="text-sm text-text-secondary font-medium">{{ review.date }}</span>
                </div>
              </div>
              <div class="flex items-center gap-1 bg-amber-50 dark:bg-amber-900/20 px-3 py-1.5 rounded-full">
                <Star v-for="i in 5" :key="i" class="w-4 h-4" :class="i <= review.rating ? 'text-amber-500 fill-amber-500 drop-shadow-sm' : 'text-amber-200 fill-amber-200 dark:text-amber-900 dark:fill-amber-900'" />
              </div>
            </div>
            <h4 v-if="review.title" class="font-bold text-text-primary mb-1">{{ review.title }}</h4>
            <p class="text-text-secondary leading-loose text-lg">
              {{ review.content }}
            </p>
            <!-- Store reply -->
            <div v-if="review.reply" class="mt-4 p-4 rounded-2xl bg-background border-s-4 border-primary">
              <div class="flex items-center gap-2 text-sm font-bold text-text-primary mb-1">
                <Store class="w-4 h-4 text-primary" /> رد المتجر
                <span class="text-xs font-medium text-text-secondary">· {{ review.reply.date }}</span>
              </div>
              <p class="text-text-secondary leading-relaxed">{{ review.reply.content }}</p>
            </div>
          </div>
        </div>
        <div v-else class="text-center py-16 text-text-secondary bg-surface rounded-[2.5rem] border border-border/50 border-dashed">
          <div class="w-20 h-20 bg-background rounded-full flex items-center justify-center mx-auto mb-6">
            <Star class="w-10 h-10 text-border" />
          </div>
          <h3 class="text-xl font-bold text-text-primary mb-2">لا توجد تقييمات حتى الآن</h3>
          <p class="text-lg">كن أول من يشارك رأيه حول هذا المنتج!</p>
        </div>
        <p v-if="product.reviews?.length && product.reviewsCount > product.reviews.length" class="text-center text-sm text-text-secondary">
          يتم عرض أحدث {{ product.reviews.length }} تقييم من أصل {{ product.reviewsCount }}
        </p>
      </div>
    </div>
  
    <StorefrontProductReviewFormDialog
      :is-open="isFormOpen"
      :product-slug="product.slug"
      :product-name="product.name"
      @close="isFormOpen = false"
    />
  </div>
</template>

<script setup lang="ts">
import { Star } from 'lucide-vue-next'
import type { Product } from '~/types'

const props = defineProps<{
  product: Product
}>()

const distribution = [
  { rating: 5, percentage: 75, count: 93 },
  { rating: 4, percentage: 15, count: 18 },
  { rating: 3, percentage: 5, count: 6 },
  { rating: 2, percentage: 2, count: 2 },
  { rating: 1, percentage: 3, count: 5 },
]
</script>

<template>
  <div class="mt-16 pt-16 border-t border-border">
    <div class="flex items-center justify-between mb-8">
      <h2 class="text-2xl font-bold text-text-primary">التقييمات ({{ product.reviewsCount }})</h2>
      <button class="px-6 py-2 border-2 border-primary text-primary font-bold rounded-xl hover:bg-primary hover:text-surface transition-colors">
        أضف تقييم
      </button>
    </div>

    <div class="flex flex-col lg:flex-row gap-12">
      <!-- Rating Summary -->
      <div class="w-full lg:w-1/3 flex flex-col gap-6">
        <div class="flex items-center gap-4">
          <div class="text-6xl font-bold text-text-primary">{{ product.rating }}</div>
          <div class="flex flex-col gap-1">
            <div class="flex items-center gap-1 text-amber-500">
              <Star class="w-5 h-5 fill-current" />
              <Star class="w-5 h-5 fill-current" />
              <Star class="w-5 h-5 fill-current" />
              <Star class="w-5 h-5 fill-current" />
              <Star class="w-5 h-5 fill-current opacity-50" />
            </div>
            <div class="text-text-secondary text-sm">بناءً على {{ product.reviewsCount }} تقييم</div>
          </div>
        </div>

        <!-- Distribution -->
        <div class="flex flex-col gap-3">
          <div v-for="item in distribution" :key="item.rating" class="flex items-center gap-3 text-sm">
            <div class="w-12 text-text-secondary">{{ item.rating }} نجوم</div>
            <div class="flex-grow h-2 bg-surface rounded-full overflow-hidden">
              <div class="h-full bg-amber-400 rounded-full" :style="{ width: `${item.percentage}%` }"></div>
            </div>
            <div class="w-8 text-left text-text-secondary">{{ item.percentage }}%</div>
          </div>
        </div>
      </div>

      <!-- Reviews List -->
      <div class="w-full lg:w-2/3 flex flex-col gap-8">
        <div v-if="product.reviews && product.reviews.length">
          <div v-for="review in product.reviews" :key="review.id" class="flex flex-col gap-3 pb-8 border-b border-border last:border-0">
            <div class="flex items-start justify-between">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-lg">
                  {{ review.author.charAt(0) }}
                </div>
                <div class="flex flex-col">
                  <span class="font-bold text-text-primary">{{ review.author }}</span>
                  <span class="text-xs text-text-secondary">{{ review.date }}</span>
                </div>
              </div>
              <div class="flex items-center gap-1 text-amber-400">
                <Star v-for="i in 5" :key="i" class="w-4 h-4" :class="i <= review.rating ? 'fill-current' : 'text-surface fill-surface'" />
              </div>
            </div>
            <p class="text-text-secondary leading-relaxed mt-2">
              {{ review.content }}
            </p>
          </div>
        </div>
        <div v-else class="text-center py-12 text-text-secondary bg-surface/50 rounded-2xl">
          لا توجد تقييمات حتى الآن. كن أول من يقيم هذا المنتج!
        </div>
      </div>
    </div>
  </div>
</template>

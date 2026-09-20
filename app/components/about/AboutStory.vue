<script setup lang="ts">
import { useMockData } from '~/composables/useMockData'

const { mockData } = useMockData()
const store = mockData.store
</script>

<template>
  <div class="py-16 md:py-24 bg-gray-50 dark:bg-[#151515] transition-colors font-arabic border-y border-gray-100 dark:border-gray-800">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 transition-colors">قصتنا</h2>
      
      <div class="space-y-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed transition-colors">
        <p>
          انطلقت <strong>{{ store.name }}</strong> برؤية واضحة: تقديم منتجات استثنائية تلبي تطلعات عملائنا وترتقي بأسلوب حياتهم. نحن لا نبيع مجرد منتجات، بل نصنع تجربة تدوم في الذاكرة.
        </p>
        <p>
          {{ store.description }}
        </p>
        <p>
          منذ يومنا الأول، وضعنا الجودة ورضا العميل في صميم كل ما نقوم به. فريقنا يعمل بشغف لاختيار أفضل الخامات وتقديم تصاميم مبتكرة تناسب ذوقك الرفيع.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ChevronDown, ChevronUp } from 'lucide-vue-next'
import type { Product } from '~/types'

const props = defineProps<{
  product: Product
}>()

const activeTab = ref('description')

const tabs = [
  { id: 'description', label: 'الوصف' },
  { id: 'specifications', label: 'المواصفات' },
  { id: 'shipping', label: 'الشحن والتوصيل' },
  { id: 'returns', label: 'سياسة الإرجاع' },
]

const toggleMobileAccordion = (tabId: string) => {
  if (activeTab.value === tabId) {
    activeTab.value = ''
  } else {
    activeTab.value = tabId
  }
}
</script>

<template>
  <div class="mt-16">
    <!-- Desktop Tabs -->
    <div class="hidden md:flex border-b border-border overflow-x-auto no-scrollbar">
      <button 
        v-for="tab in tabs" 
        :key="tab.id"
        @click="activeTab = tab.id"
        class="px-8 py-4 font-bold text-lg transition-colors border-b-2 whitespace-nowrap"
        :class="activeTab === tab.id ? 'border-primary text-primary' : 'border-transparent text-text-secondary hover:text-text-primary hover:border-border'"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Content Area (with Mobile Accordion wrapper) -->
    <div class="flex flex-col md:mt-8 gap-4 md:gap-0">
      
      <!-- Description Section -->
      <div class="bg-surface rounded-2xl overflow-hidden md:bg-transparent md:rounded-none border border-border md:border-none">
        <button 
          @click="toggleMobileAccordion('description')"
          class="flex md:hidden items-center justify-between w-full p-4 font-bold text-text-primary"
        >
          <span>الوصف</span>
          <ChevronDown v-if="activeTab !== 'description'" class="w-5 h-5 text-text-secondary" />
          <ChevronUp v-else class="w-5 h-5 text-primary" />
        </button>
        <div 
          v-show="activeTab === 'description'"
          class="p-4 pt-0 md:p-0 animate-fade-in-up text-text-secondary leading-relaxed"
        >
          <p class="mb-4">
            {{ product.description }}
          </p>
          <div v-if="product.images && product.images.length > 2" class="mt-6 flex flex-col md:flex-row gap-4">
            <NuxtImg 
              :src="product.images[0].url" 
              class="w-full md:w-1/2 rounded-2xl object-cover aspect-[16/9]"
              format="webp" quality="80" loading="lazy"
            />
            <NuxtImg 
              :src="product.images[1]?.url || product.images[0].url" 
              class="w-full md:w-1/2 rounded-2xl object-cover aspect-[16/9]"
              format="webp" quality="80" loading="lazy"
            />
          </div>
        </div>
      </div>

      <!-- Specifications Section -->
      <div class="bg-surface rounded-2xl overflow-hidden md:bg-transparent md:rounded-none border border-border md:border-none">
        <button 
          @click="toggleMobileAccordion('specifications')"
          class="flex md:hidden items-center justify-between w-full p-4 font-bold text-text-primary"
        >
          <span>المواصفات</span>
          <ChevronDown v-if="activeTab !== 'specifications'" class="w-5 h-5 text-text-secondary" />
          <ChevronUp v-else class="w-5 h-5 text-primary" />
        </button>
        <div 
          v-show="activeTab === 'specifications'"
          class="p-4 pt-0 md:p-0 animate-fade-in-up"
        >
          <div v-if="product.specifications && product.specifications.length" class="bg-background rounded-2xl overflow-hidden">
            <div 
              v-for="(spec, index) in product.specifications" 
              :key="index"
              class="flex flex-col sm:flex-row sm:items-center py-4 px-6 border-b border-border last:border-0"
              :class="index % 2 === 0 ? 'bg-surface/50' : 'bg-transparent'"
            >
              <div class="w-full sm:w-1/3 font-semibold text-text-primary mb-1 sm:mb-0">{{ spec.name }}</div>
              <div class="w-full sm:w-2/3 text-text-secondary">{{ spec.value }}</div>
            </div>
          </div>
          <p v-else class="text-text-secondary">لا توجد مواصفات متاحة.</p>
        </div>
      </div>

      <!-- Shipping Section -->
      <div class="bg-surface rounded-2xl overflow-hidden md:bg-transparent md:rounded-none border border-border md:border-none">
        <button 
          @click="toggleMobileAccordion('shipping')"
          class="flex md:hidden items-center justify-between w-full p-4 font-bold text-text-primary"
        >
          <span>الشحن والتوصيل</span>
          <ChevronDown v-if="activeTab !== 'shipping'" class="w-5 h-5 text-text-secondary" />
          <ChevronUp v-else class="w-5 h-5 text-primary" />
        </button>
        <div 
          v-show="activeTab === 'shipping'"
          class="p-4 pt-0 md:p-0 animate-fade-in-up text-text-secondary leading-relaxed space-y-4"
        >
          <h4 class="font-bold text-text-primary text-lg">خيارات التوصيل</h4>
          <ul class="list-disc list-inside space-y-2">
            <li>التوصيل العادي: 3-5 أيام عمل</li>
            <li>التوصيل السريع: 1-2 أيام عمل</li>
            <li>شحن مجاني للطلبات أكثر من 1000 ج.م</li>
          </ul>
        </div>
      </div>

      <!-- Returns Section -->
      <div class="bg-surface rounded-2xl overflow-hidden md:bg-transparent md:rounded-none border border-border md:border-none">
        <button 
          @click="toggleMobileAccordion('returns')"
          class="flex md:hidden items-center justify-between w-full p-4 font-bold text-text-primary"
        >
          <span>سياسة الإرجاع</span>
          <ChevronDown v-if="activeTab !== 'returns'" class="w-5 h-5 text-text-secondary" />
          <ChevronUp v-else class="w-5 h-5 text-primary" />
        </button>
        <div 
          v-show="activeTab === 'returns'"
          class="p-4 pt-0 md:p-0 animate-fade-in-up text-text-secondary leading-relaxed space-y-4"
        >
          <h4 class="font-bold text-text-primary text-lg">إرجاع سهل ومريح</h4>
          <p>
            يمكنك إرجاع المنتج خلال 14 يوماً من تاريخ استلامه، بشرط أن يكون في حالته الأصلية مع جميع الملحقات والتغليف.
          </p>
          <p>
            سيتم استرداد المبلغ بنفس طريقة الدفع المستخدمة خلال 5-7 أيام عمل.
          </p>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>

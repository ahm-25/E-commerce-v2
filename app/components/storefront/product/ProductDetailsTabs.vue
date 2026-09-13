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
  <div class="mt-20">
    <!-- Desktop Tabs -->
    <div class="hidden md:flex justify-center mb-12">
      <div class="flex items-center bg-surface p-2 rounded-[2rem] shadow-premium overflow-x-auto no-scrollbar border border-border/50">
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          @click="activeTab = tab.id"
          class="px-8 py-3.5 font-bold text-lg transition-all duration-300 rounded-[1.5rem] whitespace-nowrap relative"
          :class="activeTab === tab.id ? 'bg-primary text-white shadow-md scale-105 z-10' : 'bg-transparent text-text-secondary hover:text-primary hover:bg-primary/5 z-0'"
        >
          {{ tab.label }}
        </button>
      </div>
    </div>

    <!-- Content Area (with Mobile Accordion wrapper) -->
    <div class="flex flex-col md:bg-surface md:p-12 md:rounded-[3rem] md:shadow-premium md:border md:border-border/50 gap-4 md:gap-0">
      
      <!-- Description Section -->
      <div class="bg-surface rounded-2xl overflow-hidden md:bg-transparent md:rounded-none shadow-sm md:shadow-none border border-border/50 md:border-none transition-all duration-300">
        <button 
          @click="toggleMobileAccordion('description')"
          class="flex md:hidden items-center justify-between w-full p-5 font-bold text-lg text-text-primary bg-surface/50"
        >
          <span>الوصف</span>
          <ChevronDown v-if="activeTab !== 'description'" class="w-5 h-5 text-text-secondary" />
          <ChevronUp v-else class="w-5 h-5 text-primary" />
        </button>
        <div 
          v-show="activeTab === 'description'"
          class="p-5 pt-2 md:p-0 animate-[fadeIn_0.4s_ease-out] text-text-secondary leading-loose text-lg"
        >
          <p class="mb-8 max-w-4xl mx-auto text-center md:text-right font-medium">
            {{ product.description }}
          </p>
          <div v-if="product.images && product.images.length > 2" class="mt-8 flex flex-col md:flex-row gap-6">
            <NuxtImg 
              :src="product.images[0].url" 
              class="w-full md:w-1/2 rounded-[2rem] object-cover aspect-[16/9] shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-500"
              format="webp" quality="90" loading="lazy"
            />
            <NuxtImg 
              :src="product.images[1]?.url || product.images[0].url" 
              class="w-full md:w-1/2 rounded-[2rem] object-cover aspect-[16/9] shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-500"
              format="webp" quality="90" loading="lazy"
            />
          </div>
        </div>
      </div>

      <!-- Specifications Section -->
      <div class="bg-surface rounded-2xl overflow-hidden md:bg-transparent md:rounded-none shadow-sm md:shadow-none border border-border/50 md:border-none transition-all duration-300">
        <button 
          @click="toggleMobileAccordion('specifications')"
          class="flex md:hidden items-center justify-between w-full p-5 font-bold text-lg text-text-primary bg-surface/50"
        >
          <span>المواصفات</span>
          <ChevronDown v-if="activeTab !== 'specifications'" class="w-5 h-5 text-text-secondary" />
          <ChevronUp v-else class="w-5 h-5 text-primary" />
        </button>
        <div 
          v-show="activeTab === 'specifications'"
          class="p-5 pt-2 md:p-0 animate-[fadeIn_0.4s_ease-out]"
        >
          <div v-if="product.specifications && product.specifications.length" class="max-w-3xl mx-auto bg-background/50 rounded-[2rem] overflow-hidden border border-border/50 shadow-sm">
            <div 
              v-for="(spec, index) in product.specifications" 
              :key="index"
              class="flex flex-col sm:flex-row sm:items-center py-5 px-8 border-b border-border/50 last:border-0 hover:bg-surface transition-colors"
            >
              <div class="w-full sm:w-1/3 font-bold text-text-primary mb-1 sm:mb-0 text-lg">{{ spec.name }}</div>
              <div class="w-full sm:w-2/3 text-text-secondary font-medium text-lg">{{ spec.value }}</div>
            </div>
          </div>
          <p v-else class="text-text-secondary text-center text-lg">لا توجد مواصفات متاحة.</p>
        </div>
      </div>

      <!-- Shipping Section -->
      <div class="bg-surface rounded-2xl overflow-hidden md:bg-transparent md:rounded-none shadow-sm md:shadow-none border border-border/50 md:border-none transition-all duration-300">
        <button 
          @click="toggleMobileAccordion('shipping')"
          class="flex md:hidden items-center justify-between w-full p-5 font-bold text-lg text-text-primary bg-surface/50"
        >
          <span>الشحن والتوصيل</span>
          <ChevronDown v-if="activeTab !== 'shipping'" class="w-5 h-5 text-text-secondary" />
          <ChevronUp v-else class="w-5 h-5 text-primary" />
        </button>
        <div 
          v-show="activeTab === 'shipping'"
          class="p-5 pt-2 md:p-0 animate-[fadeIn_0.4s_ease-out] text-text-secondary leading-loose space-y-6 max-w-3xl mx-auto"
        >
          <div class="bg-primary/5 border border-primary/20 rounded-[2rem] p-8">
            <h4 class="font-black text-primary text-2xl mb-6 flex items-center gap-3">
              <span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              خيارات التوصيل
            </h4>
            <ul class="space-y-4 text-lg font-medium">
              <li class="flex items-center gap-3">
                <span class="w-1.5 h-1.5 rounded-full bg-text-secondary/50"></span>
                التوصيل العادي: 3-5 أيام عمل
              </li>
              <li class="flex items-center gap-3">
                <span class="w-1.5 h-1.5 rounded-full bg-text-secondary/50"></span>
                التوصيل السريع: 1-2 أيام عمل
              </li>
              <li class="flex items-center gap-3 text-green-600 dark:text-green-400 font-bold bg-green-500/10 p-3 rounded-xl mt-4 w-fit">
                شحن مجاني للطلبات أكثر من 1000 ج.م
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Returns Section -->
      <div class="bg-surface rounded-2xl overflow-hidden md:bg-transparent md:rounded-none shadow-sm md:shadow-none border border-border/50 md:border-none transition-all duration-300">
        <button 
          @click="toggleMobileAccordion('returns')"
          class="flex md:hidden items-center justify-between w-full p-5 font-bold text-lg text-text-primary bg-surface/50"
        >
          <span>سياسة الإرجاع</span>
          <ChevronDown v-if="activeTab !== 'returns'" class="w-5 h-5 text-text-secondary" />
          <ChevronUp v-else class="w-5 h-5 text-primary" />
        </button>
        <div 
          v-show="activeTab === 'returns'"
          class="p-5 pt-2 md:p-0 animate-[fadeIn_0.4s_ease-out] text-text-secondary leading-loose space-y-6 max-w-3xl mx-auto"
        >
          <div class="bg-accent/5 border border-accent/20 rounded-[2rem] p-8">
            <h4 class="font-black text-accent text-2xl mb-6 flex items-center gap-3">
              <span class="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
              إرجاع سهل ومريح
            </h4>
            <p class="text-lg font-medium mb-4">
              يمكنك إرجاع المنتج خلال 14 يوماً من تاريخ استلامه، بشرط أن يكون في حالته الأصلية مع جميع الملحقات والتغليف.
            </p>
            <p class="text-lg font-medium">
              سيتم استرداد المبلغ بنفس طريقة الدفع المستخدمة خلال 5-7 أيام عمل.
            </p>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>

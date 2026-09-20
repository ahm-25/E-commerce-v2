<script setup lang="ts">
import { ShieldCheck, ShoppingBag, Truck, HeadphonesIcon } from 'lucide-vue-next'

const features = [
  {
    title: 'جودة نختارها بعناية',
    description: 'نضمن لك منتجات أصلية مصنعة من أفضل الخامات المتاحة لتدوم طويلاً.',
    icon: ShieldCheck
  },
  {
    title: 'تجربة شراء سهلة',
    description: 'واجهة مستخدم بسيطة وواضحة لتتمكن من إتمام طلبك في خطوات معدودة.',
    icon: ShoppingBag
  },
  {
    title: 'شحن موثوق',
    description: 'خيارات توصيل سريعة وآمنة تصلك أينما كنت في الوقت المحدد.',
    icon: Truck
  },
  {
    title: 'دعم نهتم به',
    description: 'فريق خدمة عملاء متواجد دائماً للرد على استفساراتك وحل أي مشكلة.',
    icon: HeadphonesIcon
  }
]
</script>

<template>
  <div class="py-16 md:py-24 font-arabic">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-2xl mx-auto mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">لماذا نحن؟</h2>
        <p class="text-gray-500 dark:text-gray-400 text-lg transition-colors">
          نحرص على تقديم قيمة حقيقية تفوق توقعاتك في كل مرة تتسوق فيها معنا.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div 
          v-for="feature in features" 
          :key="feature.title"
          class="flex flex-col items-center text-center p-6 rounded-2xl bg-white dark:bg-[#1e1e1e] border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all duration-300"
        >
          <div class="w-14 h-14 bg-gray-50 dark:bg-[#252525] rounded-full flex items-center justify-center mb-6 text-gray-900 dark:text-white transition-colors">
            <component :is="feature.icon" class="w-6 h-6" stroke-width="1.5" />
          </div>
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3 transition-colors">{{ feature.title }}</h3>
          <p class="text-gray-500 dark:text-gray-400 text-sm leading-relaxed transition-colors">
            {{ feature.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useSeoMeta } from '#imports'
import { useMockData } from '~/composables/useMockData'
import { ChevronDown } from 'lucide-vue-next'

const { mockData } = useMockData()

useSeoMeta({
  title: `الأسئلة الشائعة | ${mockData.store.name}`,
  description: 'ابحث عن إجابات للأسئلة الشائعة حول الطلبات، الشحن، الاسترجاع، والمزيد.'
})

const faqs = [
  {
    category: 'الطلبات والدفع',
    questions: [
      { q: 'ما هي طرق الدفع المتاحة؟', a: 'نقبل الدفع عبر البطاقات الائتمانية (فيزا وماستركارد)، مدى، أبل باي، والدفع نقداً عند الاستلام.' },
      { q: 'كيف يمكنني تعديل أو إلغاء طلبي؟', a: 'يمكنك إلغاء أو تعديل الطلب من خلال صفحة "طلباتي" في حسابك، بشرط ألا يكون الطلب قد دخل مرحلة "تم الشحن". إذا تم الشحن، يرجى انتظار استلامه ثم طلب إرجاع.' },
      { q: 'هل الدفع عبر الموقع آمن؟', a: 'نعم، جميع معاملات الدفع مشفرة ومحمية بأحدث تقنيات الأمان، ولا نقوم بتخزين بيانات بطاقتك الائتمانية على خوادمنا.' }
    ]
  },
  {
    category: 'الشحن والتوصيل',
    questions: [
      { q: 'كم يستغرق توصيل الطلب؟', a: 'يستغرق التوصيل عادة بين 2-4 أيام عمل في المدن الرئيسية، و3-6 أيام لباقي المناطق.' },
      { q: 'هل يتوفر شحن دولي؟', a: 'حالياً نقوم بالتوصيل داخل الجمهورية فقط، ونعمل على التوسع للشحن الدولي قريباً.' },
      { q: 'كيف أتبع شحنتي؟', a: 'بعد شحن الطلب، ستصلك رسالة تحتوي على رابط التتبع. يمكنك أيضاً متابعة حالة الطلب من حسابك.' }
    ]
  },
  {
    category: 'الاسترجاع والاستبدال',
    questions: [
      { q: 'ما هي مدة الاسترجاع المسموحة؟', a: 'نمنحك 14 يوماً من تاريخ استلام الطلب لإرجاع المنتجات التي لم تستخدم وفي حالتها الأصلية.' },
      { q: 'هل هناك رسوم للاسترجاع؟', a: 'الاسترجاع مجاني في حال وجود عيب مصنعي أو خطأ في الطلب. أما في حالة الاسترجاع لتغيير الرأي، قد يتم خصم رسوم الشحن.' }
    ]
  }
]

const activeIndex = ref<string | null>('0-0')

const toggleFaq = (index: string) => {
  activeIndex.value = activeIndex.value === index ? null : index
}
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-[#0a0a0a] transition-colors duration-300 font-arabic pb-20">
    <!-- Breadcrumb -->
    <div class="bg-gray-50 dark:bg-[#151515] border-b border-gray-100 dark:border-gray-800 transition-colors py-4">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav class="flex text-sm text-gray-500 dark:text-gray-400" aria-label="Breadcrumb">
          <ol class="inline-flex items-center space-x-1 space-x-reverse md:space-x-2 md:space-x-reverse">
            <li class="inline-flex items-center">
              <NuxtLink to="/" class="hover:text-gray-900 dark:hover:text-white transition-colors">الرئيسية</NuxtLink>
            </li>
            <li>
              <div class="flex items-center">
                <span class="mx-2 text-gray-400 dark:text-gray-600">/</span>
                <span class="text-gray-900 dark:text-white font-bold" aria-current="page">الأسئلة الشائعة</span>
              </div>
            </li>
          </ol>
        </nav>
      </div>
    </div>

    <!-- Header -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-12 text-center">
      <h1 class="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-4">الأسئلة الشائعة</h1>
      <p class="text-lg text-gray-600 dark:text-gray-400">جمعنا لك الإجابات على أكثر الأسئلة شيوعاً لمساعدتك.</p>
    </div>

    <!-- FAQ Accordion -->
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div v-for="(section, sIdx) in faqs" :key="section.category" class="mb-10">
        <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-800 pb-2">{{ section.category }}</h2>
        
        <div class="space-y-4">
          <div 
            v-for="(faq, qIdx) in section.questions" 
            :key="qIdx"
            class="bg-gray-50 dark:bg-[#151515] rounded-2xl overflow-hidden transition-all duration-300 border border-gray-100 dark:border-gray-800"
          >
            <button 
              @click="toggleFaq(`${sIdx}-${qIdx}`)"
              class="w-full text-right px-6 py-5 flex items-center justify-between focus:outline-none"
            >
              <span class="font-semibold text-gray-900 dark:text-white">{{ faq.q }}</span>
              <ChevronDown 
                class="w-5 h-5 text-gray-400 transition-transform duration-300 flex-shrink-0 mr-4"
                :class="{ 'rotate-180': activeIndex === `${sIdx}-${qIdx}` }" 
              />
            </button>
            <div 
              class="px-6 overflow-hidden transition-all duration-300 ease-in-out"
              :class="activeIndex === `${sIdx}-${qIdx}` ? 'max-h-96 pb-5 opacity-100' : 'max-h-0 opacity-0'"
            >
              <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed border-t border-gray-200 dark:border-gray-700 pt-4">
                {{ faq.a }}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="mt-12 p-8 bg-blue-50 dark:bg-blue-900/10 rounded-2xl text-center border border-blue-100 dark:border-blue-900/20">
        <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">لم تجد إجابة لسؤالك؟</h3>
        <p class="text-gray-600 dark:text-gray-400 mb-6">فريق خدمة العملاء لدينا مستعد لمساعدتك على مدار الساعة.</p>
        <NuxtLink to="/contact" class="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm hover:shadow">
          تواصل معنا
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

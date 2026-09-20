<script setup lang="ts">
import { useSeoMeta } from '#imports'
import { useMockData } from '~/composables/useMockData'
import { Truck, Clock, ShieldCheck, MapPin } from 'lucide-vue-next'

const { mockData } = useMockData()

useSeoMeta({
  title: `سياسة الشحن | ${mockData.store.name}`,
  description: 'تعرف على سياسة الشحن والتوصيل الخاصة بنا ومناطق التغطية.'
})

const features = [
  { icon: Truck, title: 'شحن سريع', desc: 'توصيل خلال 2-4 أيام عمل لجميع المدن الرئيسية' },
  { icon: MapPin, title: 'تغطية شاملة', desc: 'نوصل طلباتك إلى جميع أنحاء الجمهورية' },
  { icon: ShieldCheck, title: 'شحن آمن', desc: 'نضمن لك وصول منتجاتك بحالة ممتازة' },
  { icon: Clock, title: 'تتبع الطلب', desc: 'يمكنك تتبع حالة طلبك في أي وقت' }
]
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
                <span class="text-gray-900 dark:text-white font-bold" aria-current="page">سياسة الشحن</span>
              </div>
            </li>
          </ol>
        </nav>
      </div>
    </div>

    <!-- Header -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-10 text-center">
      <h1 class="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-4">سياسة الشحن والتوصيل</h1>
      <p class="text-lg text-gray-600 dark:text-gray-400">نحن نسعى دائماً لتقديم أفضل تجربة تسوق، ولذلك نوفر خيارات شحن متعددة وسريعة.</p>
    </div>

    <!-- Features Grid -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div v-for="feat in features" :key="feat.title" class="flex items-start p-6 bg-white dark:bg-[#1a1a1a] border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <div class="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center flex-shrink-0 ml-4">
            <component :is="feat.icon" class="w-6 h-6" />
          </div>
          <div>
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-1">{{ feat.title }}</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{{ feat.desc }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Content Sections -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white dark:bg-[#1a1a1a] border border-gray-100 dark:border-gray-800 rounded-3xl p-8 md:p-10 shadow-sm prose prose-blue dark:prose-invert max-w-none prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-600 dark:prose-p:text-gray-400 prose-p:leading-loose">
        
        <h2>تكلفة الشحن</h2>
        <p>تختلف تكلفة الشحن بناءً على المنطقة الجغرافية وحجم الطلب:</p>
        <ul>
          <li><strong>داخل العاصمة:</strong> 50 ج.م (توصيل خلال 24 - 48 ساعة)</li>
          <li><strong>المدن الرئيسية:</strong> 70 ج.م (توصيل خلال 2 - 4 أيام عمل)</li>
          <li><strong>باقي المحافظات:</strong> 100 ج.م (توصيل خلال 3 - 6 أيام عمل)</li>
        </ul>
        <p class="text-blue-600 dark:text-blue-400 font-bold bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl not-prose mt-4">
          🎉 شحن مجاني للطلبات التي تزيد قيمتها عن 2000 ج.م
        </p>

        <h2>مواعيد العمل والتوصيل</h2>
        <p>يتم شحن الطلبات وتوصيلها خلال أيام العمل الرسمية (من الأحد إلى الخميس). أيام الجمعة والسبت والعطلات الرسمية لا تعد أيام عمل بالنسبة لشركات الشحن.</p>

        <h2>تتبع الطلب</h2>
        <p>بمجرد تأكيد طلبك وتسليمه لشركة الشحن، سنقوم بإرسال رسالة نصية أو بريد إلكتروني يحتوي على رقم التتبع الخاص بشحنتك. يمكنك استخدام هذا الرقم في صفحة "تتبع الطلب" لمعرفة حالة شحنتك ومكانها الحالي.</p>

        <h2>تأخر الشحنات</h2>
        <p>في حالات نادرة قد تتأخر الشحنات لظروف خارجة عن إرادتنا (مثل سوء الأحوال الجوية، الضغط العالي في المواسم، أو تأخيرات من قبل شركة الشحن). في حال تأخر طلبك عن الموعد المحدد، يرجى التواصل مع فريق خدمة العملاء لدينا وسنقوم بحل المشكلة فوراً.</p>

      </div>
    </div>
  </div>
</template>

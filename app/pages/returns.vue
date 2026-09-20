<script setup lang="ts">
import { useSeoMeta } from '#imports'
import { useMockData } from '~/composables/useMockData'
import { RotateCcw, AlertCircle, ShieldCheck, CheckCircle2 } from 'lucide-vue-next'

const { mockData } = useMockData()

useSeoMeta({
  title: `سياسة الاسترجاع | ${mockData.store.name}`,
  description: 'تعرف على سياسة الاسترجاع والاستبدال الخاصة بنا والشروط المطلوبة.'
})

const features = [
  { icon: RotateCcw, title: 'إرجاع خلال 14 يوماً', desc: 'يمكنك إرجاع المنتجات خلال 14 يوماً من تاريخ الاستلام.' },
  { icon: CheckCircle2, title: 'عملية بسيطة', desc: 'إجراءات إرجاع سهلة وميسرة عبر حسابك.' },
  { icon: ShieldCheck, title: 'ضمان الجودة', desc: 'نضمن لك استرداد أموالك في حالة وجود عيب مصنعي.' },
  { icon: AlertCircle, title: 'شروط الإرجاع', desc: 'يجب أن يكون المنتج في حالته الأصلية وبغلافه الأصلي.' }
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
                <span class="text-gray-900 dark:text-white font-bold" aria-current="page">سياسة الاسترجاع</span>
              </div>
            </li>
          </ol>
        </nav>
      </div>
    </div>

    <!-- Header -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-10 text-center">
      <h1 class="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-4">سياسة الاسترجاع والاستبدال</h1>
      <p class="text-lg text-gray-600 dark:text-gray-400">رضاكم هو هدفنا الأول. إذا لم تكن راضياً عن مشترياتك، يمكنك إرجاعها أو استبدالها بكل سهولة.</p>
    </div>

    <!-- Features Grid -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div v-for="feat in features" :key="feat.title" class="flex items-start p-6 bg-white dark:bg-[#1a1a1a] border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <div class="w-12 h-12 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center flex-shrink-0 ml-4">
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
      <div class="bg-white dark:bg-[#1a1a1a] border border-gray-100 dark:border-gray-800 rounded-3xl p-8 md:p-10 shadow-sm prose prose-red dark:prose-invert max-w-none prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-600 dark:prose-p:text-gray-400 prose-p:leading-loose">
        
        <h2>الشروط العامة للاسترجاع</h2>
        <ul>
          <li>يسمح بالاسترجاع والاستبدال خلال 14 يوماً من تاريخ استلام الطلب.</li>
          <li>يجب أن يكون المنتج في حالته الأصلية، ولم يتم استخدامه، مع وجود جميع الملصقات وبطاقات السعر.</li>
          <li>يجب أن يعاد المنتج في عبوته الأصلية السليمة.</li>
          <li>لا يمكن استرجاع بعض المنتجات لأسباب صحية (مثل الملابس الداخلية، ملابس السباحة، ومنتجات العناية الشخصية) إلا في حالة وجود عيب مصنعي.</li>
        </ul>

        <h2>خطوات الاسترجاع</h2>
        <ol>
          <li>قم بتسجيل الدخول إلى حسابك واذهب إلى صفحة "طلباتي".</li>
          <li>اختر الطلب الذي ترغب في إرجاعه وانقر على "طلب إرجاع".</li>
          <li>حدد المنتج والسبب المباشر للإرجاع.</li>
          <li>سيقوم فريق الشحن لدينا بالتواصل معك وتحديد موعد لاستلام المنتج المرتجع من نفس عنوان التوصيل.</li>
        </ol>

        <h2>استرداد الأموال</h2>
        <p>بعد استلامنا للمنتج المرتجع وفحصه للتأكد من مطابقته لشروط الاسترجاع، سنقوم برد المبلغ:</p>
        <ul>
          <li><strong>البطاقات الائتمانية:</strong> يتم إرجاع المبلغ إلى نفس البطاقة خلال 7-14 يوم عمل حسب سياسة البنك.</li>
          <li><strong>الدفع عند الاستلام:</strong> يتم تحويل المبلغ إلى رصيدك في المحفظة داخل المتجر، أو عبر التحويل البنكي لحسابك (بعد خصم رسوم التحويل إن وجدت).</li>
        </ul>

        <h2>الاستبدال</h2>
        <p>إذا كنت ترغب في استبدال المنتج بمقاس آخر أو لون مختلف، يرجى تقديم طلب استرجاع للمنتج الحالي، ثم قم بإجراء طلب جديد للمنتج المطلوب.</p>

      </div>
    </div>
  </div>
</template>

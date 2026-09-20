<script setup lang="ts">
import { ref } from 'vue'
import { useSeoMeta } from '#imports'
import { useMockData } from '~/composables/useMockData'

const { mockData } = useMockData()

useSeoMeta({
  title: `دليل المقاسات | ${mockData.store.name}`,
  description: 'دليل المقاسات لمساعدتك في اختيار المقاس المناسب للملابس والأحذية.'
})

const activeTab = ref('women')

const tabs = [
  { id: 'women', name: 'نسائي' },
  { id: 'men', name: 'رجالي' },
  { id: 'shoes', name: 'أحذية' }
]

const tables = {
  women: [
    { size: 'S', bust: '82 - 86', waist: '64 - 68', hip: '90 - 94' },
    { size: 'M', bust: '88 - 92', waist: '70 - 74', hip: '96 - 100' },
    { size: 'L', bust: '94 - 98', waist: '76 - 80', hip: '102 - 106' },
    { size: 'XL', bust: '100 - 104', waist: '82 - 86', hip: '108 - 112' }
  ],
  men: [
    { size: 'S', chest: '92 - 96', waist: '76 - 80', hip: '94 - 98' },
    { size: 'M', chest: '100 - 104', waist: '84 - 88', hip: '102 - 106' },
    { size: 'L', chest: '108 - 112', waist: '92 - 96', hip: '110 - 114' },
    { size: 'XL', chest: '116 - 120', waist: '100 - 104', hip: '118 - 122' }
  ],
  shoes: [
    { uk: '4', eu: '37', us: '6', cm: '23.5' },
    { uk: '5', eu: '38', us: '7', cm: '24.5' },
    { uk: '6', eu: '39', us: '8', cm: '25.4' },
    { uk: '7', eu: '41', us: '9', cm: '26.2' },
    { uk: '8', eu: '42', us: '10', cm: '27.1' },
    { uk: '9', eu: '43', us: '11', cm: '27.9' }
  ]
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
                <span class="text-gray-900 dark:text-white font-bold" aria-current="page">دليل المقاسات</span>
              </div>
            </li>
          </ol>
        </nav>
      </div>
    </div>

    <!-- Header -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-10 text-center">
      <h1 class="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-4">دليل المقاسات</h1>
      <p class="text-lg text-gray-600 dark:text-gray-400">استخدم الجداول أدناه لمساعدتك في تحديد المقاس المناسب لك. جميع القياسات بالسنتيمتر.</p>
    </div>

    <!-- Content -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Tabs -->
      <div class="flex justify-center border-b border-gray-200 dark:border-gray-800 mb-8">
        <nav class="-mb-px flex space-x-8 space-x-reverse">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              activeTab === tab.id
                ? 'border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300',
              'whitespace-nowrap pb-4 px-1 border-b-2 font-bold text-lg transition-colors'
            ]"
          >
            {{ tab.name }}
          </button>
        </nav>
      </div>

      <!-- Tables -->
      <div class="bg-white dark:bg-[#151515] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div class="overflow-x-auto">
          
          <!-- Women Table -->
          <table v-if="activeTab === 'women'" class="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
            <thead class="bg-gray-50 dark:bg-[#1a1a1a]">
              <tr>
                <th scope="col" class="px-6 py-4 text-right text-sm font-bold text-gray-900 dark:text-white">المقاس العالمي</th>
                <th scope="col" class="px-6 py-4 text-right text-sm font-bold text-gray-900 dark:text-white">محيط الصدر (سم)</th>
                <th scope="col" class="px-6 py-4 text-right text-sm font-bold text-gray-900 dark:text-white">محيط الخصر (سم)</th>
                <th scope="col" class="px-6 py-4 text-right text-sm font-bold text-gray-900 dark:text-white">محيط الأرداف (سم)</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-800 bg-white dark:bg-[#151515]">
              <tr v-for="row in tables.women" :key="row.size" class="hover:bg-gray-50 dark:hover:bg-[#1a1a1a]/50 transition-colors">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 dark:text-white">{{ row.size }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">{{ row.bust }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">{{ row.waist }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">{{ row.hip }}</td>
              </tr>
            </tbody>
          </table>

          <!-- Men Table -->
          <table v-if="activeTab === 'men'" class="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
            <thead class="bg-gray-50 dark:bg-[#1a1a1a]">
              <tr>
                <th scope="col" class="px-6 py-4 text-right text-sm font-bold text-gray-900 dark:text-white">المقاس العالمي</th>
                <th scope="col" class="px-6 py-4 text-right text-sm font-bold text-gray-900 dark:text-white">محيط الصدر (سم)</th>
                <th scope="col" class="px-6 py-4 text-right text-sm font-bold text-gray-900 dark:text-white">محيط الخصر (سم)</th>
                <th scope="col" class="px-6 py-4 text-right text-sm font-bold text-gray-900 dark:text-white">محيط الأرداف (سم)</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-800 bg-white dark:bg-[#151515]">
              <tr v-for="row in tables.men" :key="row.size" class="hover:bg-gray-50 dark:hover:bg-[#1a1a1a]/50 transition-colors">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 dark:text-white">{{ row.size }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">{{ row.chest }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">{{ row.waist }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">{{ row.hip }}</td>
              </tr>
            </tbody>
          </table>

          <!-- Shoes Table -->
          <table v-if="activeTab === 'shoes'" class="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
            <thead class="bg-gray-50 dark:bg-[#1a1a1a]">
              <tr>
                <th scope="col" class="px-6 py-4 text-right text-sm font-bold text-gray-900 dark:text-white">المقاس الأوروبي (EU)</th>
                <th scope="col" class="px-6 py-4 text-right text-sm font-bold text-gray-900 dark:text-white">المقاس البريطاني (UK)</th>
                <th scope="col" class="px-6 py-4 text-right text-sm font-bold text-gray-900 dark:text-white">المقاس الأمريكي (US)</th>
                <th scope="col" class="px-6 py-4 text-right text-sm font-bold text-gray-900 dark:text-white">طول القدم (سم)</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-800 bg-white dark:bg-[#151515]">
              <tr v-for="row in tables.shoes" :key="row.eu" class="hover:bg-gray-50 dark:hover:bg-[#1a1a1a]/50 transition-colors">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 dark:text-white">{{ row.eu }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">{{ row.uk }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">{{ row.us }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">{{ row.cm }}</td>
              </tr>
            </tbody>
          </table>

        </div>
      </div>
      
      <div class="mt-8 bg-blue-50 dark:bg-blue-900/10 rounded-2xl p-6 border border-blue-100 dark:border-blue-900/20">
        <h3 class="text-lg font-bold text-blue-900 dark:text-blue-300 mb-2 flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          ملاحظة هامة
        </h3>
        <p class="text-sm text-blue-800 dark:text-blue-200/80 leading-relaxed">
          قد تختلف المقاسات قليلاً باختلاف التصميم أو نوع القماش أو العلامة التجارية. يرجى دائماً مراجعة وصف المنتج للتحقق من أي تفاصيل إضافية حول المقاس.
        </p>
      </div>

    </div>
  </div>
</template>

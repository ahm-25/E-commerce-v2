<script setup lang="ts">
import { onMounted } from 'vue'
import { useSeoMeta } from '#imports'
import { useCategoriesStore } from '~/stores/categories'
import { useMockData } from '~/composables/useMockData'
import CategoriesHero from '~/components/categories/CategoriesHero.vue'
import CategoryGrid from '~/components/categories/CategoryGrid.vue'

const store = useCategoriesStore()
const { mockData } = useMockData()

// SEO
useSeoMeta({
  title: () => `الأقسام | ${mockData.store.name || 'المتجر'}`,
  description: 'تصفح منتجاتنا عبر الأقسام المختلفة للعثور على ما تبحث عنه.'
})

onMounted(() => {
  // Fetch categories if not already loaded
  if (store.categories.length === 0) {
    store.fetchCategories()
  }
})
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-[#0a0a0a] transition-colors duration-300">
    <!-- Breadcrumb -->
    <div class="bg-white dark:bg-[#0a0a0a] border-b border-gray-100 dark:border-gray-800 transition-colors">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav class="flex text-sm text-gray-500 dark:text-gray-400 font-arabic" aria-label="Breadcrumb">
          <ol class="inline-flex items-center space-x-1 space-x-reverse md:space-x-2 md:space-x-reverse">
            <li class="inline-flex items-center">
              <NuxtLink to="/" class="hover:text-gray-900 dark:hover:text-white transition-colors">الرئيسية</NuxtLink>
            </li>
            <li>
              <div class="flex items-center">
                <span class="mx-2 text-gray-400 dark:text-gray-600">/</span>
                <span class="text-gray-900 dark:text-white font-bold" aria-current="page">الأقسام</span>
              </div>
            </li>
          </ol>
        </nav>
      </div>
    </div>

    <CategoriesHero />
    <CategoryGrid />
  </div>
</template>

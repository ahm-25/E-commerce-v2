<script setup lang="ts">
import { useSeoMeta } from '#imports'
import { useMockData } from '~/composables/useMockData'
import AboutHero from '~/components/about/AboutHero.vue'
import AboutStory from '~/components/about/AboutStory.vue'
import AboutFeatures from '~/components/about/AboutFeatures.vue'
import AboutMission from '~/components/about/AboutMission.vue'
import AboutProcess from '~/components/about/AboutProcess.vue'
import AboutCTA from '~/components/about/AboutCTA.vue'

const { mockData } = useMockData()

// SEO
useSeoMeta({
  title: () => `من نحن | ${mockData.store.name || 'المتجر'}`,
  description: mockData.store.description || 'تعرف علينا وعلى قصتنا في تقديم أفضل المنتجات.',
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
                <span class="text-gray-900 dark:text-white font-bold" aria-current="page">من نحن</span>
              </div>
            </li>
          </ol>
        </nav>
      </div>
    </div>

    <!-- Sections -->
    <AboutHero />
    <AboutStory />
    <AboutFeatures />
    <AboutMission />
    <AboutProcess />
    <AboutCTA />
  </div>
</template>

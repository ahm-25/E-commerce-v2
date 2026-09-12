<script setup lang="ts">
import { useMockData } from '~/composables/useMockData'

const { mockData } = useMockData()
</script>

<template>
  <div class="min-h-screen flex flex-col font-sans transition-colors duration-300">
    <StorefrontStoreHeader />
    <main class="flex-grow">
      <slot />
    </main>
    <StorefrontStoreFooter :store="mockData.store" />
  </div>
</template>

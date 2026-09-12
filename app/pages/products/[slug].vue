<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useMockData } from '~/composables/useMockData'
import type { Product } from '~/types'

const route = useRoute()
const { mockData, getProductBySlug } = useMockData()

// For real app, fetch based on route.params.slug
// Using mockProduct for demo
const product = ref<Product>(getProductBySlug(route.params.slug as string))

// Set default selected options (first value of each option)
const selectedOptions = ref<Record<string, string>>({})
const quantity = ref(1)

const initOptions = () => {
  if (product.value.options) {
    product.value.options.forEach(opt => {
      if (opt.values && opt.values.length > 0) {
        selectedOptions.value[opt.id] = opt.values[0].id
      }
    })
  }
}

onMounted(() => {
  initOptions()
})

watch(() => product.value, () => {
  initOptions()
  quantity.value = 1
})

const breadcrumbs = computed(() => {
  const items = [{ name: 'الرئيسية', url: '/' }]
  if (product.value.category) {
    items.push({ name: product.value.category.name, url: `/category/${product.value.category.slug}` })
  }
  items.push({ name: product.value.name, url: `/products/${product.value.slug}` })
  return items
})

const relatedProducts = computed(() => {
  return mockData.bestSellers.slice(0, 4)
})

// Update head metadata for SEO
useHead({
  title: `${product.value.name} | Nexora`,
  meta: [
    { name: 'description', content: product.value.description }
  ]
})
</script>

<template>
  <div class="container mx-auto px-4 py-8 max-w-[1400px]">
    <StorefrontProductBreadcrumbs :items="breadcrumbs" />

    <div class="mt-6 md:mt-10 flex flex-col-reverse lg:flex-row gap-12 lg:gap-16">
      <!-- Product Information (First in DOM -> Right in RTL, Top on Mobile) -->
      <div class="w-full lg:w-2/5 flex flex-col gap-8">
        <StorefrontProductInfo :product="product" />

        <div class="h-px bg-border w-full"></div>

        <StorefrontProductOptions 
          v-if="product.options && product.options.length"
          :options="product.options"
          v-model="selectedOptions"
        />

        <div class="flex flex-col sm:flex-row items-end sm:items-center gap-4 mt-2">
          <StorefrontProductQuantitySelector 
            v-model="quantity" 
            :max="product.stock"
            class="h-[56px] flex-shrink-0"
          />
          <StorefrontProductAddToCartButton 
            :product="product"
            :quantity="quantity"
            :options="selectedOptions"
            class="flex-grow"
          />
        </div>

        <StorefrontProductTrustFeatures />
      </div>

      <!-- Product Gallery (Second in DOM -> Left in RTL, Bottom on Mobile) -->
      <div class="w-full lg:w-3/5">
        <StorefrontProductGallery :images="product.images" />
      </div>
    </div>

    <!-- Product Details Tabs -->
    <StorefrontProductDetailsTabs :product="product" />

    <!-- Product Reviews -->
    <StorefrontProductReviews :product="product" />

    <!-- Related Products -->
    <StorefrontProductRelatedProducts :products="relatedProducts" />

    <!-- Promotional Banner -->
    <div class="mt-20">
      <StorefrontPromotionalBanner :banner="mockData.promotionalBanner" />
    </div>
  </div>
</template>

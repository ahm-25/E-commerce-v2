<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { storeApi } from '~/services/storeApi'
import { useMockData } from '~/composables/useMockData'

const route = useRoute()
const { mockData } = useMockData() // promotional banner content
const slug = route.params.slug as string

// Product + related products from the dashboard catalog
const { data } = await useAsyncData(`product:${slug}`, () => storeApi.getProduct(slug))
if (!data.value) {
  throw createError({ statusCode: 404, statusMessage: 'المنتج غير موجود', fatal: true })
}

const baseProduct = computed(() => data.value!.product)
const relatedProducts = computed(() => data.value!.related)

// Selected option values (optionId -> value), defaulting to the first value of each option
const selectedOptions = ref<Record<string, string>>({})
const quantity = ref(1)

const initOptions = () => {
  const options: Record<string, string> = {}
  for (const opt of baseProduct.value.options ?? []) {
    // Prefer a combination that is in stock
    const inStock = baseProduct.value.variants?.find(v => v.stock > 0)
    options[opt.id] = inStock?.options[opt.id] ?? opt.values[0]?.id ?? ''
  }
  selectedOptions.value = options
}
initOptions()

const selectedVariant = computed(() => baseProduct.value.variants?.find(v =>
  Object.entries(v.options).every(([optionId, value]) => selectedOptions.value[optionId] === value)
))

// Price and stock follow the chosen variant
const product = computed(() => ({
  ...baseProduct.value,
  price: selectedVariant.value?.price ?? baseProduct.value.price,
  stock: baseProduct.value.hasVariants ? selectedVariant.value?.stock ?? 0 : baseProduct.value.stock
}))

watch(selectedVariant, () => {
  quantity.value = Math.min(Math.max(quantity.value, 1), Math.max(product.value.stock, 1))
})

const breadcrumbs = computed(() => {
  const items = [{ name: 'الرئيسية', url: '/' }]
  if (product.value.category) {
    items.push({ name: product.value.category.name, url: `/categories/${product.value.category.slug}` })
  }
  items.push({ name: product.value.name, url: `/products/${product.value.slug}` })
  return items
})

useHead({
  title: () => `${product.value.name} | Nexora`,
  meta: [
    { name: 'description', content: () => product.value.description }
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

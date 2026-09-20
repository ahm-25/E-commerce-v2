<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { Search, ShoppingCart, Heart, User, Sun, Moon, Menu, X, ArrowUpLeft } from 'lucide-vue-next'
import { useShopStore } from '~/stores/useStore'
import { useCart } from '~/composables/useCart'
import { onClickOutside } from '@vueuse/core'
import { useSearchSuggestions } from '~/composables/useSearchSuggestions'
import MobileSearchPanel from './MobileSearchPanel.vue'

const colorMode = useColorMode()
const shopStore = useShopStore()
const { cartCount } = useCart()
const router = useRouter()

const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const {
  query,
  isSearchFocused,
  isLoading,
  hasError,
  suggestedProducts,
  suggestedCategories,
  recentSearches,
  onInput,
  submitSearch,
  removeRecentSearch
} = useSearchSuggestions()

const searchContainerRef = ref(null)
onClickOutside(searchContainerRef, () => {
  isSearchFocused.value = false
})

const isMobileSearchOpen = ref(false)



const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header
    :class="[
      'fixed top-0 w-full z-50 transition-all duration-300',
      isScrolled ? 'bg-surface/90 backdrop-blur-md shadow-sm border-b border-border py-4' : 'bg-surface py-6'
    ]"
  >
    <div class="container mx-auto px-4 lg:px-8">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <NuxtLink to="/" class="flex items-center gap-2.5 group">
            <svg class="w-8 h-8 text-primary transition-transform duration-300 group-hover:scale-105" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 3L20 7.5V16.5L12 21L4 16.5V7.5L12 3Z" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/>
              <path d="M12 12L20 7.5M12 12V21M12 12L4 7.5" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/>
            </svg>
            <span class="text-2xl md:text-3xl font-extrabold tracking-tight">Nexora</span>
          </NuxtLink>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden lg:flex items-center gap-10">
          <NuxtLink to="/" class="text-base font-semibold hover:text-accent transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-accent hover:after:w-full after:transition-all">الرئيسية</NuxtLink>
          <NuxtLink to="/products" class="text-base font-semibold hover:text-accent transition-colors text-text-secondary relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-accent hover:after:w-full after:transition-all">المنتجات</NuxtLink>
          <NuxtLink to="/categories" class="text-base font-semibold hover:text-accent transition-colors text-text-secondary relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-accent hover:after:w-full after:transition-all">الأقسام</NuxtLink>
          <NuxtLink to="/offers" class="text-base font-semibold hover:text-accent transition-colors text-text-secondary relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-accent hover:after:w-full after:transition-all">العروض</NuxtLink>
          <NuxtLink to="/about" class="text-base font-semibold hover:text-accent transition-colors text-text-secondary relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-accent hover:after:w-full after:transition-all">من نحن</NuxtLink>
          <NuxtLink to="/contact" class="text-base font-semibold hover:text-accent transition-colors text-text-secondary relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-accent hover:after:w-full after:transition-all">تواصل معنا</NuxtLink>
        </nav>

        <!-- Actions -->
        <div class="flex items-center gap-3 lg:gap-5">
          <!-- Search Bar (Desktop) -->
          <div ref="searchContainerRef" class="hidden lg:flex relative items-center">
            <div class="relative w-64 group">
              <input 
                v-model="query"
                type="text" 
                placeholder="ابحث عن منتج، قسم..." 
                class="w-full pl-10 pr-10 py-2 bg-background border border-border rounded-full text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                @focus="isSearchFocused = true"
                @input="onInput"
                @keydown.enter="submitSearch()"
                @keydown.esc="isSearchFocused = false; query = ''"
              >
              <Search class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary pointer-events-none" />
              <button 
                v-if="query" 
                type="button"
                @click="query = ''; onInput(); isSearchFocused = true"
                class="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-red-500 transition-colors p-0.5"
              >
                <X class="w-4 h-4" />
              </button>
            </div>

            <!-- Search Suggestions Dropdown -->
            <div 
              v-if="isSearchFocused && (query.length >= 2 || recentSearches.length > 0)" 
              class="absolute top-full right-0 mt-2 w-80 bg-surface rounded-2xl shadow-premium border border-border overflow-hidden z-50 transform transition-all font-arabic"
            >
              <div class="flex flex-col max-h-[70vh] overflow-y-auto">
                <!-- Loading State -->
                <div v-if="isLoading" class="p-6 flex justify-center">
                  <svg class="animate-spin h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>

                <!-- Error State -->
                <div v-else-if="hasError" class="p-6 text-center text-red-500">
                  <p class="text-sm font-medium">تعذر تحميل اقتراحات البحث</p>
                </div>

                <!-- Recent Searches -->
                <div v-else-if="!query && recentSearches.length > 0" class="p-4 border-b border-border/50">
                  <h3 class="text-xs font-bold text-text-secondary mb-3">عمليات البحث الأخيرة</h3>
                  <div class="flex flex-wrap gap-2">
                    <div 
                      v-for="term in recentSearches" 
                      :key="term"
                      class="flex items-center gap-1 bg-background border border-border rounded-full px-3 py-1.5"
                    >
                      <button 
                        @click="submitSearch(term)"
                        class="text-sm font-medium hover:text-primary transition-colors"
                      >
                        {{ term }}
                      </button>
                      <button 
                        @click="removeRecentSearch(term)"
                        class="ml-1 text-text-secondary hover:text-red-500 transition-colors p-0.5"
                      >
                        <X class="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Suggestions -->
                <template v-else-if="query && query.trim().length >= 2">
                  <!-- Categories -->
                  <div v-if="suggestedCategories.length > 0" class="border-b border-border/50">
                    <h3 class="text-xs font-bold text-text-secondary px-4 pt-3 pb-1">الأقسام</h3>
                    <NuxtLink 
                      v-for="category in suggestedCategories" 
                      :key="category.id"
                      :to="`/products?category=${category.slug}`"
                      class="flex items-center justify-between px-4 py-2 hover:bg-background/80 transition-colors"
                      @click="isSearchFocused = false"
                    >
                      <span class="text-sm font-semibold text-text-primary">{{ category.name }}</span>
                    </NuxtLink>
                  </div>

                  <!-- Products -->
                  <div v-if="suggestedProducts.length > 0">
                    <h3 class="text-xs font-bold text-text-secondary px-4 pt-3 pb-1">المنتجات</h3>
                    <NuxtLink 
                      v-for="product in suggestedProducts" 
                      :key="product.id"
                      :to="`/products/${product.slug}`"
                      class="flex items-center gap-3 p-3 hover:bg-background/80 transition-colors border-b border-border/50 last:border-0"
                      @click="isSearchFocused = false"
                    >
                      <img :src="product.images[0]?.url" :alt="product.name" class="w-12 h-12 object-cover rounded-lg border border-border">
                      <div class="flex-1 min-w-0">
                        <p class="text-sm font-semibold text-text-primary truncate">{{ product.name }}</p>
                        <p class="text-xs text-text-secondary truncate">{{ product.category?.name || product.brand }}</p>
                      </div>
                      <div class="text-left flex-shrink-0">
                        <p class="text-sm font-bold text-primary" dir="ltr">{{ product.price }} {{ product.currency }}</p>
                      </div>
                    </NuxtLink>
                  </div>

                  <!-- Empty / See All -->
                  <div class="p-2 bg-background/30">
                    <button 
                      v-if="suggestedProducts.length > 0 || suggestedCategories.length > 0"
                      @click="submitSearch()"
                      class="w-full p-2 text-center text-sm font-bold text-primary hover:bg-primary/5 transition-colors rounded-lg flex items-center justify-center gap-2"
                    >
                      عرض جميع النتائج
                      <ArrowUpLeft class="w-4 h-4 rtl:-scale-x-100" />
                    </button>
                    <div v-else class="text-center py-6 text-text-secondary">
                      <p class="text-sm font-bold text-text-primary mb-1">لا توجد نتائج مطابقة</p>
                      <button @click="submitSearch()" class="text-sm text-primary hover:underline">عرض نتائج البحث</button>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <button @click="toggleTheme" class="p-2 hover:bg-background rounded-full transition-colors" aria-label="Toggle Theme">
              <Sun v-if="colorMode.value === 'dark'" class="w-5 h-5 text-text-secondary hover:text-primary" />
              <Moon v-else class="w-5 h-5 text-text-secondary hover:text-primary" />
            </button>
            <NuxtLink to="/auth/login" class="hidden sm:block p-2 hover:bg-background rounded-full transition-colors" aria-label="User Account">
              <User class="w-5 h-5 text-text-secondary hover:text-primary" />
            </NuxtLink>
            <NuxtLink to="/account/wishlist" class="hidden sm:block p-2 hover:bg-background rounded-full transition-colors" aria-label="Wishlist">
              <Heart class="w-5 h-5 text-text-secondary hover:text-primary" />
            </NuxtLink>
            <!-- Search Toggle (Mobile) -->
            <button @click="isMobileSearchOpen = true" class="lg:hidden p-2 hover:bg-background rounded-full transition-colors" aria-label="Search">
              <Search class="w-5 h-5 text-text-secondary hover:text-primary" />
            </button>
            <NuxtLink to="/cart" class="relative p-2 hover:bg-background rounded-full transition-colors flex items-center justify-center" aria-label="سلة التسوق">
              <ShoppingCart class="w-5 h-5 text-text-secondary hover:text-primary transition-colors" />
              <span v-if="cartCount > 0" class="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-primary text-white text-[10px] font-bold flex items-center justify-center rounded-full shadow-sm">
                {{ cartCount }}
              </span>
            </NuxtLink>
            
            <!-- Mobile Menu Toggle -->
            <button @click="shopStore.toggleMobileMenu" class="md:hidden p-2 hover:bg-background rounded-full transition-colors" aria-label="Menu">
              <Menu v-if="!shopStore.isMobileMenuOpen" class="w-6 h-6" />
              <X v-else class="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Menu Dropdown -->
    <div v-if="shopStore.isMobileMenuOpen" class="md:hidden absolute top-full left-0 w-full bg-surface border-b border-border shadow-lg py-4">
      <div class="container mx-auto px-4 flex flex-col gap-4">
        <nav class="flex flex-col gap-2">
          <NuxtLink to="/" class="py-2 text-sm font-medium border-b border-border">الرئيسية</NuxtLink>
          <NuxtLink to="/products" class="py-2 text-sm font-medium border-b border-border">المنتجات</NuxtLink>
          <NuxtLink to="/categories" class="py-2 text-sm font-medium border-b border-border">الأقسام</NuxtLink>
          <NuxtLink to="/offers" class="py-2 text-sm font-medium border-b border-border">العروض</NuxtLink>
          <NuxtLink to="/cart" class="py-2 text-sm font-medium border-b border-border flex items-center justify-between">
            <span>سلة التسوق</span>
            <span v-if="cartCount > 0" class="px-2 py-0.5 text-xs bg-primary text-white rounded-full font-bold">{{ cartCount }}</span>
          </NuxtLink>
        </nav>
      </div>
    </div>
  </header>
  <MobileSearchPanel :is-open="isMobileSearchOpen" @close="isMobileSearchOpen = false" />
  <!-- Spacer to prevent content from jumping behind sticky header -->
  <div class="h-[88px] sm:h-[104px]"></div>
</template>

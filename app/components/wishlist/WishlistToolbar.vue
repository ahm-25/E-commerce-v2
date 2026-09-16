<script setup lang="ts">
import { ref } from 'vue'
import { Share2, ShoppingCart, Trash2, ChevronDown } from 'lucide-vue-next'
import { useWishlistStore } from '~/stores/wishlist'
import ConfirmationDialog from '~/components/storefront/ConfirmationDialog.vue'

const props = defineProps<{
  itemCount: number
}>()

const wishlistStore = useWishlistStore()
const isShareSupported = typeof navigator !== 'undefined' && !!navigator.share
const isConfirmOpen = ref(false)
const showSortDropdown = ref(false)

const sortOptions = [
  { value: 'newest', label: 'الأحدث إضافة' },
  { value: 'price_asc', label: 'السعر: الأقل للأعلى' },
  { value: 'price_desc', label: 'السعر: الأعلى للأقل' },
  { value: 'name_asc', label: 'الاسم أبجدياً' }
]

const currentSortLabel = computed(() => {
  return sortOptions.find(opt => opt.value === wishlistStore.sortBy)?.label || sortOptions[0].label
})

const handleSortChange = (value: any) => {
  wishlistStore.setSortBy(value)
  showSortDropdown.value = false
}

const handleShare = async () => {
  const url = window.location.href
  const title = 'قائمة المفضلة الخاصة بي - Nexora'
  
  if (isShareSupported) {
    try {
      await navigator.share({
        title,
        url
      })
    } catch (err) {
      console.error('Error sharing:', err)
    }
  } else {
    // Fallback to clipboard
    navigator.clipboard.writeText(url).then(() => {
      alert('تم نسخ الرابط!')
    })
  }
}

const confirmClear = () => {
  wishlistStore.clearWishlist()
  isConfirmOpen.value = false
}
</script>

<template>
  <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-4 mb-6 border-b border-border">
    <!-- Count -->
    <div class="text-sm font-medium text-text-secondary">
      {{ itemCount }} منتجاً محفوظاً
    </div>
    
    <!-- Actions -->
    <div class="flex flex-wrap items-center gap-3 w-full md:w-auto">
      
      <!-- Sort Dropdown -->
      <div class="relative">
        <button 
          @click="showSortDropdown = !showSortDropdown"
          class="flex items-center gap-2 px-3 py-2 text-sm font-medium border border-border rounded-lg bg-surface text-text-primary hover:bg-background transition-colors"
        >
          {{ currentSortLabel }}
          <ChevronDown class="w-4 h-4 text-text-secondary" />
        </button>
        
        <div 
          v-if="showSortDropdown" 
          class="absolute top-full right-0 mt-1 w-48 bg-surface border border-border rounded-lg shadow-lg z-30 py-1"
        >
          <button 
            v-for="option in sortOptions" 
            :key="option.value"
            @click="handleSortChange(option.value)"
            class="w-full text-right px-4 py-2 text-sm hover:bg-background transition-colors"
            :class="wishlistStore.sortBy === option.value ? 'text-primary font-bold bg-primary/5' : 'text-text-primary'"
          >
            {{ option.label }}
          </button>
        </div>
      </div>
      
      <!-- Add All to Cart -->
      <button 
        @click="wishlistStore.addAllToCart()"
        class="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary/90 transition-colors"
      >
        <ShoppingCart class="w-4 h-4" />
        <span>إضافة الكل للسلة</span>
      </button>
      
      <!-- Share -->
      <button 
        @click="handleShare"
        class="flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium border border-border rounded-lg hover:bg-background transition-colors"
        title="مشاركة المفضلة"
      >
        <Share2 class="w-4 h-4" />
      </button>
      
      <!-- Clear All -->
      <button 
        @click="isConfirmOpen = true"
        class="flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-red-500 border border-red-200 dark:border-red-900/30 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
        title="إفراغ المفضلة"
      >
        <Trash2 class="w-4 h-4" />
      </button>
    </div>

    <!-- Confirmation Dialog -->
    <ConfirmationDialog
      :is-open="isConfirmOpen"
      title="هل تريد حذف جميع المنتجات؟"
      message="سيتم إزالة جميع المنتجات من قائمة المفضلة ولا يمكن التراجع عن هذا الإجراء."
      confirm-text="حذف الكل"
      cancel-text="إلغاء"
      :is-destructive="true"
      @confirm="confirmClear"
      @cancel="isConfirmOpen = false"
    />
  </div>
</template>

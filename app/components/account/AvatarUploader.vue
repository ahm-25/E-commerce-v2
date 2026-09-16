<script setup lang="ts">
import { ref, watch } from 'vue'
import { X, UploadCloud, Image as ImageIcon, CheckCircle, AlertCircle } from 'lucide-vue-next'
import { useAccountStore } from '~/stores/account'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'uploaded', url: string): void
}>()

const accountStore = useAccountStore()

const fileInput = ref<HTMLInputElement | null>(null)
const selectedFile = ref<File | null>(null)
const previewUrl = ref<string | null>(null)
const errorMsg = ref<string | null>(null)
const isSuccess = ref(false)

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    const file = target.files[0]
    validateAndSetFile(file)
  }
}

const handleDrop = (event: DragEvent) => {
  if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
    validateAndSetFile(event.dataTransfer.files[0])
  }
}

const validateAndSetFile = (file: File) => {
  errorMsg.value = null
  isSuccess.value = false
  
  if (!ALLOWED_TYPES.includes(file.type)) {
    errorMsg.value = 'نوع الملف غير مدعوم. يرجى اختيار صورة بصيغة JPG، PNG، أو WebP.'
    return
  }
  
  if (file.size > MAX_FILE_SIZE) {
    errorMsg.value = 'حجم الصورة كبير جداً. الحد الأقصى هو 5 ميجابايت.'
    return
  }
  
  selectedFile.value = file
  previewUrl.value = URL.createObjectURL(file)
}

const handleSave = async () => {
  if (!selectedFile.value) return
  
  errorMsg.value = null
  try {
    await accountStore.uploadAvatar(selectedFile.value)
    isSuccess.value = true
    
    // Auto close after success
    setTimeout(() => {
      emit('uploaded', accountStore.profile?.avatarUrl || '')
      handleClose()
    }, 1500)
    
  } catch (err: any) {
    errorMsg.value = accountStore.saveError || 'حدث خطأ غير متوقع'
  }
}

const handleClose = () => {
  // Reset state
  selectedFile.value = null
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value)
    previewUrl.value = null
  }
  errorMsg.value = null
  isSuccess.value = false
  emit('close')
}

// Reset when modal opens
watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    selectedFile.value = null
    previewUrl.value = null
    errorMsg.value = null
    isSuccess.value = false
  }
})
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
    <div class="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" @click="handleClose"></div>
    
    <div class="bg-surface rounded-2xl shadow-premium w-full max-w-md relative z-10 overflow-hidden flex flex-col max-h-[90vh]">
      <!-- Header -->
      <div class="flex items-center justify-between p-5 border-b border-border">
        <h3 class="text-lg font-bold text-text-primary">تغيير الصورة الشخصية</h3>
        <button @click="handleClose" class="p-2 hover:bg-background rounded-full transition-colors text-text-secondary">
          <X class="w-5 h-5" />
        </button>
      </div>
      
      <!-- Body -->
      <div class="p-6 overflow-y-auto">
        <div v-if="isSuccess" class="flex flex-col items-center justify-center py-8 text-center animate-in fade-in zoom-in duration-300">
          <div class="w-16 h-16 bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mb-4">
            <CheckCircle class="w-8 h-8" />
          </div>
          <h4 class="text-xl font-bold text-text-primary mb-2">تم الرفع بنجاح</h4>
          <p class="text-text-secondary">تم تحديث صورتك الشخصية بنجاح.</p>
        </div>
        
        <div v-else class="space-y-6">
          <!-- Dropzone / Preview -->
          <div 
            class="border-2 border-dashed rounded-2xl transition-colors duration-200 p-8 flex flex-col items-center justify-center text-center relative"
            :class="[
              previewUrl ? 'border-primary/50 bg-primary/5' : 'border-border hover:border-primary/50 hover:bg-background',
              accountStore.isUploading ? 'opacity-50 pointer-events-none' : ''
            ]"
            @dragover.prevent
            @drop.prevent="handleDrop"
            @click="!previewUrl && triggerFileInput()"
          >
            <input 
              type="file" 
              ref="fileInput" 
              class="hidden" 
              accept=".jpg,.jpeg,.png,.webp"
              @change="handleFileChange"
            >
            
            <template v-if="previewUrl">
              <div class="relative w-32 h-32 rounded-full overflow-hidden border-4 border-surface shadow-md mb-4 group">
                <img :src="previewUrl" alt="Preview" class="w-full h-full object-cover">
                <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer" @click.stop="triggerFileInput">
                  <ImageIcon class="w-8 h-8 text-white" />
                </div>
              </div>
              <p class="text-sm font-medium text-text-primary mb-1">{{ selectedFile?.name }}</p>
              <button @click.stop="triggerFileInput" class="text-sm text-primary hover:underline font-semibold">تغيير الصورة</button>
            </template>
            
            <template v-else>
              <div class="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4 cursor-pointer">
                <UploadCloud class="w-8 h-8" />
              </div>
              <h4 class="font-bold text-text-primary mb-2 cursor-pointer">اضغط لاختيار صورة أو اسحبها هنا</h4>
              <p class="text-sm text-text-secondary">JPG, PNG أو WebP (الحد الأقصى 5MB)</p>
            </template>
          </div>
          
          <!-- Error Message -->
          <div v-if="errorMsg" class="flex items-start gap-2 p-3 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 rounded-xl text-sm font-medium">
            <AlertCircle class="w-5 h-5 shrink-0" />
            <p>{{ errorMsg }}</p>
          </div>
        </div>
      </div>
      
      <!-- Footer -->
      <div v-if="!isSuccess" class="p-5 border-t border-border bg-background/50 flex gap-3">
        <button 
          @click="handleSave" 
          :disabled="!selectedFile || accountStore.isUploading"
          class="flex-1 bg-primary hover:bg-primary-hover disabled:bg-primary/50 disabled:cursor-not-allowed text-white px-4 py-2.5 rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
        >
          <span v-if="accountStore.isUploading" class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
          <span>{{ accountStore.isUploading ? 'جاري الحفظ...' : 'حفظ الصورة' }}</span>
        </button>
        <button 
          @click="handleClose" 
          :disabled="accountStore.isUploading"
          class="flex-1 bg-surface border border-border hover:bg-background disabled:opacity-50 text-text-primary px-4 py-2.5 rounded-xl font-bold transition-colors"
        >
          إلغاء
        </button>
      </div>
    </div>
  </div>
</template>

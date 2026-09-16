<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import type { AddressFormData, Address } from '~/types'

const props = defineProps<{
  initialData?: Address | null
}>()

const emit = defineEmits<{
  (e: 'submit', data: AddressFormData): void
  (e: 'cancel'): void
}>()

const formData = reactive<AddressFormData>({
  label: '',
  recipientName: '',
  phone: '',
  governorate: '',
  city: '',
  area: '',
  addressLine: '',
  postalCode: '',
  deliveryNotes: '',
  isDefault: false
})

const errors = reactive<Record<string, string>>({})

const governorates = [
  'القاهرة', 'الجيزة', 'الإسكندرية', 'الدقهلية', 'البحر الأحمر', 'البحيرة',
  'الفيوم', 'الغربية', 'الإسماعيلية', 'المنوفية', 'المنيا', 'القليوبية',
  'الوادي الجديد', 'السويس', 'أسوان', 'أسيوط', 'بني سويف', 'بورسعيد',
  'دمياط', 'الشرقية', 'جنوب سيناء', 'كفر الشيخ', 'مطروح', 'الأقصر', 'قنا', 'شمال سيناء', 'سوهاج'
]

onMounted(() => {
  if (props.initialData) {
    Object.assign(formData, {
      label: props.initialData.label,
      recipientName: props.initialData.recipientName,
      phone: props.initialData.phone,
      governorate: props.initialData.governorate,
      city: props.initialData.city,
      area: props.initialData.area || '',
      addressLine: props.initialData.addressLine,
      postalCode: props.initialData.postalCode || '',
      deliveryNotes: props.initialData.deliveryNotes || '',
      isDefault: props.initialData.isDefault
    })
  }
})

const validate = () => {
  let isValid = true
  Object.keys(errors).forEach(key => delete errors[key])

  if (!formData.label.trim()) {
    errors.label = 'يرجى إدخال اسم العنوان (المنزل، العمل...)'
    isValid = false
  }
  
  if (!formData.recipientName.trim()) {
    errors.recipientName = 'يرجى إدخال اسم المستلم.'
    isValid = false
  }
  
  if (!formData.phone.trim()) {
    errors.phone = 'يرجى إدخال رقم هاتف صحيح.'
    isValid = false
  } else if (!/^01[0125][0-9]{8}$/.test(formData.phone)) {
    errors.phone = 'رقم الهاتف يجب أن يكون رقم مصري صحيح (مثال: 01012345678)'
    isValid = false
  }
  
  if (!formData.governorate) {
    errors.governorate = 'يرجى اختيار المحافظة.'
    isValid = false
  }
  
  if (!formData.city.trim()) {
    errors.city = 'يرجى إدخال المدينة.'
    isValid = false
  }
  
  if (!formData.addressLine.trim()) {
    errors.addressLine = 'يرجى إدخال العنوان بالتفصيل.'
    isValid = false
  }

  return isValid
}

const handleSubmit = () => {
  if (validate()) {
    emit('submit', { ...formData })
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div class="space-y-5">
      
      <!-- Label & Recipient -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label class="block text-sm font-bold text-text-primary mb-2">اسم العنوان <span class="text-red-500">*</span></label>
          <input 
            v-model="formData.label" 
            type="text" 
            placeholder="مثال: المنزل، العمل..." 
            class="w-full bg-surface border rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            :class="errors.label ? 'border-red-500 focus:border-red-500' : 'border-border focus:border-primary'"
            ref="firstInput"
          >
          <span v-if="errors.label" class="text-xs text-red-500 mt-1 block">{{ errors.label }}</span>
        </div>
        
        <div>
          <label class="block text-sm font-bold text-text-primary mb-2">اسم المستلم <span class="text-red-500">*</span></label>
          <input 
            v-model="formData.recipientName" 
            type="text" 
            class="w-full bg-surface border rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            :class="errors.recipientName ? 'border-red-500 focus:border-red-500' : 'border-border focus:border-primary'"
          >
          <span v-if="errors.recipientName" class="text-xs text-red-500 mt-1 block">{{ errors.recipientName }}</span>
        </div>
      </div>

      <!-- Phone -->
      <div>
        <label class="block text-sm font-bold text-text-primary mb-2">رقم الهاتف <span class="text-red-500">*</span></label>
        <input 
          v-model="formData.phone" 
          type="tel" 
          dir="ltr"
          class="w-full bg-surface border rounded-xl px-4 py-3 text-text-primary text-right focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          :class="errors.phone ? 'border-red-500 focus:border-red-500' : 'border-border focus:border-primary'"
        >
        <span v-if="errors.phone" class="text-xs text-red-500 mt-1 block">{{ errors.phone }}</span>
      </div>

      <!-- Location -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label class="block text-sm font-bold text-text-primary mb-2">المحافظة <span class="text-red-500">*</span></label>
          <select 
            v-model="formData.governorate" 
            class="w-full bg-surface border rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none"
            :class="errors.governorate ? 'border-red-500 focus:border-red-500' : 'border-border focus:border-primary'"
          >
            <option value="" disabled>اختر المحافظة</option>
            <option v-for="gov in governorates" :key="gov" :value="gov">{{ gov }}</option>
          </select>
          <span v-if="errors.governorate" class="text-xs text-red-500 mt-1 block">{{ errors.governorate }}</span>
        </div>
        
        <div>
          <label class="block text-sm font-bold text-text-primary mb-2">المدينة / المركز <span class="text-red-500">*</span></label>
          <input 
            v-model="formData.city" 
            type="text" 
            class="w-full bg-surface border rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            :class="errors.city ? 'border-red-500 focus:border-red-500' : 'border-border focus:border-primary'"
          >
          <span v-if="errors.city" class="text-xs text-red-500 mt-1 block">{{ errors.city }}</span>
        </div>
      </div>

      <!-- Address Line -->
      <div>
        <label class="block text-sm font-bold text-text-primary mb-2">العنوان بالتفصيل <span class="text-red-500">*</span></label>
        <textarea 
          v-model="formData.addressLine" 
          rows="3"
          placeholder="اسم الشارع، رقم المبنى، الدور، الشقة..."
          class="w-full bg-surface border rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
          :class="errors.addressLine ? 'border-red-500 focus:border-red-500' : 'border-border focus:border-primary'"
        ></textarea>
        <span v-if="errors.addressLine" class="text-xs text-red-500 mt-1 block">{{ errors.addressLine }}</span>
      </div>
      
      <!-- Optional Fields -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label class="block text-sm font-bold text-text-primary mb-2">المنطقة <span class="text-text-secondary font-normal">(اختياري)</span></label>
          <input 
            v-model="formData.area" 
            type="text" 
            class="w-full bg-surface border border-border rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
          >
        </div>
        
        <div>
          <label class="block text-sm font-bold text-text-primary mb-2">الرمز البريدي <span class="text-text-secondary font-normal">(اختياري)</span></label>
          <input 
            v-model="formData.postalCode" 
            type="text" 
            dir="ltr"
            class="w-full bg-surface border border-border rounded-xl px-4 py-3 text-text-primary text-right focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
          >
        </div>
      </div>

      <div>
        <label class="block text-sm font-bold text-text-primary mb-2">ملاحظات التوصيل <span class="text-text-secondary font-normal">(اختياري)</span></label>
        <input 
          v-model="formData.deliveryNotes" 
          type="text" 
          placeholder="علامة مميزة، وقت مفضل للتوصيل..."
          class="w-full bg-surface border border-border rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
        >
      </div>

      <!-- Set as Default -->
      <div class="pt-2">
        <label class="flex items-center gap-3 cursor-pointer group w-max">
          <div class="relative flex items-center justify-center">
            <input 
              type="checkbox" 
              v-model="formData.isDefault"
              class="w-5 h-5 rounded-md border-border text-primary focus:ring-primary bg-surface cursor-pointer peer transition-colors"
            >
          </div>
          <span class="text-sm font-semibold text-text-primary select-none group-hover:text-primary transition-colors">تعيين هذا العنوان كعنوان افتراضي</span>
        </label>
      </div>

    </div>

    <!-- Actions Footer -->
    <div class="mt-8 pt-5 border-t border-border flex items-center gap-4">
      <button 
        type="submit" 
        class="flex-1 bg-primary text-white font-bold py-3.5 px-6 rounded-xl hover:bg-primary-hover transition-colors shadow-sm"
      >
        حفظ العنوان
      </button>
      <button 
        type="button" 
        @click="emit('cancel')"
        class="flex-1 bg-surface border border-border text-text-primary font-bold py-3.5 px-6 rounded-xl hover:bg-background transition-colors"
      >
        إلغاء
      </button>
    </div>
  </form>
</template>

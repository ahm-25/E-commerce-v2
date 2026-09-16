import type { Address } from '~/types'

export const mockAddresses: Address[] = [
  {
    id: 'addr-1',
    label: 'المنزل',
    recipientName: 'أحمد عبد الناصر',
    phone: '01017865860',
    governorate: 'الدقهلية',
    city: 'المنصورة',
    addressLine: 'شارع الجمهورية، عمارة 123، الدور 4',
    isDefault: true
  },
  {
    id: 'addr-2',
    label: 'العمل',
    recipientName: 'أحمد عبد الناصر',
    phone: '01017865860',
    governorate: 'الدقهلية',
    city: 'المنصورة',
    addressLine: 'مركز الأعمال، برج النور، الدور 8',
    isDefault: false
  },
  {
    id: 'addr-3',
    label: 'منزل العائلة',
    recipientName: 'أحمد عبد الناصر',
    phone: '01017865860',
    governorate: 'الدقهلية',
    city: 'المنصورة',
    addressLine: 'قرية ميت خلف، بجوار مدرسة السلام',
    isDefault: false
  }
]

import { defineStore } from 'pinia'
import type { UserProfile, UserAddress, AccountStats } from '~/types/account'
import type { Order, Product } from '~/types'

export const useAccountStore = defineStore('account', {
  state: () => ({
    profile: null as UserProfile | null,
    stats: null as AccountStats | null,
    recentOrders: [] as Order[],
    addresses: [] as UserAddress[],
    wishlist: [] as Product[],
    isLoading: false,
    isSaving: false,
    isUploading: false,
    saveError: null as string | null,
    error: null as string | null,
    isLoggedIn: true, // Mock logged in state for now
  }),
  
  actions: {
    async fetchDashboardData() {
      this.isLoading = true
      this.error = null
      
      try {
        // Mock API Call delay
        await new Promise(resolve => setTimeout(resolve, 800))
        
        this.profile = {
          id: 'u-1',
          firstName: 'أحمد',
          lastName: 'عبد الناصر',
          email: 'ahmed@example.com',
          phone: '01017865860',
          governorate: 'القاهرة',
          city: 'مدينة نصر',
          birthDate: '1990-05-15',
          emailVerified: true,
          phoneVerified: true,
          createdAt: '2023-01-10T10:00:00Z',
          status: 'active'
        }
        
        this.stats = {
          totalOrders: 8,
          pendingOrders: 2,
          completedOrders: 5,
          wishlistCount: 5
        }
        
        this.recentOrders = [
          {
            id: 'ord-10248',
            orderNumber: '#10248',
            createdAt: '2025-09-12T10:00:00Z',
            status: 'processing',
            paymentStatus: 'paid',
            paymentMethod: 'credit_card',
            shippingMethod: 'standard',
            items: [
              {
                id: 'item-1',
                productId: 'p-luxury-bag-01',
                slug: 'luxury-leather-bag',
                name: 'حقيبة يد جلدية فاخرة بتصميم عصري',
                image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                price: 10600,
                quantity: 1
              }
            ],
            customer: {
              name: 'أحمد عبد الناصر',
              phone: '01017865860',
              email: 'ahmed@example.com'
            },
            shippingAddress: {
              governorate: 'القاهرة',
              city: 'مدينة نصر',
              region: 'المنطقة السادسة',
              addressDetails: 'شارع حسن المأمون، عمارة 15'
            },
            subtotal: 10600,
            discount: 0,
            shippingCost: 0,
            tax: 0,
            total: 10600
          },
          {
            id: 'ord-10247',
            orderNumber: '#10247',
            createdAt: '2025-09-05T14:30:00Z',
            status: 'delivered',
            paymentStatus: 'paid',
            paymentMethod: 'cash',
            shippingMethod: 'express',
            items: [
              {
                id: 'item-2',
                productId: 'p-sneakers',
                slug: 'classic-sneakers',
                name: 'حذاء رياضي كلاسيك',
                image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                price: 8450,
                quantity: 1
              }
            ],
            customer: {
              name: 'أحمد عبد الناصر',
              phone: '01017865860',
              email: 'ahmed@example.com'
            },
            shippingAddress: {
              governorate: 'القاهرة',
              city: 'مدينة نصر',
              region: 'المنطقة السادسة',
              addressDetails: 'شارع حسن المأمون، عمارة 15'
            },
            subtotal: 8450,
            discount: 0,
            shippingCost: 0,
            tax: 0,
            total: 8450
          },
          {
            id: 'ord-10246',
            orderNumber: '#10246',
            createdAt: '2025-08-28T09:15:00Z',
            status: 'shipped',
            paymentStatus: 'paid',
            paymentMethod: 'credit_card',
            shippingMethod: 'standard',
            items: [
              {
                id: 'item-3',
                productId: 'p-backpack',
                slug: 'elegant-backpack',
                name: 'حقيبة ظهر أنيقة',
                image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                price: 6200,
                quantity: 1
              }
            ],
            customer: {
              name: 'أحمد عبد الناصر',
              phone: '01017865860',
              email: 'ahmed@example.com'
            },
            shippingAddress: {
              governorate: 'القاهرة',
              city: 'مدينة نصر',
              region: 'المنطقة السادسة',
              addressDetails: 'شارع حسن المأمون، عمارة 15'
            },
            subtotal: 6200,
            discount: 0,
            shippingCost: 0,
            tax: 0,
            total: 6200
          },
          {
            id: 'ord-10245',
            orderNumber: '#10245',
            createdAt: '2025-08-20T11:45:00Z',
            status: 'delivered',
            paymentStatus: 'paid',
            paymentMethod: 'credit_card',
            shippingMethod: 'standard',
            items: [
              {
                id: 'item-4',
                productId: 'p-headphones',
                slug: 'wireless-headphones',
                name: 'سماعات لاسلكية',
                image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                price: 3750,
                quantity: 1
              }
            ],
            customer: {
              name: 'أحمد عبد الناصر',
              phone: '01017865860',
              email: 'ahmed@example.com'
            },
            shippingAddress: {
              governorate: 'القاهرة',
              city: 'مدينة نصر',
              region: 'المنطقة السادسة',
              addressDetails: 'شارع حسن المأمون، عمارة 15'
            },
            subtotal: 3750,
            discount: 0,
            shippingCost: 0,
            tax: 0,
            total: 3750
          },
          {
            id: 'ord-10244',
            orderNumber: '#10244',
            createdAt: '2025-08-15T16:20:00Z',
            status: 'cancelled',
            paymentStatus: 'refunded',
            paymentMethod: 'credit_card',
            shippingMethod: 'standard',
            items: [
              {
                id: 'item-5',
                productId: 'p-smartwatch',
                slug: 'smartwatch-pro',
                name: 'ساعة ذكية برو',
                image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                price: 5990,
                quantity: 1
              }
            ],
            customer: {
              name: 'أحمد عبد الناصر',
              phone: '01017865860',
              email: 'ahmed@example.com'
            },
            shippingAddress: {
              governorate: 'القاهرة',
              city: 'مدينة نصر',
              region: 'المنطقة السادسة',
              addressDetails: 'شارع حسن المأمون، عمارة 15'
            },
            subtotal: 5990,
            discount: 0,
            shippingCost: 0,
            tax: 0,
            total: 5990
          }
        ]
        
        this.addresses = [
          {
            id: 'addr-1',
            title: 'المنزل',
            recipientName: 'أحمد عبد الناصر',
            phone: '01017865860',
            street: 'شارع حسن المأمون، عمارة 15، شقة 42',
            city: 'مدينة نصر',
            governorate: 'القاهرة',
            isDefault: true
          },
          {
            id: 'addr-2',
            title: 'العمل',
            recipientName: 'أحمد عبد الناصر',
            phone: '01017865860',
            street: 'مبنى القرية الذكية، B123',
            city: '6 أكتوبر',
            governorate: 'الجيزة',
            isDefault: false
          }
        ]
        
        this.wishlist = [
          {
            id: 'p1',
            slug: 'product-p1',
            name: 'عطر رجالي فاخر',
            price: 3499,
            rating: 4.9,
            reviewsCount: 348,
            images: [{ id: 'img-p1', url: 'https://images.unsplash.com/photo-1523293115678-d29062758dc4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', alt: 'عطر رجالي فاخر' }],
            currency: 'ج.م',
            stock: 10,
            description: ''
          },
          {
            id: 'p3',
            slug: 'product-p3',
            name: 'حذاء رياضي كلاسيك',
            price: 1799,
            rating: 4.6,
            reviewsCount: 210,
            images: [{ id: 'img-p3', url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', alt: 'حذاء رياضي كلاسيك' }],
            currency: 'ج.م',
            stock: 10,
            description: ''
          },
          {
            id: 'p4',
            slug: 'product-p4',
            name: 'سماعات لاسلكية',
            price: 2499,
            compareAtPrice: 3200,
            rating: 4.7,
            reviewsCount: 98,
            images: [{ id: 'img-p4', url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', alt: 'سماعات لاسلكية' }],
            currency: 'ج.م',
            stock: 10,
            description: '',
            badge: 'خصم 34%'
          }
        ]
        
      } catch (err: any) {
        this.error = err.message || 'حدث خطأ أثناء جلب البيانات'
      } finally {
        this.isLoading = false
      }
    },
    
    async updateProfile(updates: Partial<UserProfile>) {
      this.isSaving = true
      this.saveError = null
      
      try {
        await new Promise((resolve, reject) => {
          setTimeout(() => {
            // Simulate 10% chance of failure
            if (Math.random() < 0.1) {
              reject(new Error('فشل تحديث البيانات، يرجى المحاولة مرة أخرى'))
            } else {
              resolve(true)
            }
          }, 1000)
        })
        
        if (this.profile) {
          this.profile = { ...this.profile, ...updates }
        }
      } catch (err: any) {
        this.saveError = err.message || 'حدث خطأ أثناء حفظ البيانات'
        throw err
      } finally {
        this.isSaving = false
      }
    },
    
    async uploadAvatar(file: File) {
      this.isUploading = true
      this.saveError = null
      
      try {
        // Mock API upload
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        const avatarUrl = URL.createObjectURL(file)
        if (this.profile) {
          this.profile.avatarUrl = avatarUrl
        }
      } catch (err: any) {
        this.saveError = err.message || 'حدث خطأ أثناء رفع الصورة'
        throw err
      } finally {
        this.isUploading = false
      }
    },
    
    logout() {
      this.isLoggedIn = false
      this.profile = null
      this.recentOrders = []
      this.addresses = []
      this.wishlist = []
    }
  }
})

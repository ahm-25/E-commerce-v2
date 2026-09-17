import { defineStore } from 'pinia'

export interface AccountSettings {
  language: 'ar' | 'en'
  currency: 'EGP' | 'USD'
  region: string
  theme: 'light' | 'dark' | 'system'
  reducedMotion: boolean
  orderUpdates: boolean
  shippingUpdates: boolean
  promotions: boolean
  newsletter: boolean
  pushNotifications: boolean
  personalizedRecommendations: boolean
  browsingPersonalization: boolean
  marketingConsent: boolean
}

interface SettingsState {
  settings: AccountSettings | null
  isLoading: boolean
  isSaving: boolean
  error: string | null
  success: boolean
}

export const useSettingsStore = defineStore('settings', {
  state: (): SettingsState => ({
    settings: null,
    isLoading: false,
    isSaving: false,
    error: null,
    success: false
  }),

  actions: {
    async fetchSettings() {
      this.isLoading = true
      this.error = null
      
      try {
        // TODO: Replace with actual API call
        // const response = await fetch('/api/account/settings')
        // const data = await response.json()
        
        // Mock API delay
        await new Promise(resolve => setTimeout(resolve, 800))
        
        // Mock Data
        this.settings = {
          language: 'ar',
          currency: 'EGP',
          region: 'مصر',
          theme: 'system',
          reducedMotion: false,
          orderUpdates: true,
          shippingUpdates: true,
          promotions: false,
          newsletter: true,
          pushNotifications: false,
          personalizedRecommendations: true,
          browsingPersonalization: true,
          marketingConsent: false
        }
      } catch (err: any) {
        this.error = err.message || 'حدث خطأ أثناء جلب الإعدادات'
      } finally {
        this.isLoading = false
      }
    },

    async updateSettings(newSettings: Partial<AccountSettings>) {
      if (!this.settings) return
      
      this.isSaving = true
      this.error = null
      this.success = false
      
      try {
        // TODO: Replace with actual API call
        // await fetch('/api/account/settings', {
        //   method: 'PATCH',
        //   body: JSON.stringify(newSettings)
        // })
        
        // Mock API delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Update local state
        this.settings = { ...this.settings, ...newSettings }
        this.success = true
        
        // Reset success flag after 3 seconds
        setTimeout(() => {
          this.success = false
        }, 3000)
        
      } catch (err: any) {
        this.error = err.message || 'حدث خطأ أثناء حفظ الإعدادات'
        throw err
      } finally {
        this.isSaving = false
      }
    },
    
    resetChanges() {
      // Re-fetch to reset to original data
      this.fetchSettings()
    }
  }
})

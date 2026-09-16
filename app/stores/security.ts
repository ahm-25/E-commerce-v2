import { defineStore } from 'pinia'
import type { ActiveSession, ChangePasswordPayload } from '~/types/security'

export const useSecurityStore = defineStore('security', {
  state: () => ({
    sessions: [] as ActiveSession[],
    isLoading: false,
    isSaving: false,
    error: null as string | null,
    saveError: null as string | null,
    isSuccess: false,
  }),
  
  actions: {
    async fetchSessions() {
      this.isLoading = true
      this.error = null
      
      try {
        // Mock API Call delay
        await new Promise(resolve => setTimeout(resolve, 800))
        
        this.sessions = [
          {
            id: 'sess-1',
            deviceName: 'Windows PC',
            browser: 'Chrome',
            os: 'Windows 11',
            location: 'القاهرة، مصر',
            lastActive: new Date().toISOString(),
            isCurrentSession: true
          },
          {
            id: 'sess-2',
            deviceName: 'iPhone 13 Pro',
            browser: 'Safari',
            os: 'iOS 16',
            location: 'الإسكندرية، مصر',
            lastActive: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            isCurrentSession: false
          },
          {
            id: 'sess-3',
            deviceName: 'MacBook Pro',
            browser: 'Safari',
            os: 'macOS Sonoma',
            location: 'الجيزة، مصر',
            lastActive: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            isCurrentSession: false
          }
        ]
      } catch (err: any) {
        this.error = err.message || 'حدث خطأ أثناء جلب الجلسات'
      } finally {
        this.isLoading = false
      }
    },
    
    async changePassword(payload: ChangePasswordPayload) {
      this.isSaving = true
      this.saveError = null
      this.isSuccess = false
      
      try {
        // Mock API Call delay
        await new Promise((resolve, reject) => {
          setTimeout(() => {
            if (payload.currentPassword === 'wrong') {
              reject(new Error('كلمة المرور الحالية غير صحيحة'))
            } else {
              resolve(true)
            }
          }, 1500)
        })
        
        this.isSuccess = true
      } catch (err: any) {
        this.saveError = err.message || 'حدث خطأ أثناء تغيير كلمة المرور'
        throw err
      } finally {
        this.isSaving = false
      }
    },
    
    async revokeSession(sessionId: string) {
      this.isSaving = true
      this.saveError = null
      
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        this.sessions = this.sessions.filter(s => s.id !== sessionId)
      } catch (err: any) {
        this.saveError = err.message || 'حدث خطأ أثناء تسجيل الخروج من الجلسة'
        throw err
      } finally {
        this.isSaving = false
      }
    },
    
    async revokeAllSessions() {
      this.isSaving = true
      this.saveError = null
      
      try {
        await new Promise(resolve => setTimeout(resolve, 1500))
        this.sessions = this.sessions.filter(s => s.isCurrentSession)
      } catch (err: any) {
        this.saveError = err.message || 'حدث خطأ أثناء تسجيل الخروج من الأجهزة الأخرى'
        throw err
      } finally {
        this.isSaving = false
      }
    }
  }
})

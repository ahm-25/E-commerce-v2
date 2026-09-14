import { defineStore } from 'pinia';
import type { User, LoginPayload, RegisterPayload } from '~/types/auth';
import { authService } from '~/services/authService';
import { useShopStore } from '~/stores/useStore';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  loading: boolean;
  error: string | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    accessToken: null,
    loading: false,
    error: null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.accessToken && !!state.user,
  },
  actions: {
    setLoading(value: boolean) {
      this.loading = value;
    },
    setError(value: string | null) {
      this.error = value;
    },
    async login(payload: LoginPayload) {
      this.setLoading(true);
      this.setError(null);
      try {
        const response = await authService.login(payload);
        this.user = response.user;
        this.accessToken = response.accessToken;
        
        const mainStore = useShopStore();
        if (mainStore.mergeCart) {
          mainStore.mergeCart();
        }
        
        return true;
      } catch (err: any) {
        this.setError(err.message || 'حدث خطأ أثناء تسجيل الدخول');
        return false;
      } finally {
        this.setLoading(false);
      }
    },
    async register(payload: RegisterPayload) {
      this.setLoading(true);
      this.setError(null);
      try {
        const response = await authService.register(payload);
        this.user = response.user;
        this.accessToken = response.accessToken;
        return true;
      } catch (err: any) {
        this.setError(err.message || 'حدث خطأ أثناء إنشاء الحساب');
        return false;
      } finally {
        this.setLoading(false);
      }
    },
    async loginWithGoogle() {
      this.setLoading(true);
      this.setError(null);
      try {
        const response = await authService.loginWithGoogle();
        this.user = response.user;
        this.accessToken = response.accessToken;
        
        const mainStore = useShopStore();
        if (mainStore.mergeCart) {
          mainStore.mergeCart();
        }
        
        return true;
      } catch (err: any) {
        this.setError(err.message || 'حدث خطأ أثناء تسجيل الدخول بواسطة جوجل');
        return false;
      } finally {
        this.setLoading(false);
      }
    },
    async logout() {
      this.setLoading(true);
      try {
        await authService.logout();
        this.user = null;
        this.accessToken = null;
      } catch (err: any) {
        console.error(err);
      } finally {
        this.setLoading(false);
      }
    },
    async forgotPassword(email: string) {
      this.setLoading(true);
      this.setError(null);
      try {
        await authService.forgotPassword(email);
        return true;
      } catch (err: any) {
        this.setError(err.message || 'حدث خطأ أثناء إرسال رابط استعادة كلمة المرور');
        return false;
      } finally {
        this.setLoading(false);
      }
    },
    async resetPassword(password: string) {
      this.setLoading(true);
      this.setError(null);
      try {
        await authService.resetPassword(password);
        return true;
      } catch (err: any) {
        this.setError(err.message || 'حدث خطأ أثناء تغيير كلمة المرور');
        return false;
      } finally {
        this.setLoading(false);
      }
    }
  }
});

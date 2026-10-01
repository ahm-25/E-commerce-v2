import { defineStore } from 'pinia';
import type { User, LoginPayload, RegisterPayload } from '~/types/auth';
import { authService } from '~/services/authService';
import { useShopStore } from '~/stores/useStore';
import { useAccountStore } from '~/stores/account';

const TOKEN_COOKIE = 'auth_token';
const USER_COOKIE = 'auth_user';
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days (with "remember me")

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
    // Rehydrate the session from cookies (runs on server and client via middleware)
    restoreSession() {
      if (this.accessToken && this.user) return;
      const token = useCookie<string | null>(TOKEN_COOKIE);
      const user = useCookie<User | null>(USER_COOKIE);
      if (token.value && user.value) {
        this.accessToken = token.value;
        this.user = user.value;
      }
    },
    setSession(user: User, accessToken: string, remember = true) {
      this.user = user;
      this.accessToken = accessToken;
      const maxAge = remember ? SESSION_MAX_AGE : undefined;
      useCookie<string | null>(TOKEN_COOKIE, { maxAge, sameSite: 'lax' }).value = accessToken;
      useCookie<User | null>(USER_COOKIE, { maxAge, sameSite: 'lax' }).value = user;
    },
    clearSession() {
      this.user = null;
      this.accessToken = null;
      useCookie(TOKEN_COOKIE).value = null;
      useCookie(USER_COOKIE).value = null;
    },
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
        this.setSession(response.user, response.accessToken, payload.rememberMe ?? false);
        
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
        this.setSession(response.user, response.accessToken);
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
        this.setSession(response.user, response.accessToken);
        
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
      } catch (err: any) {
        console.error(err);
      } finally {
        // Always drop the local session, even if the API call failed
        this.clearSession();
        useAccountStore().$reset();
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

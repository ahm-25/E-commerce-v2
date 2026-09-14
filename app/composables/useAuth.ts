import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/stores/auth';
import type { LoginPayload, RegisterPayload } from '~/types/auth';

export const useAuth = () => {
  const authStore = useAuthStore();
  const { user, accessToken, loading, error, isAuthenticated } = storeToRefs(authStore);

  const login = async (payload: LoginPayload) => {
    return await authStore.login(payload);
  };

  const register = async (payload: RegisterPayload) => {
    return await authStore.register(payload);
  };

  const loginWithGoogle = async () => {
    return await authStore.loginWithGoogle();
  };

  const logout = async () => {
    await authStore.logout();
  };

  const forgotPassword = async (email: string) => {
    return await authStore.forgotPassword(email);
  };

  const resetPassword = async (password: string) => {
    return await authStore.resetPassword(password);
  };
  
  const clearError = () => {
    authStore.setError(null);
  };

  return {
    user,
    accessToken,
    loading,
    error,
    isAuthenticated,
    login,
    register,
    loginWithGoogle,
    logout,
    forgotPassword,
    resetPassword,
    clearError
  };
};

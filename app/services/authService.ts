import type { LoginPayload, RegisterPayload, User } from '~/types/auth';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const mockUser: User = {
  id: 'usr_123',
  name: 'أحمد محمود',
  email: 'user@example.com',
  phone: '01012345678',
  avatar: 'https://i.pravatar.cc/150?u=user123'
};

export const authService = {
  async login(payload: LoginPayload): Promise<{ user: User; accessToken: string }> {
    await delay(1000);
    
    // Mock simple validation
    if (payload.identifier === 'wrong@example.com' || payload.password === 'wrongpassword') {
      throw new Error('البريد الإلكتروني أو كلمة المرور غير صحيحة');
    }

    return {
      user: mockUser,
      accessToken: 'mock_token_abc123'
    };
  },

  async register(payload: RegisterPayload): Promise<{ user: User; accessToken: string }> {
    await delay(1200);

    if (payload.email === 'exist@example.com') {
      throw new Error('البريد الإلكتروني مسجل بالفعل');
    }

    return {
      user: {
        id: 'usr_124',
        name: payload.name,
        email: payload.email,
        phone: payload.phone
      },
      accessToken: 'mock_token_def456'
    };
  },

  async loginWithGoogle(): Promise<{ user: User; accessToken: string }> {
    await delay(800);
    return {
      user: {
        ...mockUser,
        name: 'Google User',
        email: 'google@example.com'
      },
      accessToken: 'mock_token_google789'
    };
  },

  async logout(): Promise<void> {
    await delay(500);
  },

  async getCurrentUser(): Promise<User | null> {
    await delay(600);
    return mockUser;
  },

  async forgotPassword(email: string): Promise<void> {
    await delay(1000);
    // Don't leak if user exists or not, just resolve successfully.
  },

  async resetPassword(password: string): Promise<void> {
    await delay(1000);
  }
};

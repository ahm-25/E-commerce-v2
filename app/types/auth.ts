export interface LoginPayload {
  identifier: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterPayload {
  name: string;
  phone: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  acceptedTerms: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
}

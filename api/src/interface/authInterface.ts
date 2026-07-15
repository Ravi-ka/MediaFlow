export interface RegisterUserRequestInterface {
  email: string;
  password: string;
  subscriptionTier: 'FREE' | 'PREMIUM';
}

export interface LoginUserRequestInterface {
  email: string;
  password: string;
}

export interface UserRecord {
  id: string;
  email: string;
  passwordHash: string;
  subscriptionTier: 'FREE' | 'PREMIUM';
}
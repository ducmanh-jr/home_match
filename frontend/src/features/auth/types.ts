export type UserRole = "renter" | "owner";

export interface LoginFormData {
  email: string;
  password: string;
  role: UserRole;
  rememberMe?: boolean;
}

export interface AuthUser {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  avatarUrl?: string;
}

export interface AuthResponse {
  user: AuthUser;
  token: string;
  expiresIn: number;
}


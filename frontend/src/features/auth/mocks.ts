import type { AuthResponse, LoginFormData, UserRole } from "./types";

export const MOCK_USERS: Record<UserRole, AuthResponse> = {
  renter: {
    user: {
      id: "usr_renter_001",
      email: "nguoithue@homematch.vn",
      fullName: "Nguyễn Văn Thuê",
      role: "renter",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    },
    token: "mock_jwt_token_renter_eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
    expiresIn: 86400,
  },
  owner: {
    user: {
      id: "usr_owner_001",
      email: "chunha@homematch.vn",
      fullName: "Trần Thị Chủ Nhà",
      role: "owner",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    },
    token: "mock_jwt_token_owner_eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
    expiresIn: 86400,
  },
};

export async function mockLogin(data: LoginFormData): Promise<AuthResponse> {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 600));

  if (!data.email || !data.password) {
    throw new Error("Vui lòng nhập đầy đủ email và mật khẩu.");
  }

  if (data.password.length < 6) {
    throw new Error("Mật khẩu phải có ít nhất 6 ký tự.");
  }

  const baseResponse = MOCK_USERS[data.role];
  return {
    ...baseResponse,
    user: {
      ...baseResponse.user,
      email: data.email,
    },
  };
}

export async function mockGoogleLogin(role: UserRole): Promise<AuthResponse> {
  await new Promise((resolve) => setTimeout(resolve, 800));
  const baseResponse = MOCK_USERS[role];
  return {
    ...baseResponse,
    user: {
      ...baseResponse.user,
      email: `${role}@gmail.com`,
    },
  };
}


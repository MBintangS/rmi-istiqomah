import { apiGet, apiPost, apiPut } from "@/lib/api";
import type { AuthUser, LoginPayload, LoginResult, ProfileUpdatePayload } from "@/types/api";

export async function loginAdmin(payload: LoginPayload): Promise<LoginResult> {
  const response = await apiPost<LoginResult>("/auth/login", payload);
  return response.data;
}

export async function fetchAuthMe(): Promise<AuthUser> {
  const response = await apiGet<AuthUser>("/auth/me");
  return response.data;
}

export async function updateMyProfile(payload: ProfileUpdatePayload): Promise<LoginResult> {
  const response = await apiPut<LoginResult>("/auth/me", payload);
  return response.data;
}

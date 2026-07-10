import { apiGet, apiPost } from "@/lib/api";
import type { AuthUser, LoginPayload, LoginResult } from "@/types/api";

export async function loginAdmin(payload: LoginPayload): Promise<LoginResult> {
  const response = await apiPost<LoginResult>("/auth/login", payload);
  return response.data;
}

export async function fetchAuthMe(): Promise<AuthUser> {
  const response = await apiGet<AuthUser>("/auth/me");
  return response.data;
}

import { apiDelete, apiGet, apiPost, apiPut } from "@/lib/api";
import type { AdminUserListItem, UserCreatePayload, UserUpdatePayload } from "@/types/api";

export async function fetchUsersList(): Promise<AdminUserListItem[]> {
  const response = await apiGet<AdminUserListItem[]>("/users");
  return response.data;
}

export async function createUser(payload: UserCreatePayload) {
  return apiPost<AdminUserListItem>("/users", payload);
}

export async function updateUser(id: string, payload: UserUpdatePayload) {
  return apiPut<AdminUserListItem>(`/users/${id}`, payload);
}

export async function deleteUser(id: string) {
  return apiDelete<{ id: string }>(`/users/${id}`);
}

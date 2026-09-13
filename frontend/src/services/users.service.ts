import { apiDelete, apiGet, apiPost, apiPut } from "@/lib/api";
import type {
  ActivateInvitationPayload,
  AdminUserListItem,
  UserCreatePayload,
  UserUpdatePayload,
} from "@/types/api";

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

export async function resendUserInvitation(id: string) {
  return apiPost<AdminUserListItem>(`/users/${id}/resend-invitation`);
}

export async function activateUserInvitation(payload: ActivateInvitationPayload) {
  return apiPost<{ email: string }, ActivateInvitationPayload>("/auth/activate", payload);
}

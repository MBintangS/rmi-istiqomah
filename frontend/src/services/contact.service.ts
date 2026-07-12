import { apiGet, apiPost } from "@/lib/api";
import type { ContactFormValues } from "@/lib/contact-schema";
import type { ContactMessageListItem, ContactSubmitData } from "@/types/api";

export async function fetchContactMessages(): Promise<ContactMessageListItem[]> {
  const response = await apiGet<ContactMessageListItem[]>("/contact");
  return response.data;
}

export async function submitContact(payload: ContactFormValues) {
  return apiPost<ContactSubmitData>("/contact", payload);
}

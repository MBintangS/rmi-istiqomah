import { apiPost } from "@/lib/api";
import type { ContactFormValues } from "@/lib/contact-schema";
import type { ContactSubmitData } from "@/types/api";

export async function submitContact(payload: ContactFormValues) {
  return apiPost<ContactSubmitData>("/contact", payload);
}

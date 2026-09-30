const TOKEN_KEY = "rmi_admin_token";
const SESSION_CLEARED = "rmi-auth-cleared";

export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setAuthToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearAuthToken(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
  window.dispatchEvent(new Event(SESSION_CLEARED));
}

export function onAuthSessionCleared(listener: () => void) {
  window.addEventListener(SESSION_CLEARED, listener);
  return () => window.removeEventListener(SESSION_CLEARED, listener);
}

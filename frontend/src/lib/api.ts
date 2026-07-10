import axios, { type AxiosError, isAxiosError } from "axios";
import { getAuthToken } from "@/lib/auth-token";
import type { ApiErrorResponse, ApiSuccessResponse } from "@/types/api";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15_000,
});

api.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export class ApiRequestError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public code?: string,
    public details?: unknown,
  ) {
    super(message);
    this.name = "ApiRequestError";
  }
}

function isApiErrorResponse(data: unknown): data is ApiErrorResponse {
  return (
    typeof data === "object" &&
    data !== null &&
    "success" in data &&
    data.success === false &&
    "error" in data
  );
}

export function getApiErrorMessage(error: unknown, fallback = "Terjadi kesalahan"): string {
  if (error instanceof ApiRequestError) {
    return error.message;
  }

  if (isAxiosError(error)) {
    const data = error.response?.data;

    if (isApiErrorResponse(data)) {
      return data.error.message;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
}

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    if (error.response?.data?.success === false) {
      const { code, message, details } = error.response.data.error;
      return Promise.reject(new ApiRequestError(message, error.response.status, code, details));
    }

    if (error.code === "ECONNABORTED") {
      return Promise.reject(new ApiRequestError("Permintaan ke server melebihi batas waktu"));
    }

    if (!error.response) {
      return Promise.reject(new ApiRequestError("Tidak dapat terhubung ke server API"));
    }

    return Promise.reject(
      new ApiRequestError(error.message, error.response.status, "HTTP_ERROR"),
    );
  },
);

export async function apiGet<T>(url: string, params?: Record<string, unknown>): Promise<ApiSuccessResponse<T>> {
  const { data } = await api.get<ApiSuccessResponse<T>>(url, { params });
  return data;
}

export async function apiPost<T, B = unknown>(
  url: string,
  body?: B,
): Promise<ApiSuccessResponse<T>> {
  const { data } = await api.post<ApiSuccessResponse<T>>(url, body);
  return data;
}

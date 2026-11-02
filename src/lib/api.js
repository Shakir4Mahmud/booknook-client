import { getToken } from "@/lib/auth-client";


export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiFetch(path, { method = "GET", body, auth = false } = {}) {
  const headers = {};
  if (body) headers["Content-Type"] = "application/json";

  if (auth) {
    const token = await getToken();
    if (!token) {
      const error = new Error("Please login again.");
      error.status = 401;
      throw error;
    }
    headers.Authorization = `Bearer ${token}`;
  }

  let response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new Error("Cannot reach the server. Please try again in a moment.");
  }

  let data = null;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    const error = new Error(data?.message || "Something went wrong.");
    error.status = response.status;
    throw error;
  }

  return data;
}
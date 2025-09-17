// utils/auth.ts
import {jwtDecode} from "jwt-decode";

export interface DecodedToken {
  exp: number;
  [key: string]: unknown;
}

const TOKEN_KEY = "token";

export function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function clearToken() {
    if(typeof window !== 'undefined') {
      localStorage.removeItem(TOKEN_KEY);
    }
}

export function isTokenExpired(token: string): boolean {
  try {
    const decoded: DecodedToken = jwtDecode(token);
    return decoded.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}

export function logout() {
  clearToken();
  window.location.href = "/authenticate"; // redirect to login
}

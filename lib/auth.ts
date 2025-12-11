import type { RootState } from "@/store/index"

export const isAuthenticated = (state: RootState): boolean => {
  return !!state.auth.token && !!state.auth.user
}

export const getAuthToken = (): string | null => {
  if (typeof window === "undefined") return null
  return localStorage.getItem("accessToken")
}

export const getRefreshToken = (): string | null => {
  if (typeof window === "undefined") return null
  return localStorage.getItem("refreshToken")
}

export const saveTokens = (accessToken: string, refreshToken: string): void => {
  if (typeof window === "undefined") return
  localStorage.setItem("accessToken", accessToken)
  localStorage.setItem("refreshToken", refreshToken)
}

export const clearTokens = (): void => {
  if (typeof window === "undefined") return
  localStorage.removeItem("accessToken")
  localStorage.removeItem("refreshToken")
  localStorage.removeItem("user")
}

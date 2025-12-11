"use client"

import { useSelector, useDispatch } from "react-redux"
import { useRouter } from "next/navigation"
import { useLogoutMutation } from "@/store/api/authApi"
import { logout as logoutAction } from "@/store/slices/authSlice"
import { clearTokens } from "@/lib/auth"
import type { RootState } from "@/store/index"

export function useAuth() {
  const dispatch = useDispatch()
  const router = useRouter()
  const user = useSelector((state: RootState) => state.auth.user)
  const token = useSelector((state: RootState) => state.auth.token)
  const isLoading = useSelector((state: RootState) => state.auth.isLoading)
  const error = useSelector((state: RootState) => state.auth.error)
  const [logoutApi] = useLogoutMutation()

  const logout = async () => {
    try {
      await logoutApi().unwrap()
    } catch (err) {
      console.error("[v0] Logout API error:", err)
    } finally {
      dispatch(logoutAction())
      clearTokens()
      router.push("/login")
    }
  }

  return {
    user,
    token,
    isLoading,
    error,
    isAuthenticated: !!user && !!token,
    logout,
  }
}

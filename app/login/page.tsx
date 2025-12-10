"use client"

import { useState } from "react"
import { useDispatch } from "react-redux"
import { useLoginMutation } from "@/store/api/authApi"
import { setUser, setToken, setError } from "@/store/slices/authSlice"
import { LoginForm } from "@/components/auth/login-form"
import { Card } from "@/components/ui/card"

export default function LoginPage() {
  const dispatch = useDispatch()
  const [login, { isLoading, error }] = useLoginMutation()
  const [localError, setLocalError] = useState<string | null>(null)

  const handleLogin = async (email: string, password: string) => {
    try {
      setLocalError(null)
      const result = await login({ email, password }).unwrap()

      dispatch(setUser(result.user))
      dispatch(setToken(result.token))

      window.location.href = "/dashboard"
    } catch (err: any) {
      const errorMessage = err?.data?.message || "Login failed. Please try again."
      setLocalError(errorMessage)
      dispatch(setError(errorMessage))
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-sm">
        {/* Header section */}
        <div className="mb-6 text-center sm:mb-8">
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Survey Platform</h1>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">Sign in to access your surveys</p>
        </div>

        {/* Login card */}
        <Card className="border-border bg-card px-4 py-6 shadow-lg sm:px-6 sm:py-8">
          <LoginForm onSubmit={handleLogin} isLoading={isLoading} error={localError} />
        </Card>

        {/* Sign up link */}
        <p className="mt-4 text-center text-xs text-muted-foreground sm:mt-6 sm:text-sm">
          Don't have an account?{" "}
          <a href="/register" className="font-medium text-primary hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </main>
  )
}

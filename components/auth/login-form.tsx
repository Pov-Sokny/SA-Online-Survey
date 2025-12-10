"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AlertCircle, Eye, EyeOff, Mail, Lock } from "lucide-react"

interface LoginFormProps {
  onSubmit: (email: string, password: string) => Promise<void>
  isLoading: boolean
  error: string | null
}

export function LoginForm({ onSubmit, isLoading, error }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [validationErrors, setValidationErrors] = useState<{
    email?: string
    password?: string
  }>({})

  const validateForm = (): boolean => {
    const errors: typeof validationErrors = {}

    if (!email) {
      errors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Please enter a valid email"
    }

    if (!password) {
      errors.password = "Password is required"
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters"
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateForm()) return

    await onSubmit(email, password)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
      {error && (
        <div className="flex gap-2 rounded-lg border border-destructive/20 bg-destructive/10 p-3 sm:gap-3">
          <AlertCircle className="h-5 w-5 flex-shrink-0 text-destructive" aria-hidden="true" />
          <p className="text-xs text-destructive sm:text-sm">{error}</p>
        </div>
      )}

      <div className="space-y-2">
        <label htmlFor="email" className="text-xs font-medium text-foreground sm:text-sm">
          Email Address
        </label>
        <div className="relative">
          <Mail
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground sm:h-5 sm:w-5"
            aria-hidden="true"
          />
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (validationErrors.email) {
                setValidationErrors((prev) => ({ ...prev, email: undefined }))
              }
            }}
            disabled={isLoading}
            className="pl-9 text-sm placeholder:text-muted-foreground sm:pl-10 sm:text-base"
            autoComplete="email"
          />
        </div>
        {validationErrors.email && <p className="text-xs text-destructive">{validationErrors.email}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="text-xs font-medium text-foreground sm:text-sm">
          Password
        </label>
        <div className="relative">
          <Lock
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground sm:h-5 sm:w-5"
            aria-hidden="true"
          />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              if (validationErrors.password) {
                setValidationErrors((prev) => ({ ...prev, password: undefined }))
              }
            }}
            disabled={isLoading}
            className="pl-9 pr-10 text-sm placeholder:text-muted-foreground sm:pl-10 sm:pr-11 sm:text-base"
            autoComplete="current-password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-0.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:cursor-not-allowed"
            disabled={isLoading}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" /> : <Eye className="h-4 w-4 sm:h-5 sm:w-5" />}
          </button>
        </div>
        {validationErrors.password && <p className="text-xs text-destructive">{validationErrors.password}</p>}
      </div>

      <div className="flex flex-col gap-2 pt-1 sm:flex-row sm:items-center sm:justify-between sm:pt-2">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-input bg-background"
            disabled={isLoading}
            aria-label="Remember me"
          />
          <span className="text-xs text-muted-foreground sm:text-sm">Remember me</span>
        </label>
        <a href="#" className="text-xs font-medium text-primary hover:underline sm:text-sm">
          Forgot password?
        </a>
      </div>

      <Button type="submit" disabled={isLoading} size="lg" className="w-full">
        {isLoading ? (
          <div className="flex items-center gap-2">
            <span className="inline-block h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            <span>Signing in...</span>
          </div>
        ) : (
          "Sign In"
        )}
      </Button>
    </form>
  )
}

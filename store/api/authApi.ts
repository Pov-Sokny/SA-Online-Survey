'use client'

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query"

interface LoginRequest {
  email: string
  password: string
}

interface LoginResponse {
  accessToken: string
  refreshToken: string
  user: {
    id: string
    email: string
    name: string
  }
}

interface RefreshTokenRequest {
  refreshToken: string
}

interface RefreshTokenResponse {
  accessToken: string
}

interface AuthError {
  message: string
  status: number
}

const baseQueryWithAuth: BaseQueryFn<FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  // Get token from localStorage
  const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null

  // Add Authorization header if token exists
  if (typeof args === "string") {
    args = { url: args }
  }

  if (token) {
    args.headers = {
      ...args.headers,
      Authorization: `Bearer ${token}`,
    }
  }

  // Make the request with base URL pointing to Spring Boot backend
  const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "https://c7174dfe8c44.ngrok-free.app/api/v1",
  })

  const result = await baseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 401) {
    const refreshToken = typeof window !== "undefined" ? localStorage.getItem("refreshToken") : null

    if (refreshToken) {
      try {
        // Attempt to refresh the token
        const refreshResult = await baseQuery(
          {
            url: "/auth/refresh",
            method: "POST",
            body: { refreshToken },
          },
          api,
          extraOptions,
        )

        if (refreshResult.data) {
          const newAccessToken = (refreshResult.data as RefreshTokenResponse).accessToken
          localStorage.setItem("accessToken", newAccessToken)

          // Retry the original request with new token
          if (typeof args === "string") {
            args = { url: args }
          }
          args.headers = {
            ...args.headers,
            Authorization: `Bearer ${newAccessToken}`,
          }

          return baseQuery(args, api, extraOptions)
        } else {
          // Refresh failed, logout user
          localStorage.removeItem("accessToken")
          localStorage.removeItem("refreshToken")
        }
      } catch (err) {
        console.error("[v0] Token refresh failed:", err)
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
      }
    }
  }

  return result
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation<LoginResponse, LoginRequest & { name: string }>({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: credentials,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
    refreshToken: builder.mutation<RefreshTokenResponse, RefreshTokenRequest>({
      query: (body) => ({
        url: "/auth/refresh",
        method: "POST",
        body,
      }),
    }),
  }),
})

export const { useLoginMutation, useRegisterMutation, useLogoutMutation, useRefreshTokenMutation } = authApi

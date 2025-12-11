import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { authApi } from "../api/authApi"

interface AuthUser {
  id: string
  email: string
  name: string
}

interface AuthState {
  user: AuthUser | null
  token: string | null
  isLoading: boolean
  error: string | null
  isInitialized: boolean
}

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
  isInitialized: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthUser>) => {
      state.user = action.payload
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    initializeAuth: (state) => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("accessToken")
        const userJson = localStorage.getItem("user")
        if (token && userJson) {
          state.token = token
          state.user = JSON.parse(userJson)
        }
      }
      state.isInitialized = true
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.error = null
      if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        localStorage.removeItem("user")
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, { payload }) => {
        state.user = payload.user
        state.token = payload.accessToken
        state.error = null
        if (typeof window !== "undefined") {
          localStorage.setItem("accessToken", payload.accessToken)
          localStorage.setItem("refreshToken", payload.refreshToken)
          localStorage.setItem("user", JSON.stringify(payload.user))
        }
      })
      .addMatcher(authApi.endpoints.login.matchRejected, (state, { payload }) => {
        state.error = (payload as any)?.data?.message || "Login failed"
      })
  },
})

export const { setUser, setToken, setLoading, setError, initializeAuth, logout } = authSlice.actions
export default authSlice.reducer

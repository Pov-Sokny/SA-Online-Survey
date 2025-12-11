"use client"

import { useRouter } from "next/navigation"
import { useSelector, useDispatch } from "react-redux"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { RootState } from "@/store/index"
import { logout } from "@/store/slices/authSlice"

export default function CreatePage() {
  const router = useRouter()
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.auth?.user)

  const handleLogout = () => {
    dispatch(logout())
    router.push("/login")
  }

  if (!user?.id) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-4">
        <Card className="max-w-md w-full p-6 sm:p-8 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">Access Denied</h2>
          <p className="text-muted-foreground mb-6">Please log in to access this page.</p>
          <Button onClick={() => router.push("/login")} size="lg" className="w-full">
            Go to Login
          </Button>
        </Card>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Create Survey</h1>
            <p className="text-muted-foreground mt-1 text-sm sm:text-base">Welcome, {user.name}</p>
          </div>
          <Button variant="outline" onClick={handleLogout} size="sm" className="text-xs sm:text-sm bg-transparent">
            Logout
          </Button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Card className="p-6 sm:p-8">
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-4">Create New Survey</h2>
            <p className="text-muted-foreground mb-8 text-sm sm:text-base">
              Start building your survey by adding questions and customizing the settings.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <Card className="p-6 border-2 border-dashed border-border hover:border-primary transition-colors cursor-pointer bg-muted/50">
                <div className="text-4xl mb-4">📋</div>
                <h3 className="font-semibold text-foreground mb-2">Basic Survey</h3>
                <p className="text-sm text-muted-foreground">
                  Create a simple survey with multiple choice and text questions.
                </p>
              </Card>
              <Card className="p-6 border-2 border-dashed border-border hover:border-primary transition-colors cursor-pointer bg-muted/50">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="font-semibold text-foreground mb-2">Advanced Survey</h3>
                <p className="text-sm text-muted-foreground">
                  Build complex surveys with conditional logic and branching.
                </p>
              </Card>
            </div>
          </div>
        </Card>
      </div>
    </main>
  )
}

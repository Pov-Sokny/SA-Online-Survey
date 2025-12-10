import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Validate input
    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 })
    }

    // TODO: Implement actual authentication logic with your database
    // For now, return a mock response
    if (email === "demo@survey.com" && password === "password123") {
      return NextResponse.json({
        token: "mock-token-" + Date.now(),
        user: {
          id: "1",
          email,
          name: "Demo User",
        },
      })
    }

    return NextResponse.json({ message: "Invalid email or password" }, { status: 401 })
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

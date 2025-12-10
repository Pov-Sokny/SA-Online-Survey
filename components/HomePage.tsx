"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2, BarChart3, Zap, Users } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">S</span>
            </div>
            <span className="font-bold text-lg hidden sm:inline">Survey Pro</span>
          </div>
          <div className="flex items-center gap-4 sm:gap-8">
            <Link href="/login" className="text-sm font-medium hover:text-primary transition-colors">
              Log in
            </Link>
            <Link href="/login">
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 sm:space-y-8 animate-fade-in">
            <div className="inline-block">
              <span className="px-3 py-1 bg-primary/10 text-primary text-xs sm:text-sm font-semibold rounded-full">
                ✨ Trusted by 10,000+ teams
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
              Get to know your customers with surveys
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed">
              Create beautiful, engaging surveys that deliver real insights. Collect feedback, understand your audience,
              and make data-driven decisions with ease.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/login">
                <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 group">
                  Start Free Trial
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                View Demo
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 pt-4">
              {[
                { label: "Fast Setup", icon: Zap },
                { label: "Real Analytics", icon: BarChart3 },
                { label: "24/7 Support", icon: Users },
              ].map((feature) => (
                <div key={feature.label} className="flex items-center gap-2">
                  <feature.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                  <span className="text-sm sm:text-base text-muted-foreground">{feature.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative h-96 sm:h-full min-h-96 animate-fade-in-up">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl animate-pulse-slow" />
            <div className="absolute inset-0 rounded-2xl bg-card border border-border shadow-lg overflow-hidden p-6 sm:p-8 flex flex-col justify-center">
              <div className="space-y-4">
                <div className="h-3 bg-primary/20 rounded w-3/4 animate-shimmer" />
                <div className="h-3 bg-primary/20 rounded w-4/5 animate-shimmer" style={{ animationDelay: "0.1s" }} />
                <div className="h-3 bg-primary/20 rounded w-2/3 animate-shimmer" style={{ animationDelay: "0.2s" }} />
              </div>
              <div className="mt-8 space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 animate-slide-in-right"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    <div className="h-2 bg-muted rounded w-24" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
              Powerful features for modern surveys
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to create, distribute, and analyze surveys.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: BarChart3,
                title: "Advanced Analytics",
                description: "Real-time insights and detailed reporting to understand your data better.",
              },
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Optimized performance ensures your surveys load instantly on any device.",
              },
              {
                icon: Users,
                title: "Team Collaboration",
                description: "Work together seamlessly with built-in collaboration and sharing features.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 sm:p-8 bg-card rounded-xl border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 animate-fade-in-up group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <feature.icon className="w-8 h-8 sm:w-10 sm:h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-8 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            Ready to collect better feedback?
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground">
            Join thousands of companies already using Survey Pro to understand their customers.
          </p>
          <Link href="/login">
            <Button size="lg" className="bg-primary hover:bg-primary/90 group">
              Start Your Free Trial
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/50 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs">S</span>
            </div>
            <span className="font-semibold text-sm">Survey Pro</span>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground">© 2025 Survey Pro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

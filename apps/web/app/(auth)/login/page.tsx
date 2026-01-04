import { LoginForm } from "@/components/auth/login-form"
import Image from "next/image"

export default function LoginPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden lg:block">
        <Image
          src="/modern-dashboard.png"
          alt="Login"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <p className="text-sm text-muted-foreground">
            Welcome to Apsara DevKit - Modern web application template
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center p-6">
        <LoginForm
          showRememberMe={true}
          showForgotPassword={true}
          showSocialLogin={true}
        />
      </div>
    </div>
  )
}

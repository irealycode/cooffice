import { GalleryVerticalEnd } from "lucide-react"

import { LoginForm } from "@/components/login-form"
import Logo from "@/components/logo"
import { Card } from "@/components/ui/card"

export default function LoginPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <a href="/" className="absolute top-6 md:left-6 flex items-center gap-2 font-medium">
        <Logo font="3xl" width="9" />
      </a>
      <div className="w-full max-w-sm">
        <Card className="px-4 py-8" >
          <LoginForm header="Admin panel." nosignup noforgot />
        </Card>
      </div>
    </div>
  )
}

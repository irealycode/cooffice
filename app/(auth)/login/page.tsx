import { GalleryVerticalEnd } from "lucide-react"

import { LoginForm } from "@/components/login-form"
import Logo from "@/components/logo"

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="/" className="flex items-center gap-2 font-medium">
            <Logo font="3xl" width="9" />
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:flex flex-col items-center justify-center">
        
        <img
          src="/assets/images/office3.jpg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale z-2"
        />
        {/* <div className="absolute top-4"> */}
          {/* <Logo font="[28px]" width="12"  /> */}
        {/* </div> */}
        {/* <h1 className="text-7xl font-bold absolute top-4 text-white">Welcome.</h1> */}
      </div>
    </div>
  )
}

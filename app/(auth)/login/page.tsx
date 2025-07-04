"use client"
import { GalleryVerticalEnd } from "lucide-react"

import { LoginForm } from "@/components/login-form"
import Logo from "@/components/logo"
import { useState } from "react"
import { removeWhitespaces } from "@/hooks/imports"
import axios from "axios"
import { ip, port } from "@/hooks/hosts"
import { MessagePop } from "@/components/message-pop"

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [message,setMessage] = useState<null|{type:"good" | "error" | "warning",message:string}>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const data = {
      email: removeWhitespaces(formData.email) ,
      password: removeWhitespaces(formData.password) ,
    }
    axios.post(`http://${ip}:${port}/api/v1/auth/users/login`,data).then((res)=>{
      console.log(res.data)
      setMessage({type:"good",message:"please check your email for confirmation"})
      setMessage(null)
      localStorage.setItem('token',res.data.token)
      // localStorage.setItem('token',res.data.token)
      window.location.assign('/')
    }).catch((res)=>{
      console.log(res.status)
      console.log("body:",res.response.data)
      setMessage({type:"error",message:res.response.data.message??"Wrong Credentials !"})
      setTimeout(()=>{
        setMessage(null)
      },5000)
    })
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }


  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      {message && <MessagePop type={message.type} message={message.message} />}
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="/" className="flex items-center gap-2 font-medium">
            <Logo font="3xl" width="9" />
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm onSubmit={handleSubmit} handleInputChange={handleInputChange} formData={formData} />
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

"use client"

import { LoginForm } from "@/components/login-form"
import Logo from "@/components/logo"
import { Card } from "@/components/ui/card"
import { removeWhitespaces } from "@/hooks/imports"
import axios from "axios"
import { ip, port } from "@/hooks/hosts"
import { MessagePop } from "@/components/message-pop"
import { useState } from "react"

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
    axios.post(`http://${ip}:${port}/api/v1/auth/staff/login`,data).then((res)=>{
      console.log(res.data)
      setMessage({type:"good",message:"please check your email for confirmation"})
      setMessage(null)
      localStorage.setItem('staff_token',res.data.token)
      localStorage.setItem('role',res.data.role)
      if (res.data.role === "STAFF") {
        window.location.assign('/staff')
      }else{
        window.location.assign('/')
      }
      // localStorage.setItem('token',res.data.token)
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
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      {message && <MessagePop type={message.type} message={message.message} />}
      <a href="/" className="absolute top-6 md:left-6 flex items-center gap-2 font-medium">
        <Logo font="3xl" width="9" />
      </a>
      <div className="w-full max-w-sm">
        <Card className="px-4 py-8" >
          <LoginForm formData={formData} onSubmit={handleSubmit} handleInputChange={handleInputChange} header="Admin panel." nosignup noforgot />
        </Card>
      </div>
    </div>
  )
}

"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
// import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { useState } from "react"
import Logo from "@/components/logo"

import axios from "axios"
import { ip, port } from "@/hooks/hosts"
import { AlertCircleIcon, CheckCircle2Icon, PopcornIcon } from "lucide-react"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { removeWhitespaces } from "@/hooks/imports"
import { MessagePop } from "@/components/message-pop"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  })
  const [message,setMessage] = useState<null|{type:"good" | "error" | "warning",message:string}>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password.length < 8) {
      setMessage({type:"warning",message:"Password must be 8 characters or longer !"})
      setTimeout(()=>{
        setMessage(null)
      },5000)
      return
    }
    if (formData.password !== formData.confirmPassword) {
      setMessage({type:"warning",message:"Passwords must match !"})
      setTimeout(()=>{
        setMessage(null)
      },5000)
      return
    }
    const data = {
      firstName: removeWhitespaces(formData.firstName) ,
      lastName: removeWhitespaces(formData.lastName) ,
      email: removeWhitespaces(formData.email) ,
      phoneNumber: removeWhitespaces(formData.phoneNumber) ,
      password: removeWhitespaces(formData.password) ,
    }
    axios.post(`http://${ip}:${port}/api/v1/auth/users/register`,data).then((res)=>{
      console.log(res.data)
      setMessage({type:"good",message:"Please check your email for confirmation"})
      setTimeout(()=>{
        setMessage(null)
      },5000)
    }).catch((res)=>{
      console.log(res.status)
      console.log("body:",res.response.data)
      setMessage({type:"error",message:res.response.data.message??"Unable to register !"})
      setTimeout(()=>{
        setMessage(null)
      },5000)
    })
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      {message && <MessagePop type={message.type} message={message.message} />}
      <div className="absolute top-2 md:top-8 md:left-8" >
        <Link href="/">
          <Logo font="3xl" width="9" />
        </Link>
      </div>
      {/* <div className="flex gap-3 flex-col md:flex-row lg:gap-6 items-start justify-center" > */}
        <form onSubmit={handleSubmit} className="flex gap-3 flex-col md:flex-row lg:gap-6 items-start justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Start Your <span className="text-blue-600 font-medium" >Journey</span></CardTitle>
            <CardDescription>Join our community of professionals</CardDescription>
          </CardHeader>
          <CardContent>
            
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone number</Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="+212 658320468"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                  required
                />
              </div>
          </CardContent>
        </Card>

        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">With <span className="text-blue-600 font-medium" >Us</span> !</CardTitle>
            <CardDescription>Discover a new way of working</CardDescription>
          </CardHeader>
          <CardContent>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2 mt-3">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  required
                />
              </div>

              <div className="flex items-center space-x-2 py-3">
                <Checkbox
                  id="terms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
                />
                <Label htmlFor="terms" className="text-sm">
                  I agree to the{" "}
                  <Link href="/terms" className="text-blue-600 hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-blue-600 hover:underline">
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-500" disabled={!formData.agreeToTerms}>
                Create Account
              </Button>

            
          </CardContent>
          {/* <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">Already have an account? </span>
              <Link href="/login" className="text-blue-600 hover:underline">
                Sign in
              </Link>
            </div>   */}
        </Card>
        </form>

      {/* </div> */}
      
      
    </div>
  )
}

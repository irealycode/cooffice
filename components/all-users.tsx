"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus, Edit, Trash2, Mail, Phone, Search } from "lucide-react"
import axios from "axios"
import { ip, port } from "@/hooks/hosts"
import { MessagePop } from "./message-pop"
import { useEffect } from "react"
import { UserTable } from "./users-table"

// Sample users data
// const initialUsers = [
//   {
//     id: 1,
//     name: "John Doe",
//     email: "john@example.com",
//     phone: "+1 (555) 123-4567",
//     role: "Admin",
//     company: "TechCorp",
//     status: "Active",
//     avatar: "/placeholder.svg?height=40&width=40",
//     joinDate: "2024-01-15",
//   },
//   {
//     id: 2,
//     name: "Jane Smith",
//     email: "jane@example.com",
//     phone: "+1 (555) 234-5678",
//     role: "Manager",
//     company: "DesignStudio",
//     status: "Active",
//     avatar: "/placeholder.svg?height=40&width=40",
//     joinDate: "2024-01-10",
//   },
//   {
//     id: 3,
//     name: "Mike Johnson",
//     email: "mike@example.com",
//     phone: "+1 (555) 345-6789",
//     role: "Users",
//     company: "StartupInc",
//     status: "Inactive",
//     avatar: "/placeholder.svg?height=40&width=40",
//     joinDate: "2024-01-05",
//   },
//   {
//     id: 4,
//     name: "Sarah Wilson",
//     email: "sarah@example.com",
//     phone: "+1 (555) 456-7890",
//     role: "Member",
//     company: "FreelanceWork",
//     status: "Active",
//     avatar: "/placeholder.svg?height=40&width=40",
//     joinDate: "2024-01-20",
//   },
// ]

const roles = ["Users"]

interface userType{
    id: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    phone: string;
    role: string;
    status: string;
    avatar: string;
    createdAt: string;
}

export default function AllUsersPage({token}:{token:string}) {
  const [users, setUsers] = useState<userType[]>([])
  const [usersTotal, setUsersTotal] = useState(0)
  const [searchTerm, setSearchTerm] = useState("")
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<any>(null)
  const [message,setMessage] = useState<null|{type:"good" | "error" | "warning",message:string}>(null)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "staff",
    status: "Active",
  })

  useEffect(()=>{
    getUserInfo()
  },[])

  const getUserInfo = () =>{
    axios.get(`http://${ip}:${port}/api/v1/users/`,{
        headers: {
            Authorization: `Bearer ${token}`
          }
    }).then((res)=>{
        console.log(res.data)
        setUsers(res.data.content)
        setUsersTotal(res.data.content.length)
    }).catch((res)=>{
        console.log(res)
        // localStorage.removeItem('token')
        // window.location.assign('/login')
    })
}

  

  const handleEditUser = (user: any) => {
    setEditingUser(user)
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      role: user.role,
      status: user.status,
    })
    setIsEditDialogOpen(true)
  }

  const handleUpdateUser = () => {
    const updatedUsers = users.map((user) => (user.id === editingUser.id ? { ...user, ...formData } : user))
    setUsers(updatedUsers)
    setIsEditDialogOpen(false)
    setEditingUser(null)
    resetForm()
  }

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter((user) => user.id !== id))
  }

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      role: "",
      status: "Active",
    })
  }

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "Manager":
        return "bg-blue-600 hover:bg-blue-500"
      case "Manager":
        return "bg-black hover:bg-gray-800"
      case "Staff":
        return "bg-gray-200 text-gray-800 hover:bg-gray-300"
      default:
        return "bg-gray-200  text-gray-800 hover:bg-gray-300"
    }
  }

  return (
    <div className="space-y-6 p-6">
        {message && <MessagePop type={message.type} message={message.message} />}      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Users Management</h1>
          <p className="text-gray-600">Manage company users and their roles</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-6">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <div className="text-2xl font-bold">{usersTotal}</div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-6">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <div className="text-2xl font-bold">{usersTotal}</div>
          </CardHeader>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>Manage all users</CardDescription>
        </CardHeader>
        <CardContent>
          {users.length > 0 && <UserTable data={users} />}
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>Update user information and permissions</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  First Name
                </Label>
                <Input
                  id="name"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Last Name
                </Label>
                <Input
                  id="phone"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="col-span-3"
                />
              </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-email" className="text-right">
                Email
              </Label>
              <Input
                id="edit-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-phone" className="text-right">
                Phone
              </Label>
              <Input
                id="edit-phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-role" className="text-right">
                Role
              </Label>
              <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                <SelectTrigger className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-status" className="text-right">
                Status
              </Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                  <SelectItem value="Suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleUpdateUser}>Update User</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

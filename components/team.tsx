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
import { Plus, Edit, Trash2, Mail, Phone, Search, UserMinus, UserPlus } from "lucide-react"
import axios from "axios"
import { ip, port } from "@/hooks/hosts"
import { MessagePop } from "./message-pop"
import { useEffect } from "react"
import { format } from "date-fns"

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
//     role: "Staff",
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

const roles = ["Staff"]
const companies = ["TechCorp", "DesignStudio", "StartupInc", "FreelanceWork", "Other"]

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

export default function UsersPage({token}:{token:string}) {
  const [users, setUsers] = useState<userType[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<userType | null>(null)
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
    axios.get(`http://${ip}:${port}/api/v1/staff`,{
        headers: {
            Authorization: `Bearer ${token}`
          }
    }).then((res)=>{
        console.log(res.data)
        setUsers(res.data.content)
        // setUsersTotal(res.data.totalElements)
    }).catch((res)=>{
        console.log(res)
        // localStorage.removeItem('token')
        // window.location.assign('/login')
    })
  }

  const filteredUsers = users.filter(
    (user) =>
      `${user.firstName.toLowerCase()} ${user.lastName.toLowerCase()}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddUser = () => {
    const data = {
      firstName:formData.firstName,
      lastName:formData.lastName,
      email:formData.email,
      password:'staff_pass'
    }
    axios.post(`http://${ip}:${port}/api/v1/auth/staff/register`,data,{
      headers: {
          Authorization: `Bearer ${token}`
        }
    }).then((res)=>{
      console.log(res.data)
      getUserInfo()

      setMessage({type:"good",message:"Added User Successfully !"})
      setTimeout(()=>{
        setMessage(null)
      },5000)
      // setMessage(null)
      // localStorage.setItem('staff_token',res.data.token)
      // localStorage.setItem('token',res.data.token)
      // window.location.assign('/')
    }).catch((res)=>{
      setMessage({type:"error",message:res.response.data.message??"Adding User Failed !"})
      setTimeout(()=>{
        setMessage(null)
      },5000)
      console.log(res)
    })
    // setUsers([...users, newUser])
    setIsAddDialogOpen(false)
    resetForm()
  }

  const handleEditUser = (user: any) => {
    setEditingUser(user)
    setFormData(prev =>({...prev,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      role: user.role,
    }))
    setIsEditDialogOpen(true)
  }

  const handleUpdateUser = () => {
    if(!editingUser) return
    const data = {
      firstName:formData.firstName,
      lastName:formData.lastName,
      email:formData.email,
      // password:'staff_pass'
    }
    axios.put(`http://${ip}:${port}/api/v1/staff/${editingUser.id}`,data,{
      headers: {
          Authorization: `Bearer ${token}`
        }
    }).then((res)=>{
      console.log(res.data)
      getUserInfo()

      setMessage({type:"good",message:"Updated User Successfully !"})
      setTimeout(()=>{
        setMessage(null)
      },5000)
      // setMessage(null)
      // localStorage.setItem('staff_token',res.data.token)
      // localStorage.setItem('token',res.data.token)
      // window.location.assign('/')
    }).catch((res)=>{
      setMessage({type:"error",message:res.response.data.message??"Adding User Failed !"})
      setTimeout(()=>{
        setMessage(null)
      },5000)
      console.log(res)
    })

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

  const suspendUser = (id:string) =>{
    axios.post(`http://${ip}:${port}/api/v1/staff/suspend/${id}`,{},{
      headers: {
          Authorization: `Bearer ${token}`
        }
    }).then((res)=>{
      console.log(res.data)
      getUserInfo()
    }).catch((res)=>{
      console.log(res)
    })
  }

  const activateUser = (id:string) =>{
    axios.post(`http://${ip}:${port}/api/v1/staff/activate/${id}`,{},{
      headers: {
          Authorization: `Bearer ${token}`
        }
    }).then((res)=>{
      console.log(res.data)
      getUserInfo()
    }).catch((res)=>{
      console.log(res)
    })
  }

  const deleteUser = (id:string) =>{
    axios.delete(`http://${ip}:${port}/api/v1/staff/${id}`,{
      headers: {
          Authorization: `Bearer ${token}`
        }
    }).then((res)=>{
      console.log(res.data)
      getUserInfo()
    }).catch((res)=>{
      console.log(res)
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
          <h1 className="text-3xl font-bold text-gray-900">Staff Management</h1>
          <p className="text-gray-600">Manage company users and their roles</p>
        </div>
        {/* Add User Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-500">
              <Plus className="w-4 h-4 mr-2" />
              Add Staff
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Add New Staff</DialogTitle>
              <DialogDescription>Create a new company staff</DialogDescription>
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
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">
                  Role
                </Label>
                <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Staff" />
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
              
            </div>
            <DialogFooter>
              <Button onClick={handleAddUser}>Add User</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-6">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <div className="text-2xl font-bold">{users.length}</div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-6">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <div className="text-2xl font-bold">{users.filter((u) => u.status === "Active").length}</div>
          </CardHeader>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle>All Staff</CardTitle>
          <CardDescription>Manage all company users and their permissions</CardDescription>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={user.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {user.firstName[0].toUpperCase()} {user.lastName[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user?.firstName[0].toUpperCase()}{user?.firstName.slice(1)} {user?.lastName[0].toUpperCase()}{user?.lastName.slice(1)}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm">
                        <Mail className="w-3 h-3 mr-1" />
                        {user.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getRoleBadgeVariant(user.role)}>{user.role}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.status === "Active" ? "default" : "secondary"}>{user.status}</Badge>
                  </TableCell>
                  <TableCell>{format(new Date(user.createdAt),"dd MMM yyyy")}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleEditUser(user)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button className={user.status === "ACTIVE"?"bg-orange-500":"bg-green-500 text-black"} size="sm" onClick={() =>{if(user.status === "ACTIVE"){suspendUser(user.id)}else{activateUser(user.id)}}}>
                        {user.status === "ACTIVE"?<UserMinus className="w-4 h-4" />:<UserPlus className="w-4 h-4" />}
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => deleteUser(user.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
            
            
          </div>
          <DialogFooter>
            <Button onClick={handleUpdateUser}>Update User</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

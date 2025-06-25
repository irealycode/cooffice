"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  CalendarIcon,
  Clock,
  MapPin,
  User,
  Phone,
  Mail,
  Check,
  X,
  Eye,
  Search,
  AlertCircle,
  CheckCircle,
  XCircle,
} from "lucide-react"
import { format } from "date-fns"
import Image from "next/image"

// Booking Request interface
interface BookingRequest {
  id: number
  spaceName: string
  spaceType: string
  spaceImage: string
  userName: string
  userEmail: string
  userPhone: string
  userAvatar: string
  startDate: Date
  endDate: Date
  startTime: string
  endTime: string
  status: "Pending" | "Approved" | "Rejected"
  amount: number
  requestDate: Date
  spaceAddress: string
  notes?: string
  urgency: "Low" | "Medium" | "High"
  guestCount: number
  specialRequests?: string[]
}

// Sample booking requests data
const initialBookingRequests: BookingRequest[] = [
  {
    id: 1,
    spaceName: "Downtown Hub",
    spaceType: "Hot Desk",
    spaceImage: "/placeholder.svg?height=200&width=300",
    userName: "John Doe",
    userEmail: "john.doe@example.com",
    userPhone: "+1 (555) 123-4567",
    userAvatar: "/placeholder.svg?height=40&width=40",
    startDate: new Date(2024, 1, 20),
    endDate: new Date(2024, 1, 20),
    startTime: "09:00",
    endTime: "17:00",
    status: "Pending",
    amount: 25,
    requestDate: new Date(2024, 1, 18),
    spaceAddress: "123 Business St, Downtown",
    notes: "Need access to presentation equipment for client meeting",
    urgency: "High",
    guestCount: 1,
    specialRequests: ["Presentation Equipment", "Quiet Environment"],
  },
  {
    id: 2,
    spaceName: "Creative Space",
    spaceType: "Private Office",
    spaceImage: "/placeholder.svg?height=200&width=300",
    userName: "Jane Smith",
    userEmail: "jane.smith@designco.com",
    userPhone: "+1 (555) 234-5678",
    userAvatar: "/placeholder.svg?height=40&width=40",
    startDate: new Date(2024, 1, 22),
    endDate: new Date(2024, 1, 24),
    startTime: "08:00",
    endTime: "18:00",
    status: "Pending",
    amount: 450,
    requestDate: new Date(2024, 1, 19),
    spaceAddress: "456 Art District, Midtown",
    notes: "Team workshop for 3 days, need flexible furniture arrangement",
    urgency: "Medium",
    guestCount: 8,
    specialRequests: ["Flexible Furniture", "Catering Setup", "AV Equipment"],
  },
  {
    id: 3,
    spaceName: "Tech Valley",
    spaceType: "Meeting Room",
    spaceImage: "/placeholder.svg?height=200&width=300",
    userName: "Mike Johnson",
    userEmail: "mike.johnson@techstart.io",
    userPhone: "+1 (555) 345-6789",
    userAvatar: "/placeholder.svg?height=40&width=40",
    startDate: new Date(2024, 1, 21),
    endDate: new Date(2024, 1, 21),
    startTime: "14:00",
    endTime: "16:00",
    status: "Approved",
    amount: 70,
    requestDate: new Date(2024, 1, 17),
    spaceAddress: "789 Innovation Ave, Tech District",
    notes: "Important investor presentation",
    urgency: "High",
    guestCount: 6,
    specialRequests: ["Video Conferencing", "Whiteboard"],
  },
  {
    id: 4,
    spaceName: "Startup Lounge",
    spaceType: "Event Space",
    spaceImage: "/placeholder.svg?height=200&width=300",
    userName: "Sarah Wilson",
    userEmail: "sarah.wilson@eventpro.com",
    userPhone: "+1 (555) 456-7890",
    userAvatar: "/placeholder.svg?height=40&width=40",
    startDate: new Date(2024, 1, 25),
    endDate: new Date(2024, 1, 25),
    startTime: "18:00",
    endTime: "22:00",
    status: "Rejected",
    amount: 320,
    requestDate: new Date(2024, 1, 16),
    spaceAddress: "321 Startup Ave, Innovation District",
    notes: "Company networking event for 50 people",
    urgency: "Low",
    guestCount: 50,
    specialRequests: ["Sound System", "Catering", "Bar Setup"],
  },
  {
    id: 5,
    spaceName: "Executive Suite",
    spaceType: "Private Office",
    spaceImage: "/placeholder.svg?height=200&width=300",
    userName: "David Chen",
    userEmail: "david.chen@consulting.com",
    userPhone: "+1 (555) 567-8901",
    userAvatar: "/placeholder.svg?height=40&width=40",
    startDate: new Date(2024, 1, 23),
    endDate: new Date(2024, 1, 23),
    startTime: "10:00",
    endTime: "15:00",
    status: "Pending",
    amount: 180,
    requestDate: new Date(2024, 1, 20),
    spaceAddress: "555 Executive Blvd, Business District",
    notes: "Confidential client consultation",
    urgency: "Medium",
    guestCount: 3,
    specialRequests: ["Privacy", "Coffee Service"],
  },
]

export default function BookingRequests() {
  const [bookingRequests, setBookingRequests] = useState<BookingRequest[]>(initialBookingRequests)
  const [selectedRequest, setSelectedRequest] = useState<BookingRequest | null>(null)
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [urgencyFilter, setUrgencyFilter] = useState("all")

  const filteredRequests = bookingRequests.filter((request) => {
    const matchesSearch =
      request.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.spaceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.userEmail.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || request.status === statusFilter
    const matchesUrgency = urgencyFilter === "all" || request.urgency === urgencyFilter

    return matchesSearch && matchesStatus && matchesUrgency
  })

  const pendingRequests = filteredRequests.filter((r) => r.status === "Pending")
  const approvedRequests = filteredRequests.filter((r) => r.status === "Approved")
  const rejectedRequests = filteredRequests.filter((r) => r.status === "Rejected")

  const handleApproveRequest = (requestId: number) => {
    setBookingRequests((prev) =>
      prev.map((request) => (request.id === requestId ? { ...request, status: "Approved" as const } : request)),
    )
  }

  const handleRejectRequest = (requestId: number) => {
    setBookingRequests((prev) =>
      prev.map((request) => (request.id === requestId ? { ...request, status: "Rejected" as const } : request)),
    )
  }

  const handleViewDetails = (request: BookingRequest) => {
    setSelectedRequest(request)
    setIsDetailsDialogOpen(true)
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Approved":
        return "default"
      case "Pending":
        return "secondary"
      case "Rejected":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getUrgencyBadgeVariant = (urgency: string) => {
    switch (urgency) {
      case "High":
        return "destructive"
      case "Medium":
        return "secondary"
      case "Low":
        return "outline"
      default:
        return "outline"
    }
  }

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case "High":
        return <AlertCircle className="w-4 h-4" />
      case "Medium":
        return <Clock className="w-4 h-4" />
      case "Low":
        return <CheckCircle className="w-4 h-4" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6 p-6">
        <CardHeader>
          <CardTitle>Booking Requests</CardTitle>
          <CardDescription>Review and manage workspace booking requests</CardDescription>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search requests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Approved">Approved</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={urgencyFilter} onValueChange={setUrgencyFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by urgency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Urgency</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="pending" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="pending" className="flex items-center">
                <AlertCircle className="w-4 h-4 mr-2" />
                Pending ({pendingRequests.length})
              </TabsTrigger>
              <TabsTrigger value="approved" className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                Approved ({approvedRequests.length})
              </TabsTrigger>
              <TabsTrigger value="rejected" className="flex items-center">
                <XCircle className="w-4 h-4 mr-2" />
                Rejected ({rejectedRequests.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pending" className="space-y-4 mt-6">
              {pendingRequests.length === 0 ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No pending requests</h3>
                  <p className="text-gray-600">All booking requests have been reviewed.</p>
                </div>
              ) : (
                pendingRequests.map((request) => (
                  <Card key={request.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold text-lg">{request.spaceName}</h3>
                              <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <Badge variant="outline">{request.spaceType}</Badge>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold text-lg">DH {request.amount}</div>
                              <div className="text-sm text-gray-600">
                                Requested {format(request.requestDate, "MMM d")}
                              </div>
                            </div>
                          </div>

                          <div className="text-sm text-gray-600 mb-4">
                            <div className="flex items-center mb-1">
                              <User className="w-4 h-4 mr-2" />
                              {request.userName}
                            </div>
                            <div className="flex items-center">
                              <CalendarIcon className="w-4 h-4 mr-2" />
                              {format(request.startDate, "MMM d, yyyy")}
                            </div>
                          </div>


                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Avatar className="w-8 h-8">
                                <AvatarImage src={request.userAvatar || "/placeholder.svg"} />
                                <AvatarFallback>
                                  {request.userName
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div className="text-sm">
                                <div className="font-medium">{request.userName}</div>
                                <div className="text-gray-600">{request.userEmail}</div>
                              </div>
                            </div>

                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm" onClick={() => handleViewDetails(request)}>
                                <Eye className="w-4 h-4 mr-1" />
                                Details
                              </Button>
                              <Button variant="destructive" size="sm" onClick={() => handleRejectRequest(request.id)}>
                                <X className="w-4 h-4 mr-1" />
                                Reject
                              </Button>
                              <Button size="sm" className="bg-green-400 hover:bg-green-500" onClick={() => handleApproveRequest(request.id)}>
                                <Check className="w-4 h-4 mr-1" />
                                Approve
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>

            <TabsContent value="approved" className="space-y-4 mt-6">
              {approvedRequests.map((request) => (
                <Card key={request.id} className="hover:shadow-md transition-shadow border-green-200">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      

                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-lg">{request.spaceName}</h3>
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                              <Badge variant="outline">{request.spaceType}</Badge>
                              <Badge variant={getStatusBadgeVariant(request.status)}>{request.status}</Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-lg text-green-600">DH {request.amount}</div>
                            <div className="text-sm text-gray-600">Approved</div>
                          </div>
                        </div>

                        <div className="text-sm text-gray-600 mb-4">
                          <div className="flex items-center mb-1">
                            <User className="w-4 h-4 mr-2" />
                            {request.userName}
                          </div>
                          <div className="flex items-center">
                            <CalendarIcon className="w-4 h-4 mr-2" />
                            {format(request.startDate, "MMM d, yyyy")}
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={request.userAvatar || "/placeholder.svg"} />
                              <AvatarFallback>
                                {request.userName
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="text-sm">
                              <div className="font-medium">{request.userName}</div>
                              <div className="text-gray-600">{request.userEmail}</div>
                            </div>
                          </div>

                          <Button variant="outline" size="sm" onClick={() => handleViewDetails(request)}>
                            <Eye className="w-4 h-4 mr-1" />
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="rejected" className="space-y-4 mt-6">
              {rejectedRequests.map((request) => (
                <Card key={request.id} className="hover:shadow-md transition-shadow border-red-200">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">

                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-lg text-gray-700">{request.spaceName}</h3>
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                              <Badge variant="outline">{request.spaceType}</Badge>
                              <Badge variant={getStatusBadgeVariant(request.status)}>{request.status}</Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-lg text-gray-500">DH {request.amount}</div>
                            <div className="text-sm text-red-600">Rejected</div>
                          </div>
                        </div>

                        <div className="text-sm text-gray-600 mb-4">
                          <div className="flex items-center mb-1">
                            <User className="w-4 h-4 mr-2" />
                            {request.userName}
                          </div>
                          <div className="flex items-center">
                            <CalendarIcon className="w-4 h-4 mr-2" />
                            {format(request.startDate, "MMM d, yyyy")}
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={request.userAvatar || "/placeholder.svg"} />
                              <AvatarFallback>
                                {request.userName
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="text-sm">
                              <div className="font-medium">{request.userName}</div>
                              <div className="text-gray-600">{request.userEmail}</div>
                            </div>
                          </div>

                          <Button variant="outline" size="sm" onClick={() => handleViewDetails(request)}>
                            <Eye className="w-4 h-4 mr-1" />
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>

      {/* Details Dialog */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="max-w-2xl">
          {selectedRequest && (
            <>
              <DialogHeader>
                <DialogTitle>Booking Request Details</DialogTitle>
                <DialogDescription>Complete information about this booking request</DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="relative w-16 h-16">
                    
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">{selectedRequest.spaceName}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline">{selectedRequest.spaceType}</Badge>
                      <Badge variant={getStatusBadgeVariant(selectedRequest.status)}>{selectedRequest.status}</Badge>
                      <Badge variant={getUrgencyBadgeVariant(selectedRequest.urgency)} className="flex items-center">
                        {getUrgencyIcon(selectedRequest.urgency)}
                        <span className="ml-1">{selectedRequest.urgency} Priority</span>
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">${selectedRequest.amount}</div>
                    <div className="text-sm text-gray-600">Total Amount</div>
                  </div>
                </div>

                {/* Customer Information */}
                <div>
                  <h4 className="font-semibold mb-3">Customer Information</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={selectedRequest.userAvatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {selectedRequest.userName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{selectedRequest.userName}</div>
                        <div className="text-sm text-gray-600">Customer</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <Mail className="w-4 h-4 mr-2 text-gray-400" />
                        {selectedRequest.userEmail}
                      </div>
                      <div className="flex items-center text-sm">
                        <Phone className="w-4 h-4 mr-2 text-gray-400" />
                        {selectedRequest.userPhone}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Booking Details */}
                <div>
                  <h4 className="font-semibold mb-3">Booking Details</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-600">Date</div>
                      <div className="font-medium">{format(selectedRequest.startDate, "EEEE, MMMM d, yyyy")}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Time</div>
                      <div className="font-medium">
                        {selectedRequest.startTime} - {selectedRequest.endTime}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Location</div>
                      <div className="font-medium">{selectedRequest.spaceAddress}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Guest Count</div>
                      <div className="font-medium">{selectedRequest.guestCount} people</div>
                    </div>
                  </div>
                </div>

                {/* Special Requests */}
                {selectedRequest.specialRequests && selectedRequest.specialRequests.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3">Special Requests</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedRequest.specialRequests.map((request, index) => (
                        <Badge key={index} variant="secondary">
                          {request}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Notes */}
                {selectedRequest.notes && (
                  <div>
                    <h4 className="font-semibold mb-3">Additional Notes</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm">{selectedRequest.notes}</p>
                    </div>
                  </div>
                )}

                {/* Request Timeline */}
                <div>
                  <h4 className="font-semibold mb-3">Request Timeline</h4>
                  <div className="text-sm text-gray-600">
                    <div>Requested on: {format(selectedRequest.requestDate, "MMMM d, yyyy 'at' h:mm a")}</div>
                    <div>Request ID: #{selectedRequest.id.toString().padStart(6, "0")}</div>
                  </div>
                </div>
              </div>

              <DialogFooter className="flex items-center justify-between">
                <Button variant="outline" onClick={() => setIsDetailsDialogOpen(false)}>
                  Close
                </Button>
                {selectedRequest.status === "Pending" && (
                  <div className="flex space-x-2">
                    <Button
                      variant="destructive"
                      onClick={() => {
                        handleRejectRequest(selectedRequest.id)
                        setIsDetailsDialogOpen(false)
                      }}
                    >
                      <X className="w-4 h-4 mr-1" />
                      Reject
                    </Button>
                    <Button
                      onClick={() => {
                        handleApproveRequest(selectedRequest.id)
                        setIsDetailsDialogOpen(false)
                      }}
                    >
                      <Check className="w-4 h-4 mr-1" />
                      Approve
                    </Button>
                  </div>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

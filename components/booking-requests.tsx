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
import axios from "axios"
import { ip, port } from "@/hooks/hosts"
import { formatAmenity } from "@/hooks/imports"
import { useEffect } from "react"
import { Textarea } from "./ui/textarea"

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

interface rawBooking {
  acceptedAt: string | null
  cancellationReason: string | null
  cancelledAt: string
  createdAt: string
  endTime: string
  id: string
  processedById: string
  rejectionReason: string | null
  renterId: string
  spaceId: string
  startTime: string
  status: string
  totalAmount: number
}

interface RawSpace {
  id:string;
  name: string;
  description: string;
  pricePerHour: number;
  spaceType: string;
  discount: number;
  area: number;
  capacity: number;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  latitude: number;
  longitude: number;
  amenities: string[];
  imageUrls: string[];
  isAvailable: boolean;
}

interface UserBooking {
    id: string
    renterId: string
    renterFirstName: string
    renterLastName: string
    renterEmail: string
    spaceName: string
    spaceType: string
    spaceImage: string
    startDate: Date
    endDate: Date
    status: string
    amount: number
    bookingDate: Date
    spaceAddress: string
    spaceRating: number
    amenities: string[]
    notes?: string
}

interface RawUser {
  id: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  isVerified: boolean
  createdAt: string
  updatedAt: string
}

export default function BookingRequests({token}:{token:string}) {
  const [bookingRequests, setBookingRequests] = useState<UserBooking[]>([])
  const [selectedRequest, setSelectedRequest] = useState<UserBooking | null>(null)
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null)
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  // const [statusFilter, setStatusFilter] = useState("all")
  // const [urgencyFilter, setUrgencyFilter] = useState("all")
  const [reason, setReason] = useState('')
  const [isRejecting,setIsRejecting] = useState(false)


  useEffect(()=>{
    getUserBookings()
  },[])

  


  const getUserBookings = () =>{
      axios.get(`http://${ip}:${port}/api/v1/bookings`,{
          headers: {
              Authorization: `Bearer ${token}`
            }
      }).then((res)=>{
          const bks = res.data.content
          setBookingRequests([])
          bks.forEach(async(b : rawBooking ) => {
              const space : {data : RawSpace} = await axios.get(`http://${ip}:${port}/api/v1/spaces/${b.spaceId}`,{
                  headers: {
                      Authorization: `Bearer ${token}`
                    }
              })

              const renter : {data : RawUser} = await axios.get(`http://${ip}:${port}/api/v1/users/${b.renterId}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                  }
              })
              console.log(space?.data)
              if (space.data && renter.data) {
                  setBookingRequests(prev => [...prev,{
                      id: b.id,
                      renterId: b.renterId,
                      renterFirstName: renter.data.firstName,
                      renterLastName: renter.data.lastName,
                      renterEmail: renter.data.email,
                      spaceName: space.data.name,
                      spaceType: formatAmenity(space.data.spaceType),
                      spaceImage: space.data.imageUrls?.[0],
                      startDate: new Date(b.startTime),
                      endDate:new Date(b.endTime),
                      status: formatAmenity(b.status),
                      amount: b.totalAmount,
                      bookingDate: new Date(b.createdAt),
                      spaceAddress: space.data.address,
                      spaceRating: 4.5,
                      amenities: space.data.amenities.map(a=>formatAmenity(a)),
                      notes: "",
                  }])
              }
              
          });
          console.log('s',res.data.content)
          
          // setUser(res.data)
      }).catch((res)=>{
          console.log(res)
          // localStorage.removeItem('token')
          // window.location.assign('/login')
      })
  }

  

  const pendingRequests = bookingRequests.filter((r) => r.status === "Pending")

  const handleApproveRequest = (requestId: string) => {
    setBookingRequests((prev) =>
      prev.map((request) => (request.id === requestId ? { ...request, status: "Approved" as const } : request)),
    )
  }

  

  const handleViewDetails = (request: UserBooking) => {
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

  const handleAccept = (id : string) => {
    axios.post(`http://${ip}:${port}/api/v1/bookings/accept/${id}?rejectionReason=none`,{},{
      headers: {
          Authorization: `Bearer ${token}`
        }
    }).then((res)=>{
      console.log(res)
      setBookingRequests(prev => prev.filter(b=>b.id !== id))
      setSelectedRequestId(null)
    }).catch((res)=>{
      console.log(res)
    })
  }

  const handleReject = () => {
    if (!reason.trim()) return
    axios.post(`http://${ip}:${port}/api/v1/bookings/reject/${selectedRequestId}?rejectionReason=${reason}`,{},{
      headers: {
          Authorization: `Bearer ${token}`
        }
    }).then((res)=>{
      console.log(res)
      setIsRejecting(false)
      setBookingRequests(prev => prev.filter(b=>b.id !== selectedRequestId))
      setSelectedRequestId(null)
    })
    setReason('')
  }
  const handleRejectRequest = (requestId: string) => {
    setIsRejecting(true)
    setSelectedRequestId(requestId)
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
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="pending" className="w-full">
            <TabsList className="grid w-full grid-cols-1">
              <TabsTrigger value="pending" className="flex items-center">
                <AlertCircle className="w-4 h-4 mr-2" />
                Pending ({pendingRequests.length})
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
                                Requested {format(new Date(request.bookingDate), "MMM d")}
                              </div>
                            </div>
                          </div>

                          <div className="text-sm text-gray-600 mb-4">
                            <div className="flex items-center mb-1">
                              <User className="w-4 h-4 mr-2" />
                              {request.renterFirstName[0].toUpperCase()}{request.renterFirstName.slice(1)} {request.renterLastName[0].toUpperCase()}{request.renterLastName.slice(1)}
                            </div>
                            <div className="flex items-center">
                              <CalendarIcon className="w-4 h-4 mr-2" />
                              {format(new Date(request.startDate), "MMM d, yyyy")}
                            </div>
                          </div>


                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Avatar className="w-8 h-8">
                                <AvatarFallback>
                                {request.renterFirstName[0].toUpperCase()} {request.renterLastName[0].toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <div className="text-sm">
                                <div className="font-medium" >{request.renterFirstName[0].toUpperCase()}{request.renterFirstName.slice(1)} {request.renterLastName[0].toUpperCase()}{request.renterLastName.slice(1)}</div>
                                <div className="text-gray-600">{request.renterEmail}</div>
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
                              <Button size="sm" className="bg-green-400 hover:bg-green-500" onClick={() => handleAccept(request.id)}>
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
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">DH {selectedRequest.amount}</div>
                    <div className="text-sm text-gray-600">Total Amount</div>
                  </div>
                </div>

                {/* Customer Information */}
                <div>
                  <h4 className="font-semibold mb-3">Customer Information</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback>
                        {selectedRequest.renterFirstName[0]} {selectedRequest.renterLastName[0]}

                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{selectedRequest.renterFirstName[0].toUpperCase()}{selectedRequest.renterFirstName.slice(1)} {selectedRequest.renterFirstName[0].toUpperCase()}{selectedRequest.renterFirstName.slice(1)}</div>
                        <div className="text-sm text-gray-600">Customer</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <Mail className="w-4 h-4 mr-2 text-gray-400" />
                        {selectedRequest.renterEmail}
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
                        {format(selectedRequest.startDate,"dd MMM yyyy")} - {format(selectedRequest.endDate,"dd MMM yyyy")}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Location</div>
                      <div className="font-medium">{selectedRequest.spaceAddress}</div>
                    </div>
                  </div>
                </div>


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
                    <div>Requested on: {format(selectedRequest.bookingDate, "MMMM d, yyyy 'at' h:mm a")}</div>
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
                        handleAccept(selectedRequest.id)
                        setIsDetailsDialogOpen(false)
                      }}
                      className="bg-green-400 hover:bg-green-500"
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

      <Dialog open={isRejecting} onOpenChange={setIsRejecting}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Reject Booking</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4">
            <label className="text-sm font-medium" htmlFor="reason">Rejection Reason</label>
            <Textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Please explain why this booking is being rejected..."
              className="min-h-[100px]"
            />
          </div>

          <DialogFooter className="flex justify-between pt-4">
            <Button variant="outline" onClick={()=>setIsRejecting(false)}>
              Back
            </Button>
            <Button variant="destructive" onClick={handleReject} disabled={!reason.trim()}>
              Reject
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

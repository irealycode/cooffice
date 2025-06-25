"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  CalendarIcon,
  Clock,
  MapPin,
  Star,
  Edit,
  Eye,
  X,
  User,
  Mail,
  Phone,
  Building,
  History,
  Calendar,
} from "lucide-react"
import { format } from "date-fns"
import Image from "next/image"
import { Textarea } from "@/components/ui/textarea"


interface UserProfile {
  id: number
  name: string
  email: string
  phone: string
  company: string
  avatar: string
  joinDate: string
  totalBookings: number
  totalSpent: number
}

// Booking interface
interface UserBooking {
  id: number
  spaceName: string
  spaceType: string
  spaceImage: string
  startDate: Date
  endDate: Date
  status: "Pending" | "Active" | "Completed" | "Cancelled"
  amount: number
  bookingDate: Date
  spaceAddress: string
  spaceRating: number
  amenities: string[]
  notes?: string
}

// Sample user data


// export function format(date: Date | number, formatStr: string): string {
//     const d = typeof date === 'number' ? new Date(date) : date;
  
//     const pad = (n: number) => n.toString().padStart(2, '0');
  
//     const replacements: Record<string, string> = {
//       yyyy: d.getFullYear().toString(),
//       MM: pad(d.getMonth() + 1),
//       dd: pad(d.getDate()),
//       HH: pad(d.getHours()),
//       mm: pad(d.getMinutes()),
//       ss: pad(d.getSeconds()),
//     };
  
//     let result = formatStr;
//     for (const token in replacements) {
//       result = result.replace(token, replacements[token]);
//     }
  
//     return result;
// }

const StarRating = ({
    rating,
    onRatingChange,
    readonly = false,
  }: {
    rating: number
    onRatingChange?: (rating: number) => void
    readonly?: boolean
  }) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            disabled={readonly}
            onClick={() => !readonly && onRatingChange?.(star)}
            className={`w-8 h-8 ${readonly ? "cursor-default" : "cursor-pointer hover:scale-110"} transition-transform`}
          >
            <Star className={`w-6 h-6 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
          </button>
        ))}
      </div>
    )
}

export default function UserDashboard() {
    const currentUser: UserProfile = {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+212 625282630",
        company: "TechCorp Inc.",
        avatar: "/placeholder.svg?height=100&width=100",
        joinDate: "2024-01-15",
        totalBookings: 12,
        totalSpent: 850,
    }
      
    const userBookings: UserBooking[] = [
    {
        id: 1,
        spaceName: "Downtown Hub",
        spaceType: "Hot Desk",
        spaceImage: "/assets/images/office1.jpg",
        startDate: new Date(2024, 1, 15),
        endDate: new Date(2024, 1, 16),
        status: "Pending",
        amount: 25,
        bookingDate: new Date(2024, 1, 10),
        spaceAddress: "123 Business St, Downtown",
        spaceRating: 4.8,
        amenities: ["High-Speed Wifi", "Free Coffee", "Parking"],
        notes: "Need access to presentation equipment",
    },
    {
        id: 2,
        spaceName: "Creative Space",
        spaceType: "Private Office",
        spaceImage: "/assets/images/office2.jpg",
        startDate: new Date(2024, 1, 20),
        endDate: new Date(2024, 1, 22),
        status: "Pending",
        amount: 90,
        bookingDate: new Date(2024, 1, 12),
        spaceAddress: "456 Art District, Midtown",
        spaceRating: 4.6,
        amenities: ["High-Speed Wifi", "Free Coffee", "Printing"],
        notes: "Team workshop for 3 days",
    },
    {
        id: 3,
        spaceName: "Tech Valley",
        spaceType: "Meeting Room",
        spaceImage: "/assets/images/office3.jpg",
        startDate: new Date(2024, 0, 25),
        endDate: new Date(2024, 0, 25),
        status: "Completed",
        amount: 35,
        bookingDate: new Date(2024, 0, 20),
        spaceAddress: "789 Innovation Ave, Tech District",
        spaceRating: 4.9,
        amenities: ["Ultra-Fast Wifi", "Free Coffee", "Phone Booths"],
        notes: "Client presentation",
    },
    {
        id: 4,
        spaceName: "Startup Lounge",
        spaceType: "Event Space",
        spaceImage: "/assets/images/office4.jpg",
        startDate: new Date(2024, 0, 18),
        endDate: new Date(2024, 0, 18),
        status: "Completed",
        amount: 120,
        bookingDate: new Date(2024, 0, 15),
        spaceAddress: "321 Startup Ave, Innovation District",
        spaceRating: 4.7,
        amenities: ["High-Speed Wifi", "Sound System", "Catering"],
        notes: "Company networking event",
    },
    {
        id: 5,
        spaceName: "Downtown Hub",
        spaceType: "Hot Desk",
        spaceImage: "/assets/images/office5.jpg",
        startDate: new Date(2024, 0, 10),
        endDate: new Date(2024, 0, 10),
        status: "Cancelled",
        amount: 25,
        bookingDate: new Date(2024, 0, 8),
        spaceAddress: "123 Business St, Downtown",
        spaceRating: 4.8,
        amenities: ["High-Speed Wifi", "Free Coffee", "Parking"],
    },
    ]
    const [user, setUser] = React.useState<UserProfile>(currentUser)
    const [bookings] = React.useState<UserBooking[]>(userBookings)
    const [selectedBooking, setSelectedBooking] = React.useState<UserBooking | null>(null)
    const [isProfileDialogOpen, setIsProfileDialogOpen] = React.useState(false)
    const [isBookingDialogOpen, setIsBookingDialogOpen] = React.useState(false)
    const [profileForm, setProfileForm] = React.useState({
        name: currentUser.name,
        email: currentUser.email,
        phone: currentUser.phone,
        company: currentUser.company,
    })
    const [isReviewDialogOpen, setIsReviewDialogOpen] = React.useState(false)
    const [reviewingBooking, setReviewingBooking] = React.useState<UserBooking | null>(null)
    const [reviewForm, setReviewForm] = React.useState({
      rating: 0,
      review: "",
    })

    const upcomingBookings = bookings.filter((b) => b.status === "Pending" || b.status === "Active")
    const pastBookings = bookings.filter((b) => b.status === "Completed" || b.status === "Cancelled")

    const handleUpdateProfile = () => {
        setUser({ ...user, ...profileForm })
        setIsProfileDialogOpen(false)
    }

    const handleViewBooking = (booking: UserBooking) => {
        setSelectedBooking(booking)
        setIsBookingDialogOpen(true)
    }

    const handleCancelBooking = (bookingId: number) => {
        console.log("Cancelling booking:", bookingId)
    }

    const getStatusBadgeVariant = (status: string) => {
        switch (status) {
            case "Accepted":
                return "bg-blue-600 hover:bg-blue-500"
            case "Completed":
                return "bg-black hover:bg-gray-800"
            case "Pending":
                return "bg-gray-200 text-gray-800 hover:bg-gray-300"
            case "Cancelled":
                return "bg-red-400 text-white hover:bg-red-300"
            default:
                return "bg-gray-200  text-gray-800 hover:bg-gray-300"
        }
    }

    const handleReviewSpace = (booking: UserBooking) => {
        setReviewingBooking(booking)
        setReviewForm({ rating: 0, review: "" })
        setIsReviewDialogOpen(true)
    }
    
    const handleSubmitReview = () => {
        if (reviewForm.rating === 0) {
          alert("Please select a rating")
          return
        }
    
        // In a real app, this would make an API call to submit the review
        console.log("Submitting review:", {
          bookingId: reviewingBooking?.id,
          spaceName: reviewingBooking?.spaceName,
          rating: reviewForm.rating,
          review: reviewForm.review,
        })
    
        setIsReviewDialogOpen(false)
        setReviewingBooking(null)
        setReviewForm({ rating: 0, review: "" })
    
        // Show success message
        alert("Thank you for your review!")
    }

    


    return (
        <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8">
            <div className="flex items-center justify-between">
                <div>
                <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
                <p className="text-gray-600">Manage your bookings and profile</p>
                </div>
                <Dialog open={isProfileDialogOpen} onOpenChange={setIsProfileDialogOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                    <DialogDescription>Update your personal information</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                    <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                        id="name"
                        value={profileForm.name}
                        onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                        />
                    </div>
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                        id="email"
                        type="email"
                        value={profileForm.email}
                        onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                        />
                    </div>
                    <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                        id="phone"
                        value={profileForm.phone}
                        onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                        />
                    </div>
                    <div>
                        <Label htmlFor="company">Company</Label>
                        <Input
                        id="company"
                        value={profileForm.company}
                        onChange={(e) => setProfileForm({ ...profileForm, company: e.target.value })}
                        />
                    </div>
                    </div>
                    <DialogFooter>
                    <Button onClick={handleUpdateProfile}>Save Changes</Button>
                    </DialogFooter>
                </DialogContent>
                </Dialog>
            </div>
            </div>

            {/* User Profile Card */}
            <Card className="mb-8">
            <CardContent className="p-6">
                <div className="flex items-center space-x-6">
                <Avatar className="w-20 h-20">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback className="text-lg">
                    {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                    <h2 className="text-2xl font-bold">{user.name}</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                    <div className="flex items-center">
                        <Mail className="w-4 h-4 mr-2" />
                        {user.email}
                    </div>
                    <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-2" />
                        {user.phone}
                    </div>
                    <div className="flex items-center">
                        <Building className="w-4 h-4 mr-2" />
                        {user.company}
                    </div>
                    <div className="flex items-center">
                        <User className="w-4 h-4 mr-2" />
                        Member since {format(new Date(user.joinDate), "MMM yyyy")}
                    </div>
                    </div>
                </div>
                </div>
            </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
                <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
                <div className="text-2xl font-bold">{user.totalBookings}</div>
                </CardHeader>
            </Card>
            <Card>
                <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Pending Bookings</CardTitle>
                <div className="text-2xl font-bold">{upcomingBookings.length}</div>
                </CardHeader>
            </Card>
            <Card>
                <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">This Month</CardTitle>
                <div className="text-2xl font-bold">
                    {bookings.filter((b) => b.startDate.getMonth() === new Date().getMonth()).length}
                </div>
                </CardHeader>
            </Card>
            </div>

            {/* Bookings Tabs */}
            <Tabs defaultValue="upcoming" className="space-y-6">
            <TabsList>
                <TabsTrigger value="upcoming" className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                Pending Bookings ({upcomingBookings.length})
                </TabsTrigger>
                <TabsTrigger value="history" className="flex items-center">
                <History className="w-4 h-4 mr-2" />
                Booking History ({pastBookings.length})
                </TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="space-y-4">
                {upcomingBookings.length === 0 ? (
                <Card>
                    <CardContent className="p-8 text-center">
                    <CalendarIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No upcoming bookings</h3>
                    <p className="text-gray-600 mb-4">You don't have any upcoming workspace bookings.</p>
                    <Button>Browse Spaces</Button>
                    </CardContent>
                </Card>
                ) : (
                <div className="grid gap-4">
                    {upcomingBookings.map((booking) => (
                    <Card key={booking.id} className="hover:shadow-md transition-shadow h-[190px]">
                        <CardContent className="p-0 pr-6 overflow-hidden">
                        <div className="flex items-center space-x-4">
                            <img
                                src={booking.spaceImage || "/placeholder.svg"}
                                alt={booking.spaceName}
                                className="object-cover h-[190px] w-[190px] "
                            />
                            <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                                <div>
                                <h3 className="font-semibold text-lg">{booking.spaceName}</h3>
                                <div className="flex items-center space-x-2 text-sm text-gray-600">
                                    <Badge variant="outline">{booking.spaceType}</Badge>
                                    <span className="flex items-center">
                                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
                                    {booking.spaceRating}
                                    </span>
                                </div>
                                </div>
                                <Badge className={getStatusBadgeVariant(booking.status)}>{booking.status}</Badge>
                            </div>
                            <div className="text-sm text-gray-600 mb-3">
                                <div className="flex items-center">
                                <CalendarIcon className="w-4 h-4 mr-2" />
                                {format(booking.startDate, "MMM d, yyyy")}
                                </div>
                                
                                <div className="flex items-center">
                                <MapPin className="w-4 h-4 mr-2" />
                                {booking.spaceAddress}
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1 text-lg font-semibold">DH {booking.amount} <p className="text-xs text-gray-600 font-medium" >per day</p></div>
                                <div className="flex space-x-2">
                                <Button variant="outline" size="sm" onClick={() => handleViewBooking(booking)}>
                                    <Eye className="w-4 h-4 mr-1" />
                                    View Details
                                </Button>
                                {booking.status === "Pending" && (
                                    <Button variant="destructive" size="sm" onClick={() => handleCancelBooking(booking.id)}>
                                    <X className="w-4 h-4 mr-1" />
                                    Cancel
                                    </Button>
                                )}
                                </div>
                            </div>
                            </div>
                        </div>
                        </CardContent>
                    </Card>
                    ))}
                </div>
                )}
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
                {pastBookings.length === 0 ? (
                <Card>
                    <CardContent className="p-8 text-center">
                    <History className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No booking history</h3>
                    <p className="text-gray-600">Your completed bookings will appear here.</p>
                    </CardContent>
                </Card>
                ) : (
                <div className="grid gap-4">
                    {pastBookings.map((booking) => (
                    <Card key={booking.id} className="hover:shadow-md transition-shadow h-[190px] box-border">
                        <CardContent className="p-0 pr-6 overflow-hidden">
                        <div className="flex items-center space-x-4" >
                            <img
                                src={booking.spaceImage || "/placeholder.svg"}
                                alt={booking.spaceName}
                                className="object-cover h-[190px] w-[190px] "
                            />
                            <div className="flex-1">
                                <div className="flex items-start justify-between mb-2">
                                    <div>
                                    <h3 className="font-semibold text-lg">{booking.spaceName}</h3>
                                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                                        <Badge variant="outline">{booking.spaceType}</Badge>
                                        <span className="flex items-center">
                                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
                                        {booking.spaceRating}
                                        </span>
                                    </div>
                                    </div>
                                    <Badge className={getStatusBadgeVariant(booking.status)}>{booking.status}</Badge>
                                </div>
                                <div className="text-sm text-gray-600 mb-3">
                                    <div className="flex items-center">
                                    <CalendarIcon className="w-4 h-4 mr-2" />
                                    {format(booking.startDate, "MMM d, yyyy")}
                                    </div>
                                    
                                    <div className="flex items-center">
                                    <MapPin className="w-4 h-4 mr-2" />
                                    {booking.spaceAddress}
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1 text-lg font-semibold">DH {booking.amount} <p className="text-xs text-gray-600 font-medium" >per day</p></div>
                                    <div className="flex space-x-2">
                                    <Button variant="outline" size="sm" onClick={() => handleViewBooking(booking)}>
                                        <Eye className="w-4 h-4 mr-1" />
                                        View Details
                                    </Button>
                                    {booking.status === "Completed" && (
                                        <Button variant="outline" onClick={() => handleReviewSpace(booking)} size="sm">
                                        <Star className="w-4 h-4 mr-1" />
                                        Rate Space
                                        </Button>
                                    )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        </CardContent>
                    </Card>
                    ))}
                </div>
                )}
            </TabsContent>
            </Tabs>

            {/* Booking Details Dialog */}
            <Dialog open={isBookingDialogOpen} onOpenChange={setIsBookingDialogOpen}>
            <DialogContent className="max-w-2xl">
                {selectedBooking && (
                <>
                    <DialogHeader>
                    <DialogTitle>Booking Details</DialogTitle>
                    <DialogDescription>Complete information about your booking</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6">
                    {/* Space Info */}
                    <div className="flex items-center space-x-4">
                        <div className="relative w-24 h-24">
                        <Image
                            src={selectedBooking.spaceImage || "/placeholder.svg"}
                            alt={selectedBooking.spaceName}
                            fill
                            className="object-cover rounded-lg"
                        />
                        </div>
                        <div>
                        <h3 className="text-xl font-semibold">{selectedBooking.spaceName}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="outline">{selectedBooking.spaceType}</Badge>
                            <Badge className={getStatusBadgeVariant(selectedBooking.status)}>{selectedBooking.status}</Badge>
                        </div>
                        <div className="flex items-center mt-2 text-sm text-gray-600">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                            {selectedBooking.spaceRating} rating
                        </div>
                        </div>
                    </div>

                    {/* Booking Details */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                        <Label className="text-sm font-medium text-gray-500">Date</Label>
                        <p className="text-sm">{format(selectedBooking.startDate, "EEEE, MMMM d, yyyy")}</p>
                        </div>
                        <div>
                        <Label className="text-sm font-medium text-gray-500">Time</Label>
                        
                        </div>
                        <div>
                        <Label className="text-sm font-medium text-gray-500">Location</Label>
                        <p className="text-sm">{selectedBooking.spaceAddress}</p>
                        </div>
                        <div>
                        <Label className="text-sm font-medium text-gray-500">Amount</Label>
                        <p className="text-sm font-semibold">${selectedBooking.amount}</p>
                        </div>
                    </div>

                    {/* Amenities */}
                    <div>
                        <Label className="text-sm font-medium text-gray-500 mb-2 block">Amenities</Label>
                        <div className="flex flex-wrap gap-2">
                        {selectedBooking.amenities.map((amenity) => (
                            <Badge key={amenity} variant="secondary" className="text-xs">
                            {amenity}
                            </Badge>
                        ))}
                        </div>
                    </div>

                    {/* Notes */}
                    {selectedBooking.notes && (
                        <div>
                        <Label className="text-sm font-medium text-gray-500 mb-2 block">Notes</Label>
                        <p className="text-sm bg-gray-50 p-3 rounded-lg">{selectedBooking.notes}</p>
                        </div>
                    )}

                    {/* Booking Info */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Booking ID:</span>
                        <span className="font-medium">#{selectedBooking.id.toString().padStart(6, "0")}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm mt-2">
                        <span className="text-gray-500">Booked on:</span>
                        <span>{format(selectedBooking.bookingDate, "MMM d, yyyy")}</span>
                        </div>
                    </div>
                    </div>
                    <DialogFooter>
                    <Button variant="outline" onClick={() => setIsBookingDialogOpen(false)}>
                        Close
                    </Button>
                    {selectedBooking.status === "Pending" && (
                        <Button variant="destructive" onClick={() => handleCancelBooking(selectedBooking.id)}>
                        Cancel Booking
                        </Button>
                    )}
                    </DialogFooter>
                </>
                )}
            </DialogContent>
            </Dialog>

            {/* Review */}

            <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
          <DialogContent className="max-w-lg">
            {reviewingBooking && (
              <>
                <DialogHeader>
                  <DialogTitle>Rate Your Experience</DialogTitle>
                  <DialogDescription>Share your feedback about {reviewingBooking.spaceName}</DialogDescription>
                </DialogHeader>
                <div className="space-y-6 py-4">
                  {/* Space Info */}
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="relative w-12 h-12">
                      <Image
                        src={reviewingBooking.spaceImage || "/placeholder.svg"}
                        alt={reviewingBooking.spaceName}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium">{reviewingBooking.spaceName}</h4>
                      <p className="text-sm text-gray-600">{reviewingBooking.spaceType}</p>
                      <p className="text-xs text-gray-500">{format(reviewingBooking.startDate, "MMM d, yyyy")}</p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div>
                    <Label className="text-sm font-medium mb-3 block">How would you rate this space? *</Label>
                    <div className="flex items-center space-x-3">
                      <StarRating
                        rating={reviewForm.rating}
                        onRatingChange={(rating) => setReviewForm({ ...reviewForm, rating })}
                      />
                      <span className="text-sm text-gray-600">
                        {reviewForm.rating === 0 && "Select a rating"}
                        {reviewForm.rating === 1 && "Poor"}
                        {reviewForm.rating === 2 && "Fair"}
                        {reviewForm.rating === 3 && "Good"}
                        {reviewForm.rating === 4 && "Very Good"}
                        {reviewForm.rating === 5 && "Excellent"}
                      </span>
                    </div>
                  </div>

                  {/* Review Text */}
                  <div>
                    <Label htmlFor="review-text" className="text-sm font-medium mb-2 block">
                      Share your experience (optional)
                    </Label>
                    <Textarea
                      id="review-text"
                      placeholder="Tell others about your experience at this space. What did you like? What could be improved?"
                      value={reviewForm.review}
                      onChange={(e) => setReviewForm({ ...reviewForm, review: e.target.value })}
                      rows={4}
                      className="resize-none"
                    />
                    <p className="text-xs text-gray-500 mt-1">{reviewForm.review.length}/500 characters</p>
                  </div>

                  {/* Review Guidelines */}
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <h5 className="text-sm font-medium text-blue-900 mb-1">Review Guidelines</h5>
                    <ul className="text-xs text-blue-800 space-y-1">
                      <li>• Be honest and constructive in your feedback</li>
                      <li>• Focus on the space, amenities, and service</li>
                      <li>• Avoid personal information or inappropriate content</li>
                    </ul>
                  </div>
                </div>
                <DialogFooter className="flex items-center justify-between">
                  <Button variant="outline" onClick={() => setIsReviewDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSubmitReview} disabled={reviewForm.rating === 0} className="min-w-[100px]">
                    Submit Review
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
        </div>
        </div>
    )
}

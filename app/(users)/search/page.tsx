"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MapPin, Phone, Star, Users, X } from "lucide-react"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import dynamic from 'next/dynamic';
// import Map from "@/components/map"
import { Checkbox } from "@/components/ui/checkbox"
import axios from "axios"
import { ip, port } from "@/hooks/hosts"
import { MessagePop } from "@/components/message-pop"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { differenceInDays, format } from "date-fns"
import { formatAmenity } from "@/hooks/imports"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

// const reviews = [
//   {
//     firstName: "Alice",
//     lastName: "Johnson",
//     date: "2025-07-01",
//     rating: 4,
//     review: "Great space, clean and well-equipped. Will definitely book again!"
//   },
//   {
//     firstName: "Mark",
//     lastName: "Smith",
//     date: "2025-06-20",
//     rating: 5,
//     review: "Absolutely perfect experience. The staff were very helpful!"
//   },
//   {
//     firstName: "Sara",
//     lastName: "Doe",
//     date: "2025-06-10",
//     rating: 3,
//     review: ""
//   },
// ]
const Map = dynamic(() => import('@/components/map'), {
  ssr: false,
});
const coworkingSpaces = [
  {
    id: 1,
    type:1,
    name: "Casablanca Co-Work Hub",
    address: "27 Rue Ibnou Majat, Maarif, Casablanca",
    price: 120,
    description: "Modern coworking space in the heart of Casablanca, ideal for freelancers and startups.",
    rating: 4.6,
    reviews: 85,
    images: [
      "/assets/images/office1.jpg",
      "/placeholder.svg?height=400&width=600g"
    ],
    amenities: ["WiFi", "Meeting Rooms", "Coffee", "Printing", "Air Conditioning"],
    capacity: 40,
    availability: "Available",
    lat: 33.5883,
    lng: -7.6114
  },
  {
    id: 2,
    type:1,
    name: "Rabat Innovation Lab",
    address: "12 Avenue Fal Ould Oumeir, Agdal, Rabat",
    price: 100,
    description: "A collaborative space in Rabat tailored for tech teams, designers, and digital nomads.",
    rating: 4.7,
    reviews: 73,
    images: [
      "/assets/images/office2.jpg",
      "/placeholder.svg?height=400&width=600"
    ],
    amenities: ["WiFi", "Private Booths", "Library", "Terrace", "Café"],
    capacity: 35,
    availability: "Available",
    lat: 34.0209,
    lng: -6.8416
  },
  {
    id: 3,
    type:1,
    name: "Marrakech Creative Space",
    address: "5 Derb El Ferrane, Medina, Marrakech",
    price: 90,
    description: "Beautifully designed coworking hub with traditional Moroccan architecture and modern facilities.",
    rating: 4.8,
    reviews: 112,
    images: [
      "/assets/images/office3.jpg",
      "/placeholder.svg?height=400&width=600"
    ],
    amenities: ["WiFi", "Tea Room", "Open Desk", "Events Area", "Community Kitchen"],
    capacity: 30,
    availability: "Available",
    lat: 31.6295,
    lng: -7.9811
  },
  {
    id: 4,
    type:1,
    name: "Tangier Work Loft",
    address: "10 Boulevard Pasteur, Tangier",
    price: 95,
    description: "Trendy coworking spot overlooking the strait, great for remote work with ocean vibes.",
    rating: 4.5,
    reviews: 61,
    images: [
      "/assets/images/office4.jpg",
      "/placeholder.svg?height=400&width=600"
    ],
    amenities: ["WiFi", "Lounge Area", "Snacks", "Conference Room", "Bike Parking"],
    capacity: 25,
    availability: "Available",
    lat: 35.7595,
    lng: -5.8339
  },
  {
    id: 5,
    type:1,
    name: "Agadir Tech Nest",
    address: "Rue Abou Alaa Zahr, Talborjt, Agadir",
    price: 85,
    description: "A calm and productive coworking spot with beach proximity and strong community vibes.",
    rating: 4.4,
    reviews: 49,
    images: [
      "/assets/images/office5.jpg",
      "/placeholder.svg?height=400&width=600"
    ],
    amenities: ["WiFi", "Phone Booths", "Kitchen", "Lockers", "Chill Zone"],
    capacity: 20,
    availability: "Available",
    lat: 30.4278,
    lng: -9.5981
  }
]

interface SpaceType {
  id: string
  type: string
  name: string
  address: string
  price: number
  description: string
  rating: number
  reviews: number
  images: string[]
  amenities: string[]
  capacity: number
  availability: boolean
  lat: number
  lng: number
  city: string
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

interface reviewType{
  firstName: string
  lastName: string
  date: string
  rating: number
  review: string
}

interface RawReview{
  comment: string
  createdAt: string
  id: string
  rating: number
  reviewerId: string
  spaceId: string
}

interface RawUser{
  id: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  isVerified: string
  createdAt: string
  updatedAt: string
}

const officeTypes = [
  "All",
  "Office",
  "Meeting Room",
  "Coworking Space",
  "Event Space",
  "Confrence Room",
  "Workshop Space"
]

interface ChatRefType{
  selectSpace : (lat : number, lng: number,id: string) => void;
  type:1,
  deSelectSpace : () => void
}

export default function SearchPage() {
  const [spaces, setSpaces] = useState<SpaceType[]>([])
  const [spaceSelected, setSpaceSelected] = useState<string>("")
  const [cityFilter, setCityFilter] = useState<string>("all")
  const [capacityFilter, setCapacityFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<string>("ALL")
  const [sort, setSort] = useState<string>("")
  const [availableFilter, setAvailableFilter] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const mapRef = useRef<ChatRefType|null>(null);
  const [selectedSpace, setSelectedSpace] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [height,setHeight] = useState(0)
  // const height = typeof window === undefined?window.innerHeight:0
  const [token,setToken] = useState<string | null>(null)
  const [message,setMessage] = useState<null|{type:"good" | "error" | "warning",message:string}>(null)
  const [startDateTime, setStartDateTime] = useState("")
  const [endDateTime, setEndDateTime] = useState("")
  const [isBooking, setIsBooking] = useState(false)

  const [reviews, setReviews] = useState<reviewType[]>([])


  const start = startDateTime ? new Date(startDateTime) : null
  const end = endDateTime ? new Date(endDateTime) : null

  const totalHours = start && end
    ? Math.max((end.getTime() - start.getTime()) / (1000 * 60 * 60), 0)
    : 0

  useEffect(()=>{
    setHeight(window.innerHeight)
    const t = localStorage.getItem('token')
      if(!t){
        window.location.assign('/login')
      }
    setToken(t)
    if (t) {
      getSpaces(t)
    }
  },[])


  function parseToSpaceType(raw: RawSpace): SpaceType {
    return {
      city:raw.city,
      id: raw.id, 
      type: raw.spaceType,
      name: raw.name,
      address: raw.address,
      price: raw.pricePerHour,
      description: raw.description,
      rating: 5,
      reviews: 0,
      images: raw.imageUrls,
      amenities: raw.amenities.map((a)=>formatAmenity(a)),
      capacity: raw.capacity,
      availability: raw.isAvailable,
      lat: raw.latitude,
      lng: raw.longitude,
    };
  }

  const getSpaces = (tkn : string) =>{
    axios.get(`http://${ip}:${port}/api/v1/spaces`,{
      headers: {
        'Authorization': `Bearer ${tkn}`
      },
    }).then((res)=>{
      console.log(res.data)
      setSpaces(res.data.content.map((s : RawSpace)=>parseToSpaceType(s)))
    })
  }

  const getSpacesFiltered = (filters : string[]) =>{
    console.log(filters)
    let filter = ''
    if (filters[0] === "city" && filters[1] !== "all") {
      filter += `&city=${ filters[1]}`
    }
    if (filters[0] === "type" && filters[1] !== "ALL") {
      filter += `&type=${ filters[1]}`
    }
    if (filters[0] === "capacity" && filters[1] !== "all") {
      if( filters[1] === "10") filter += `&minCapacity=0&maxCapacity=10`
      if( filters[1] === "25") filter += `&minCapacity=11&maxCapacity=25`
      if( filters[1] === "50") filter += `&minCapacity=26&maxCapacity=50`
      if( filters[1] === "+") filter += `&minCapacity=51`
    }
    if (filters[0] === "sort" && filters[1] !== "all") {
      filter += `&sortBy=${filters[1]}&sortDir=asc`
    }
    if (filters[0] === "available" && filters[1] !== "false") {
      filter += '&availableOnly=true'
    }

    axios.get(`http://${ip}:${port}/api/v1/spaces?address=${filter}`,{
      headers: {
        'Authorization': `Bearer ${token}`
      },
    }).then((res)=>{
      console.log(res.data)
      setSpaces(res.data.content.map((s : RawSpace)=>parseToSpaceType(s)))
    })
  }

  function deformatAmenity(str: string): string {
      return str
        .split(' ')
        .map(word => word.toUpperCase())
        .join('_')
  }
  
  const selectedSpaceData = selectedSpace ? spaces.find((space) => space.id === selectedSpace) : null

  const selectSpace = (space : SpaceType) => {
    setSelectedSpace(space.id)
    setIsModalOpen(true)
    if (innerWidth >= 1024) {
      mapRef.current?.selectSpace(space.lat, space.lng,space.id)
    }
    getReviews(space.id)
  }

  const bookSpace = (space : SpaceType) =>{
    setIsBooking(true)
    setSpaceSelected(space.id)

    
  }
  const sendBook = () =>{
    if (spaceSelected === "") return
    const data = {
      "space_id": spaceSelected,
      "start_time": format(startDateTime,"yyyy-MM-dd'T'HH:mm:ss"),
      "end_time": format(endDateTime,"yyyy-MM-dd'T'HH:mm:ss")
    }
    axios.post(`http://${ip}:${port}/api/v1/bookings`,data,{
      headers: {
        'Authorization': `Bearer ${token}`
      },
    }).then((res)=>{
      console.log(res.data)
      setMessage({type:"good",message:"Book Request Sent !"})
      setTimeout(()=>{
          setMessage(null)
      },5000)
      setIsBooking(false)
      setSelectedSpace(null)
    }).catch((res)=>{
      setMessage({type:"error",message:"They're was a booking error !"})
      setTimeout(()=>{
          setMessage(null)
      },5000)
      console.log(res)
    })
    
  }

  const getReviews = (id:string) =>{
    setReviews([])
    axios.get(`http://${ip}:${port}/api/v1/reviews/${id}`,{
      headers: {
        'Authorization': `Bearer ${token}`
      },
    }).then((res)=>{
      console.log(res.data)
      const rv = res.data.content
      rv.forEach(async(r : RawReview ) => {
          const user : {data : RawUser} = await axios.get(`http://${ip}:${port}/api/v1/users/${r.reviewerId}`,{
              headers: {
                  Authorization: `Bearer ${token}`
                }
          })
          setReviews(prev=>[...prev,{
            firstName:user.data.firstName,
            lastName:user.data.lastName,
            review:r.comment,
            rating:r.rating,
            date:r.createdAt
          }])
    })
      
    }).catch((res)=>{
    })
  }

  const filteredSpaces = spaces
  .filter(s=>s.name.toLowerCase().includes(searchQuery.toLowerCase()))
  // .filter(s=> (s.city.toLowerCase() === cityFilter.toLowerCase()) || cityFilter === "all")
  // .filter(s=> capacityFilter === "all" || (capacityFilter === "10" && s.capacity <= 10) || (capacityFilter === "25" && s.capacity > 10 && s.capacity <= 25) || (capacityFilter === "50" && s.capacity > 25 && s.capacity <= 50) || (capacityFilter === "+" && s.capacity > 50))
  // .filter(s=> typeFilter === "ALL" || s.type === typeFilter)
  

  console.log('ss',filteredSpaces)

  return (
    <div className="overflow-y-hidden bg-gray-50 hide-scrollbar">
      <div className="relative flex flex-col lg:flex-row overflow-y-scroll lg:overflow-y-hidden hide-scrollbar" style={{height:height-65}}>
        {message && <MessagePop type={message.type} message={message.message} />}
        
        <div className="w-full lg:w-1/2 flex flex-col">
          
          <div className="bg-white p-6 border-b">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Find Coworking Spaces</h1>

            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4" >
                <div>
                  <Label htmlFor="location">Name</Label>
                  <Input
                    id="location"
                    placeholder="Enter space name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div>
                  <Label>City</Label>
                  <Select onValueChange={(v)=>{getSpacesFiltered(['city',v])}} >
                    <SelectTrigger>
                      <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="Rabat">Rabat</SelectItem>
                      <SelectItem value="Casablanca">Casablanca</SelectItem>
                      <SelectItem value="Tangier">Tangier</SelectItem>
                      <SelectItem value="Agadir">Agadir</SelectItem>
                      <SelectItem value="Marrakech">Marrakech</SelectItem>
                      <SelectItem value="Fez">Fez</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Space Type</Label>
                  <Select onValueChange={(v)=>{getSpacesFiltered(['type',v])}} >
                    <SelectTrigger>
                      <SelectValue placeholder="Any type" />
                    </SelectTrigger>
                    <SelectContent>
                      {
                        officeTypes.map((t)=><SelectItem key={t} value={deformatAmenity(t)}>{t}</SelectItem>)
                      }
                      
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Capacity</Label>
                  <Select onValueChange={(v)=>{getSpacesFiltered(['capacity',v])}}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any size</SelectItem>
                      <SelectItem value="10">1-10 people</SelectItem>
                      <SelectItem value="25">11-25 people</SelectItem>
                      <SelectItem value="50">26-50 people</SelectItem>
                      <SelectItem value="+">50+ people</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 hide-scrollbar">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">{spaces.length} spaces found</p>
                <Select onValueChange={(v)=>{getSpacesFiltered(['sort',v])}} >
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">No Sort</SelectItem>
                    <SelectItem value="createdAt">Date</SelectItem>
                    <SelectItem value="area">Area</SelectItem>
                    <SelectItem value="capacity">Capacity</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex items-center gap-2">
                  <Checkbox checked={availableFilter} onCheckedChange={(checked)=>{setAvailableFilter(!!checked);getSpacesFiltered(['available',!!checked?'true':'false'])}} className="border-gray-600 data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700" />
                  <Label className="text-gray-600">Show Only Available</Label>
                </div>
              </div>

              {filteredSpaces.map((space) => (
                <Card
                  key={space.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedSpace === space.id ? "ring-2 ring-blue-500" : ""
                  }`}
                  onClick={() => selectSpace(space)}
                >
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      <div className="relative flex-shrink-0">
                        <img
                          src={space.images[0] || "/placeholder.svg"}
                          alt={space.name}
                          className="rounded-l-lg  w-full md:w-[170px] h-[170px]  object-cover"
                        />
                      </div>
                      <div className="flex-1 p-4">
                        <div className="flex flex-col md:flex-row items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-lg">{space.name}</h3>
                            <p style={{textOverflow:'ellipsis',overflow:'hidden',width:'100%',whiteSpace:'nowrap'}} className="text-sm text-gray-600 flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {space.address}
                            </p>
                          </div>
                          <div className="flex items-center md:items-end text-right flex-row md:flex-col">
                            <p className="text-xl font-bold">DH {space.price}</p>
                            <p className="text-sm text-gray-600 ml-2 md:ml-0">per hour</p>
                          </div>
                        </div>

                        <div className="flex items-center mb-2">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="ml-1 text-sm font-medium">{space.rating}</span>
                            <span className="ml-1 text-sm text-gray-600">({space.reviews} reviews)</span>
                          </div>
                          <Badge
                            variant={space.availability? "default" : "secondary"}
                            className="ml-auto"
                          >
                            {space.availability?'Available':'Booked'}
                          </Badge>
                        </div>

                        <div className="flex items-center text-sm text-gray-600 mb-2">
                          <Users className="w-4 h-4 mr-1" />
                          <span>Up to {space.capacity} people</span>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {space.amenities.slice(0, 3).map((amenity) => (
                            <Badge key={amenity} variant="outline" className="text-xs">
                              {amenity}
                            </Badge>
                          ))}
                          {space.amenities.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{space.amenities.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

              
        </div>


        { selectedSpaceData &&( <div className="absolute animate-slide-in-left h-full flex flex-col bg-white" style={{width:innerWidth>=1024?innerWidth/2:innerWidth,height:height-65}}>
                
                <div className="flex items-center justify-between p-4 border-b bg-white">
                  <Button variant="ghost" size="sm" onClick={()=>{setSelectedSpace(null);mapRef.current?.deSelectSpace()}} className="flex items-center">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to results
                  </Button>
                  <Button variant="ghost" size="sm" onClick={()=>{setSelectedSpace(null);mapRef.current?.deSelectSpace()}}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{selectedSpaceData.name}</h2>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{selectedSpaceData.address}</span>
                    </div>
                  </div>

                  
                  <div className="relative h-48">
                    <Image
                      src={selectedSpaceData.images[0] || "/placeholder.svg"}
                      alt={selectedSpaceData.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>

                  
                  <div className="grid grid-cols-3 gap-2">
                    {selectedSpaceData.images.slice(1, 4).map((image, index) => (
                      <div key={index} className="relative h-20">
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`${selectedSpaceData.name} ${index + 2}`}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                    ))}
                  </div>

                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center mb-4">
                        <div className="text-3xl font-bold text-blue-600">DH {selectedSpaceData.price}</div>
                        <div className="text-sm text-gray-600">per hour</div>
                      </div>

                      <div className="space-y-3 text-sm mb-4">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                            Rating
                          </span>
                          <span>
                            {selectedSpaceData.rating} ({selectedSpaceData.reviews} reviews)
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            Capacity
                          </span>
                          <span>Up to {selectedSpaceData.capacity} people</span>
                        </div>

                        
                      </div>

                      <Button onClick={()=>bookSpace(selectedSpaceData)} className="w-full mb-2" size="lg">
                        Book Now
                      </Button>

                      <Button variant="outline" className="w-full">
                        Contact Space
                      </Button>
                    </CardContent>
                  </Card>

                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">About this space</h3>
                    <p className="text-gray-600">{selectedSpaceData.description}</p>
                  </div>

                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Amenities</h3>
                    <div className="grid grid-cols-1 gap-2">
                      {selectedSpaceData.amenities.map((amenity) => (
                        <div key={amenity} className="flex items-center">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                          <span className="text-sm">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-2" />
                        <span>+212 123456789</span>
                      </div>
                    </div>
                  </div>

                  
                  <Badge
                    variant={selectedSpaceData.availability? "default" : "secondary"}
                    className="justify-center py-2 mr-2"
                  >
                    {selectedSpaceData.availability?"Available":"Booked"}
                  </Badge>
                  <Badge
                    variant={"default"}
                    className="justify-center py-2"
                  >
                    {formatAmenity(selectedSpaceData.type)}
                  </Badge>

                  <div>
                    <h3 className="text-xl font-semibold mb-3">Reviews</h3>
                    <ScrollArea className="h-72 w-full rounded-md border p-4">
                      <div className="space-y-4">
                        {reviews.map((r, i) => (
                          <Card key={i} className="border shadow-sm">
                            <CardHeader className="flex flex-row items-center space-x-4 p-4">
                              <Avatar>
                                <AvatarFallback>{r.firstName[0].toUpperCase()}{r.lastName[0].toUpperCase()}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <p className="font-medium">{r?.firstName[0].toUpperCase()}{r?.firstName.slice(1)} {r?.lastName[0].toUpperCase()}{r?.lastName.slice(1)}</p>
                                <p className="text-xs text-gray-500">{format(new Date(r.date),"dd MMM yyyy")}</p>
                              </div>
                              <div className="flex items-center gap-1">
                                {Array.from({ length: 5 }).map((_, index) => (
                                  <Star
                                    key={index}
                                    className={`h-4 w-4 ${
                                      index < r.rating ? "text-yellow-400" : "text-gray-300"
                                    }`}
                                    fill={index < r.rating ? "currentColor" : "none"}
                                  />
                                ))}
                              </div>
                            </CardHeader>
                            <CardContent className="text-sm text-gray-700 px-4 pb-4">
                              {r.review}
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                </div>
        </div>)}

        
        <div className="hidden lg:block w-1/2 relative">
          <div className="h-full  relative">
           
            
            <div className="flex items-center justify-center">
              <div >
                <Map locations={filteredSpaces} onMarkerClick={(s : SpaceType)=> setSelectedSpace(s.id)} bookSpace={bookSpace} ref={mapRef} />
              </div>
            </div>
            <div style={{position:'absolute',top:0,left:0,height:'100%',width:'100%',backgroundColor:'#d4dadc',pointerEvents:'none'}} >
            </div>

            

            
          </div>
        </div>
      </div>
      <div style={{zIndex:99999}} >
        {isBooking && <div className="w-screen h-screen bg-black fixed top-0 left-0 opacity-40" style={{zIndex:99998}} ></div>}
        <Dialog open={isBooking} onOpenChange={setIsBooking} >
          <DialogContent className="max-w-sm" style={{zIndex:99999}}>
            <DialogHeader>
              <DialogTitle>Select Booking Time</DialogTitle>
            </DialogHeader>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="start">Start Date & Time</label>
                <input
                  type="datetime-local"
                  id="start"
                  className="border rounded px-3 py-2"
                  value={startDateTime}
                  onChange={(e) => setStartDateTime(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="end">End Date & Time</label>
                <input
                  type="datetime-local"
                  id="end"
                  className="border rounded px-3 py-2"
                  value={endDateTime}
                  onChange={(e) => setEndDateTime(e.target.value)}
                />
              </div>

              <div className="mt-2 text-sm text-muted-foreground">
                {totalHours > 0
                  ? `Total: ${totalHours.toFixed(1)} hour${totalHours !== 1 ? "s" : ""} × $${selectedSpaceData?.price} = $${(selectedSpaceData?selectedSpaceData.price*totalHours:0).toFixed(2)}`
                  : "Select valid start and end times to calculate total."}
              </div>

              <Button onClick={()=>sendBook()} className="bg-blue-600 hover:bg-blue-500" disabled={totalHours === 0}>Confirm Booking</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
        
    </div>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
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
import { Textarea } from "@/components/ui/textarea"
import { Plus, Edit, Trash2, MapPin, Users, Star, ImageIcon, X } from "lucide-react"
import Image from "next/image"
import { Search } from "lucide-react"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarInput,
} from "@/components/ui/sidebar"
// import LocationPicker from "@/components/location-picker"
import FilterSelector from "./filter-selector"
import axios from "axios"
import { ip, port } from "@/hooks/hosts"
import dynamic from "next/dynamic"
import { MessagePop } from "./message-pop"
import { useEffect } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ScrollArea } from "@radix-ui/react-scroll-area"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { format } from "date-fns"

const LocationPicker = dynamic(() => import('@/components/location-picker'), {
  ssr: false,
});

// Space type interface
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
  city:string
  area:number
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

interface RawReview{
  comment: string
  createdAt: string
  id: string
  rating: number
  reviewerId: string
  spaceId: string
}

// Space type mappings
const officeTypes = [
  "Office",
  "Meeting Room",
  "Coworking Space",
  "Event Space",
  "Confrence Room",
  "Workshop Space"
]

const availabilityOptions = ["Available", "Limited", "Maintenance", "Unavailable"]

// Sample spaces data with new interface
// const initialSpaces: SpaceType[] = [
//   {
//     id: 1,
//     type: 1, // Hot Desk
//     name: "Downtown Hub",
//     address: "123 Business St, Downtown",
//     price: 25,
//     description: "A modern coworking space in the heart of downtown, perfect for entrepreneurs and remote workers.",
//     rating: 4.8,
//     reviews: 124,
//     images: [
//       "/placeholder.svg?height=200&width=300",
//       "/placeholder.svg?height=200&width=300",
//       "/placeholder.svg?height=200&width=300",
//     ],
//     amenities: ["High-Speed Wifi", "Free Coffee", "Parking"],
//     capacity: 50,
//     availability: "Available",
//     lat: 40.7128,
//     lng: -74.006,
//   },
//   {
//     id: 2,
//     type: 2, // Private Office
//     name: "Creative Space",
//     address: "456 Art District, Midtown",
//     price: 30,
//     description: "An inspiring creative workspace designed for artists, designers, and creative professionals.",
//     rating: 4.6,
//     reviews: 89,
//     images: ["/placeholder.svg?height=200&width=300", "/placeholder.svg?height=200&width=300"],
//     amenities: ["High-Speed Wifi", "Free Coffee", "Printing"],
//     capacity: 30,
//     availability: "Available",
//     lat: 40.7589,
//     lng: -73.9851,
//   },
//   {
//     id: 3,
//     type: 3, // Meeting Room
//     name: "Tech Valley",
//     address: "789 Innovation Ave, Tech District",
//     price: 35,
//     description: "A cutting-edge tech-focused coworking space with the latest technology and amenities.",
//     rating: 4.9,
//     reviews: 156,
//     images: ["/placeholder.svg?height=200&width=300"],
//     amenities: ["Ultra-Fast Wifi", "Free Coffee", "Phone Booths"],
//     capacity: 75,
//     availability: "Maintenance",
//     lat: 40.7505,
//     lng: -73.9934,
//   },
// ]

const coworkingAmenities = [
  "High-speed Wi-Fi",
  "Ergonomic Chairs",
  "Standing Desks",
  "Private Offices",
  "Meeting Rooms",
  "Conference Rooms",
  "Phone Booths",
  "Printing and Scanning Facilities",
  "Reception Services",
  "Mail and Package Handling",
  "Coffee and Tea Stations",
  "Kitchenette",
  "Onsite Café or Snack Bar",
  "Lounge Areas",
  "Outdoor Seating",
  "Event Spaces",
  "Lockers and Storage",
  "24/7 Access",
  "Security Cameras",
  "Air Conditioning",
  "Parking Spaces",
  "Bike Storage",
  "Showers",
  "Community Events",
  "Networking Opportunities",
  "IT Support",
  "Cleaning Services",
  "Accessibility Features",
  "Pet-friendly Areas"
];

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

export default function SpacesPage({token}:{token:string}) {
  const [spaces, setSpaces] = useState<SpaceType[]>([])
  const [spaceSelected, setSpaceSelected] = useState<SpaceType | null>(null)
  const [ratingAvg,setRatingAvg] = useState(0)
  const [spaceName, setSpaceName] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isMapShown, setIsMapShown] = useState(false)
  const [editingSpace, setEditingSpace] = useState<SpaceType | null>(null)
  const [AddPositionVar, setAddPositionVar] = useState<[number,number] | null>(null);
  const [selectedAmeneties, setSelectedAmeneties] = useState<string[]>([])
  const [message,setMessage] = useState<null|{type:"good" | "error" | "warning",message:string}>(null)
  const [openSheet, setOpenSheet] = useState(false)
  const [reviews, setReviews] = useState<reviewType[]>([])

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    price: "",
    capacity: "",
    type: "",
    availability: "Available",
    amenities: "",
    description: "",
    images: [],
    lat: "",
    lng: "",
    area: 0,
    discount:0,
    city:""
  })

  useEffect(()=>{
    getSpaces()
    getReviews()
  },[])

  function formatAmenity(amenity: string): string {
    return amenity
      .toLowerCase()                  
      .split('_')                    
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');                    
  }


  function parseToSpaceType(raw: RawSpace): SpaceType {
    return {
      id: raw.id, 
      type: formatAmenity(raw.spaceType),
      name: raw.name,
      city: raw.city,
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
      area:raw.area
    };
  }


  const getSpaces = () =>{
    axios.get(`http://${ip}:${port}/api/v1/spaces`,{
      headers: {
        'Authorization': `Bearer ${token}`
      },
    }).then((res)=>{
      console.log(res.data)
      setSpaces(res.data.content.map((s : RawSpace)=>parseToSpaceType(s)))
    })
  }

  
  const handleEditSpace = (space: SpaceType) => {
    setEditingSpace(space)
    setFormData(prev => ({...prev,
      name: space.name,
      address: space.address,
      area: space.area,
      price: space.price.toString(),
      capacity: space.capacity.toString(),
      type: space.type,
      description: space.description,
      images: formData.images,
      lat: space.lat.toString(),
      lng: space.lng.toString(),
      city:space.city
    }))
    setAddPositionVar([Number(space.lat),Number(space.lng)])
    setSelectedAmeneties(space.amenities)
    setIsEditDialogOpen(true)
  }

  const handleUpdateSpace = () => {
    if (editingSpace) {
      const data = {
        "name": formData.name,
        "description": formData.description,
        // "pricePerHour": parseInt(formData.price),
        // "discount": formData.discount,
        // "area": Number(formData.area),
        "capacity": parseInt(formData.capacity),
        // "amenities": formatAmenities(selectedAmeneties),
      }
      console.log(data)
  
      axios.put(`http://${ip}:${port}/api/v1/spaces/${editingSpace.id}`,data,{
        headers: {
          'Authorization': `Bearer ${token}`
        },
      }).then((res)=>{
        console.log(res.data)
        setMessage({type:'good',message:'Space Updated'})
        // console.log('hna')
        setTimeout(()=>{
          setMessage(null)
        },5000)
        getSpaces()
        setEditingSpace(null)
        setIsEditDialogOpen(false)
        resetForm()
      }).catch(()=>{
        setMessage({type:'error',message:'Failed to update the space !'})
        setTimeout(()=>{
          setMessage(null)
        },5000)
      })
    }
    

    
  }


  const resetForm = () => {
    setFormData({
      name: "",
      address: "",
      price: "",
      capacity: "",
      type: "",
      availability: "Available",
      amenities: "",
      description: "",
      images: [],
      lat: "",
      lng: "",
      area:0,
      discount:0,
      city:""
    })
  }

  

  const removeImageField = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index)
    setFormData({
      ...formData,
      images: newImages.length > 0 ? newImages : [],
    })
  }

  function isEmptyValue(value: any): boolean {
    if (value == null) return true;
    if (typeof value === 'string' && value.trim() === '') return true;
    if (Array.isArray(value) && value.length === 0) return true;
    return false;
  }
  
  function hasEmptyValue(obj: Record<string, any>): boolean {
    return Object.values(obj).some(isEmptyValue)
  }


  async function uploadImage(file: File) {
    const img = new FormData()
    console.log(file)
    img.append('file', file)
  
    try {
      
      const response = await axios.post(`http://${ip}:${port}/api/v1/s3/images/upload`, img, {
        headers: {
          'accept': '*/*',
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
      });
  
      return response.data.url;
    } catch (error) {
      console.error('Image upload failed:', error);
      throw error;
    }
  }
  const getUrls = async() : Promise<string[]> =>{
    const promiseUrls = formData.images.map(async img => {
      const url = await uploadImage(img)
      return url
    })
    const urls = await Promise.all(promiseUrls);
    return urls;
  }

  function formatAmenities(arr: string[]): string[] {
    return arr.map(str =>
      str
        .split(' ')
        .map(word => word.toUpperCase())
        .join('_')
    );
  }

  const handleAddSpace = async() => {
    const urls  = await getUrls()
    const data = {
      "name": formData.name,
      "description": formData.description,
      "pricePerHour": parseFloat(formData.price),
      "type": formData.type.split(' ').map(word => word.toUpperCase()).join('_'),
      "discount": formData.discount,
      "area": formData.area,
      "capacity": formData.capacity,
      "address": formData.address,
      "city": formData.city,
      "postalCode": "00001",
      "country": "Morocco",
      "latitude": AddPositionVar?Number(AddPositionVar?.[0].toFixed(6)):null,
      "longitude": AddPositionVar? Number(AddPositionVar?.[1].toFixed(6)):null,
      "amenities": formatAmenities(selectedAmeneties),
      "imageUrls": urls
    }
    console.log(data)

    if (hasEmptyValue(data)) {
      setMessage({type:'warning',message:'You must fill all requirements !'})
      // console.log('hna')
      setTimeout(()=>{
        setMessage(null)
      },5000)
      return
    }
    
    axios.post(`http://${ip}:${port}/api/v1/spaces`,data,{
      headers: {
        'Authorization': `Bearer ${token}`
      },
    }).then((res)=>{
      setMessage({type:'good',message:'Space Added'})
      // console.log('hna')
      setTimeout(()=>{
        setMessage(null)
      },5000)
      setIsAddDialogOpen(false)
      resetForm()
      getSpaces()
    }).catch((res)=>{
      setMessage({type:'error',message:'Failed to add the space !'})
      // console.log('hna')
      setTimeout(()=>{
        setMessage(null)
      },5000)
      console.log(res)
    })


    // setSpaces([...spaces, newSpace])
    // setIsAddDialogOpen(false)
    // resetForm()
  }


  const delete_space = (id:string) =>{
    axios.delete(`http://${ip}:${port}/api/v1/spaces/${id}`,{
      headers: {
        'Authorization': `Bearer ${token}`
      },
    }).then((res)=>{
      getSpaces()
    }).catch(()=>{
      setMessage({type:'error',message:'Failed to delete the space !'})
    })
  }

  const getReviews = () =>{
    axios.get(`http://${ip}:${port}/api/v1/reviews`,{
      headers: {
        'Authorization': `Bearer ${token}`
      },
    }).then((res)=>{
      console.log(res.data)
      const rv = res.data.content
      let rating = 0
      rv.forEach(async(r : RawReview ) => {
          rating += r.rating
      })
      setRatingAvg(rating/rv.length)  
    })
  }

  const getReviewsSpaces = (id:string) =>{
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


  return (
    <div className="space-y-6 p-6">
      {message && <MessagePop type={message.type} message={message.message} />}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Spaces Management</h1>
          <p className="text-gray-600">Manage your coworking spaces</p>
        </div>

        {/*  */}
        {/*  */}
        {/* Add space */}
        {/*  */}
        {/*  */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-500" >
              <Plus className="w-4 h-4 mr-2" />
              Add Space
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Space</DialogTitle>
              <DialogDescription>Create a new coworking space</DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              {/* Basic Information */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Space Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter space name"
                  />
                </div>
                <div>
                  <Label htmlFor="type">Space Type</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {officeTypes.map((value, key) => (
                        <SelectItem key={key} value={value}>
                          {value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe the space and its features"
                  rows={3}
                />
              </div>

              {/* Pricing and Capacity */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Price per hour (DH)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <Label htmlFor="capacity">Capacity</Label>
                  <Input
                    id="capacity"
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                    placeholder="Number of people"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="area">Space in available (m2)</Label>
                  <Input
                    id="area"
                    type="number"
                    step="0.01"
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: parseFloat(e.target.value) })}
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <Label htmlFor="discount">Discount (%)</Label>
                  <Input
                    id="discount"
                    type="number"
                    value={formData.discount}
                    onChange={(e) => setFormData({ ...formData, discount: parseFloat(e.target.value) })}
                    placeholder="Number of people"
                  />
                </div>
              </div>

              {/* Location */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col" >
                  <Label htmlFor="location" className="my-1">Location</Label>
                  <Button onClick={()=>setIsMapShown(true)} className="p-1" >
                      {!AddPositionVar?'Choose Location':`${AddPositionVar[0].toFixed(2)} | ${AddPositionVar[1].toFixed(2)}`}
                  </Button>
                </div>
  
                <div className="mt-0" >
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Enter City Name"
                  />
                </div>
              </div>
              <div className="mt-0" >
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Enter full address"
                  />
              </div>

              {/* Images */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Images</Label>
                  <Button type="button" variant="outline" className="overflow-hidden relative" >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Image
                    <Input type="file" onChange={(event)=>{
                          if(event.target.files?.[0] != null){
                            setFormData(prev=>({...prev,images:[...prev.images,event.target.files[0]]}))
                          }
                      }} className="absolute bg-black w-full opacity-0" />
                  </Button>
                </div>
                <div className="flex space-y-10">
                  {formData.images.map((image, index) => (
                    <Card key={index} className="flex items-center gap-2 relative w-[200px] h-[200px] overflow-hidden">
                      <Image src={URL.createObjectURL(image)}  alt="space pic" width={200} height={200} />
                      {formData.images.length > 0 && (
                        // <Button type="button" variant="outline" size="sm" className="absolute top-2 left-2 p-0" onClick={() => removeImageField(index)}>
                          <X className="absolute top-2 left-2 p-0 h-6 w-6 text-red-500 p-1 bg-white rounded-3xl cursor-pointer border" onClick={() => removeImageField(index)} />
                        // </Button>
                      )}
                    </Card>
                  ))}
                </div>
              </div>

              {/* Amenities and Availability */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="amenities">Amenities</Label>
                  <FilterSelector filters={selectedAmeneties} setFilters={setSelectedAmeneties} label="Add Amenities"  allFilters={coworkingAmenities}/>
                </div>
                <div>
                  <Label htmlFor="availability">Availability</Label>
                  <Select
                    value={formData.availability}
                    onValueChange={(value) => setFormData({ ...formData, availability: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {availabilityOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button  onClick={handleAddSpace}>Add Space</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-5">
            <div className="text-2xl font-bold">{spaces.length}</div>
            <p className="text-sm text-muted-foreground">Total Spaces</p>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-5">
            <div className="text-2xl font-bold">{spaces.filter((s) => s.availability).length}</div>
            <p className="text-sm text-muted-foreground">Available Spaces</p>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-5">
            <div className="flex items-center text-2xl font-bold">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                {ratingAvg.toFixed(1)}
                {/* {initialSpaces.reduce((sum, item) => sum + item.rating, 0)/initialSpaces.length} */}
            </div>
            <p className="text-sm text-muted-foreground">Average rating</p>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-5">
            <div className="text-2xl font-bold">{spaces.reduce((sum, s) => sum + s.capacity, 0)}</div>
            <p className="text-sm text-muted-foreground">Total Capacity</p>
          </CardHeader>
        </Card>
      </div>

      <div className="flex w-full" >
        <SidebarGroup className="p-0 w-full">
          <SidebarGroupContent className="relative">
            <Label htmlFor="search" className="sr-only">
              Search
            </Label>
            <SidebarInput
              id="search"
              placeholder="Search the spaces..."
              className="pl-8"
              onChange={(e)=>setSpaceName(e.target.value)}
              value={spaceName}
            />
            <Search className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />
          </SidebarGroupContent>
        </SidebarGroup>
      </div>

      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/* SPACES */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {spaces.filter(s=>s.name.toUpperCase().includes(spaceName.toUpperCase())).map((space) => (
          <Card key={space.id}>
            <CardHeader className="p-0">
              <div className="relative h-48" onClick={()=>{setSpaceSelected(space);getReviewsSpaces(space.id);setOpenSheet(true)}}>
                <Image
                  src={space.images[0]}
                  alt={space.name}
                  fill
                  className="object-cover rounded-t-lg"
                />
                <Badge
                  className="absolute top-2 right-2"
                  variant={space.availability? "default" : "secondary"}
                >
                  {space.availability?'Available':'Booked'}
                </Badge>
                {space.images.length > 0 && (
                  <Badge className="absolute top-2 left-2" variant="default">
                    <ImageIcon className="w-3 h-3 mr-1" />
                    {space.images.length}
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold text-lg">{space.name}</h3>
                  {/* <div className="flex items-center text-sm">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span>{space.rating}</span>
                    <span className="text-gray-500 ml-1">({space.reviews})</span>
                  </div> */}
                </div>

                <p className="text-sm text-gray-600 flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {space.address}
                </p>

                <p className="text-sm text-gray-600 line-clamp-2">{space.description}</p>

                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold">DH {space.price}/hour</span>
                  <span className="text-sm text-gray-600 flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {space.capacity}
                  </span>
                </div>

              

                <div className="flex flex-wrap gap-1">
                  {space.amenities.slice(0, 3).map((amenity) => (
                    <Badge key={amenity} variant="secondary" className="text-xs">
                      {amenity}
                    </Badge>
                  ))}
                  {space.amenities.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{space.amenities.length - 3} more
                    </Badge>
                  )}
                </div>

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" onClick={() => handleEditSpace(space)} className="flex-1">
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => delete_space(space.id)}
                    className="flex-1"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Dialog */}
      {/* Edit Dialog */}
      {/* Edit Dialog */}
      {/* Edit Dialog */}
      {/* Edit Dialog */}
      {/* Edit Dialog */}
      {/* Edit Dialog */}
      {/* Edit Dialog */}
      {/* Edit Dialog */}
      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Space</DialogTitle>
            <DialogDescription>Update space information</DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
              {/* Basic Information */}
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="name">Space Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter space name"
                  />
                </div>
              </div>

              

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe the space and its features"
                  rows={3}
                />
              </div>

              {/* Pricing and Capacity */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Price per hour (DH)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <Label htmlFor="capacity">Capacity</Label>
                  <Input
                    id="capacity"
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                    placeholder="Number of people"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="area">Space in available (m2)</Label>
                  <Input
                    id="area"
                    type="number"
                    step="0.01"
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: parseFloat(e.target.value) })}
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <Label htmlFor="discount">Discount (%)</Label>
                  <Input
                    id="discount"
                    type="number"
                    value={formData.discount}
                    onChange={(e) => setFormData({ ...formData, discount: parseFloat(e.target.value) })}
                    placeholder="Number of people"
                  />
                </div>
              </div>

              

              

              {/* Amenities and Availability */}
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="amenities">Amenities</Label>
                  <FilterSelector filters={selectedAmeneties} setFilters={setSelectedAmeneties} label="Add Amenities"  allFilters={coworkingAmenities}/>
                </div>
              </div>
            </div>
          <DialogFooter>
            <Button onClick={handleUpdateSpace}>Update Space</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isMapShown} onOpenChange={setIsMapShown} >
        <DialogContent className="overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Choose Location</DialogTitle>
            <DialogDescription>Choose Space Location</DialogDescription>
          </DialogHeader>

          <div>
            <LocationPicker position={AddPositionVar} setPosition={setAddPositionVar} />
          </div>
          <DialogFooter>
            <Button disabled={!AddPositionVar} onClick={()=>setIsMapShown(false)}>Done</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {spaceSelected && <Sheet open={openSheet} onOpenChange={setOpenSheet} >
      <SheetContent className="w-full sm:max-w-[550px] overflow-y-auto">
        <SheetHeader className="mb-4">
          <SheetTitle className="text-xl font-bold">{spaceSelected.name}</SheetTitle>
          <p className="text-muted-foreground text-sm">{spaceSelected.type} in {spaceSelected.city}</p>
        </SheetHeader>

        <ScrollArea className="h-[85vh] pr-4">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-3 rounded-xl overflow-hidden">
              {spaceSelected.images.map((src, i) => (
                <div key={i} className="relative h-[100px] w-full rounded-lg overflow-hidden shadow">
                  <Image
                    src={src}
                    alt={`Image ${i + 1}`}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              ))}
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-1">Description</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {spaceSelected.description}
              </p>
            </div>

            <Separator />

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="font-medium">Price</span>
                <span>DH {spaceSelected.price} / hour</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Capacity</span>
                <span>{spaceSelected.capacity} people</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Area</span>
                <span>{spaceSelected.area} m²</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Availability</span>
                <span>{spaceSelected.availability ? "Available" : "Unavailable"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="text-yellow-500" size={16} />
                <span className="text-sm font-medium">{(reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)} / 5</span>
                <span className="text-xs text-muted-foreground">({spaceSelected.reviews} reviews)</span>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-2">Amenities</h3>
              <div className="flex flex-wrap gap-2">
                {spaceSelected.amenities.map((a, i) => (
                  <Badge key={i} variant="secondary" className="text-xs rounded-full">
                    {a}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />

            <div className="text-sm">
              <h3 className="text-lg font-semibold mb-1">Location</h3>
              <p className="text-muted-foreground">{spaceSelected.address}</p>
              <p className="text-muted-foreground">Lat: {spaceSelected.lat}, Lng: {spaceSelected.lng}</p>
            </div>
          

          <Separator />


          <div>
            <h3 className="text-xl font-semibold mb-3">Reviews <span className="text-gray-400 font-light" >(</span> <span className="text-blue-500" >{reviews.length}</span> <span className="text-gray-400 font-light" >)</span></h3>
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
        </ScrollArea>
      </SheetContent>
      </Sheet>}
    </div>
  )
}

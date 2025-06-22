"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MapPin, Phone, Star, Users, X } from "lucide-react"
import Image from "next/image"
import { useRef, useState } from "react"
import dynamic from 'next/dynamic';
import Map from "@/components/map"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const coworkingSpaces = [
  {
    id: 1,
    name: "Casablanca Co-Work Hub",
    address: "27 Rue Ibnou Majat, Maarif, Casablanca",
    price: 120,
    description: "Modern coworking space in the heart of Casablanca, ideal for freelancers and startups.",
    rating: 4.6,
    reviews: 85,
    images: [
      "/placeholder.svg?height=400&width=600",
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
    name: "Rabat Innovation Lab",
    address: "12 Avenue Fal Ould Oumeir, Agdal, Rabat",
    price: 100,
    description: "A collaborative space in Rabat tailored for tech teams, designers, and digital nomads.",
    rating: 4.7,
    reviews: 73,
    images: [
      "/placeholder.svg?height=400&width=600",
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
    name: "Marrakech Creative Space",
    address: "5 Derb El Ferrane, Medina, Marrakech",
    price: 90,
    description: "Beautifully designed coworking hub with traditional Moroccan architecture and modern facilities.",
    rating: 4.8,
    reviews: 112,
    images: [
      "/placeholder.svg?height=400&width=600",
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
    name: "Tangier Work Loft",
    address: "10 Boulevard Pasteur, Tangier",
    price: 95,
    description: "Trendy coworking spot overlooking the strait, great for remote work with ocean vibes.",
    rating: 4.5,
    reviews: 61,
    images: [
      "/placeholder.svg?height=400&width=600",
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
    name: "Agadir Tech Nest",
    address: "Rue Abou Alaa Zahr, Talborjt, Agadir",
    price: 85,
    description: "A calm and productive coworking spot with beach proximity and strong community vibes.",
    rating: 4.4,
    reviews: 49,
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600"
    ],
    amenities: ["WiFi", "Phone Booths", "Kitchen", "Lockers", "Chill Zone"],
    capacity: 20,
    availability: "Available",
    lat: 30.4278,
    lng: -9.5981
  }
]

interface spaceType{
    id: number;
    name: string;
    address: string;
    price: number;
    description: string;
    rating: number;
    reviews: number;
    images: string[];
    amenities: string[];
    capacity: number;
    availability: string;
    lat: number;
    lng: number;
}

interface ChatRefType{
  selectSpace : (lat : number, lng: number,id: number) => void;
  deSelectSpace : () => void
}

const height = innerHeight
export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [priceRange, setPriceRange] = useState([20, 50])
  const mapRef = useRef<ChatRefType|null>(null);
  const [selectedSpace, setSelectedSpace] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  
  
  const selectedSpaceData = selectedSpace ? coworkingSpaces.find((space) => space.id === selectedSpace) : null

  const selectSpace = (space : spaceType) => {
    setSelectedSpace(space.id)
    setIsModalOpen(true)
    if (innerWidth >= 1024) {
      mapRef.current?.selectSpace(space.lat, space.lng,space.id)
    }
  }
  return (
    <div className="overflow-y-hidden bg-gray-50">
      <div className="flex flex-col lg:flex-row overflow-y-scroll lg:overflow-y-hidden" style={{height:height-64}}>
        
        <div className="w-full lg:w-1/2 flex flex-col">
          
          <div className="bg-white p-6 border-b">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Find Coworking Spaces</h1>

            
            <div className="space-y-4">
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="Enter city or address"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Space Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Any type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hot-desk">Hot Desk</SelectItem>
                      <SelectItem value="dedicated-desk">Dedicated Desk</SelectItem>
                      <SelectItem value="private-office">Private Office</SelectItem>
                      <SelectItem value="meeting-room">Meeting Room</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Capacity</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Any size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 people</SelectItem>
                      <SelectItem value="11-25">11-25 people</SelectItem>
                      <SelectItem value="26-50">26-50 people</SelectItem>
                      <SelectItem value="50+">50+ people</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 hide-scrollbar">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">{coworkingSpaces.length} spaces found</p>
                <Select>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="distance">Distance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {coworkingSpaces.filter(s=>s.address.includes(searchQuery)).map((space) => (
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
                          className="rounded-l-lg  w-full md:w-[170px] h-[170px] md:h-auto object-cover"
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
                            <p className="text-sm text-gray-600 ml-2 md:ml-0">per day</p>
                          </div>
                        </div>

                        <div className="flex items-center mb-2">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="ml-1 text-sm font-medium">{space.rating}</span>
                            <span className="ml-1 text-sm text-gray-600">({space.reviews} reviews)</span>
                          </div>
                          <Badge
                            variant={space.availability === "Available" ? "default" : "secondary"}
                            className="ml-auto"
                          >
                            {space.availability}
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


        { selectedSpaceData &&( <div className="absolute animate-slide-in-left h-full flex flex-col bg-white" style={{width:innerWidth>=1024?innerWidth/2:innerWidth,height:height-64}}>
                
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
                        <div className="text-sm text-gray-600">per day</div>
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

                      <Button className="w-full mb-2" size="lg">
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
                    variant={selectedSpaceData.availability === "Available" ? "default" : "secondary"}
                    className="w-full justify-center py-2"
                  >
                    {selectedSpaceData.availability}
                  </Badge>
                </div>
        </div>)}

        
        <div className="hidden lg:block w-1/2 relative">
          <div className="h-full  relative">
           
            
            <div className="flex items-center justify-center">
              <div >
                <Map locations={coworkingSpaces.filter(s=>s.address.includes(searchQuery))} onMarkerClick={(s : spaceType)=> setSelectedSpace(s.id)} ref={mapRef} />
              </div>
            </div>
            <div style={{position:'absolute',top:0,left:0,height:'100%',width:'100%',backgroundColor:'#d4dadc',pointerEvents:'none'}} >
            </div>

            

            
          </div>
        </div>
      </div>
      
    </div>
  )
}

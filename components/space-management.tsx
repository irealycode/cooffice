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

// Space type interface
interface SpaceType {
  id: number
  type: number
  name: string
  address: string
  price: number
  description: string
  rating: number
  reviews: number
  images: string[]
  amenities: string[]
  capacity: number
  availability: string
  lat: number
  lng: number
}

// Space type mappings
const spaceTypeMap = {
  1: "Hot Desk",
  2: "Private Office",
  3: "Meeting Room",
  4: "Event Space",
  5: "Phone Booth",
  6: "Conference Room",
}

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

export default function SpacesPage({initialSpaces}:{initialSpaces : SpaceType[]}) {
  const [spaces, setSpaces] = useState<SpaceType[]>(initialSpaces)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingSpace, setEditingSpace] = useState<SpaceType | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    price: "",
    capacity: "",
    type: "",
    availability: "Available",
    amenities: "",
    description: "",
    rating: "",
    reviews: "",
    images: [""],
    lat: "",
    lng: "",
  })

  const handleAddSpace = () => {
    const newSpace: SpaceType = {
      id: spaces.length + 1,
      name: formData.name,
      address: formData.address,
      price: Number.parseFloat(formData.price),
      capacity: Number.parseInt(formData.capacity),
      type: Number.parseInt(formData.type),
      availability: formData.availability,
      amenities: formData.amenities
        .split(",")
        .map((a) => a.trim())
        .filter((a) => a),
      description: formData.description,
      rating: Number.parseFloat(formData.rating),
      reviews: Number.parseInt(formData.reviews),
      images: formData.images.filter((img) => img.trim() !== ""),
      lat: Number.parseFloat(formData.lat),
      lng: Number.parseFloat(formData.lng),
    }
    setSpaces([...spaces, newSpace])
    setIsAddDialogOpen(false)
    resetForm()
  }

  const handleEditSpace = (space: SpaceType) => {
    setEditingSpace(space)
    setFormData({
      name: space.name,
      address: space.address,
      price: space.price.toString(),
      capacity: space.capacity.toString(),
      type: space.type.toString(),
      availability: space.availability,
      amenities: space.amenities.join(", "),
      description: space.description,
      rating: space.rating.toString(),
      reviews: space.reviews.toString(),
      images: space.images.length > 0 ? space.images : [""],
      lat: space.lat.toString(),
      lng: space.lng.toString(),
    })
    setIsEditDialogOpen(true)
  }

  const handleUpdateSpace = () => {
    if (!editingSpace) return

    const updatedSpaces = spaces.map((space) =>
      space.id === editingSpace.id
        ? {
            ...space,
            name: formData.name,
            address: formData.address,
            price: Number.parseFloat(formData.price),
            capacity: Number.parseInt(formData.capacity),
            type: Number.parseInt(formData.type),
            availability: formData.availability,
            amenities: formData.amenities
              .split(",")
              .map((a) => a.trim())
              .filter((a) => a),
            description: formData.description,
            rating: Number.parseFloat(formData.rating),
            reviews: Number.parseInt(formData.reviews),
            images: formData.images.filter((img) => img.trim() !== ""),
            lat: Number.parseFloat(formData.lat),
            lng: Number.parseFloat(formData.lng),
          }
        : space,
    )
    setSpaces(updatedSpaces)
    setIsEditDialogOpen(false)
    setEditingSpace(null)
    resetForm()
  }

  const handleDeleteSpace = (id: number) => {
    setSpaces(spaces.filter((space) => space.id !== id))
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
      rating: "",
      reviews: "",
      images: [""],
      lat: "",
      lng: "",
    })
  }

  const addImageField = () => {
    setFormData({
      ...formData,
      images: [...formData.images, ""],
    })
  }

  const removeImageField = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index)
    setFormData({
      ...formData,
      images: newImages.length > 0 ? newImages : [""],
    })
  }

  const updateImageField = (index: number, value: string) => {
    const newImages = [...formData.images]
    newImages[index] = value
    setFormData({
      ...formData,
      images: newImages,
    })
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Spaces Management</h1>
          <p className="text-gray-600">Manage your coworking spaces</p>
        </div>
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
                      {Object.entries(spaceTypeMap).map(([key, value]) => (
                        <SelectItem key={key} value={key}>
                          {value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Enter full address"
                />
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
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="price">Price per day (DH)</Label>
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
                <div>
                  <Label htmlFor="rating">Rating</Label>
                  <Input
                    id="rating"
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                    placeholder="0.0 - 5.0"
                  />
                </div>
                <div>
                  <Label htmlFor="reviews">Reviews Count</Label>
                  <Input
                    id="reviews"
                    type="number"
                    value={formData.reviews}
                    onChange={(e) => setFormData({ ...formData, reviews: e.target.value })}
                    placeholder="Number of reviews"
                  />
                </div>
              </div>

              {/* Location */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="lat">Latitude</Label>
                  <Input
                    id="lat"
                    type="number"
                    step="any"
                    value={formData.lat}
                    onChange={(e) => setFormData({ ...formData, lat: e.target.value })}
                    placeholder="40.7128"
                  />
                </div>
                <div>
                  <Label htmlFor="lng">Longitude</Label>
                  <Input
                    id="lng"
                    type="number"
                    step="any"
                    value={formData.lng}
                    onChange={(e) => setFormData({ ...formData, lng: e.target.value })}
                    placeholder="-74.0060"
                  />
                </div>
              </div>

              {/* Images */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Images</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addImageField}>
                    <Plus className="w-4 h-4 mr-1" />
                    Add Image
                  </Button>
                </div>
                <div className="space-y-2">
                  {formData.images.map((image, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={image}
                        onChange={(e) => updateImageField(index, e.target.value)}
                        placeholder="Image URL"
                        className="flex-1"
                      />
                      {formData.images.length > 1 && (
                        <Button type="button" variant="outline" size="sm" onClick={() => removeImageField(index)}>
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities and Availability */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="amenities">Amenities (comma separated)</Label>
                  <Input
                    id="amenities"
                    value={formData.amenities}
                    onChange={(e) => setFormData({ ...formData, amenities: e.target.value })}
                    placeholder="Wifi, Coffee, Parking, etc."
                  />
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
            <div className="text-2xl font-bold">{spaces.filter((s) => s.availability === "Available").length}</div>
            <p className="text-sm text-muted-foreground">Available Spaces</p>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-5">
            <div className="flex items-center text-2xl font-bold">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                {initialSpaces.reduce((sum, item) => sum + item.rating, 0)/initialSpaces.length}
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
        {spaces.map((space) => (
          <Card key={space.id}>
            <CardHeader className="p-0">
              <div className="relative h-48">
                <Image
                  src={space.images[0] || "/placeholder.svg"}
                  alt={space.name}
                  fill
                  className="object-cover rounded-t-lg"
                />
                <Badge
                  className="absolute top-2 right-2"
                  variant={space.availability === "Available" ? "default" : "secondary"}
                >
                  {space.availability}
                </Badge>
                {space.images.length > 1 && (
                  <Badge className="absolute top-2 left-2" variant="outline">
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
                  <div className="flex items-center text-sm">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span>{space.rating}</span>
                    <span className="text-gray-500 ml-1">({space.reviews})</span>
                  </div>
                </div>

                <p className="text-sm text-gray-600 flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {space.address}
                </p>

                <p className="text-sm text-gray-600 line-clamp-2">{space.description}</p>

                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold">DH {space.price}/day</span>
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
                    onClick={() => handleDeleteSpace(space.id)}
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
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Space</DialogTitle>
            <DialogDescription>Update space information</DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            {/* Basic Information */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-name">Space Name</Label>
                <Input
                  id="edit-name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-type">Space Type</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(spaceTypeMap).map(([key, value]) => (
                      <SelectItem key={key} value={key}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="edit-address">Address</Label>
              <Input
                id="edit-address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div>
                <Label htmlFor="edit-price">Price per day (DH)</Label>
                <Input
                  id="edit-price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-capacity">Capacity</Label>
                <Input
                  id="edit-capacity"
                  type="number"
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-rating">Rating</Label>
                <Input
                  id="edit-rating"
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-reviews">Reviews Count</Label>
                <Input
                  id="edit-reviews"
                  type="number"
                  value={formData.reviews}
                  onChange={(e) => setFormData({ ...formData, reviews: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-lat">Latitude</Label>
                <Input
                  id="edit-lat"
                  type="number"
                  step="any"
                  value={formData.lat}
                  onChange={(e) => setFormData({ ...formData, lat: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-lng">Longitude</Label>
                <Input
                  id="edit-lng"
                  type="number"
                  step="any"
                  value={formData.lng}
                  onChange={(e) => setFormData({ ...formData, lng: e.target.value })}
                />
              </div>
            </div>

            {/* Images */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Images</Label>
                <Button type="button" variant="outline" size="sm" onClick={addImageField}>
                  <Plus className="w-4 h-4 mr-1" />
                  Add Image
                </Button>
              </div>
              <div className="space-y-2">
                {formData.images.map((image, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={image}
                      onChange={(e) => updateImageField(index, e.target.value)}
                      placeholder="Image URL"
                      className="flex-1"
                    />
                    {formData.images.length > 1 && (
                      <Button type="button" variant="outline" size="sm" onClick={() => removeImageField(index)}>
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities and Availability */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-amenities">Amenities (comma separated)</Label>
                <Input
                  id="edit-amenities"
                  value={formData.amenities}
                  onChange={(e) => setFormData({ ...formData, amenities: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-availability">Availability</Label>
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
            <Button onClick={handleUpdateSpace}>Update Space</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

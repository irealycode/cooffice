"use client"
import Logo from "@/components/logo"
import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { MapPin, Users, Wifi, Coffee, Car, Shield } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  const [height,setHeight] = React.useState(0)
  React.useEffect(()=>{
    setHeight(window.innerHeight)
  },[])
  return (
    <div className="min-h-screen">
      {/* Search Card Section */}
      <section style={{height:height-64}} className="relative bg-[url(/assets/images/office1.jpg)] bg-cover bg-center py-20 px-4">
        <div className="absolute left-0 top-0  bg-black opacity-20 w-full h-full" style={{zIndex:0,pointerEvents:'none'}} ></div>
        <div className="max-w-xl mx-auto lg:ml-10 relative" style={{zIndex:10}} >
          {/* Main Search Card */}
          <div className="bg-white rounded-sm shadow-2xl px-6 pt-10 pb-6">
            <div className="text-center mb-8">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center">
                Find Your Perfect
                <Logo width="10" font="5xl" />
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Discover and book premium coworking spaces in your city. From hot desks to private offices.
              </p>
            </div>

            {/* Search Form */}
            <div className="bg-gray-50 rounded-xl p-6 lg:p-8">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* City Selection */}
                <div className="space-y-2">
                  <Label className="block text-sm font-medium text-gray-700">
                    <MapPin className="w-4 h-4 inline mr-2 text-blue-600" />
                    Select City
                  </Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="All cities" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new-york">New York City</SelectItem>
                      <SelectItem value="san-francisco">San Francisco</SelectItem>
                      <SelectItem value="london">London</SelectItem>
                      <SelectItem value="tokyo">Tokyo</SelectItem>
                      <SelectItem value="singapore">Singapore</SelectItem>
                      <SelectItem value="berlin">Berlin</SelectItem>
                      <SelectItem value="toronto">Toronto</SelectItem>
                      <SelectItem value="sydney">Sydney</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Workspace Type */}
                <div className="space-y-2">
                  <Label className="block text-sm font-medium text-gray-700" >
                    <Users className="w-4 h-4 inline mr-2 text-blue-600" />
                    Workspace Type
                  </Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Any type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="office">Office</SelectItem>
                      <SelectItem value="meeting-room">Meeting Room</SelectItem>
                      <SelectItem value="coworking-space">Coworking Space</SelectItem>
                      <SelectItem value="event-space">Event Space</SelectItem>
                      <SelectItem value="confrence-room">Confrence Room</SelectItem>
                      <SelectItem value="workshop-space">Workshop Space</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Search Button */}
                
              </div>
              <div className="space-y-2">
                  <label className="block text-sm font-medium text-transparent">Search</label>
                  <Button asChild size="lg" className="w-full h-12 text-lg font-semibold bg-blue-600 hover:bg-blue-500">
                    <Link href="/search">Find Spaces</Link>
                  </Button>
                </div>

              {/* Quick Stats */}
              {/* <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">500+</div>
                  <div className="text-sm text-gray-600">Locations</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">10K+</div>
                  <div className="text-sm text-gray-600">Happy Members</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">24/7</div>
                  <div className="text-sm text-gray-600">Access</div>
                </div>
              </div> */}
            </div>

            
          </div>
        </div>

      </section>

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Why Choose Our Spaces?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide premium amenities and flexible booking options to help you work at your best.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-0">
                <div className="relative h-48 overflow-hidden rounded-t-sm">
                  <Image
                    src="/assets/images/office2.jpg"
                    alt="Private office"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Private office</h3>
                  <p className="text-gray-600 mb-4">Available offices for teams of any size.</p>
                  <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                    Learn more
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-0">
                <div className="relative h-48 overflow-hidden rounded-t-sm">
                  <Image
                    src="/assets/images/office3.jpg"
                    alt="Private office"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Vibrant Community</h3>
                  <p className="text-gray-600 mb-4">Connect with like-minded professionals, attend networking events, and grow your business network.</p>
                  <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                    Learn more
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-0">
                <div className="relative h-48 overflow-hidden rounded-t-sm">
                  <Image
                    src="/assets/images/office4.jpg"
                    alt="Private office"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Prime Locations</h3>
                  <p className="text-gray-600 mb-4">Strategically located spaces in business districts with easy access to public transportation.</p>
                  <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                    Learn more
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="pb-20 pt-10 px-10">
        <div className="flex items-center justify-center gap-20">
          <div className="w-2/5" >
            <Label className="text-3xl font-bold" >Work Where Ideas <span className="text-blue-600 font-medium" >Connect</span>.</Label>
            <p className="mt-2" >Discover flexible workspaces designed for creativity, focus, and collaboration. Whether you're a freelancer, startup, or enterprise - find your space, your people, and your momentum.</p>
          </div>
          <div className="relative h-80 w-2/5 overflow-hidden">
            <Image
              src="/assets/images/office5.jpg"
              alt="office"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300 rounded-sm"
            />
          </div>
        </div>
        <div className="flex items-center justify-center gap-20 mt-10">
          <div className="relative h-80 w-2/5 overflow-hidden">
            <Image
              src="/assets/images/office6.jpg"
              alt="office"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300 rounded-sm"
            />
          </div>
          <div className="w-2/5" >
            <Label className="text-3xl font-bold" >Built for <span className="text-blue-600 font-medium" >Focus</span>. Wired for <span className="text-blue-600 font-medium" >Growth</span>.</Label>
            <p className="mt-2" >Purposefully designed environments where engineers, designers, and builders can dive deep — with the infrastructure to scale, and the atmosphere to thrive.</p>
          </div>
        </div>
      </section>


      {/* <section className="bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">Ready to Change Your Workflow?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join <b>Thousands</b> of professionals who have found their perfect workspace with us.
          </p>
          <Button asChild size="lg" variant="secondary" className="text-lg px-8">
            <Link href="/search">Start Searching</Link>
          </Button>
        </div>
      </section> */}

      <footer className="bg-gray-900 text-gray-300 py-14 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          
            <Logo width="9" font="3xl" white  />
            

          <div>
            <h3 className="text-white font-semibold mb-3">Spaces</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">Private Offices</a></li>
              <li><a href="#" className="hover:text-white transition">Meeting Rooms</a></li>
              <li><a href="#" className="hover:text-white transition">Confrence Rooms</a></li>
              <li><a href="#" className="hover:text-white transition">Event Spaces</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">About Us</a></li>
              <li><a href="#" className="hover:text-white transition">Our Locations</a></li>
              <li><a href="#" className="hover:text-white transition">Careers</a></li>
              <li><a href="#" className="hover:text-white transition">Press</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3">Support</h3>
            <ul className="space-y-2 text-sm mb-4">
              <li><a href="#" className="hover:text-white transition">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition">Contact Support</a></li>
              <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition">Terms of Use</a></li>
            </ul>
            <div className="flex space-x-4 mt-2">
              <a href="#" className="hover:text-white transition" aria-label="LinkedIn">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8.98h5v15H0v-15zM7.5 8.98H12v2.23c.63-1.14 2.25-2.35 4.62-2.35 4.94 0 5.84 3.25 5.84 7.48v8.64h-5v-7.66c0-1.83-.03-4.18-2.55-4.18s-2.94 1.99-2.94 4.05v7.79h-5v-15z"/>
                </svg>
              </a>
              <a href="#" className="hover:text-white transition" aria-label="Instagram">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.2C6.5 2.2 2.2 6.5 2.2 12S6.5 21.8 12 21.8 21.8 17.5 21.8 12 17.5 2.2 12 2.2zM12 19.6c-4.2 0-7.6-3.4-7.6-7.6S7.8 4.4 12 4.4 19.6 7.8 19.6 12 16.2 19.6 12 19.6zM17 7a1.1 1.1 0 11-2.2 0A1.1 1.1 0 0117 7zM12 7.8A4.2 4.2 0 107.8 12 4.2 4.2 0 0012 7.8zm0 6.6A2.4 2.4 0 119.6 12 2.4 2.4 0 0112 14.4z"/></svg>
              </a>
              <a href="#" className="hover:text-white transition" aria-label="Twitter">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M8 19c11 0 17-9 17-17 0-.3 0-.5 0-.8A12 12 0 0028 1.6a11.8 11.8 0 01-3.4 1 6 6 0 002.7-3.3 12 12 0 01-3.8 1.4A6 6 0 0014 2a6 6 0 00-6 6c0 .5 0 .9.1 1.3A17 17 0 012 2.2a6 6 0 001.9 8A6 6 0 012 9.3v.1a6 6 0 004.8 5.8A6 6 0 014 15.4a6 6 0 0012.3-4.2A12 12 0 0022 3.6 11.9 11.9 0 0124 1"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-700 pt-6 text-sm text-center text-gray-500">
          © 2025 CoOffice. All rights reserved.
        </div>
      </footer>

    </div>
  )
}

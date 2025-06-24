import Logo from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { MapPin, Users, Wifi, Coffee, Car, Shield } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Search Card Section */}
      <section className="relative bg-[url(/assets/images/office1.jpg)] bg-cover bg-center py-20 px-4">
        <div className="absolute left-0 top-0  bg-black opacity-20 w-full h-full" style={{zIndex:0,pointerEvents:'none'}} ></div>
        <div className="max-w-xl mx-auto lg:ml-10 relative" style={{zIndex:10}} >
          {/* Main Search Card */}
          <div className="bg-white rounded-2xl shadow-2xl px-6 pt-10 pb-6">
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

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Why Choose Our Spaces?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide premium amenities and flexible booking options to help you work at your best.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Wifi className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>High-Speed Internet</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Lightning-fast fiber internet with dedicated bandwidth for seamless video calls and file transfers.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Coffee className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>Premium Amenities</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Complimentary coffee, tea, printing services, and fully equipped meeting rooms available 24/7.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>Vibrant Community</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Connect with like-minded professionals, attend networking events, and grow your business network.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle>Prime Locations</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Strategically located spaces in business districts with easy access to public transportation.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Car className="w-6 h-6 text-red-600" />
                </div>
                <CardTitle>Parking Available</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Secure parking spaces available for daily, weekly, and monthly bookings at competitive rates.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-indigo-600" />
                </div>
                <CardTitle>Secure Access</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  24/7 security with keycard access, CCTV monitoring, and secure storage lockers for your belongings.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">Ready to Find Your Workspace?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of professionals who have found their perfect workspace with us.
          </p>
          <Button asChild size="lg" variant="secondary" className="text-lg px-8">
            <Link href="/search">Start Searching</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

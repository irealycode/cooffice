"use client"
import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import React from "react"

import data from "../../(admin)/dashboard/data.json"


import {
    BarChartIcon,
    BookCopy,
    Building2,
    CameraIcon,
    ClipboardListIcon,
    DatabaseIcon,
    FileCodeIcon,
    FileIcon,
    FileTextIcon,
    HelpCircleIcon,
    LayoutDashboardIcon,
    SearchIcon,
    SettingsIcon,
    UsersIcon,
  } from "lucide-react"
import BookingRequests from "@/components/booking-requests"
import { formatAmenity } from "@/hooks/imports"
import axios from "axios"
import { ip, port } from "@/hooks/hosts"

const transitionData = {
    user: {
      name: "staff",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
      {
        title: "Dashboard",
        url: "#",
        icon: LayoutDashboardIcon,
      },
      {
        title: "Booking Management",
        url: "#",
        icon: BookCopy,
      },
    ],
    navSecondary: [
      {
        title: "Settings",
        url: "#",
        icon: SettingsIcon,
      },
      {
        title: "Get Help",
        url: "#",
        icon: HelpCircleIcon,
      },
      {
        title: "Search",
        url: "#",
        icon: SearchIcon,
      },
    ],
  }

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
export default function DashboardPage() {
  const [bookings, setBookings] = React.useState<UserBooking[]>([])
  const [navSelected,setNavSelected] = React.useState(0)
  const [height,setHeight] = React.useState(0)
  const [token,setToken] = React.useState<string | null>(null)

    React.useEffect(()=>{
      setHeight(window.innerHeight)
      const t = localStorage.getItem('staff_token')
      if(!t){
        window.location.assign('/login')
        return
      }
      setToken(t)
      getUserBookings(t)
    },[])

    const getUserBookings = (tkn:string) =>{
      axios.get(`http://${ip}:${port}/api/v1/bookings`,{
          headers: {
              Authorization: `Bearer ${tkn}`
            }
      }).then((res)=>{
          const bks = res.data.content
          setBookings([])
          bks.forEach(async(b : rawBooking ) => {
              const space : {data : RawSpace} = await axios.get(`http://${ip}:${port}/api/v1/spaces/${b.spaceId}`,{
                  headers: {
                      Authorization: `Bearer ${tkn}`
                    }
              })

              console.log(space?.data)
              if (space.data) {
                  setBookings(prev => [...prev,{
                      id: b.id,
                      renterId: b.renterId,
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

  if (token) {
    return (
      <SidebarProvider>
        <AppSidebar simple transitionData={transitionData} variant="inset" setNavSelected={setNavSelected} />
        <SidebarInset style={{width:'calc(100% - 100px)',height:navSelected === 0?height-20:'auto',overflow:'hidden'}}>
          <SiteHeader title={transitionData.navMain[navSelected].title} />
          {navSelected === 0 && <div className="flex flex-1 flex-col"  >
            <div className="@container/main flex flex-1 flex-col">
              <div className="flex flex-col py-2 gap-2 md:py-2">
                <p className="pl-6 mt-1 font-semibold text-2xl" >Lastest Bookings</p>
                <DataTable data={bookings.map(b=>({id:b.id,spaceName:b.spaceName,spaceType:b.spaceType,status:b.status,bookingDate:b.bookingDate.toString()}))} maxSize={5} />
              </div>
            </div>
          </div>}
          {navSelected === 1 && <BookingRequests token={token} />}
        </SidebarInset>
      </SidebarProvider>
    )
  }
  return(
    <div className="min-w-screen min-h-screen flex items-center justify-center" >
      <img src="/assets/svgs/loading.svg" className="w-10 animate-spin" />
      {/* <h1>ok</h1> */}
    </div>
  )
}

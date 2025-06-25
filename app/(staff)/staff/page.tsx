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



export default function DashboardPage() {
  const [navSelected,setNavSelected] = React.useState(0)
  const [height,setHeight] = React.useState(0)
  React.useEffect(()=>{
    setHeight(window.innerHeight)
  },[])
  return (
    <SidebarProvider>
      <AppSidebar simple transitionData={transitionData} variant="inset" setNavSelected={setNavSelected} />
      <SidebarInset style={{width:'calc(100% - 100px)',height:navSelected === 0?height-20:'auto',overflow:'hidden'}}>
        <SiteHeader title={transitionData.navMain[navSelected].title} />
        {navSelected === 0 && <div className="flex flex-1 flex-col"  >
          <div className="@container/main flex flex-1 flex-col">
            <div className="flex flex-col py-2 gap-2 md:py-2">
              <p className="pl-6 mt-1 font-semibold text-2xl" >Lastest Bookings</p>
              <DataTable data={data} maxSize={5} />
            </div>
          </div>
        </div>}
        {navSelected === 1 && <BookingRequests/>}
      </SidebarInset>
    </SidebarProvider>
  )
}

"use client"
import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import React from "react"



import data from "./data.json"
import fiteredData from "./data1.json"
import SpacesPage from "@/components/space-management"
import UsersPage from "@/components/team"
import Analytics from "@/components/analytics"


const transitionData = {
  user: {
    name: "admin",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "#",
    },
    {
      title: "Analytics",
      url: "#",
    },
    {
      title: "Spaces",
      url: "#",
    },
    {
      title: "Team",
      url: "#",
    },
  ],
  navClouds: [
    {
      title: "Capture",
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
    },
    {
      title: "Get Help",
      url: "#",
    },
    {
      title: "Search",
      url: "#",
    },
  ],
  documents: [
    {
      name: "Data Library",
      url: "#",
    },
    {
      name: "Reports",
      url: "#",
    },
    {
      name: "Word Assistant",
      url: "#",
    },
  ],
}

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
    type:1,
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
    type:1,
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
    type:1,
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
    type:1,
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

const initialUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "+212 121245674",
    role: "Manager",
    company: "TechCorp",
    status: "Active",
    avatar: "/placeholder.svg?height=40&width=40",
    joinDate: "2024-01-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+212 122356784",
    role: "Staff",
    company: "DesignStudio",
    status: "Active",
    avatar: "/placeholder.svg?height=40&width=40",
    joinDate: "2024-01-10",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@example.com",
    phone: "+212 123467894",
    role: "Staff",
    company: "StartupInc",
    status: "Inactive",
    avatar: "/placeholder.svg?height=40&width=40",
    joinDate: "2024-01-05",
  },
  {
    id: 4,
    name: "Sarah Wilson",
    email: "sarah@example.com",
    phone: "+212 124578904",
    role: "Staff",
    company: "FreelanceWork",
    status: "Active",
    avatar: "/placeholder.svg?height=40&width=40",
    joinDate: "2024-01-20",
  },
]


export default function DashboardPage() {
  const [navSelected,setNavSelected] = React.useState(0)
  const [height,setHeight] = React.useState(0)
  React.useEffect(()=>{
    setHeight(window.innerHeight)
  },[])
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" setNavSelected={setNavSelected} />
      <SidebarInset style={{width:'calc(100% - 100px)',height:navSelected === 0?height-20:'auto',overflow:'hidden'}}>
        <SiteHeader title={transitionData.navMain[navSelected].title} />
        {navSelected === 0 && <div className="flex flex-1 flex-col"  >
          <div className="@container/main flex flex-1 flex-col">
            <div className="flex flex-col py-2 gap-2 md:py-2">
              <SectionCards />
              <p className="pl-6 mt-1 font-semibold text-2xl" >Lastest Bookings</p>
              <DataTable data={fiteredData} simple maxSize={3} />
            </div>
          </div>
        </div>}
        {navSelected === 1 && <Analytics />}
        {navSelected === 2 && <SpacesPage initialSpaces={coworkingSpaces} />}
        {navSelected === 3 && <UsersPage initialUsers={initialUsers} />}

      </SidebarInset>
    </SidebarProvider>
  )
}

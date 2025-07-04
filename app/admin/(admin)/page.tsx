"use client"
import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import React from "react"


import {
  BarChartIcon,
  Building2,
  CameraIcon,
  ClipboardListIcon,
  Database,
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
// import data from "./data.json"
import fiteredData from "./dashboard/data1.json"
import SpacesPage from "@/components/space-management"
import UsersPage from "@/components/team"
import Analytics from "@/components/analytics"
import AllUsersPage from "@/components/all-users"
import { formatAmenity } from "@/hooks/imports"
import axios from "axios"
import { ip, port } from "@/hooks/hosts"

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
      icon: LayoutDashboardIcon,
    },
    {
      title: "Analytics",
      url: "#",
      icon: BarChartIcon,
    },
    {
      title: "Spaces",
      url: "#",
      icon: Building2,
    },
    {
      title: "Team",
      url: "#",
      icon: UsersIcon,
    },
    {
      title: "Users",
      url: "#",
      icon: Database,
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: CameraIcon,
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
      icon: FileTextIcon,
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
      icon: FileCodeIcon,
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

const initialUsers = [
  {
    id: 1,
    firstName: "John", 
    lastName:"Doe",
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
    firstName: "Jane", 
    lastName:"Smith",
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
    firstName: "Mike", 
    lastName:"Johnson",
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
    firstName: "Sara", 
    lastName:"Wilson",
    email: "sarah@example.com",
    phone: "+212 124578904",
    role: "Staff",
    company: "FreelanceWork",
    status: "Active",
    avatar: "/placeholder.svg?height=40&width=40",
    joinDate: "2024-01-20",
  },
]
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

interface SumType{
  activeUsersLastMonth: number
  newUsersLastMonth: number
  revenueGrowthPercent: number
  totalRevenue: number
}

export default function DashboardPage() {
  const [bookings, setBookings] = React.useState<UserBooking[]>([])
  const [navSelected,setNavSelected] = React.useState(0)
  const [height,setHeight] = React.useState(0)
  const [token,setToken] = React.useState<string | null>(null)
  const [sum,setSum] = React.useState<SumType | null>(null)
  React.useEffect(()=>{
    setHeight(window.innerHeight)
    const t = localStorage.getItem('staff_token')
    if(!t){
      window.location.assign('/login')
    }
    if (t) {
      setToken(t)
      getUserBookings(t)
      getSummary(t)
    }
    
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
        
        // setUser(res.data)
    }).catch((res)=>{
        console.log(res)
        // localStorage.removeItem('token')
        // window.location.assign('/login')
    })
}

  const getSummary = (tkn:string) =>{
    axios.get(`http://${ip}:${port}/api/v1/analytics/summary`,{
      headers: {
          Authorization: `Bearer ${tkn}`
        }
    }).then((res)=>{
      console.log('sum',res.data)
      setSum(res.data)
    })
  }

  console.log(bookings.map(b=>({id:b.id,spaceName:b.spaceName,spaceType:b.spaceType,status:b.status,bookingDate:b.bookingDate.toString()})))
  if (token) {
    return (
      <SidebarProvider>
        <AppSidebar transitionData={transitionData} variant="inset" setNavSelected={setNavSelected} />
        <SidebarInset style={{width:'calc(100% - 100px)',height:navSelected === 0?height-20:'auto',overflow:'hidden'}}>
          <SiteHeader title={transitionData.navMain[navSelected].title} />
          {navSelected === 0 && <div className="flex flex-1 flex-col"  >
            <div className="@container/main flex flex-1 flex-col">
              <div className="flex flex-col py-2 gap-2 md:py-2">
                {sum && <SectionCards summary={sum} />}
                <p className="pl-6 mt-1 font-semibold text-2xl" >Lastest Bookings</p>
                {bookings.length > 0 &&<DataTable data={bookings.map(b=>({id:b.id,spaceName:b.spaceName,spaceType:b.spaceType,status:b.status,bookingDate:b.bookingDate.toString()}))} simple maxSize={3} />}
              </div>
            </div>
          </div>}
          {navSelected === 1 && <Analytics token={token} bookings={bookings.map(b=>({id:b.id,spaceName:b.spaceName,spaceType:b.spaceType,status:b.status,bookingDate:b.bookingDate.toString()}))} />}
          {navSelected === 2 && <SpacesPage  token={token} />}
          {navSelected === 3 && <UsersPage  token={token} />}
          {navSelected === 4 && <AllUsersPage  token={token} />}

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

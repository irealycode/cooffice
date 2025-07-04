"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, MapPin } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Logo from "./logo"
import { Avatar,AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { useEffect,useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


export default function Navbar({logged=false}:{logged?:boolean}) {
  const pathname = usePathname()
  const [token,setToken] = useState<string | null>(null)
  const [isLogged,setIsLooged] = useState(!!token)
  const [isLoaded,setIsLoaded] = useState(false)

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/search", label: "Find Spaces" },
  ]

  useEffect(()=>{
    const t = localStorage.getItem('token')
    if (t) setToken(t)
    setIsLooged(!!t)
    setIsLoaded(true)
  })

  const logout = () =>{
    localStorage.removeItem('token')
    location.assign('/login')
  }

  return (
    <header className="sticky flex flex-center items-center justify-center top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-center px-4">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-12 flex items-center">
            <Logo width="9" font="3xl" />
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {isLoaded && navItems.map((item,i) => !isLogged || i !== 0 ?(
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors hover:text-blue-600 ${
                  pathname === item.href ? "text-blue-600" : "text-foreground/60"
                }`}
              >
                {item.label}
              </Link>
            ):null)}
          </nav>
        </div>

        {isLoaded &&<Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <Link href="/" className="flex items-center space-x-2">
              <Logo width="9" font="3xl" />
            </Link>
            <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
              <div className="flex flex-col space-y-3">
                {navItems.map((item,i) => !logged || i !== 0 ?(
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`transition-colors hover:text-blue-600 ${
                      pathname === item.href ? "text-blue-600" : "text-foreground/60"
                    }`}
                  >
                    {item.label}
                  </Link>
                ):null)}
              </div>
            </div>
          </SheetContent>
        </Sheet>}

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Link href="/" className="flex items-center space-x-2 md:hidden">
              <Logo width="9" font="3xl" />
            </Link>
          </div>
          {isLoaded && !isLogged?<nav className="flex items-center space-x-2">
            <Button asChild variant="ghost">
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild className="bg-blue-600 hover:bg-blue-500">
              <Link href="/register">Sign Up</Link>
            </Button>
          </nav>:
          isLoaded && <DropdownMenu  >
          <DropdownMenuTrigger asChild>
            <div className="rounded-3xl bg-gray-300 p-1 cursor-pointer">
              <img src="/assets/svgs/account.svg" className="h-7" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="start" style={{zIndex:99999}}>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={()=>window.location.assign('/dashboard')} >
                Profile
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={()=>logout()} >
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
          
          }
        </div>
      </div>
    </header>
  )
}

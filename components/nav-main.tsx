"use client"

import { MailIcon, PlusCircleIcon, type LucideIcon } from "lucide-react"
import React from "react"
import { Button } from "@/components/ui/button"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavMain({
  items,setNavSelected,simple=false
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
  }[],
  setNavSelected:React.Dispatch<React.SetStateAction<number>>,
  simple?:boolean
}) {

  const [navSelected,setNavSelected1] = React.useState(0)
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        {!simple && <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              tooltip="Quick Create"
              className="min-w-8 bg-blue-600 text-primary-foreground duration-200 ease-linear hover:bg-blue-500 hover:text-primary-foreground active:bg-blue-500/90 active:text-primary-foreground"
            >
              <PlusCircleIcon />
              <span>Add Space</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>}
        <SidebarMenu>
          {items.map((item,y) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton className={y===navSelected?`bg-gray-200`:''+'transition-all duration-300'} onClick={()=>{setNavSelected1(y);setNavSelected(y)}} tooltip={item.title}>
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

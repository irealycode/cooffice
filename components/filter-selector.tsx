'use client'

import React, { useState } from "react"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { X, Filter } from "lucide-react"
import { cn } from "@/lib/utils"
import { Dispatch,SetStateAction } from "react"



interface FilterSelectorProps {
    className?: string
    label?:string
    allFilters:string[]
    setFilters:Dispatch<SetStateAction<string[]>>
    filters?:string[]
}

export default function FilterSelector({ className,label="Add Filter",allFilters,setFilters,filters=[] }: FilterSelectorProps) {
    const [selected, setSelected] = useState<string[]>(filters)
    const [open, setOpen] = useState(false)

    const addFilter = (filter: string) => {
        if (!selected.includes(filter)) {
        setSelected([...selected, filter])
        }
        setFilters(prev=>[...prev, filter])
        setOpen(false)
    }

    const removeFilter = (filter: string) => {
        setSelected(selected.filter((f) => f !== filter))
        setFilters(prev => prev.filter((f) => f !== filter))
    }

    return (
        <div className={cn("space-y-4", className)}>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                <Button variant="outline">
                    {label}
                </Button>
                </PopoverTrigger>
                <PopoverContent className="w-72 p-0">
                <Command>
                    <CommandInput placeholder="Search filters..." />
                    <CommandList>
                    {allFilters
                        .filter((f) => !selected.includes(f))
                        .map((filter) => (
                        <CommandItem key={filter} onSelect={() => addFilter(filter)}>
                            {filter}
                        </CommandItem>
                        ))}
                    </CommandList>
                </Command>
                </PopoverContent>
            </Popover>

            <div className="flex flex-wrap gap-2">
                {selected.map((filter) => (
                <Badge key={filter} variant="secondary" className="flex items-center gap-1">
                    {filter}
                    <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => removeFilter(filter)}
                    />
                </Badge>
                ))}
            </div>
        </div>
    )
}

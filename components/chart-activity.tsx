"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { format } from "date-fns"


const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig


interface  filtersType{
  title:string,
  value:string
}

interface  dataType{
    date:string,
    userCount:number
}

export function ChartAreaActivity({title,underTitle,filters,data}:{title:string,underTitle:string,filters:filtersType[],data:dataType[]}) {
    const [timeRange, setTimeRange] = React.useState("7")

    console.log(timeRange)

    const addLastXDays = ( x:number) => {
        let nerr = [...data]
        const existingDates = new Set(nerr.map(item => item.date));
        const today = new Date();
    
        for (let i = x - 1; i >= 0; i--) {
        const date = new Date();
        date.setDate(today.getDate() - i);
        const dateStr = format(date,'yyyy-MM-dd');
    
        if (!existingDates.has(dateStr)) {
            nerr.push({
            date: dateStr,
            userCount: 0
            });
        }
        }
    
        return nerr;
    };

    const sortByDateAsc = (array : dataType[]) => {
        return array.sort((a, b) => new Date(a.date) - new Date(b.date));
    };

    const filteredData = sortByDateAsc(addLastXDays(parseInt(timeRange)))
  
//   .filter((item) => {
//     const date = new Date(item.date)
//     const referenceDate = new Date("2024-06-30")
//     let daysToSubtract = 90
//     if (timeRange === "30d") {
//       daysToSubtract = 30
//     } else if (timeRange === "7d") {
//       daysToSubtract = 7
//     }
//     const startDate = new Date(referenceDate)
//     startDate.setDate(startDate.getDate() - daysToSubtract)
//     return date >= startDate
//   })

  return (
    <Card className="@container/card w-full" 
    >
      <CardHeader className="relative">
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {/* <span className="@[540px]/card:block hidden">
            Total for the last 3 months
          </span> */}
          <span className="@[540px]/card:hidden">{underTitle}</span>
        </CardDescription>
        <div className="absolute right-4 top-4">
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="@[767px]/card:flex hidden"
          >
            {filters.map((f,i)=>{
              return(
                <ToggleGroupItem key={f.title} value={f.value} className="h-8 px-2.5">
                  {f.title}
                </ToggleGroupItem>
              )
            })}
            
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="@[767px]/card:hidden flex w-40"
              aria-label="Select a value"
            >
              <SelectValue placeholder={filters[0].title} />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              {filters.map((f,i)=>{
                return(
                  <SelectItem key={f.title} value={f.value} className="rounded-lg">
                    {f.title}
                  </SelectItem>
                )
              })}
              
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={1.0}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={3}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="userCount"
              type="monotone"
              fill="url(#fillMobile)"
              stroke="var(--color-mobile)"
              stackId="a"
            />
            {/* <Area
              dataKey="desktop"
              type="natural"
              fill="url(#fillDesktop)"
              stroke="var(--color-desktop)"
              stackId="a"
            /> */}
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

import { ChartAreaInteractive } from "./chart-area-interactive";
import { DataTable } from "./data-table";
import { SectionCards } from "./section-cards";


// import data from "../app/admin/(admin)/dashboard/data.json"
import { ChartAreaBookings } from "./chart-area-bookings";
import axios from "axios";
import { ip, port } from "@/hooks/hosts";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { ChartAreaRevenue } from "./chart-revenue";
import { ChartAreaActivity } from "./chart-activity";

interface bookingsType {
    id: string;
    spaceName: string;
    spaceType: string;
    status: string;
    bookingDate: string;
}

interface  revenueType{
  date:string,
  total:number
}

interface  activityType{
  date:string,
  userCount:number
}

export default function Analytics({bookings,token}:{bookings:bookingsType[],token:string}){
    const [revenue,setRevenue] = useState<revenueType[]>([])
    const [activity,setActivity] = useState<activityType[]>([])
    const [growth,setGrowth] = useState<activityType[]>([])
    useEffect(()=>{
      getRevenue()
      getActivity()
      getGrowth()
    },[])
    const getRevenue = (x:number = 7) =>{
      console.log('days',x)
      const today = new Date();
      const sevenDaysAgo = new Date(today);
      sevenDaysAgo.setDate(today.getDate() - x);
      axios.get(`http://${ip}:${port}/api/v1/analytics/revenue?startDate=${format(sevenDaysAgo,"yyyy-MM-dd")}&endDate=${format(today,"yyyy-MM-dd")}`,{
        headers: {
            Authorization: `Bearer ${token}`
          }
      }).then((res)=>{
        setRevenue(res.data)
      })
    }
    const getActivity = (x:number = 7) =>{
      const today = new Date();
      const sevenDaysAgo = new Date(today);
      sevenDaysAgo.setDate(today.getDate() - x);
      axios.get(`http://${ip}:${port}/api/v1/analytics/activity?startDate=${format(sevenDaysAgo,"yyyy-MM-dd")}&endDate=${format(today,"yyyy-MM-dd")}`,{
        headers: {
            Authorization: `Bearer ${token}`
          }
      }).then((res)=>{
        setActivity(res.data)
      })
    }
    const getGrowth = (x:number = 7) =>{
      const today = new Date();
      const sevenDaysAgo = new Date(today);
      sevenDaysAgo.setDate(today.getDate() - x);
      axios.get(`http://${ip}:${port}/api/v1/analytics/growth?startDate=${format(sevenDaysAgo,"yyyy-MM-dd")}&endDate=${format(today,"yyyy-MM-dd")}`,{
        headers: {
            Authorization: `Bearer ${token}`
          }
      }).then((res)=>{
        // console.log(res.data)
        setGrowth(res.data)
      })
    }

    return(
        <div className="flex flex-1 flex-col"  >
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 px-6 py-4 md:gap-6 md:py-6">
                <ChartAreaActivity getData={(x)=>getGrowth(x)}  data={growth} title="New Users" underTitle="User acquisition" filters={[{title:"Last 7 days",value:'7'},{title:"Last month",value:"30"},{title:"Last 3 months",value:"90"},{title:"Last year",value:"360"}]} />
                <ChartAreaActivity getData={(x)=>getActivity(x)}  data={activity} title="Active Users" underTitle="Active users fluctuation" filters={[{title:"Last 7 days",value:'7'},{title:"Last month",value:"30"},{title:"Last 3 months",value:"90"},{title:"Last year",value:"360"}]} />
                <ChartAreaRevenue getData={(x)=>getRevenue(x)} data={revenue}  title="Revenue" underTitle="Revenue in MAD" filters={[{title:"Last 7 days",value:'7'},{title:"Last month",value:"30"},{title:"Last 3 months",value:"90"},{title:"Last year",value:"360"}]} />
                <p className="pl-6 mt-1 font-semibold text-2xl" >Booking History</p>
                {bookings.length > 0 && <DataTable data={bookings} />}
            </div>
          </div>
        </div>
    )
}
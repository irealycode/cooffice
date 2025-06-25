import { ChartAreaInteractive } from "./chart-area-interactive";
import { DataTable } from "./data-table";
import { SectionCards } from "./section-cards";


import data from "../app/(admin)/dashboard/data.json"
import { ChartAreaBookings } from "./chart-area-bookings";

export default function Analytics(){
    return(
        <div className="flex flex-1 flex-col"  >
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 px-6 py-4 md:gap-6 md:py-6">
                <ChartAreaInteractive title="New Users" underTitle="User acquisition" filters={[{title:"Last 7 days",value:'7d'},{title:"Last month",value:"30d"},{title:"Last 3 months",value:"90d"},{title:"Last year",value:"360d"}]} />
                <ChartAreaInteractive title="Active Users" underTitle="Active users fluctuation" filters={[{title:"Last 7 days",value:'7d'},{title:"Last month",value:"30d"},{title:"Last 3 months",value:"90d"},{title:"Last year",value:"360d"}]} />
                <ChartAreaBookings title="Bookings" underTitle="Space booking" filters={[{title:"Last 7 days",value:'7d'},{title:"Last month",value:"30d"},{title:"Last 3 months",value:"90d"},{title:"Last year",value:"360d"}]} />
                <ChartAreaBookings title="Revenue" underTitle="Revenue in MAD" filters={[{title:"Last 7 days",value:'7d'},{title:"Last month",value:"30d"},{title:"Last 3 months",value:"90d"},{title:"Last year",value:"360d"}]} />
                <p className="pl-6 mt-1 font-semibold text-2xl" >Booking History</p>
                <DataTable data={data} />
            </div>
          </div>
        </div>
    )
}
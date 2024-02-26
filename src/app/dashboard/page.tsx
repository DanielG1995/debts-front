import { Suspense } from "react"
import PaymentChart from "./components/summary/PaymentChart"
import TotalChart from "./components/summary/TotalChart"
import ContainerSkeleton from "./components/skeleton/ContainerSkeleton"
import RegisterCharts from "./components/charts/RegisterCharts"
import TableDebts from "./components/tables/TableDebts"
import TableSkeleton from "./components/skeleton/TableSkeleton"
import DataCards from "./components/summary/DataCards"
import { CardsSkeleton } from "./components/skeleton/CardSkeleton"
import { HEADER_TABLE } from "../lib/constants"

export default function Page() {
    return (
        <main className="flex flex-col p-10 gap-5 h-full overflow-x-hidden">
            <RegisterCharts />
            <div className="flex flex-col md:flex-wrap lg:flex-row gap-5">
                <div className="flex justify-start flex-col items-start gap-5 ">
                    <Suspense fallback={<ContainerSkeleton className="w-full rounded-2xl shadow-2xl min-h-[300px]" />}>
                        <div className="w-full bg-white rounded-2xl shadow-2xl h-fit  p-5">
                            <PaymentChart title={'Pagos por deuda'} />
                        </div>
                    </Suspense>
                    <div className="flex flex-wrap justify-start gap-5">
                        <Suspense fallback={
                            <div className="flex flex-wrap justify-start gap-5 min-w-[640px]">
                                <CardsSkeleton />
                            </div>
                        }
                        >
                            <DataCards />
                        </Suspense>
                    </div>
                </div>
                <Suspense fallback={<ContainerSkeleton className="rounded-2xl shadow-2xl min-w-[300px] flex justify-center items-center grow min-h-[200px]" />}>
                    <div className="rounded-2xl bg-white shadow-2xl py-5 min-w-[300px] flex justify-center items-center grow min-h-[200px]">
                        <TotalChart />
                    </div>
                </Suspense>

            </div>
            <div className="mt-5 bg-white">
                <Suspense fallback={<TableSkeleton rows={1} headers={HEADER_TABLE} />}>
                    <TableDebts headers={HEADER_TABLE} />
                </Suspense>

            </div>

        </main>
    )
}

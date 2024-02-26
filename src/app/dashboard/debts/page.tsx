import { HEADER_TABLE_DEBTS } from "@/app/lib/constants";
import { Suspense } from "react";
import TableSkeleton from "../components/skeleton/TableSkeleton";
import TableDebts from "../components/tables/TableDebts";
import Link from "next/link";

export default function Page() {



    return (
        <main className="flex flex-col p-10 gap-5 h-full overflow-x-hidden">
            <div className="flex justify-between items-center">
                <span className="text-3xl font-bold text-darkGreen">
                    Deudas a pagar
                </span>
                <Link href={'/dashboard/debts/new'} className="btn-outlined min-w-[100px] text-center">Crear</Link>
            </div >
            <Suspense fallback={<TableSkeleton rows={1} headers={HEADER_TABLE_DEBTS} />}>
                <TableDebts hasOptions={true} headers={HEADER_TABLE_DEBTS} />
            </Suspense>

        </main>
    )
}

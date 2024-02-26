import { HEADER_TABLE_DEBTS_CREDITOR } from "@/app/lib/constants";
import { Suspense } from "react";
import TableSkeleton from "../../components/skeleton/TableSkeleton";
import TableDebts from "../../components/tables/TableDebts";

export default function Page() {



    return (
        <main className="flex flex-col p-10 gap-5 h-full overflow-x-hidden">
            <span className="text-3xl font-bold text-darkGreen">
                Deudas a cobrar
            </span>
            <Suspense fallback={<TableSkeleton rows={1} headers={HEADER_TABLE_DEBTS_CREDITOR} />}>
                <TableDebts debtsAs="debtsByCreditorId" headers={HEADER_TABLE_DEBTS_CREDITOR} />
            </Suspense>

        </main>
    )
}

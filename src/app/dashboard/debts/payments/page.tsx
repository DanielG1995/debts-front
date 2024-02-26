
import { fetchDebtByIdPayment, fetchPaymentsByDebtId, fetchUsers } from "@/app/fetch"
import Breadcrum from "../../components/breadcrum/Breadcrum"
import PaymentForm from "../forms/PaymentForm"
import DebtCard from "../../components/cards/DebtCard"
import Table, { TableRow } from "../../components/tables/Table"
import { HEADER_TABLE_PAYMENTS } from "@/app/lib/constants"

export default async function Page({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) {

    const [debt, payments] = await Promise.all([fetchDebtByIdPayment(searchParams?.id as string), fetchPaymentsByDebtId(searchParams?.id as string)])
    return (
        <main className="flex flex-col justify-center mt-5">
            <Breadcrum steps={
                [
                    {
                        label: 'Deudas',
                        current: false,
                        url: '/dashboard/debts'
                    },
                    {
                        label: 'Pagos',
                        current: true
                    }
                ]
            } />
            <div className="grow flex flex-col items-center gap-5 mt-5">
                <div className="flex flex-row w-full gap-5">
                    <div className="min-w-[700px]">
                        <Table
                            deleteProps={{
                                fnDelete: 'deletePaymentById',
                                title: 'Estas seguro de eliminar el pago?'
                            }}
                            headers={HEADER_TABLE_PAYMENTS} 
                            hasOptions 
                            optionsProps={{ add: false, delete: true, update: false }} 
                            rows={payments.rows as TableRow[]} 
                            keys={payments.keys as string[]} />
                    </div >
                    <DebtCard />
                </div>
                <PaymentForm />
            </div>
        </main>
    )
}


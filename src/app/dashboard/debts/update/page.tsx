
import { fetchDebtById, fetchUsers } from "@/app/fetch"
import { getSession } from "@auth0/nextjs-auth0"
import UpdateForm from "../forms/UpdateForm"
import Breadcrum from "../../components/breadcrum/Breadcrum"

export default async function Page({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) {
    const user = await getSession()
    const [users, values] = await Promise.all([
        fetchUsers(user?.user?._id as string || '') || [],
        fetchDebtById(searchParams?.id as string)])
    return (
        <main className="flex flex-col justify-center mt-4">
            <Breadcrum steps={
                [
                    {
                        label: 'Deudas',
                        current: false,
                        url: '/dashboard/debts'
                    },
                    {
                        label: 'Editar deuda',
                        current: true
                    }
                ]
            } />
            <div className="grow flex justify-center mt-5">
                <UpdateForm values={values} users={users} />
            </div>
        </main>
    )
}


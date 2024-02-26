
import { fetchUsers } from "@/app/fetch"
import CreateForm from "../forms/CreateForm"
import { UserSelect } from "@/app/interfaces"
import { getSession } from "@auth0/nextjs-auth0"
import Breadcrum from "../../components/breadcrum/Breadcrum"

export default async function Page() {
    const user = await getSession()
    const users: UserSelect[] = await fetchUsers(user?.user?._id as string || '') || []

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
                        label: 'Nueva deuda',
                        current: true
                    }
                ]
            } />
            <div className="grow flex justify-center mt-5">
                <CreateForm users={users} />
            </div>
        </main>
    )
}


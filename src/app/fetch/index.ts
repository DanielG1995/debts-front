
import request from "graphql-request";
import { queryCards, queryDebtById, queryDebtPayment, queryDebtsByCreditor, queryDebtsByDebtor, queryDebtsByUser, queryTotalUser } from "../lib/querys/debts";
import { getSession } from "@auth0/nextjs-auth0";
import { Debt, DebtForPayment, Debts, Payment, Payments, TableData, Total, User, UserSelect } from "../interfaces";
import { ChartData, Point } from "chart.js";
import { COLORS } from "../lib/constants";
import { queryGetUsers } from "../lib/querys/users";
import { queryPayments } from "../lib/querys/payments";


export const fetchPaymentChart = async () => {
    const session = await getSession();
    try {
        await new Promise((resolve) => setTimeout(resolve, 2400));
        const response: Payments = await request(process.env.BASE_URL as string, queryDebtsByUser, { debtsByUserId: session?.user?._id });
        let totalPayment = 0
        const dataChart: ChartData<"line", (number | Point | null)[], string> = {
            labels: ["1", "2", "3", '4', '5'],
            datasets: [

                ...response?.payments.filter(p => p.payments.length > 0).map((item, index) => {
                    const color = COLORS?.[index]
                    let totalAmount = item?.amount;
                    return (
                        {
                            data: [{ x: 0, y: item.amount }, ...item.payments.map((pay, index) => {
                                totalAmount = totalAmount - pay.paidAmount
                                totalPayment = totalPayment + pay.paidAmount
                                return ({ y: totalAmount, x: index })
                            })],
                            backgroundColor: color,
                            borderColor: color,
                            borderWdth: 1,
                            label: `${item?.description}`
                        }
                    )
                })
            ]
        }
        return { dataChart, totalPayment }
    } catch (error) {

    }
}

export const fetchTotalChart = async () => {
    const session = await getSession();
    await new Promise((resolve) => setTimeout(resolve, 2400));
    try {
        const response: Total = await request(process.env.BASE_URL as string, queryTotalUser, { userId: session?.user?._id });
        const dataChart: ChartData<"pie", number[], unknown> = {
            labels: [...response.user.debtsAsDebtor.map(item => `${item.description} $${item.totalPending} (${(item.totalPaidMount * 100 / item?.amount).toFixed(1)}% pagado)`)],
            datasets: [
                {
                    data: [...response?.user.debtsAsDebtor.map(item => item.totalPending)],
                    backgroundColor: [
                        'rgba(255, 206, 86, 0.7)',
                        'rgba(54, 162, 235, 0.7)',
                        'rgba(75, 192, 192, 0.7)',
                        'rgba(255, 159, 64, 0.7)',
                        'rgba(255, 99, 132, 0.7)',
                        'rgba(153, 102, 255,0.7)',
                    ],
                    borderWidth: 1,
                }

            ]
        }
        return dataChart
    } catch (error) {

    }
}


export const fetchTableDebts = async (debtsAs: string = 'debtsByDebtorId') => {
    const session = await getSession();
    const debtsAsNode = debtsAs === 'debtsByDebtorId' ? 'creditor' : 'debtor'
    try {
        const response: Debts = await request(process.env.BASE_URL as string, debtsAs === 'debtsByDebtorId' ? queryDebtsByDebtor : queryDebtsByCreditor, { [debtsAs]: session?.user?._id });

        return {
            rows: [...response.debts.map(debt => ({
                img: debt?.[debtsAsNode]?.img,
                [debtsAsNode]: debt?.[debtsAsNode]?.name,
                description: debt.description,
                amount: debt.amount,
                totalPaidMount: debt.totalPaidMount,
                totalPending: debt.totalPending,
                id: debt.id,
            }))],
            keys: ['img', debtsAsNode, 'description', 'amount', 'totalPaidMount', 'totalPending']

        }
    } catch (error) {

    }
    return ({ rows: [], keys: [] })
}


export const fetchDataCard = async () => {
    const session = await getSession();
    // await new Promise((resolve) => setTimeout(resolve, 4000));
    try {
        const response: Total = await request(process.env.BASE_URL as string, queryCards, { userId: session?.user?._id });
        const paid = response.user.debtsAsDebtor.reduce((previus, current) => (previus + current.totalPaidMount), 0)
        return [
            {
                text: 'Total',
                value: response.user.getTotalDebt.toString()
            },
            {
                text: 'Valor pendiente',
                value: (response.user.getTotalDebt - paid).toString()
            },
            {
                text: 'Valor pagado',
                value: paid.toString()
            }
        ]
    } catch (error) {

    }
}



export const fetchUsers = async (id: string) => {
    // await new Promise((resolve) => setTimeout(resolve, 4000));
    try {
        const response: { users: UserSelect[] } = await request(process.env.BASE_URL as string, queryGetUsers);
        return response.users.filter((user: UserSelect) => user.id !== id) || []
    } catch (error) {

    }
    return []
}


export const fetchDebtById = async (id: string) => {
    try {
        const response: { debt: Debt } = await request(process.env.BASE_URL as string, queryDebtById, { debtId: id });
        return response?.debt
    } catch (error) {
    }
    return {} as Debt
}
export const fetchDebtByIdPayment = async (id: string) => {
    try {
        const response: { debt: DebtForPayment } = await request(process.env.BASE_URL as string, queryDebtPayment, { debtId: id });
        return response?.debt
    } catch (error) {
    }
    return {} as DebtForPayment
}

export const fetchPaymentsByDebtId = async (id: string) => {
    try {
        const response: { debt: { payments: { [key: string]: string, id: string }[] } } = await request(process.env.BASE_URL as string, queryPayments, { debtId: id });
        return {
            rows: response?.debt?.payments.map(payment => ({ ...payment, paymentDate: new Date(payment?.paymentDate).toLocaleDateString() })),
            keys: ['paymentDate', 'paidAmount']
        }
    } catch (error) {
        console.log(error)
    }
    return { debt: { payments: [] } }
}


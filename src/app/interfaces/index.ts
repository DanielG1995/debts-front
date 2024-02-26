import { TableRow } from "../dashboard/components/tables/Table"


export interface Payments {
    payments: DebtsByUser[]
}

export interface DebtsByUser {
    description: string
    amount: number
    payments: Payment[]
}

export interface Payment {
    paidAmount: number
    paymentDate: string
}

export interface UserSelect {
    img: string
    name: string
    id: string
}

export interface Debt {
    amount: number
    creditor: { id: string }
    description: string
}

export interface DebtForPayment {
    amount: number
    creditor: { name: string }
    description: string
    totalPending: number
    totalPaidMount: number

}

export interface Total {
    user: User
}

export interface User {
    getTotalPending: number
    getTotalDebt: number
    debtsAsDebtor: debtsAsDebtor[]
}

export interface debtsAsDebtor {
    description: string
    amount: number
    totalPaidMount: number
    totalPending: number
}

export interface Debts {
    debts: DebtsByDebtor[];
}
interface DebtsByDebtor {
    creditor?: UserDebt;
    debtor?: UserDebt;
    description: string;
    amount: number;
    totalPaidMount: number;
    totalPending: number;
    id: string
}
interface UserDebt {
    name: string;
    img: string
}

export interface TableData {
    keys: string[]
    rows: TableRow[]
}

export interface Payment {
    debtId: string
    amount: string
}


'use server'

import request from "graphql-request";
import { mutationDeleteDebt, mutationDeletePayment } from "../lib/querys/debts";
import { revalidatePath } from "next/cache";

export async function deleteDebtById(id: string) {


    try {
        const response: { id: string } = await request(process.env.BASE_URL as string, mutationDeleteDebt, { deleteDebtId: id });
        console.log(response);
    } catch (error) {
        console.log(error)
    }

    revalidatePath('/dashboard/debts');
    // redirect('/dashboard/debts');
    return {
        errors: {},
        message: 'Se ha eliminado la deuda',
    };

}


export async function deletePaymentById(id: string) {
    try {
        const response: { id: string } = await request(process.env.BASE_URL as string, mutationDeletePayment, { deletePaymenByIdId: id });
        console.log(response);
    } catch (error) {
        console.log(error)
    }

    revalidatePath('/dashboard/payments/new');
    // redirect('/dashboard/debts');
    return {
        errors: {},
        message: 'Se ha eliminado el pago',
    };
}
'use server'

import request from "graphql-request";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { mutationUpdateDebt, queryCreateDebt } from "../lib/querys/debts";
import { mutationCreatePayment } from "../lib/querys/payments";

const FormSchema = z.object({
    id: z.string(),
    creditor: z.string({
        invalid_type_error: 'Selecciona un beneficiario',
    }),
    amount: z.coerce
        .number()
        .gt(0, { message: 'Ingresa un valor mayor a  $0.' }),

    description: z.string({
        invalid_type_error: 'Ingresa la descripcion',
        required_error: 'Ingresa la descripcion'
    }).min(1, { message: 'Ingresa una descripcion' })
});

const PaymentSchema = z.object({
    id: z.string(),
    paidAmount: z.coerce
        .number()
        .gt(0, { message: 'Ingresa un valor mayor a  $0.' }),
});

const CreateDebt = FormSchema.omit({ id: true });
const CreatePayment = PaymentSchema.omit({ id: true });

export type State = {
    errors?: {
        creditor?: string[];
        amount?: string[];
        description?: string[];
    };
    message?: string | null;
};

export type StatePayment = {
    errors?: {
        paidAmount?: string[];
    };
    message?: string | null;
};
export async function CreateDebtSubmit(id: string, prevState: State, formData: FormData) {
    try {

        const validatedFields = CreateDebt.safeParse({
            creditor: formData.get('creditor'),
            amount: formData.get('amount'),
            description: formData.get('description'),
        });
        if (!validatedFields.success) {
            return {
                errors: validatedFields.error.flatten().fieldErrors,
                message: 'Completa todos los campos',
            };
        }
        try {
            await request(process.env.BASE_URL as string, queryCreateDebt, {
                createDebtInput: {
                    debtor: id,
                    ...validatedFields.data
                }
            });
        } catch (error) {
        }

    } catch (error) {

    }
    revalidatePath('/dashboard/debts');
    // redirect('/dashboard/debts');
    return {
        errors: {},
        message: 'Se ha registrado la deuda',
    };

}

export async function UpdateDebtSubmit(id: string, prevState: State, formData: FormData) {
    try {

        const validatedFields = CreateDebt.safeParse({
            creditor: formData.get('creditor'),
            amount: formData.get('amount'),
            description: formData.get('description'),
        });
        if (!validatedFields.success) {
            return {
                errors: validatedFields.error.flatten().fieldErrors,
                message: 'Completa todos los campos',
            };
        }
        try {
            const response: { id: string } = await request(process.env.BASE_URL as string, mutationUpdateDebt, {
                updateDebtInput: {
                    id,
                    ...validatedFields.data
                }
            });
            console.log(response);
        } catch (error) {
        }

    } catch (error) {

    }
    revalidatePath('/dashboard/debts');
    // redirect('/dashboard/debts');
    return {
        errors: {},
        message: 'Se ha actualizado la deuda',
    };

}

export async function CreatePaymentSubmit(id: string, prevState: StatePayment, formData: FormData) {
    try {

        const validatedFields = CreatePayment.safeParse({
            paidAmount: formData.get('amount'),
        });
        if (!validatedFields.success) {
            return {
                errors: validatedFields.error.flatten().fieldErrors,
                message: 'Completa todos los campos',
            };
        }
        try {
            await request(process.env.BASE_URL as string, mutationCreatePayment, {
                createPaymentInput: {
                    debt: id,
                    ...validatedFields.data
                }
            });

        } catch (error) {
            console.log(error)
        }

    } catch (error) {

    }
    revalidatePath('/dashboard/payments/new');
    // redirect('/dashboard/debts');
    return {
        errors: {},
        message: 'Se ha registrado la deuda',
    };

}

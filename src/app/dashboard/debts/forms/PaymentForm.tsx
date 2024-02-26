'use client'

import { CreatePaymentSubmit } from '@/app/actions';
import React, { useEffect } from 'react'
import { useFormState } from 'react-dom';
import toast from 'react-hot-toast';
import TextInput from '../../components/inputs/TextInput';
import { useSearchParams } from 'next/navigation';

export const PaymentForm = () => {
    const { get } = useSearchParams()
    const initialState = { message: '', errors: {} as Record<string, any>, type: '' as 'success' };
    const CreatePaymentSubmitWithUserId = CreatePaymentSubmit.bind(null, get('id') as string)
    const [state, dispatch] = useFormState(CreatePaymentSubmitWithUserId, initialState)

    useEffect(() => {
        if (Object.keys(state.errors).length > 0) {
            toast.error(state.message, { duration: 4000 })
            return;
        }

        if (state.message !== '') {
            toast.success(state.message, { duration: 4000 })
        }
    }, [state])


    return (
        <form action={dispatch} className="forms">
            <p className="text-center text-xl font-black">Registra un pago</p>
            <TextInput label='Monto' id='amount' type='number' errors={state.errors?.paidAmount} />
            <button type='submit' className="btn-primary">Registrar</button>
        </form>
    )
}

export default PaymentForm
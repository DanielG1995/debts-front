'use client'

import { CreateDebtSubmit } from '@/app/actions';
import React, { useEffect } from 'react'
import { useFormState } from 'react-dom';
import Select from '../../components/select/Select';
import { UserSelect } from '@/app/interfaces';
import { useUser } from '@auth0/nextjs-auth0/client';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import TextInput from '../../components/inputs/TextInput';

export const CreateForm = ({ users }: { users: UserSelect[] }) => {
    const user = useUser()
    const router = useRouter()
    const initialState = { message: '', errors: {} as Record<string, any>, type: '' as 'success' };
    const CreateDebtSubmitWithUserId = CreateDebtSubmit.bind(null, user.user?._id as string || '')
    const [state, dispatch] = useFormState(CreateDebtSubmitWithUserId, initialState)

    useEffect(() => {
        if (Object.keys(state.errors).length > 0) {
            toast.error(state.message, { duration: 4000 })
            return;
        }

        if (state.message !== '') {
            toast.success(state.message, { duration: 4000 })
            router.push('/dashboard/debts')
        }
    }, [state, router])


    return (
        <form action={dispatch} className="forms">
            <p className="text-center text-xl font-black">Crear deuda</p>
            <TextInput label='Descripcion' id='description' errors={state.errors?.description} />
            <TextInput type='number' label='Monto' id='amount' errors={state.errors?.amount} />
            <Select errors={state?.errors?.creditor} options={users} id="creditor" nodes={{ label: 'name', value: 'id' }} label="Beneficiario" />
            <button type='submit' className="btn-primary">Crear</button>
        </form>
    )
}

export default CreateForm
'use client'

import React, { useEffect } from 'react'
import { UpdateDebtSubmit } from '@/app/actions';
import { useFormState } from 'react-dom';
import { UserSelect } from '@/app/interfaces';
import { useRouter } from 'next/navigation';
import TextInput from '../../components/inputs/TextInput';
import Select from '../../components/select/Select';
import toast from 'react-hot-toast';
import { useSearchParams } from 'next/navigation';

export const UpdateForm = ({ users, values }: { users: UserSelect[], values: { [key: string]: string | number } }) => {
    const { push } = useRouter()
    const params = useSearchParams()
    const initialState = { message: '', errors: {} as Record<string, any>, type: '' as 'success' };
    const UpdateDebtWithDebtId = UpdateDebtSubmit.bind(null, params.get('id') as string || '')
    const [state, dispatch] = useFormState(UpdateDebtWithDebtId, initialState)

    useEffect(() => {
        if (Object.keys(state.errors).length > 0) {
            toast.error(state.message, { duration: 4000 })
            return;
        }

        if (state.message !== '') {
            toast.success(state.message, { duration: 4000 })
            push('/dashboard/debts')
        }
    }, [state, push])


    return (
        <form action={dispatch} className="forms">
            <p className="text-center text-xl font-black">Editar deuda</p>
            <TextInput defaultValue={values?.description} label='Descripcion' id='description' errors={state.errors?.description} />
            <TextInput defaultValue={values?.amount} type='number' label='Monto' id='amount' errors={state.errors?.amount} />
            <Select defaultValue={values?.creditor} errors={state?.errors?.creditor} options={users} id="creditor" nodes={{ label: 'name', value: 'id' }} label="Beneficiario" />
            <button type='submit' className="btn-primary">Guardar</button>
        </form>
    )
}

export default UpdateForm
'use client'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { FC, useState } from 'react'
import { MdAdd, MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import ModalConfirmation from '../modal/ModalConfirmation';
import * as deleteFunctions from '@/app/actions/delete-actions';

type DeleteFunctions = keyof typeof deleteFunctions

interface TableProps {
    headers: string[]
    rows: TableRow[]
    keys: string[];
    hasOptions?: boolean
    urlUpdate?: string
    optionsProps?: {
        add: boolean,
        update: boolean,
        delete: boolean
    }
    deleteProps?: {
        fnDelete: DeleteFunctions
        title: string
    }
    urlAdd?: string
}

export interface TableRow {
    id: string | number
    [key: string]: string | number | boolean | null | undefined;
}

const Table: FC<TableProps> = ({ headers, rows, keys, hasOptions = false, urlUpdate, deleteProps, urlAdd, optionsProps = { add: true, delete: true, update: true } }) => {

    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)
    const [selectedRow, setIsSelectedRow] = useState<TableRow | null>(null)

    const onClickUpdate = (id: string | number) => {
        urlUpdate && router.push(urlUpdate?.replaceAll('{id}', id.toString()))
    }

    const onClickDelete = (row: TableRow) => {
        setIsSelectedRow(row);
        setIsOpen(prev => !prev)
    }

    const onClickAdd = (id: string | number) => {
        urlAdd && router.push(urlAdd?.replaceAll('{id}', id.toString()))
    }


    return (
        <>
            <table className="w-full shadow-lg bg-white rounded-xl">
                <thead>
                    <tr className="opacity-90 shadow-lg">
                        {headers.map((title, index) => <th className='py-3' key={title + index}>{title}</th>)}
                    </tr>
                </thead>
                <tbody className='divide-y divide-slate-200'>
                    {rows.map((row, index) => <tr key={row.id + 'tr' + index}>
                        {keys.map((key, innerIndex) => <td className='text-center min-w-[30px] py-2 break-all' key={`${row.id}-${row?.[key]}-${innerIndex}`}>{
                            key === 'img' ?
                                <div className='flex w-full px-3 min-w-[30px] justify-center'>
                                    <Image width={25} height={25} className='rounded-full' alt='profile pic' src={row[key] as string} />
                                </div>
                                :
                                row?.[key]
                        }
                        </td>)}
                        {
                            hasOptions && <td>
                                <div className='flex flex-row gap-3 items-center'>
                                    {optionsProps?.update && <span title='Editar' className='cursor-pointer rounded-full hover:bg-gray-200' onClick={() => onClickUpdate(row?.id)}>
                                        <MdEdit color={'006400'} size={25} />
                                    </span>}
                                    {optionsProps?.delete && <span title='Eliminar' className='cursor-pointer rounded-full hover:bg-gray-200' onClick={() => onClickDelete(row)}>
                                        <MdDelete color={'006400'} size={25} />
                                    </span>}
                                    {optionsProps?.add && <span title='Registrar pago' className='cursor-pointer rounded-full hover:bg-gray-200' onClick={() => onClickAdd(row?.id)}>
                                        <MdAdd color={'006400'} size={25} />
                                    </span>}
                                </div>
                            </td>
                        }


                    </tr>)}

                </tbody>
            </table>
            <ModalConfirmation
                onClickConfirmation={() => {
                    setIsOpen(prev => !prev);
                    deleteProps?.fnDelete && deleteFunctions[deleteProps?.fnDelete](selectedRow?.id as string);
                }}
                title={`${deleteProps?.title?.replaceAll('{description}', selectedRow?.description as string || '')}`}
                isOpen={isOpen}
                closeModal={() => setIsOpen(prev => !prev)}
                className='' />
        </>
    )
}

export default Table
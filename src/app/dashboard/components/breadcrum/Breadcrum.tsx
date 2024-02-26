'use client'
import { useRouter } from 'next/navigation'
import React, { FC } from 'react'

interface BreadcrumProps {
    steps: {
        label: string,
        current: boolean,
        url?: string
    }[]
}

const Breadcrum: FC<BreadcrumProps> = ({ steps }) => {
    const router = useRouter()
    return (
        <div className='flex flex-row gap2'>
            {
                steps.map((step, index) => (<span className='flex flex-row' onClick={() => !step.current && step.url && router.push(step.url)} key={step.label}>
                    <p className={`${step.current ? 'font-bold ' : 'underline cursor-pointer hover:shadow-lg'} px-3`}>{step.label}</p> {index !== steps.length - 1 && '/'}
                </span>))
            }
        </div>
    )
}

export default Breadcrum
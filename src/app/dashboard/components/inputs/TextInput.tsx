'use client'
import React, { FC, useEffect, useState } from 'react'
interface TextInputProps {
    errors?: string[]
    className?: string
    label: string
    labelClassName?: string
    id: string
    type?: string
    min?: number
    defaultValue?: string | number
    placeholder?:string
}

const TextInput: FC<TextInputProps> = ({ className, labelClassName, errors, label, id, type = 'text', min = 0, defaultValue, placeholder='' }) => {
    const [errorsState, setErrorsState] = useState(errors)

    useEffect(() => {
        setErrorsState(errors)
    }, [errors])


    return (
        <div className="flex flex-col gap-2">
            <label className={labelClassName || ''} htmlFor={id} >{label}</label>
            <input
                placeholder={placeholder}
                className={`input-primary ${className || ''}`}
                defaultValue={defaultValue}
                onChange={() => { setErrorsState([]) }}
                type={type} min={min}
                aria-describedby={`${id}-error`}
                name={id}
                id={id} />
            <div id={`${id}-error`} aria-live="polite" aria-atomic="true">
                {errorsState &&
                    errorsState.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                            {error}
                        </p>
                    ))}
            </div>
        </div>
    )
}

export default TextInput
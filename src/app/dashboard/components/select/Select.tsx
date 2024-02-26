import { FC } from "react"

interface SelectProps<T> {
    options: T[]
    nodes: { value: string, label: string },
    label: string
    id: string
    errors?: string[],
    defaultValue?: string | number
}

const Select: FC<SelectProps<any>> = ({ options, nodes, label, id, errors, defaultValue }) => {
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={id} >{label}</label>
            <select defaultValue={defaultValue} name={id}>
                {
                    options?.map((opt: { [key: string]: string }) => <option className="p-3" key={opt?.[nodes.value]} value={opt?.[nodes.value]} >
                        {opt?.[nodes.label]}
                    </option>)
                }
            </select>
            <div id={`${id}-error`} aria-live="polite" aria-atomic="true">
                {errors &&
                    errors.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                            {error}
                        </p>
                    ))}
            </div>
        </div>
    )
}

export default Select
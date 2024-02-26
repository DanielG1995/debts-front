import React, { FC } from 'react'

interface TableSkeletonProps {
    headers: string[]
    rows: number
}



const TableSkeleton: FC<TableSkeletonProps> = ({ headers }) => {

    const Row = (index: number) => {
        return <>
            {
                headers.map((h, indexInner) => (<td key={'skeleton-table' + h + index + indexInner} className='py-2'><div className={`${h === '' ? 'w-[20px]' : 'w-[100px]'} h-[20px] rounded-full skeleton mx-auto`} /></td>))
            }
        </>
    }
    return (
        <table className="w-full shadow-lg bg-white ">
            <thead>
                <tr className="opacity-90 shadow-lg ">
                    {headers.map((h, i) => <th className='py-3' key={h + 'title-skeleton' + i}>{h}</th>)}
                </tr>
            </thead>
            <tbody>
                <tr>
                    {Row(1)}
                </tr>
                <tr>
                    {Row(2)}
                </tr>
            </tbody>
        </table>
    )
}

export default TableSkeleton
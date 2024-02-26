
import Table from './Table';
import { fetchTableDebts } from '@/app/fetch';
import { TableData } from '@/app/interfaces';

const TableDebts = async ({ headers, debtsAs, hasOptions = false }: { headers: string[], debtsAs?: string, hasOptions?: boolean }) => {
    const data: TableData = await fetchTableDebts(debtsAs);
    return (
        <>
            <Table
                headers={headers}
                hasOptions={hasOptions}
                urlUpdate='/dashboard/debts/update?id={id}'
                urlAdd='/dashboard/debts/payments?id={id}'
                rows={data?.rows || []}
                keys={data?.keys || []}
                deleteProps={
                    {
                        fnDelete: 'deleteDebtById',
                        title: 'Estas seguro de eliminar la deuda "{description}" ?'
                    }
                }
            />
        </>
    )
}

export default TableDebts
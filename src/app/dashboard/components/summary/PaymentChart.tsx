import { fetchPaymentChart } from '@/app/fetch'
import React from 'react'
import LineChart from '../charts/LineChart'
import { ChartData, Point } from 'chart.js'
import { MONTHS } from '@/app/lib/constants'

const PaymentChart = async ({ title }: { title: string }) => {

    const response = await fetchPaymentChart()
    const data: ChartData<"line", (number | Point | null)[], string> = {
        labels: MONTHS,

        datasets: [
            {
                data: [{ x: 1, y: 20 }, { x: 10, y: 2300 }],
                backgroundColor: "purple",
                borderColor: 'purple',
                label: ''
            },
        ],
    }


    return (<>
        <p className='text-2xl opacity-60 border-b border-[#000] mb-2 pb-2'>{title}</p>
        <LineChart  data={response?.dataChart || data} />
    </>
    )

}

export default PaymentChart
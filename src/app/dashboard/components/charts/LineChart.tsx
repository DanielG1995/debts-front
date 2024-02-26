// components/MyLineChart.tsx
"use client";

import { ChartData, Point } from "chart.js";
import { FC } from "react";
import { Line } from "react-chartjs-2";

interface LineChartProps {
    data: ChartData<"line", (number | Point | null)[], string>
}

const LineChart: FC<LineChartProps> = ({ data }) => {
    return (
        <div>
            <Line
                height={100}
                width={300}
                options={{
                    scales: {
                        x: {
                            beginAtZero: true,
                        },
                        y: {
                            beginAtZero: true,
                        }
                    }
                }}
                data={data}
            />
        </div>
    );
};
export default LineChart;
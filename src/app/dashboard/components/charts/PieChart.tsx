'use client'
import { ChartData } from 'chart.js';
import { FC } from 'react';
import { Pie } from 'react-chartjs-2';


interface PieChartProps {
  data: ChartData<"pie", number[], unknown>
}

const PieChart: FC<PieChartProps> = ({ data }) => {
  return (
    <div>
      <Pie
        className='w-[400px]'
        data={data}
      />
    </div>
  );
};
export default PieChart;

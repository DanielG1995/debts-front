'use client'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    Tooltip,
    PointElement,
    LineElement,
    ArcElement,
   Legend,
  } from "chart.js";
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    ArcElement,
    Legend
  );
const RegisterCharts = () => {
  return (
    <></>
  )
}

export default RegisterCharts
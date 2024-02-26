'use client'

import { LuLayoutDashboard } from "react-icons/lu";
import { GrLogout } from "react-icons/gr";
import { GiPayMoney } from "react-icons/gi";
import { GiReceiveMoney } from "react-icons/gi";
import { TbReportMoney } from "react-icons/tb";
import Logo from "./Logo";
import Link from "next/link";

const ICON_SIZE = '30px'

const OPTIONS = [
    {
        title: 'Resumen',
        icon: <LuLayoutDashboard color={'006400'} size={ICON_SIZE} />,
        redirectTo: '/dashboard'
    },
    {
        title: 'Deudor',
        icon: <GiPayMoney  color={'006400'} size={ICON_SIZE} />,
        redirectTo: '/dashboard/debts'
    },
    {
        title: 'Beneficiario',
        icon: <GiReceiveMoney color={'006400'}  size={ICON_SIZE} />,
        redirectTo: '/dashboard/debts/creditor'
    },
]


export const Sidebar = () => {

    return < div className="bg-white min-h-screen grow shadow-lg max-w-[100px] text-greenDark flex flex-col justify-between  ">
        <div className="  flex flex-col items-center justify-start">
            <Logo />
            {
                OPTIONS.map(option => (<Link href={option.redirectTo} key={'sidebar-option' + option.title} className="sidebar-option">
                    {option.icon}
                    {option.title}
                </Link>))
            }
        </div>

        <div className="sidebar-option">
            <a href="/api/auth/logout">
                <GrLogout color={'006400'} size={ICON_SIZE} />
            </a>
            Salir
        </div>
    </div >



}
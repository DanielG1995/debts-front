import React from 'react'
import Image from "next/image";
import logo from '../../../../assets/imgs/icon.svg';


const Logo = () => {
    return (<div className='flex flex-col items-center p-2 mb-10'>
        <Image alt="debts" src={logo} />
    </div>
    )
}

export default Logo
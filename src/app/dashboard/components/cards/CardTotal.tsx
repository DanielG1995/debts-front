import React from 'react'

const CardTotal = ({ value, text }: { value: string, text: string }) => {
    return (
        <div className={`gap-2 min-w-[200px] bg-white flex justify-center flex-col items-start rounded-2xl shadow-2xl py-3  px-5`}>
            <div className=" bolder italic flex items-start"><span className=" mr-3 text-3xl  ">$</span><span className=" text-[48px] leading-[48px]">{value}</span></div>
            <div className="text-[16px] opacity-70">{text}</div>
        </div>
    )
}

export default CardTotal
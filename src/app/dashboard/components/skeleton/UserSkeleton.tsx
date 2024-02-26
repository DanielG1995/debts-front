import React from 'react'

const UserSkeleton = () => {
    return (
        <div className='flex flex-row items-center gap-5' >
            <div className='skeleton w-[100px] h-[20px] rounded-md' />
            <div className='skeleton w-[50px] h-[50px] rounded-full' />
        </div >
    )
}

export default UserSkeleton
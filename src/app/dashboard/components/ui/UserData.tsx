'use client'
import { useUser } from '@auth0/nextjs-auth0/client'
import Image from 'next/image'
import React from 'react'
import toast from 'react-hot-toast'
import UserSkeleton from '../skeleton/UserSkeleton'

const UserData = () => {

    const { user, isLoading } = useUser()
    return (

        <>
            {isLoading ? <UserSkeleton /> : <><div className="cursor-pointer" onClick={() => toast.success(`${user?.email}`)}><>{user?.given_name || user?.name}</></div>
                <Image
                    alt="profile_pic"
                    className="rounded-full"
                    priority
                    width={50}
                    height={50}
                    src={user?.picture || ''} /></>}
        </>
    )
}

export default UserData
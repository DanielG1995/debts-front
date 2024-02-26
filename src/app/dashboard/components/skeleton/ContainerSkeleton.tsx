import React, { FC } from 'react'

interface ContainerSkeletonProps {
    className:string
}

const ContainerSkeleton: FC<ContainerSkeletonProps> = ({ className }) => {
    return (
        <div className={`skeleton ${className ? className : ''} rounded-md`} />

    )
}

export default ContainerSkeleton
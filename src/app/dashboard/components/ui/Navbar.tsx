

import UserData from "./UserData"

export const Navbar = () => {

    return <div className="h-[80px] bg-darkGreen text-white shadow-lg w-auto flex flex-row items-center justify-end py-5 px-20 gap-5">
        <UserData />       
    </div>
}
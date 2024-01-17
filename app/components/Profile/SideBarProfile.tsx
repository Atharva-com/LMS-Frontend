import Image from 'next/image';
import React, { FC } from 'react'
import avatarDefault from '../../assests/images/avatar.png'
import { RiLockPasswordLine } from 'react-icons/ri';
import { SiCoursera } from 'react-icons/si';
import { AiOutlineLogout } from 'react-icons/ai';

type Props = {
    user: any;
    active: number;
    avatar: string | null;
    setActive: (active: number) => void;
    logOutHandler: any;
}

const SideBarProfile: FC<Props> = ({ user, active, avatar, setActive, logOutHandler }) => {
    return (
        <div className='w-full 800px:px-0 px-4'>

            <div className={`w-full flex items-center 800px:justify-start justify-center px-2 py-3 800px:px-3 800px:py-4 cursor-pointer ${active === 1 ? "dark:bg-slate-800 bg-gray-100 rounded-lg" : "bg-transparent"}`} onClick={() => setActive(1)}>

                <Image
                    src={user?.avatar || avatar ? user?.avatar.url || avatar : avatarDefault}
                    alt="avatar"
                    width={30}
                    height={30}
                    className='w-[30px] h-[30px] rounded-full cursor-pointer dark:text-white text-black object-cover'
                />

                <h5 className='pl-2 800px:block hidden font-Poppins dark:text-white text-black'>
                    My Account
                </h5>
            </div>

            <div className={`w-full flex items-center 800px:justify-start justify-center px-2 py-4 800px:px-3 800px:py-4 cursor-pointer ${active===2 ? "dark:bg-slate-900 bg-gray-100 rounded-lg" : "bg-transparent"}`} onClick={() => setActive(2)}>

                <RiLockPasswordLine size={20}  className='dark:text-white text-black w-[25px] h-[25px]' />

                <h5 className='pl-2 800px:block hidden font-Poppins dark:text-white text-black'>
                    Change Password
                </h5>
            </div>

            <div className={`w-full flex items-center 800px:justify-start justify-center px-2 py-4 800px:px-3 800px:py-4 cursor-pointer ${active===3 ? "dark:bg-slate-900 bg-gray-100 rounded-lg" : "bg-transparent"}`} onClick={() => setActive(3)}>

                <SiCoursera size={20} className='dark:text-white text-black  w-[25px] h-[25px]' />

                <h5 className='pl-2 800px:block hidden font-Poppins dark:text-white text-black'>
                    Enrolled Courses
                </h5>
            </div>

            <div className={`w-full flex items-center 800px:justify-start justify-center px-2 py-4 800px:px-3 800px:py-4 cursor-pointer `} onClick={logOutHandler}>

                <AiOutlineLogout size={20} className='dark:text-white text-black  w-[25px] h-[25px]' />

                <h5 className='pl-2 800px:block hidden font-Poppins dark:text-white text-black'>
                    Logout
                </h5>
            </div>

        </div>
    )
}

export default SideBarProfile
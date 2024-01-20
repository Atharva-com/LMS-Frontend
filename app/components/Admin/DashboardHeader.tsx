"use client"
import React, { FC, useState } from 'react'
import ThemeSwitcher from '../ThemeSwitcher'
import { IoMdNotificationsOutline } from 'react-icons/io'

type Props = {}

const DashboardHeader:FC<Props> = () => {
    const [open, setOpen] = useState(false)
  return (
    <div className='w-full flex items-center justify-end p-2 rounded-b-lg 800px:rounded-none 800px:p-6 fixed right-0 800px:bg-transparent bg-[#111C43]'>
        <ThemeSwitcher />

        <div className='relative cursor-pointer m-2' onClick={()=> setOpen(!open)}>

            <IoMdNotificationsOutline className='text-2xl cursor-pointer text-white' />

            <span className='absolute -top-2 -right-2 bg-[#3ccba0] rounded-full w-[20px] h-[20px] text-[12px] flex items-center justify-center text-white'>
                3
            </span>
        </div>

        {open && (
            <div className='w-[290px] 800px:w-[350px] right-[6px] 800px:right-8 h-[50vh] dark:bg-[#111C43] bg-white border border-[#7fffd4] shadow-xl absolute top-16 z-10 rounded-lg'>
                <h5 className='text-center text-[20px] font-Poppins text-black dark:text-white p-3'>
                    Notifications
                </h5>

                <div className='dark:bg-[#2d3a4ea1] bg-[#00000013] font-Poppins border-b dark:border-b-[#ffffff47] border-b-[#0000000f]'>

                    <div className='w-full flex items-center justify-between p-2'>
                        <p className='text-black dark:text-white'>
                            New Questions Received
                        </p>

                        <p className='text-black dark:text-white cursor-pointer'>
                            Mark as read
                        </p>
                    </div>

                    <p className='px-2 text-black dark:text-white'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, voluptates. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi, dolores.
                    </p>

                    <p className='p-2 font-light text-gray-600 dark:text-gray-400 text-[14px]'>
                        5 days ago
                    </p>
                </div>
                
            </div>
        )}
    </div>
  )
}

export default DashboardHeader
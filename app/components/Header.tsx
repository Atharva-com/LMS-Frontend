"use client"

import Link from 'next/link';
import React, { FC, useState } from 'react'
import NavItems from './NavItems';
import ThemeSwitcher from './ThemeSwitcher';
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from 'react-icons/hi';
import CustomModal from '../utils/CustomModal';
import Login from './auth/Login';
import SignUp from './auth/SignUp';
import Verification from './auth/Verification';
import { LoginRounded } from '@mui/icons-material';

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  route: string;
  setRoute: (route: string) => void;
}

const Header: FC<Props> = ({ activeItem, setOpen, route, open, setRoute }) => {
  const [active, setActive] = useState(false)
  const [openSidebar, setOpenSidebar] = useState(false)

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 85) {
        setActive(true)
      } else {
        setActive(false)
      }

    })
  }

  const handleClose = (e: any) => {
    if (e.target.id === 'screen') {
      setOpenSidebar(false)
    }
  }

  return (
    <div className='w-full relative'>
      <div className={`${active ? "dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[80px] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500 z-[80]" : 'w-full border-b dark:border-[#ffffff1c] h-[80px] z-[80] dark:shadow'}`}>

        <div className='w-[95%] 800px:w-[92%] m-auto py-2 h-full'>

          <div className='w-full h-[80px] flex items-center justify-between p-3'>

            {/* Logo */}
            <div>

              <Link href={'/'} className={`text-[25px] font-Poppins font-[500] text-black dark:text-white`}>
                Elearning
              </Link>

            </div>

            {/* Navitems */}
            <div className="flex items-center">

              <NavItems
                activeItem={activeItem}
                isMobile={false}
              />

              <ThemeSwitcher />

              {/* only for mobile */}
              <div className='800px:hidden'>
                <HiOutlineMenuAlt3
                  size={25}
                  className='cursor-pointer dark:text-white text-black'
                  onClick={() => setOpenSidebar(true)}
                />
              </div>

              <HiOutlineUserCircle
                size={25}
                className='cursor-pointer dark:text-white text-black 800px:block hidden'
                onClick={() => setOpen(true)}
              />

            </div>

          </div>

        </div>

        {/* mobile sidebar */}
        {
          openSidebar && (
            <div
              className="fixed w-full h-screen top-0 left-0 z-[9999] dark:bg-[unset] bg-[#00000024]"
              onClick={handleClose}
              id='screen'
            >

              <div className='w-[70%] fixed z-[9999999] h-screen bg-white dark:bg-slate-900 dark:bbg-opacity-90 top-0 right-0'>

                <NavItems activeItem={activeItem} isMobile={true} />

                <HiOutlineUserCircle
                  size={25}
                  className='cursor-pointer ml-5 my-2 dark:text-white text-black'
                  onClick={() => setOpen(true)}
                />

                <br />
                <br />

                <p className='text-[16px] px-2 pl-5 text-black dark:text-white'>
                  Copyright @ 2023 Learning
                </p>
              </div>
            </div>
          )
        }

      </div>

      {
        route === "Login" && (
          <>
            {
              open && (
                <CustomModal
                  open={open}
                  setOpen={setOpen}
                  activeItem={activeItem}
                  setRoute={setRoute}
                  component={Login}
                />
              )
            }
          </>
        )
      }

      {
        route === "Sign-up" && (
          <>
            {
              open && (
                <CustomModal
                  open={open}
                  setOpen={setOpen}
                  activeItem={activeItem}
                  setRoute={setRoute}
                  component={SignUp}
                />
              )
            }
          </>
        )
      }

      {
        route === "Verification" && (
          <>
            {
              open && (
                <CustomModal
                  open={open}
                  setOpen={setOpen}
                  activeItem={activeItem}
                  setRoute={setRoute}
                  component={Verification}
                />
              )
            }
          </>
        )
      }

    </div>
  )
}

export default Header
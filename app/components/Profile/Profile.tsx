"use client"
import React, { FC, useEffect, useState } from 'react'
import SideBarProfile from './SideBarProfile'
import { useLogoutQuery } from '../../../redux/features/auth/authApi';
import { signOut } from 'next-auth/react';
import toast from 'react-hot-toast';
import ProfileInfo from './ProfileInfo';
import ChangePassword from './ChangePassword';
import CourseCard from '../Course/CourseCard';
import { useGetAllUserCoursesQuery } from '@/redux/features/courses/coursesApi';

type Props = {
  user: any;
}

const Profile: FC<Props> = ({ user }) => {
  const [scroll, setScroll] = useState(false)
  const [avatar, setAvatar] = useState(null)
  const [active, setActive] = useState(1)
  const [logout, setLogout] = useState(false)
  const [courses, setCourses] = useState([])
  const { data, isLoading } = useGetAllUserCoursesQuery(undefined, {})
  const { } = useLogoutQuery(undefined, { skip: !logout ? true : false })

  const logOutHandler = async () => {
    setLogout(true)
    await signOut()

    setTimeout(() => {
      toast.success("Logout successful.");
    }, 3000)
  }

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 85) {
        setScroll(true)
      } else {
        setScroll(false)
      }

    })
  }

  useEffect(() => {
    if (data) {
      if (data?.success === true) {
        const filteredCourses = user.courses.map((userCourse: any) => data.courses.find((course: any) => course.id === userCourse.id)).filter((course: any) => course !== undefined)
        setCourses(filteredCourses)
      }
    }
  }, [data, isLoading])

  return (
    <div className='w-[85%] flex mx-auto'>
      <div className={`w-[60px] 800px:w-[310px] h-[359px] dark:bg-slate-900 bg-white bg-opacity-90 border dark:border-[#ffffff1d] border-black dark:rounded-[5px] rounded-lg shadow-xl dark:shadow-sm my-[80px] sticky ${scroll ? "top-[120px]" : "top-[30px]"} left-[30px]`}>

        <SideBarProfile user={user} active={active} avatar={avatar} setActive={setActive} logOutHandler={logOutHandler} />

      </div>

      {
        active === 1 && (
          <div className='w-full h-full bg-transparent mt-[80px]'>
            <ProfileInfo avatar={avatar} user={user} />
          </div>
        )
      }

      {
        active === 2 && (
          <div className='w-full h-full bg-transparent mt-[80px]'>
            <ChangePassword />
          </div>
        )
      }

      {
        active === 3 && (
          <div className='w-full pl-7 px-2 800px:px-10 800px:pl-8'>
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0">
              {courses && (
                courses.map((item: any, index: number) => {
                  return (
                    <CourseCard item={item} key={index} />
                  )
                })
              )}
            </div>

            {
              courses.length === 0 && (
                <h1 className='text-center text-[18px] font-Poppins'>
                  You don&apos;t have any purchased courses .
                </h1>
              )
            }
          </div>
        )
      }
    </div>
  )
}

export default Profile
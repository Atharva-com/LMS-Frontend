"use client"

import AllUsers from '@/app/components/Admin/Course/AllUsers'
import DashboardHero from '@/app/components/Admin/DashboardHero'
import AdminSidebar from '@/app/components/Admin/sidebar/AdminSidebar'
import Heading from '@/app/utils/Heading'
import React from 'react'

type Props = {}

const page = (props: Props) => {
  return (
    <div>
        <Heading
                title={`Learning - Admin`}
                description="It is a platform for students to learn."
                keywords="Programming, MERN, Development, Redux, Flutter."
            />

            <div className="flex h-screen">
                <div className="w-1/5 1500px:w-[16%]">
                    <AdminSidebar />
                </div>

                <div className="w-[85%]">
                    <DashboardHero />

                    <AllUsers />
                </div>
            </div>
    </div>
  )
}

export default page
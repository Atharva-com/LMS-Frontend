"use client"

import CreateCourse from '@/app/components/Admin/Course/CreateCourse'
import DashboardHeader from '@/app/components/Admin/DashboardHeader'
import AdminSidebar from '@/app/components/Admin/sidebar/AdminSidebar'
import Heading from '@/app/utils/Heading'
import React from 'react'

type Props = {}

const Page = (props: Props) => {
  return (
    <div>
        <Heading
                title={`Learning - Admin`}
                description="It is a platform for students to learn."
                keywords="Programming, MERN, Development, Redux, Flutter."
            />

            <div className="flex">
                <div className="1500px:w-[16%] w-[15%]">
                    <AdminSidebar />
                </div>

                <div className="w-[85%]">
                    <DashboardHeader />

                    <CreateCourse />
                </div>
            </div>
    </div>
  )
}

export default Page
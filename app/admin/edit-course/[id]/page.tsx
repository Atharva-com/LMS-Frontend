
"use client"

import EditCourse from '@/app/components/Admin/Course/EditCourse'
import DashboardHero from '@/app/components/Admin/DashboardHero'
import AdminSidebar from '@/app/components/Admin/sidebar/AdminSidebar'
import Heading from '@/app/utils/Heading'
import React from 'react'

type Props = {}

const page = ({params}: any) => {
    const id = params.id
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
                    <DashboardHero />

                    <EditCourse id={id} />
                </div>
            </div>
    </div>
  )
}

export default page
"use client"

import React from 'react'
import Heading from '../utils/Heading'
import AdminSidebar from '../components/Admin/sidebar/AdminSidebar'
import DashboardHero from '../components/Admin/DashboardHero'

type Props = {}

const page = (props: Props) => {
    return (
        <div>
            <Heading
                title={`Learning - Admin`}
                description="It is a platform for students to learn."
                keywords="Programming, MERN, Development, Redux, Flutter."
            />

            <div className="flex h-[200vh]">
                <div className="w-1/5 1500px:w-[16%]">
                    <AdminSidebar />
                </div>

                <div className="w-[85%]">
                    <DashboardHero />
                </div>
            </div>
        </div>
    )
}

export default page
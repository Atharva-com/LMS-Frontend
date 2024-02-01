"use client"

import React, { FC, useState } from 'react'
import Protected from '../hooks/useProtected'
import Heading from '@/app/utils/Heading'
import Header from '@/app/components/Header'
import Profile from '../components/Profile/Profile'
import { useSelector } from 'react-redux'
import Footer from '../components/Footer'

type Props = {}

const Page: FC<Props> = (props: Props) => {
    const [open, setOpen] = useState(false)
    const [activeItem, setActiveItem] = useState(5)
    const [route, setRoute] = useState("Login")
    const { user } = useSelector((state: any) => state.auth)
    return (
        <div>
            <Protected>
                <Heading
                    title={`${user?.name} profile - Learning`}
                    description="It is a platform for students to learn."
                    keywords="Programming, MERN, Development, Redux, Flutter."
                />

                <Header
                    open={open}
                    setOpen={setOpen}
                    activeItem={activeItem}
                    route={route}
                    setRoute={setRoute}
                />

                <Profile user={user} />

                <Footer />
            </Protected>
        </div>
    )
}

export default Page
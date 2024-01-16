"use client"

import React, { FC, useState } from 'react'
import Protected from '../hooks/useProtected'
import Heading from '@/app/utils/Heading'
import Header from '@/app/components/Header'

type Props = {}

const Profile: FC<Props> = (props: Props) => {
    const [open, setOpen] = useState(false)
    const [activeItem, setActiveItem] = useState(0)
    const [route, setRoute] = useState("Login")
    return (
        <div>
            <Protected>
                <Heading
                    title="Learning Platform"
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
            </Protected>
        </div>
    )
}

export default Profile
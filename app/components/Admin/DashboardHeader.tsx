"use client"
import React, { FC, useState } from 'react'
import ThemeSwitcher from '../ThemeSwitcher'
import { IoMdNotificationsOutline } from 'react-icons/io'
import socketIO from 'socket.io-client'
import { useEffect } from 'react'
import { useGetAllNotificationsQuery, useUpdateNotificationStatusMutation } from '@/redux/features/notifications/notificationsApi'
import { format } from 'timeago.js'
import toast from 'react-hot-toast'
import { IoCheckmarkDoneCircleOutline } from 'react-icons/io5'
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] })
type Props = {
    open?: boolean
    setOpen?: any
}

const DashboardHeader: FC<Props> = ({ open, setOpen }) => {

    const { data, refetch } = useGetAllNotificationsQuery(undefined, {
        refetchOnMountOrArgChange: true,
    })

    const [updateNotificationStatus, { data: updateData }] = useUpdateNotificationStatusMutation()

    const [notifications, setNotifications] = useState([])

    const [audio] = useState(
        new Audio("http://codeskulptor-demos.commondatastorage.googleapis.com/descent/gotitem.mp3")
    )

    const playerNotificationSound = () => {
        audio.play()
    }

    useEffect(() => {
        if (data) {
            if (data?.success === true) {
                setNotifications(data.notification.filter((item: any) => item.status === 'unread'))
            }
        }

        if (updateData) {
            if (updateData?.success === true) {
                refetch()
            }
        }

        audio.load()
    }, [data, updateData])

    useEffect(() => {
        socketId.on("newNotification", (data) => {
            refetch()
            playerNotificationSound()
        })
    }, [])

    const handleNotificationStatusChange = async (id: string) => {
        await updateNotificationStatus(id)
    }

    return (
        <div className='w-full flex items-center justify-end p-2 rounded-b-lg 800px:rounded-none 800px:p-6 fixed right-0 800px:bg-transparent bg-[#111C43]'>
            <ThemeSwitcher />

            <div className='relative cursor-pointer m-2' onClick={() => setOpen(!open)}>

                <IoMdNotificationsOutline className='text-2xl cursor-pointer dark:text-white text-black' />

                <span className='absolute -top-2 -right-2 bg-[#3ccba0] rounded-full w-[20px] h-[20px] text-[12px] flex items-center justify-center text-white'>
                    {notifications && notifications.length === 0 ? '0' :notifications.length }
                </span>
            </div>

            {open && (
                <div className='w-[290px] 800px:w-[350px] right-[6px] 800px:right-8 h-[50vh] dark:bg-[#111C43] bg-white border border-[#7fffd4] shadow-xl absolute top-16 z-[9999] rounded-lg overflow-y-scroll'>
                    <h5 className='text-center text-[20px] font-Poppins text-black dark:text-white p-3'>
                        Notifications
                    </h5>

                    {
                        notifications && notifications.map((item: any, index: number) => {
                            return (
                                <div className='dark:bg-[#2d3a4ea1] bg-[#00000013] font-Poppins border-b dark:border-b-[#ffffff47] border-b-gray-500' key={index}>

                                    <div className='w-full flex items-center justify-between p-2'>
                                        <p className='text-black dark:text-white'>
                                            {item.title}
                                        </p>

                                        <p className='text-black dark:text-white cursor-pointer' onClick={() => handleNotificationStatusChange(item._id)}>
                                            {item.status === "unread" && 'Mark as read'}
                                            {item.status === "read" && <IoCheckmarkDoneCircleOutline size={20} className='text-green-500' />}
                                        </p>
                                    </div>

                                    <p className='px-2 text-black dark:text-white'>
                                        {item.message}
                                    </p>

                                    <p className='p-2 font-light text-gray-600 dark:text-gray-400 text-[14px]'>
                                        {format(item.createdAt)}
                                    </p>
                                </div>
                            )
                        })
                    }

                </div>
            )}
        </div>
    )
}

export default DashboardHeader
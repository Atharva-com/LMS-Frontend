"use client"
import CourseContent from '@/app/components/Course/CourseContent';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import { HashLoader } from 'react-spinners';

type Props = {
    params: any;
}

const Page = ({params}: Props) => {
    const id = params.id

    const {isLoading, error, data} = useLoadUserQuery(undefined, {})
console.log(data)
    useEffect(() => {
        if(data) {
            const isPurhased = data?.user?.courses.find((item: any) => item._id === id)
            if(!isPurhased) {
                window.location.href = '/'
                toast.error("You don't have access to this course.")
            }
            if(error) {
                window.location.href = '/'
                toast.error("Something bad happened.")
            }
        }
    },[data, error, id])

  return (
    <>
        {
            isLoading ? (
                <div className={`w-full h-screen flex items-center justify-center `}>
                        <HashLoader color='#37a39a' size={40} className='mx-auto' />
                    </div>
            ) : (
                <div>
                    <CourseContent id={id} user={data.user} />
                </div>
            )
        }
    </>
  )
}

export default Page
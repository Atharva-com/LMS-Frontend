import Heading from '@/app/utils/Heading'
import { useGetCourseDetailsQuery } from '@/redux/features/courses/coursesApi'
import React, { FC, useState } from 'react'
import { HashLoader } from 'react-spinners'
import Header from '../Header'
import CourseDetails from './CourseDetails'

type Props = {
    id: string
}

const CourseDetailsPage: FC<Props> = ({ id }) => {
    const [route, setRoute] = useState("Login")
    const [open, setOpen] = useState(false)
    const { data, isLoading } = useGetCourseDetailsQuery(id)
    return (
        <>
            {
                isLoading ?
                    <div className={`w-full h-screen flex items-center justify-center `}>
                        <HashLoader color='#37a39a' size={40} className='mx-auto' />
                    </div>
                    : (
                        <div>
                            <Heading
                                title={data.course.name + "- Learning"}
                                description="It is a platform for students to learn."
                                keywords={data?.course?.tags}
                            />

                            <Header
                                route={route}
                                setRoute={setRoute}
                                open={open}
                                setOpen={setOpen}
                                activeItem={1}
                            />

                            <CourseDetails data={data.course} />
                        </div>
                    )

            }
        </>
    )
}

export default CourseDetailsPage
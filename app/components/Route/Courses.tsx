import { useGetAllUserCoursesQuery } from '@/redux/features/courses/coursesApi'
import React, { FC, useEffect, useState } from 'react'
import CourseCard from '../Course/CourseCard'

type Props = {}

const Courses:FC<Props> = (props: Props) => {
    const {data} = useGetAllUserCoursesQuery({})
    const [courses, setCourses] = useState([])

    useEffect(() => {
        if(data){
            setCourses(data.courses)
        }
    },[data])
    console.log(courses)
  return (
    <div className={`w-[90%] 800px:w-[80%] m-auto`}>

        <h1 className='text-center font-Poppins text-[25px] leading-[35px] sm:text-3xl lg:text-4xl dark:text-white 800px:!leading-[60px] text-[#000] font-[700] tracking-tight'>
            Expand Your Knowledge {" "}
            <span className='text-gradient'>
                Opportunity
            </span>
            <br />
            Opportunity With Our Courses
        </h1>

        <br />

        <div className='grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0'>
            {
                courses && courses.map((item:any, index:number) => {
                    return (<CourseCard item={item} key={index} />)
                })
            }
        </div>
         
    </div>
  )
}

export default Courses
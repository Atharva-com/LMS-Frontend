"use client"

import { useGetAllUserCoursesQuery } from '@/redux/features/courses/coursesApi'
import { useGetHeroDataQuery } from '@/redux/features/layout/layoutApi'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Heading from '../utils/Heading'
import { styles } from '../styles/style'
import CourseCard from '../components/Course/CourseCard'
import { HashLoader } from 'react-spinners'

type Props = {}

const Page = (props: Props) => {
  const searchParams = useSearchParams()
  const search = searchParams?.get('title')
  const { data, isLoading } = useGetAllUserCoursesQuery(undefined, {})
  const { data: categoriesData } = useGetHeroDataQuery("Categories", {})
  const [route, setRoute] = useState("Login")
  const [open, setOpen] = useState(false)
  const [courses, setCourses] = useState([])
  const [category, setCategory] = useState("All")

  useEffect(() => {
    if (category === "All") {
      setCourses(data?.courses)
    }

    if (category !== "All") {
      setCourses(data?.courses.filter((course: any) => course.categories === category))
    }

    if (search) {
      setCourses(data?.courses.filter((course: any) => course.name.toLowerCase().includes(search.toLowerCase())))
    }

  }, [data, category, search])

  const categories = categoriesData?.layout.categories

  return (
    <div>
      {
        isLoading ? (
          <div className={`w-full h-screen flex items-center justify-center `}>
                        <HashLoader color='#37a39a' size={40} className='mx-auto' />
                    </div>
        ) : (
          <>
            <Header
              route={route}
              setRoute={setRoute}
              open={open}
              setOpen={setOpen}
              activeItem={2}
            />

            <div className='w-[95%] 800px:w-[85%] m-auto min-h-[70vh]'>
              <Heading
                title={"All courses - Learning"}
                description={'All courses available for you to learn.'}
                keywords={'courses, learning, education, online, coding skills, expert insights'}
              />

              <br />

              <div className="w-full flex items-center flex-wrap">
                <div
                  className={`h-[35px] ${category === "All" ? 'bg-[crimson]' : "bg-[#5050cb]"
                    } m-3 px-3 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer`}
                  onClick={() => setCategory("All")}
                >
                  All
                </div>

                {
                  categories && categories.map((item: any, index: number) => {
                    return (
                      <div
                        key={index}
                        className={`h-[35px] ${category === item.title ? 'bg-[crimson]' : "bg-[#5050cb]"
                          } m-3 px-3 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer`}
                        onClick={() => setCategory(item.title)}
                      >
                        {item.title}
                      </div>
                    )
                  })
                }
              </div>

              {
                courses && courses.length === 0 && (
                  <p className={`${styles.label} justify-center min-h-[50vh] flex items-center`}>
                    {search ? "No courses found" : "No courses found in this category."}
                  </p>
                )
              }

              <br /><br />
              <div className='grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0'>
                {
                  courses && courses.map((item: any, index: number) => {
                    return (<CourseCard item={item} key={index} />)
                  })
                }
              </div>
            </div>
          </>
        )
      }
    </div>
  )
}

export default Page
import { useGetAllUserCoursesQuery } from '@/redux/features/courses/coursesApi'
import { useGetHeroDataQuery } from '@/redux/features/layout/layoutApi'
import { useSearchParams } from 'next/navigation'
import React, { useState } from 'react'

type Props = {}

const Page = (props: Props) => {
    const searchParams = useSearchParams()
    const search = searchParams?.get('title')
    const {data, isLoading} = useGetAllUserCoursesQuery(undefined, {})
    const {data: categoriesData} = useGetHeroDataQuery("Categories", {})
    const [route, setRoute] = useState("Login")
    const [open, setOpen] = useState(false)
    const [courses, setCourses] = useState([])
    const [category, setCategory] = useState("ALL")
  return (
    <div>P</div>
  )
}

export default Page
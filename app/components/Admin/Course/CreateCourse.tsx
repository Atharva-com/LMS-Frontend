"use client"

import React, { useState } from 'react'
import CourseInformation from './CourseInformation'

type Props = {}

const CreateCourse = (props: Props) => {

    const [active, setActive] = useState(0)
    const [course, setCourse] = useState({
        name: '',
        description: '',
        price: "",
        estimatedPrice: "",
        tags: "",
        level: "",
        demoUrl: "",
        thumbnail: "",
    })
    const [benefits, setBenefits] = useState([{title: ""}])
    const [prerequistes, setPrerequistes] = useState([{title: ""}])
    const [courseContentData, setCourseContentData] = useState([
        {
            videoUrl: "",
            title: "",
            description: "",
            videoSection: "Untitled Section",
            links: [
                {
                    title: "",
                    url: "",
                },
            ],
            suggestion: "",
        }
    ])

    const [courseData, setcourseData] = useState({})

  return (
    <div className='w-full flex min-h-screen'>

        <div className='w-[80%]'>
            {
                active === 0 && (
                    <CourseInformation />
                )
            }
        </div>

    </div>
  )
}

export default CreateCourse
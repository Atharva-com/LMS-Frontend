"use client"

import React, { useState } from 'react'
import CourseInformation from './CourseInformation'
import CourseOptions from './CourseOptions'
import CourseData from './CourseData'
import CourseContent from './CourseContent'
import CoursePreview from './CoursePreview'

type Props = {}

const CreateCourse = (props: Props) => {

    const [active, setActive] = useState(2)
    const [courseInfo, setCourseInfo] = useState({
        name: '',
        description: '',
        price: "",
        estimatedPrice: "",
        tags: "",
        level: "",
        demoUrl: "",
        thumbnail: "",
    })
    const [benefits, setBenefits] = useState([{ title: "" }])
    const [prerequistes, setPrerequistes] = useState([{ title: "" }])
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

    const [courseData, setCourseData] = useState({})

    const handleSubmit = async (e: any) => {
        // format benefits array
        const formattedBenefits = benefits.map((benefit) => ({ title: benefit.title }))

        // format prerequisites array
        const formattedPrerequisites = prerequistes.map((prerequisite) => ({ title: prerequisite.title }))

        // format course content array
        const formattedCourseContent = courseContentData.map((content) => ({
            videoUrl: content.videoUrl,
            title: content.title,
            description: content.description,
            videoSection: content.videoSection,
            links: content.links.map((link) => ({
                title: link.title,
                url: link.url,
            })),
            suggestion: content.suggestion,
        }))

        // prepare data object
        const data = {
            name: courseInfo.name,
            description: courseInfo.description,
            price: courseInfo.price,
            estimatedPrice: courseInfo.estimatedPrice,
            tags: courseInfo.tags,
            level: courseInfo.level,
            demoUrl: courseInfo.demoUrl,
            thumbnail: courseInfo.thumbnail,
            totalVideos: courseContentData.length,
            benefits: formattedBenefits,
            prerequisites: formattedPrerequisites,
            courseContent: formattedCourseContent,
        }

        setCourseData(data)
    }

    const handleCourseCreate = async (e: any) => {
        // send data to server
        console.log(courseData)
    }

    return (
        <div className='w-full flex min-h-screen'>

            <div className='800px:w-[80%] w-full'>
                {
                    active === 0 && (
                        <CourseInformation
                            courseInfo={courseInfo}
                            setCourseInfo={setCourseInfo}
                            active={active}
                            setActive={setActive}
                        />
                    )
                }

                {
                    active === 1 && (
                        <CourseData
                            benefits={benefits}
                            setBenefits={setBenefits}
                            prerequistes={prerequistes}
                            setPrerequistes={setPrerequistes}
                            active={active}
                            setActive={setActive}
                        />
                    )
                }

                {
                    active === 2 && (
                        <CourseContent
                            courseContentData={courseContentData}
                            setCourseContentData={setCourseContentData}
                            handleSubmit={handleSubmit}
                            active={active}
                            setActive={setActive}
                        />
                    )
                }

                {
                    active === 3 && (
                        <CoursePreview
                            courseData={courseData}
                            handleCourseCreate={handleCourseCreate}
                            active={active}
                            setActive={setActive}
                        />
                    )
                }
            </div>

            <div className='w-[20%] mt-[100px] h-screen fixed z-[-1] top-18 right-0'>
                <CourseOptions active={active} setActive={setActive} />
            </div>

        </div>
    )
}

export default CreateCourse
import React, { FC, useState } from 'react'

type Props = {
    courseContentData: any;
    setCourseContentData: (courseContentData: any) => void;
    handleSubmit: (e: any) => void;
    active: number;
    setActive: (active: number) => void;
}

const CourseContent:FC<Props> = ({courseContentData, setCourseContentData, handleSubmit: handleCourseSubmit, active, setActive, }) => {
    const [isCollapsed, setIsCollapsed] = useState(
        Array(courseContentData.length).fill(false)
    )
    const [activeSection, setActiveSection] = useState(1)

    const handleSubmit = async (e: any) => {
        e.preventDefault()
    }
  return (
    <div>CourseContent</div>
  )
}

export default CourseContent
import React, { FC } from 'react'

type Props = {
    courseContentData: any;
    setCourseContentData: (courseContentData: any) => void;
    handleSubmit: (e: any) => void;
    active: number;
    setActive: (active: number) => void;
}

const CourseContent:FC<Props> = ({courseContentData, setCourseContentData, handleSubmit, active, setActive, }) => {
  return (
    <div>CourseContent</div>
  )
}

export default CourseContent
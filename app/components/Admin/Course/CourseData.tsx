import React, { FC } from 'react'

type Props = {
    benefits: {title: string} [];
    setBenefits: (benefits: {title: string} []) => void;
    prerequistes: {title: string} [];
    setPrerequistes: (prerequistes: {title: string} []) => void;
    active: number;
    setActive: (active: number) => void;
}

const CourseData:FC<Props> = ({ benefits, setBenefits,prerequistes, setPrerequistes, active, setActive }) => {
  return (
    <div>CourseData</div>
  )
}

export default CourseData
import { styles } from '@/app/styles/style';
import React, { FC, useState } from 'react'

type Props = {
    courseInfo: any;
    setCourseInfo: (courseInfo: any) => void;
    active: number;
    setActive: (active: number) => void;
}

const CourseInformation: FC<Props> = ({ courseInfo, setCourseInfo, active, setActive }) => {
    const [dragging, setDragging] = useState(false)
    const handleSubmit = (e: any) => {
        e.preventDefault()
        setActive(active + 1)
    }

    const handleFileChange = (e: any) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e: any) => {
                if (reader.readyState === 2) {
                    setCourseInfo({ ...courseInfo, thumbnail: reader.result })
                }
            }
            reader.readAsDataURL(file)
        }
    }

    const handleDragOver = (e: any) => {
        e.preventDefault()
        e.stopPropagation()
        setDragging(true)
    }

    const handleDragLeave = (e: any) => {
        e.preventDefault()
        e.stopPropagation()
        setDragging(false)
    }

    const handleDrop = (e: any) => {
        e.preventDefault()
        e.stopPropagation()
        setDragging(false)
        const file = e.dataTransfer.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e: any) => {
                if (reader.readyState === 2) {
                    setCourseInfo({ ...courseInfo, thumbnail: reader.result })
                }
            }
            reader.readAsDataURL(file)
        }
    }
    return (
        <div className='w-[95%] 800px:w-[80%] m-auto my-24'>

            <form onSubmit={handleSubmit} >

                {/* course heading */}
                <div>
                    <label htmlFor="" className={`${styles.label}`}>
                        Course Name
                    </label>

                    <input
                        type="name"
                        name="name"
                        value={courseInfo.name}
                        onChange={(e) => setCourseInfo({ ...courseInfo, name: e.target.value })}
                        required
                        id='name'
                        className={`${styles.input}`}
                        placeholder='MERN stack platform with NEXT 13...'
                    />
                </div>

                <br />

                {/* course description */}
                <div>
                    <label htmlFor="" className={`${styles.label}`}>
                        Course Description
                    </label>

                    <textarea name="" id="" cols={30} rows={8}
                        placeholder='write something related to your content...'
                        className={`${styles.input} !h-min !py-2`}
                        value={courseInfo.description}
                        onChange={(e) => setCourseInfo({ ...courseInfo, description: e.target.value })}
                    ></textarea>
                </div>

                <br />

                {/* course price */}
                <div className='w-full flex flex-col 800px:flex-row justify-between gap-y-4'>

                    {/* price */}
                    <div className='w-full 800px:w-[45%]'>
                        <label htmlFor="" className={`${styles.label}`}>
                            Course Price
                        </label>

                        <input
                            type="number"
                            name="number"
                            value={courseInfo.price}
                            onChange={(e) => setCourseInfo({ ...courseInfo, price: e.target.value })}
                            required
                            id='price'
                            className={`${styles.input}`}
                            placeholder='29'
                        />
                    </div>

                    {/* estimated price */}
                    <div className='w-full 800px:w-[45%]'>
                        <label htmlFor="" className={`${styles.label}`}>
                            Estimated Price (optional)
                        </label>

                        <input
                            type="number"
                            name="number"
                            value={courseInfo.estimatedPrice}
                            onChange={(e) => setCourseInfo({ ...courseInfo, estimatedPrice: e.target.value })}
                            required
                            id='price'
                            className={`${styles.input}`}
                            placeholder='79'
                        />
                    </div>

                </div>

                <br />

                {/* tags */}
                <div>
                    <label htmlFor="" className={`${styles.label}`}>
                        Course Tags
                    </label>

                    <input
                        type="text"
                        name="tags"
                        value={courseInfo.tags}
                        onChange={(e) => setCourseInfo({ ...courseInfo, tags: e.target.value })}
                        required
                        id='tags'
                        className={`${styles.input}`}
                        placeholder='react, javascript, nodejs, socketio'
                    />

                </div>

                <br />

                <div className='w-full flex flex-col 800px:flex-row justify-between gap-y-4'>
                    {/* level */}
                    <div className='w-full 800px:w-[45%]'>
                        <label htmlFor="" className={`${styles.label}`}>
                            Course Level
                        </label>

                        <input
                            type="text"
                            name="level"
                            value={courseInfo.level}
                            onChange={(e) => setCourseInfo({ ...courseInfo, level: e.target.value })}
                            required
                            id='level'
                            className={`${styles.input}`}
                            placeholder='Beginner, Intermediate, Advanced'
                        />

                    </div>

                    {/* demo url */}
                    <div className='w-full 800px:w-[45%]'>
                        <label htmlFor="" className={`${styles.label}`}>
                            Demo URL
                        </label>

                        <input
                            type="text"
                            name="demoUrl"
                            value={courseInfo.demoUrl}
                            onChange={(e) => setCourseInfo({ ...courseInfo, demoUrl: e.target.value })}
                            required
                            id='demoUrl'
                            className={`${styles.input}`}
                            placeholder='https://www.youtube.com/watch?v=...'
                        />

                    </div>

                </div>

                <br />

                {/* thumbnail */}
                <div>

                    <input
                        type="file" required
                        id='file'
                        name='thumbnail'
                        accept='image/*'
                        className={`hidden`}
                        onChange={handleFileChange}
                    />

                    <label htmlFor="file" className={`w-full min-h-[10vh] dark:border-white border-gray-500 p-3 border flex items-center justify-center cursor-pointer rounded-lg ${
                        dragging ? "bg-blue-500" : "bg-transparent"
                    }`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        {
                            courseInfo.thumbnail ? (
                                <img src={courseInfo.thumbnail} alt="" className='max-h-full w-full object-cover' />
                            ) : (
                                <p className='text-center text-black dark:text-white'>
                                    Drag and drop some files here, or click to select files
                                </p>
                            )
                        }
                    </label>

                </div>

                <br />

                {/* submit */}
                <div className='w-full flex items-center justify-end'>
                    <input type='submit' value='Next' className={`${styles.button} !w-fit`}>
                        
                    </input>
                </div>

            </form>

        </div>
    )
}

export default CourseInformation
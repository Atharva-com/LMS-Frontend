import { styles } from '@/app/styles/style'
import CoursePlayer from '@/app/utils/CoursePlayer'
import Ratings from '@/app/utils/Ratings'
import Link from 'next/link'
import React, { FC } from 'react'
import { IoCheckmarkDoneCircleOutline } from 'react-icons/io5'
import { useSelector } from 'react-redux'
import { format } from 'timeago.js'
import CourseContentList from './CourseContentList'

type Props = {
    data: any
}

const CourseDetails: FC<Props> = ({ data }) => {
    const { user } = useSelector((state: any) => state.auth)
    const dicountPercentage = ((data?.estimatedPrice - data?.price) / data?.estimatedPrice) * 100

    const dicountPercentagePrice = dicountPercentage.toFixed(0)

    const isPurchased = user && user?.courses?.find((item: any) => item._id === data?._id)

    const handleOrder = (e: any) => {
        e.preventDefault()
        console.log("Order")
    }
    return (
        <div>
            <div className='w-[90%] m-auto py-5'>

                <div className="w-full flex flex-col-reverse 800px:flex-row">

                    {/* first part till reviews */}
                    <div className="w-full 800px:w-[65%] 800px:pr-5">

                        <h1 className='text-[25px] font-Poppins font-[600] text-black dark:text-white'>
                            {data.name}
                        </h1>

                        {/* course price */}

                        <div className="flex items-center justify-between pt-3">

                            <div className="flex items-center">

                                <Ratings rating={data.ratings} />

                                <h5 className='text-[15px] font-Poppins font-[500] text-black dark:text-white ml-2 mt-1'>
                                    {data.reviews?.length} Reviews
                                </h5>
                            </div>

                            <h5 className='text-[16px] font-Poppins font-[500] text-black dark:text-white'>
                                {data.purchased} Students
                            </h5>

                        </div>

                        <br />

                        {/* course benefits */}

                        <>

                            <h1 className='text-[25px] font-Poppins text-slate-900 dark:text-gray-300'>
                                What you will learn from this course?
                            </h1>

                            <div>
                                {
                                    data?.benefits?.map((item: any, index: number) => {
                                        return (
                                            <div className="w-full flex 800px:items-center py-2" key={index}>
                                                <div className="mr-1 w-[15px]">
                                                    <IoCheckmarkDoneCircleOutline size={20} className='text-black dark:text-gray-400' />
                                                </div>

                                                <p className='pl-2 text-black dark:text-gray-400 dark:font-light'>{item.title}</p>
                                            </div>
                                        )
                                    })
                                }

                                <br /><br />
                            </div>

                        </>

                        {/* course prerequisites */}

                        <>

                            <h1 className='text-[25px] font-Poppins text-slate-900 dark:text-gray-300'>
                                What are the prerequisites for starting this course?
                            </h1>

                            <div>
                                {
                                    data?.prerequisites?.map((item: any, index: number) => {
                                        return (
                                            <div className="w-full flex 800px:items-center py-2" key={index}>
                                                <div className="mr-1 w-[15px]">
                                                    <IoCheckmarkDoneCircleOutline size={20} className='text-black dark:text-gray-400' />
                                                </div>

                                                <p className='pl-2 text-black dark:text-gray-400 dark:font-light'>{item.title}</p>
                                            </div>
                                        )
                                    })
                                }

                                <br /><br />

                                {/* course overview */}

                                <>

                                    <h1 className='text-[25px] font-Poppins text-slate-900 dark:text-gray-300'>
                                        Course Overview
                                    </h1>

                                    {/* Course Content List */}
                                    <CourseContentList />

                                </>
                            </div>

                        </>

                        <br />
                        <br />

                        {/* course description */}
                        <div className="w-full">
                            <h1 className='text-[25px] font-Poppins text-slate-900 dark:text-gray-300'>
                                Course Description
                            </h1>

                            <p className='text-black dark:text-gray-400 dark:font-light text-[18px] mt-[20px] whitespace-pre-line overflow-hidden'>
                                {data.description}
                            </p>
                        </div>

                        <br /><br />

                        {/* course ratings and reviews */}

                        <div className="w-full">

                            {/* course ratings */}

                            <div className='800px:flex items-center'>
                                <Ratings rating={data?.ratings} />

                                <div className="mb-2 800px:mb-[unset]"></div>

                                <h5 className='text-[25px] font-Poppins text-slate-900 dark:text-gray-300'>
                                    {
                                        Number.isInteger(data?.ratings) ? data?.ratings?.toFixed(1) : data?.ratings?.toFixed(2)
                                    }{" "}
                                    Course Rating * {data?.reviews?.length} Reviews
                                </h5>
                            </div>

                            <br />

                            {/* course reviews */}
                            {(
                                data?.reviews && [...data?.reviews].reverse().map((item: any, index: number) => {
                                    return (
                                        <div className="w-full pb-4" key={index}>
                                            <div className="flex">

                                                <div className='h-[50px] w-[50px]'>

                                                    <div className='h-[50px] w-[50px] bg-slate-600 rounded-[50px] flex items-center justify-center cursor-pointer'>
                                                        <h1 className='uppercase text-[18px] text-black dark:text-white'>
                                                            {item?.user?.name?.slice(0, 2)}
                                                        </h1>
                                                    </div>

                                                </div>

                                                <div className="hidden 800px:block pl-2">
                                                    <div className="flex items-center">
                                                        <h5 className='text-[18px] pr-2 font-Poppins text-slate-900 dark:text-gray-300'>
                                                            {item?.user?.name}
                                                        </h5>

                                                        <Ratings rating={item?.rating} />
                                                    </div>

                                                    <p className='text-black dark:text-white font-light'>{item.comment}</p>

                                                    <small className='text-[#000000d1] dark:text-[#ffffff83]'>
                                                        {format(item.createdAt)}
                                                    </small>
                                                </div>

                                                <div className="pl-2 flex 800px:hidden items-center">
                                                    <h5 className='text-[18px] pr-2 font-Poppins text-slate-900 dark:text-gray-300'>
                                                        {item?.user?.name}
                                                    </h5>
                                                    <Ratings rating={item?.rating} />
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            )}

                        </div>

                    </div>

                    {/* second part - course player */}
                    <div className="w-full 800px:w-[35%] relative mb-2">
                        <div className="sticky top-[100px] left-0 z-50 w-full">
                            <CoursePlayer videoUrl={data?.demoUrl} title={data?.title} />

                            {/* Course price details */}
                            <div className="flex items-center">

                                    <h1 className='pt-5 text-[25px] text-black dark:text-white'>
                                        ₹{data?.price}
                                    </h1>

                                    <h5 className='pl-3 text-[20px] mt-2 line-through opacity-80 text-red-500'>
                                        ₹{data?.estimatedPrice}
                                    </h5>

                                    <h4 className='text-green-500 pl-5 pt-4 text-[22px]'>
                                        {dicountPercentagePrice}% off
                                    </h4>

                            </div>

                            {/* Course Buy Button */}

                            <div className="flex items-center">
                                {isPurchased ? (
                                    <Link 
                                    className={`${styles.button} !w-[180px] my-3 font-Poppins cursor-pointer !bg-[crimson]`}
                                    href={`/course-access/${data?._id}`}
                                    >
                                    Enter to Course
                                    </Link>
                                ) : (
                                    <div className={`${styles.button} !w-[180px] my-3 font-Poppins cursor-pointer !bg-[crimson]`} onClick={handleOrder}>
                                        Buy Now ₹{data?.price}
                                    </div>
                                )
                            }
                            </div>

                            <br />
                            <p className='pb-1 text-black dark:text-gray-400'>* Source Code included</p>
                            <p className='pb-1 text-black dark:text-gray-400'>* Full Lifetime access</p>
                            <p className='pb-1 text-black dark:text-gray-400'>* Certificate of completion</p>
                            <p className='pb-3 800px:pb-1 text-black dark:text-gray-400'>* Premium Support</p>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default CourseDetails
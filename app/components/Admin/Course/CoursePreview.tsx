import React, { FC } from 'react'
import CoursePlayer from '../../../utils/CoursePlayer';
import { styles } from '@/app/styles/style';
import Ratings from '@/app/utils/Ratings';
import { IoCheckmarkDoneOutline } from 'react-icons/io5';

type Props = {
    active: number;
    setActive: (active: number) => void;
    courseData: any;
    handleCourseCreate: any;
    edit: boolean;
}

const CoursePreview: FC<Props> = ({ active, setActive, courseData, handleCourseCreate, edit }) => {

    const discountPercentagePrice = () => {
        const discount = courseData?.estimatedPrice - courseData?.price;
        const discountPercentage = (discount / courseData?.estimatedPrice) * 100;
        return Math.round(discountPercentage);
    }
    return (
        <div className='w-[95%] sm:w-[90%] m-auto mb-5 py-5'>

            <div className="w-full relative">

                {/* Course video player */}
                <div className="w-full mt-10">

                    {/* <CoursePlayer
                        videoUrl={courseData?.demoUrl}
                        title={courseData?.title}
                    /> */}
                    <div className={`w-full min-h-[10vh] dark:border-white border-gray-500 p-3 border flex items-center justify-center cursor-pointer rounded-lg`}>
                        <img src="https://img.freepik.com/free-psd/online-courses-banner-template_23-2149109788.jpg" alt="" />
                    </div>

                </div>

                <div className="flex items-center">

                    <h1 className='pt-5 text-[25px] dark:text-white text-black'>
                        {courseData?.price === 0 ? "Free" : '₹' + (courseData?.price)}
                    </h1>

                    <h5 className='pl-3 text-[18px] mt-3 line-through opacity-80 text-red-500'>
                        ₹{courseData?.estimatedPrice}
                    </h5>

                    <h4 className='pl-5 pt-4 text-[22px] text-green-500'>
                        {discountPercentagePrice()}% Off
                    </h4>
                </div>

                <div className="flex items-center">
                    <div className={`${styles.button} !w-[180px] my-3 font-Poppins !bg-[crimson] cursor-not-allowed`}>
                        Buy Now ₹{courseData?.price}
                    </div>
                </div>

                <div className="flex items-center">

                    <input
                        type="text"
                        name=''
                        id=''
                        placeholder='Enter Discount coupon code'
                        className={`${styles.input} 1500px:!w-[50%] 1100px:!w-[60%] ml-3 !mt-0`}
                    />

                    <div className={`${styles.button} !w-[120px] my-3 font-Poppins ml-4 cursor-pointer`}>
                        Apply
                    </div>
                </div>

                <p className='pb-1 dark:text-white text-black'>&rarr; Source Code included</p>
                <p className='pb-1 dark:text-white text-black'>&rarr; Full Lifetime access</p>
                <p className='pb-1 dark:text-white text-black'>&rarr; Certificate of completion</p>
                <p className='pb-3 dark:text-white text-black'>&rarr; Premium support</p>
            </div>

            <div className="w-full">

                <div className="w-full 800px:pr-5">

                    <h1 className='text-[30px] capitalize dark:text-white text-black font-Poppins font-[600] tracking-wider'>
                        {courseData?.name}
                    </h1>

                    <div className='flex items-center justify-between pt-3'>

                        <div className="flex items-center">
                            <Ratings rating={0} />
                            <p className='pl-2 dark:text-white text-black font-Poppins font-[500] tracking-wider'>
                                (0 ratings)
                            </p>
                        </div>
                        <h5 className='dark:text-white text-black'>0 students</h5>
                    </div>

                </div>

                <br />

                {/* course benefits */}
                <h1 className='text-[20px] font-Poppins font-[400]'>
                    What you will learn from this course?
                </h1>
                {
                    courseData?.benefits?.map((benefit: any, index: number) => {
                        return (
                            <div key={index} className="w-full flex 800px:items-center py-2">
                                <div className="w-[15px] mr-1">
                                    <IoCheckmarkDoneOutline size={20} />
                                </div>
                                <p className='pl-2 font-Poppins text-gray-400 tracking-wider font-light'>
                                    {benefit.title}
                                </p>
                            </div>

                        )
                    })
                }

                <br />
                <br />


                {/* prerequistes */}
                <h1 className='text-[20px] font-Poppins font-[400]'>
                    What are the prerequisites for starting this course?
                </h1>
                {
                    courseData?.prerequisites?.map((prerequisite: any, index: number) => {
                        return (
                            <div key={index} className="w-full flex 800px:items-center py-2">
                                <div className="w-[15px] mr-1">
                                    <IoCheckmarkDoneOutline size={20} />
                                </div>
                                <p className='pl-2 font-Poppins text-gray-400 tracking-wider font-light'>
                                    {prerequisite.title}
                                </p>
                            </div>

                        )
                    })
                }

<br /><br />

                {/* course description */}
                <div className="w-full 800px:pr-5">

                    <h1 className='text-[20px] font-Poppins font-[400]'>
                        Course Description
                    </h1>

                    <p className='text-gray-400 font-Poppins font-light'>
                        {courseData?.description}
                    </p>
                </div>

                <br />
                <br />

                {/* prev next button */}
                <div className='flex justify-between mt-8 gap-4'>
                    <button
                        className={`${styles.button} !w-fit`}
                        onClick={() => {
                            setActive(active - 1)
                        }}
                    >
                        Prev
                    </button>

                    <button
                        className={`${styles.button} !w-fit`}
                        onClick={
                            handleCourseCreate
                        }
                    >
                        {edit ? 'Update' : 'Create'}
                    </button>
                </div>
            </div>

        </div>
    )
}

export default CoursePreview
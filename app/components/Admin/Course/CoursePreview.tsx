import React, { FC } from 'react'
import CoursePlayer from '../../../utils/CoursePlayer';
import { styles } from '@/app/styles/style';

type Props = {
    active: number;
    setActive: (active: number) => void;
    courseData: any;
    handleCourseCreate: any
}

const CoursePreview: FC<Props> = ({ active, setActive, courseData, handleCourseCreate }) => {

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

                </div>
                
                <div className="flex items-center">

                    <h1 className='pt-5 text-[25px]'>
                        {courseData?.price === 0 ? "Free" : "INR" + '₹' +(courseData?.price)}
                    </h1>

                    <h5 className='pl-3 text-[20px] mt-2 line-through opacity-80'>
                     INR ₹{courseData?.estimatedPrice}
                    </h5>

                    <h4 className='pl-5 pt-4 text-[22px]'>
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
                    className={`{styles.input} 1500px:!w-[50%] 1100px:!w-[60%] ml-3 !mt-0`}
                     />

                    <div className={`${styles.button} !w-[120px] my-3 font-Poppins ml-4 cursor-pointer`}>
                        Apply
                    </div>
                </div>

                <p className='pb-1'>Source Code included</p>
                <p className='pb-1'>Full Lifetime access</p>
                <p className='pb-1'>Certificate of completion</p>
                <p className='pb-3 800px:pb-1'>Premium support</p>
            </div>

            <div className="w-full">

                <div className="w-full 800px:pr-5">

                    <h1 className='text-[25px] font-Poppins font-[600]'>
                        {courseData?.name}
                    </h1>

                    <div className='flex items-center justify-between pt-3'>

                        <div className="flex items-center">
                            
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CoursePreview
import { styles } from '@/app/styles/style';
import CoursePlayer from '@/app/utils/CoursePlayer';
import Image from 'next/image';
import React, { FC, useState } from 'react'
import avatar from '../../assests/images/avatar1.jpg'
import { AiFillStar, AiOutlineArrowLeft, AiOutlineStar } from 'react-icons/ai';

type Props = {
    user: any;
    data: any;
    id: string;
    activeVideo: number;
    setActiveVideo: (activeVideo: number) => void;
}

const CourseContentMedia: FC<Props> = ({ user, data, id, activeVideo, setActiveVideo }) => {
    const [activeBar, setActiveBar] = useState(0)
    const [question, setQuestion] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [rating, setRating] = useState(0)
    const [review, setReview] = useState("")

    const isReviewExist = data?.reviews?.find((item: any) => item.user._id === user._id)

    const handleQuestionSubmit = async () => {

    }

    const handleReviewSubmit = async () => {

    }

    return (
        <div className='w-[95%] 800px:w-[86%] py-4 m-auto'>

            <CoursePlayer
                title={data[activeVideo]?.title}
                videoUrl={data[activeVideo]?.videoUrl}
            />

            <div className="w-full flex items-center justify-between my-3">

                <div className={`${styles.button} !w-[unset] !min-h-[40px] !py-[unset] ${activeVideo === 0 && "!cursor-no-drop opacity-[.8]"
                    }`}

                    onClick={() => {
                        setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)
                    }}
                >
                    <AiOutlineArrowLeft className='mr-2' />
                    Prev Lesson
                </div>

                <div className={`${styles.button} !w-[unset] !min-h-[40px] !py-[unset] ${activeVideo === 0 && "!cursor-no-drop opacity-[.8]"
                    }`}

                    onClick={() => {
                        setActiveVideo(data && data.length - 1 === activeVideo ? activeVideo : activeVideo + 1)
                    }}
                >
                    <AiOutlineArrowLeft className='mr-2' />
                    Next Lesson
                </div>
            </div>

            <h1 className='pt-2 text-[30px] font-[600] text-black dark:text-white'>
                {data[activeVideo]?.title}
            </h1>

            <br />

            <div className='w-full p-4 flex items-center justify-between bg-slate-900 dark:bg-slate-500 dark:bg-opacity-20 backdrop-blur shadow-[bg-slate-700] rounded shadow-inner'>

                {
                    ["Overview", "Resources", "Q&A", "Reviews"].map((text, index) => {
                        return (
                            <h5
                                className={`800px:text-[20px] font-Poppins tracking-wider cursor-pointer ${activeBar === index && "text-red-500"
                                    }`}
                                onClick={() => setActiveBar(index)}
                                key={index}
                            >
                                {text}
                            </h5>
                        )
                    })
                }

            </div>

            <br />

            {
                activeBar === 0 && (
                    <p className='text-[18px] whitespace-pre-line mb-3 dark:text-gray-400 text-black'>
                        {data[activeVideo]?.description}
                    </p>
                )
            }


            {
                activeBar === 1 && (
                    <div>
                        {
                            data[activeVideo].links.map((item: any, index: number) => {
                                return (
                                    <div className='mb-5' key={index}>
                                        <h2 className='800px:text-[20px] 800px:inline-block dark:text-white text-black'>
                                            {item.title && item.title + ": "}
                                        </h2>

                                        <a href={item.url} className='inline-block text-[#4395c4] 800px:text-[20px] 800px:pl-2'>
                                            {item.url}
                                        </a>
                                    </div>
                                )
                            })
                        }
                    </div>
                )
            }

            {
                activeBar === 2 && (
                    <>
                        <div className='w-full flex'>

                            <Image
                                src={user?.avatar?.url || data?.user?.image || avatar}
                                alt=''
                                width={60}
                                height={60}
                                className='rounded-full w-[50px] h-[50px]'
                            />


                            <textarea
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                name=""
                                id=""
                                cols={40}
                                rows={5}
                                placeholder='Write your question ...'
                                className='outline-none bg-transparent ml-3 border-[#ffffff57] 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins'
                            ></textarea>

                        </div>

                        <div className='w-full flex justify-end'>

                            <div
                                className={`${styles.button} !w-[120px] !h-[40px] text-[18px] mt-5 ${isLoading && "cursor-no-drop"
                                    }`}
                                onClick={handleQuestionSubmit}
                            >
                                Submit
                            </div>

                        </div>

                        <br /><br />

                        <div className="w-full h-[1px] bg-[#ffffff3b]"></div>

                        {/* question replies */}
                    </>
                )
            }

            {
                activeBar === 3 && (
                    <div className="w-full">
                        <>
                            {
                                !isReviewExist && (
                                    <>
                                        <div className="w-full flex">
                                            <Image
                                                src={user?.avatar?.url || data?.user?.image || avatar}
                                                alt=''
                                                width={60}
                                                height={60}
                                                className='rounded-full w-[50px] h-[50px]'
                                            />

                                            <div className="w-full">
                                                <h5 className="pl-3 text-[20px] font-[500] dark:text-white text-black">
                                                    Give a Rating <span className='text-red-500'>*</span>
                                                </h5>

                                                <div className="flex w-full ml-2 pb-3">
                                                    {
                                                        [1, 2, 3, 4, 5].map((i) =>
                                                            rating >= i ? (
                                                                <AiFillStar
                                                                    key={i}
                                                                    className='mr-1 cursor-pointer'
                                                                    color='rgb(246, 186, 0)'
                                                                    size={25}
                                                                    onClick={() => setRating(i)}
                                                                />
                                                            )
                                                                : (
                                                                    <AiOutlineStar
                                                                        key={i}
                                                                        className='mr-1 cursor-pointer'
                                                                        color='rgb(246, 186, 0)'
                                                                        size={25}
                                                                        onClick={() => setRating(i)}
                                                                    />

                                                                )
                                                        )
                                                    }
                                                </div>

                                                <textarea
                                                    value={review}
                                                    onChange={(e) => setReview(e.target.value)}
                                                    name=""
                                                    id=""
                                                    cols={40}
                                                    rows={5}
                                                    placeholder='Write your comment ...'
                                                    className='outline-none bg-transparent ml-3 border-[#ffffff57] 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins'
                                                ></textarea>
                                            </div>
                                        </div>

                                        <div className='w-full flex justify-end'>

                                            <div
                                                className={`${styles.button} !w-[120px] !h-[40px] text-[18px] mt-5 ${isLoading && "cursor-no-drop"
                                                    }`}
                                                onClick={handleReviewSubmit}
                                            >
                                                Submit
                                            </div>

                                        </div>
                                    </>
                                )
                            }
                        </>
                    </div>
                )
            }

        </div>
    )
}

export default CourseContentMedia
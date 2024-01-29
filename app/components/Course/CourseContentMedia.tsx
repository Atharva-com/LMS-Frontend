import { styles } from '@/app/styles/style';
import CoursePlayer from '@/app/utils/CoursePlayer';
import Image from 'next/image';
import React, { FC, useEffect, useState } from 'react'
import avatar from '../../assests/images/avatar1.jpg'
import { AiFillStar, AiOutlineArrowLeft, AiOutlineStar } from 'react-icons/ai';
import toast from 'react-hot-toast';
import { useAddNewQuestionMutation, useAddReplyToQuestionMutation } from '@/redux/features/courses/coursesApi';
import { format } from 'timeago.js';
import { BiMessage } from 'react-icons/bi';

type Props = {
    user: any;
    data: any;
    id: string;
    activeVideo: number;
    setActiveVideo: (activeVideo: number) => void;
    refetch: any
}

const CourseContentMedia: FC<Props> = ({ user, data, id, activeVideo, setActiveVideo, refetch }) => {
    const [activeBar, setActiveBar] = useState(0)
    const [question, setQuestion] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [questionId, setQuestionId] = useState('')
    const [answer, setAnswer] = useState('')
    const [rating, setRating] = useState(0)
    const [review, setReview] = useState("")
    const [addNewQuestion, { data: questionData, isLoading: questionLoading, error }] = useAddNewQuestionMutation()
    const [addReplyToQuestion, { data: answerData, isLoading: answerLoading, }] = useAddReplyToQuestionMutation()
    const isReviewExist = data?.reviews?.find((item: any) => item.user._id === user._id)
console.log(answerData)
    const handleQuestionSubmit = async () => {
        if (question.length === 0) {
            toast.error("Question Can't be empty.")
        } else {
            addNewQuestion({ question, courseId: id, contentId: data[activeVideo]?._id })
        }
    }

    const handleAnswerSubmit = async () => {
        if (answer.length === 0) {
            toast.error("Answer Can't be empty.")
        } else {
            addReplyToQuestion({ answer, courseId: id, contentId: data[activeVideo]?._id, questionId: questionId })
        }
    }

    const handleReviewSubmit = async () => {

    }

    useEffect(() => {
        if (questionData) {
            if (questionData?.success === true) {
                toast.success("Question Added Successfully.")
                setQuestion("")
                refetch()
            } else if (questionData?.success === false) {
                toast.error("Something went wrong.")
            }
        }

        if (answerData) {
            if (answerData?.success === true) {
                toast.success("Answer Added Successfully.")
                setAnswer("")
                refetch()
            } else if (answerData?.success === false) {
                toast.error("Something went wrong.")
            }
        }

        if (error) {
            if ("data" in error) {
                const errorMessage = error as any
                toast.error(errorMessage.data.message)
            }
        }
    }, [error, questionData, answerData])

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
                                className='outline-none bg-transparent ml-3 border border-[#ffffff57] 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins'
                            ></textarea>

                        </div>

                        <div className='w-full flex justify-end'>

                            <div
                                className={`${styles.button} !w-[120px] !h-[40px] text-[18px] mt-5 ${questionLoading && "cursor-no-drop"
                                    }`}
                                onClick={questionLoading ? () => { } : handleQuestionSubmit}
                            >
                                Submit
                            </div>

                        </div>

                        <br /><br />

                        <div className="w-full h-[1px] bg-[#ffffff3b]"></div>

                        {/* question replies */}
                        <div>
                            <CommentReply
                                data={data}
                                user={user}
                                activeVideo={activeVideo}
                                answer={answer}
                                setAnswer={setAnswer}
                                setQuestionId={setQuestionId}
                                handleAnswerSubmit={handleAnswerSubmit}
                                answerLoading={answerLoading}
                            />
                        </div>
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
                                                                    size={15}
                                                                    onClick={() => setRating(i)}
                                                                />
                                                            )
                                                                : (
                                                                    <AiOutlineStar
                                                                        key={i}
                                                                        className='mr-1 cursor-pointer'
                                                                        color='rgb(246, 186, 0)'
                                                                        size={15}
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
                                                    className='outline-none bg-transparent ml-3 border border-[#ffffff57] 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins'
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

const CommentReply = ({
    data,
    user,
    activeVideo,
    answer,
    setAnswer,
    setQuestionId,
    handleAnswerSubmit,
    answerLoading
}: any) => {
    return (
        <div className='w-full my-3'>

            {
                data[activeVideo].questions.map((item: any, index: number) => {
                    return (
                        <CommentItem
                            key={index}
                            item={item}
                            answer={answer}
                            setAnswer={setAnswer}
                            setQuestionId={setQuestionId}
                            handleAnswerSubmit={handleAnswerSubmit}
                            answerLoading={answerLoading}
                        />
                    )
                })
            }

        </div>
    )
}

const CommentItem = ({
    item,
    answer,
    setAnswer,
    setQuestionId,
    handleAnswerSubmit,
    answerLoading
}: any) => {
    const [replyActive, setReplyActive] = useState(false)
    return (
        <div className='my-4'>
            <div className="flex mb-2">
                <div>
                    <Image
                        src={item?.user?.avatar?.url || item?.user?.image || avatar}
                        alt=''
                        width={60}
                        height={60}
                        className='rounded-full w-[50px] h-[50px]'
                    />
                </div>

                <div className="pl-3 dark:text-white text-black">
                    <h5 className='text-[20px]'>
                        {item?.user?.name}
                    </h5>

                    <p>{item?.question}</p>

                    <small className='text-black dark:text-[#ffffff83]'>
                        {!item?.createdAt ? "" : format(item?.createdAt)} *
                    </small>
                </div>
            </div>

            <div className="w-full flex">
                <span
                    className='800px:pl-16 text-black dark:text-[#ffffff83] cursor-pointer mr-2'
                    onClick={() => {
                        setReplyActive(!replyActive)
                        setQuestionId(item?._id)
                    }}
                >
                    {!replyActive ? item.questionReplies.length !== 0 ? "All Replies" : "Add Reply" : "Hide Replies"}
                </span>

                <BiMessage size={20} className="cursor-pointer dark:text-[#ffffff83] text-black" />
                <span className='pl-1 mt-[-4px] cursor-pointer dark:text-[#ffffff83] text-black text-[#ffffff83]'>
                    {item.questionReplies.length}
                </span>
            </div>

            {
                replyActive && (
                    <>
                        {item.questionReplies.map((item: any, index: number) => {
                            return (
                                <div className="w-full flex 800px:ml-16 my-5 text-black dark:text-white" key={index}>
                                    <div>
                                        <Image
                                            src={item?.user?.avatar?.url || item?.user?.image || avatar}
                                            alt=''
                                            width={60}
                                            height={60}
                                            className='rounded-full w-[50px] h-[50px]'
                                        />
                                    </div>

                                    <div className="pl-2">
                                        <h5 className='text-[20px]'>
                                            {item?.user?.name}
                                        </h5>

                                        <p>{item?.answer}</p>

                                        <small className='text-black dark:text-[#ffffff83]'>
                                            {!item?.createdAt ? "" : format(item?.createdAt)} *
                                        </small>
                                    </div>
                                </div>
                            )
                        })}
                        <>
                            <div className="w-full flex relative dark:text-white text-black">

                                <input
                                    type="text"
                                    placeholder="Write your reply ..."
                                    value={answer}
                                    onChange={(e: any) => setAnswer(e.target.value)}
                                    className={`block 800px:ml-12 mt-2 outline-none bg-transparent border-0 dark:text-white text-black border-[#00000027] dark:border-[#fff] p-[5px] w-[95%] ${answer === "" || answerLoading && "cursor-not-allowed"}`}
                                />

                                <button
                                    type='submit'
                                    className='absolute right-0 bottom-1'
                                    onClick={handleAnswerSubmit}
                                    disabled={answer === 0 || answerLoading}
                                >
                                    Submit
                                </button>
                            </div>
                        </>
                    </>
                )
            }
        </div>
    )
}
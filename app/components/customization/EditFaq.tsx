import { styles } from '@/app/styles/style'
import { useEditHeroLayoutMutation, useGetHeroDataQuery } from '@/redux/features/layout/layoutApi'
import React, { useEffect, useState } from 'react'
import { HiMinusSm, HiPlusSm } from 'react-icons/hi'
import { AiOutlineDelete } from 'react-icons/ai'
import { IoMdAddCircleOutline } from 'react-icons/io'
import toast from 'react-hot-toast'
import { HashLoader } from 'react-spinners'

type Props = {}

const EditFaq = (props: Props) => {
    const { data, refetch } = useGetHeroDataQuery("FAQ", { refetchOnMountOrArgChange: true })
    const [questions, setQuestions] = useState([] as any[])
    const [editHeroLayout, { isLoading, data: editedData, error, isSuccess }] = useEditHeroLayoutMutation()
    useEffect(() => {
        if (data) {
            refetch()
            setQuestions(data?.layout?.faq)
        }

        if (isSuccess) {
            if (editedData?.success === true) {
                toast.success('FAQ updated successfully')
            } else if (editedData?.success === false) {
                toast.error('Something went wrong')
            }
        }

        if (error) {
            if ("data" in error) {
                const errorMsg = error as any
                toast.error(errorMsg?.data?.message)
            }
        }
    }, [data, isSuccess, editedData, error])

    const toggleQuestion = (id: string) => {
        setQuestions((prev) =>
            prev.map((item) => {
                if (item._id === id) {
                    return { ...item, active: !item.active }
                } else {
                    return { ...item, active: false }
                }
            })
        )
    }

    const handleQuestionChange = (id: string, value: string) => {
        setQuestions((prev) =>
            prev.map((item) => {
                if (item._id === id) {
                    return { ...item, question: value }
                } else {
                    return item
                }
            })
        )
    }

    const handleAnswerChange = (id: string, value: string) => {
        setQuestions((prev) =>
            prev.map((item) => {
                if (item._id === id) {
                    return { ...item, answer: value }
                } else {
                    return item
                }
            })
        )
    }

    const newFaqHandler = () => {
        setQuestions([...questions, { question: '', answer: '' }])
    }
    // function to check if the FAQ arrays is unchanged
    const areQuestionsUnchanged = (prev: any[], current: any[]) => {
        return JSON.stringify(prev) === JSON.stringify(current)
    }

    const isAnyQuestionEmpty = (questions: any[]) => {
        return questions.some((item) => item.question === '' || item.answer === '')
    }

    const handleEdit = async () => {
        if (areQuestionsUnchanged(data?.layout?.faq, questions)) {
            return
        }

        if (isAnyQuestionEmpty(questions)) {
            return
        }

        await editHeroLayout({
            type: "FAQ",
            faq: questions
        })
    }

    return (
        <>
            {
                isLoading ?
                    <div className={`w-full h-screen flex items-center justify-center `}>
                        <HashLoader color='#37a39a' size={40} className='mx-auto' />
                    </div>
                    :
                    (
                        <div className='w-[90%] 800px:w-[80%] m-auto mt-[120px]'>

                            <div className="mt-12">

                                <dl className=''>
                                    {
                                        questions?.map((q: any) => {
                                            return (
                                                <div
                                                    key={q.id}
                                                    className={`${q._id !== questions[0]?._id && 'border-t'
                                                        } border-gray-200 pt-4`}
                                                >

                                                    <dt className='text-lg'>
                                                        <button className={`flex items-center bg-slate-900 ${q.active ? 'rounded-t-lg' : 'rounded-lg'} px-4 py-1 dark:text-white text-black justify-between w-full text-left focus:outline-none`}
                                                            onClick={() => toggleQuestion(q._id)}
                                                        >
                                                            <input
                                                                type=""
                                                                className={`${styles.input} border-none`}
                                                                value={q.question}
                                                                placeholder='Add Your Question...'
                                                                onChange={(e) => handleQuestionChange(q._id, e.target.value)}
                                                            />

                                                            <span className='ml-6 flex-shrink-0'>
                                                                {q.active ? (
                                                                    <HiMinusSm className='h-6 w-6' />
                                                                ) : (
                                                                    <HiPlusSm className='h-6 w-6' />
                                                                )}
                                                            </span>

                                                        </button>
                                                    </dt>
                                                    {q.active && (
                                                        <dd className={`bg-slate-900 ${q.active ? 'rounded-b-lg' : 'rounded-lg'} px-4 py-1 flex items-center justify-between w-full text-left`}>
                                                            <textarea
                                                                rows={5}
                                                                className={`${styles.input} border-none !h-[100px]`}
                                                                value={q.answer}
                                                                placeholder='Add Your Answer...'
                                                                onChange={(e) => handleAnswerChange(q._id, e.target.value)}
                                                            />

                                                            <div className='ml-6 flex-shrink-0'>
                                                                <AiOutlineDelete
                                                                    className='text-[18px] cursor-pointer font-medium text-red-500 hover:text-red-600'
                                                                    onClick={() => {
                                                                        setQuestions((prev) => prev.filter((item) => item._id !== q._id))
                                                                    }}
                                                                >
                                                                    Delete
                                                                </AiOutlineDelete>
                                                            </div>

                                                        </dd>
                                                    )}

                                                </div>
                                            )
                                        })
                                    }
                                </dl>

                                <br />
                                <br />

                                <div className='w-full flex items-center justify-between mb-8'>

                                    <IoMdAddCircleOutline
                                        className='dark:text-white text-black text-[25px] cursor-pointer'
                                        onClick={newFaqHandler}
                                    />

                                    <div
                                        className={`${styles.button} !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-[#000000c7] bg-[#cccccc34] ${areQuestionsUnchanged(data?.layout?.faq, questions) || isAnyQuestionEmpty(questions) ? "!cursor-not-allowed" : "!cursor-pointer !bg-[#42d383]"
                                            } !rounded `}
                                        onClick={
                                            areQuestionsUnchanged(data?.layout?.faq, questions) || isAnyQuestionEmpty(questions) ? () => null : handleEdit
                                        }
                                    >
                                        Save
                                    </div>

                                </div>
                            </div>

                        </div>
                    )
            }
        </>
    )
}

export default EditFaq
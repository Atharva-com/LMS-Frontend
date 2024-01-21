import { styles } from '@/app/styles/style'
import { useGetHeroDataQuery } from '@/redux/features/layout/layoutApi'
import React, { useEffect, useState } from 'react'
import { HiMinusSm, HiPlusSm } from 'react-icons/hi'
import { AiOutlineDelete } from 'react-icons/ai'

type Props = {}

const EditFaq = (props: Props) => {
    const { data, refetch } = useGetHeroDataQuery("FAQ", { refetchOnMountOrArgChange: true })
    const [questions, setQuestions] = useState([] as any[])

    useEffect(() => {
        if (data) {
            refetch()
            setQuestions(data?.layout?.faq)
        }
    }, [data])

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
        setQuestions([...questions, { question: '', answer: ''}])
    }

    // function to check if the FAQ arrays is unchanged
    

    return (
        <div className='w-[90%] 800px:w-[80%] m-auto mt-[120px]'>

            <div className="mt-12">

                <dl className='space-y-8'>
                    {
                        questions?.map((q: any) => {
                            return (
                                <div
                                    key={q.id}
                                    className={`${q._id !== questions[0]?._id && 'border-t'
                                        } border-gray-200 pt-6`}
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
            </div>

        </div>
    )
}

export default EditFaq
import { styles } from '@/app/styles/style'
import { useGetHeroDataQuery } from '@/redux/features/layout/layoutApi'
import React, { FC, useEffect, useState } from 'react'
import { HiMinus, HiPlus } from 'react-icons/hi'

type Props = {}

const Faq: FC<Props> = (props: Props) => {
    const { data } = useGetHeroDataQuery("FAQ", {})
    const [questions, setQuestions] = useState([] as any[])
    const [activeQuestions, setActiveQuestions] = useState(null)

    useEffect(() => {
        if (data) {
            setQuestions(data?.layout?.faq)
        }
    }, [data])

    const toggleQuestion = (id: any) => {
        setActiveQuestions(activeQuestions === id ? null : id)
    }

    return (
        <div>
            <div className='w-[90%] 800px:w-[80%] m-auto'>

                <h1 className={`${styles.title} 800px:text-[40px]`}>
                    Frequently Asked Questions
                </h1>

                <div className="my-12">
                    <dl className='space-y-6'>
                        {
                            questions?.map((q: any) => {
                                return (
                                    <div
                                        key={q.id}
                                        className={`${q._id !== questions[0]?._id && 'border-t'
                                            } border-gray-200 pt-4`}
                                    >

                                        <dt className='text-lg'>
                                            <button className={`flex items-center justify-between w-full text-left px-4 py-2 dark:text-white text-black focus:outline-none`}
                                                onClick={() => toggleQuestion(q._id)}
                                            >   

                                                <span className='font-medium text-black dark:text-white'>
                                                    {q.question}
                                                </span>

                                                <span className='ml-6 flex-shrink-0'>
                                                    {q.active ? (
                                                        <HiMinus className='h-6 w-6 text-black dark:text-white' />
                                                    ) : (
                                                        <HiPlus className='h-6 w-6 text-black dark:text-white' />
                                                    )}
                                                </span>

                                            </button>
                                        </dt>
                                        {
                                            activeQuestions === q._id && (
                                                <dd className='mt-2 pr-12'>
                                                    <p className='text-base font-Poppins text-black dark:text-gray-500'>
                                                        {q.answer}
                                                    </p>
                                                </dd>
                                            
                                            )
                                        }

                                    </div>
                                )
                            })
                        }
                    </dl>
                </div>
            </div>
        </div>
    )
}

export default Faq
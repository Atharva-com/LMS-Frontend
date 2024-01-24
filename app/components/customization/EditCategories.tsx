import { styles } from '@/app/styles/style'
import { useEditHeroLayoutMutation, useGetHeroDataQuery } from '@/redux/features/layout/layoutApi'
import React, { FC, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { AiOutlineDelete } from 'react-icons/ai'
import { IoMdAddCircleOutline } from 'react-icons/io'
import { HashLoader } from 'react-spinners'

type Props = {}

const EditCategories: FC<Props> = (props: Props) => {
    const [editHeroLayout, { isLoading, data: editedData, error, isSuccess }] = useEditHeroLayoutMutation()
    const { data, refetch } = useGetHeroDataQuery("Categories", { refetchOnMountOrArgChange: true })
    const [categories, setCategories] = useState([] as any[])
    useEffect(() => {
        
        if (isSuccess) {
            if (editedData?.success === true) {
                toast.success(editedData?.message)
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

        if (data) {
            refetch()
            setCategories(data?.layout?.categories)
        }
    }, [data, isSuccess, editedData, error])

    const handleCategoriesAdd = (id: string, value: string) => {
        setCategories((prev) =>
            prev.map((item) => {
                if (item._id === id) {
                    return { ...item, title: value }
                } else {
                    return item
                }
            })
        )
    }

    const newCategoriesHandler = () => {
        if (categories[categories?.length - 1].title === '') return toast.error('Please fill the previous category')
        setCategories((prev) => [...prev, { _id: Math.random().toString(), title: '' }])
    }

    const areQuestionsUnchanged = (prev: any[], current: any[]) => {
        return JSON.stringify(prev) === JSON.stringify(current)
    }

    const isAnyQuestionEmpty = (categories: any[]) => {
        return categories.some((item) => item.title === '')
    }

    const handleEdit = async () => {
        if (areQuestionsUnchanged(data?.layout?.categories, categories)) {
            return
        }

        if (isAnyQuestionEmpty(categories)) {
            return
        }

        await editHeroLayout({
            type: "Categories",
            categories: categories,
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
                        <div className='mt-[120px] text-center'>
                            <h1 className={`${styles.title}`}>All Categories</h1>

                            {
                                categories &&
                                categories.map((item: any, index: number) => {
                                    return (
                                        <div className="px-3 py-1" key={index}>
                                            <div className="flex items-center justify-center w-full">
                                                <input
                                                    className={`${styles.input} !w-[unset] !border-none !text-[20px]`}
                                                    value={item.title}
                                                    onChange={(e) => handleCategoriesAdd(item._id, e.target.value)}
                                                    placeholder='Enter Category Name...'
                                                />

                                                <AiOutlineDelete
                                                    className='dark:text-white text-black text-[18px] cursor-pointer'
                                                    onClick={() => {
                                                        setCategories((prev) => prev.filter((item) => item._id !== item._id))
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    )
                                })
                            }

                            <br />

                            <div className='flex items-center justify-center w-full'>
                                <IoMdAddCircleOutline
                                    className='text-[25px] text-center cursor-pointer dark:text-white text-black'
                                    onClick={newCategoriesHandler}
                                />
                            </div>

                            <div className='w-full flex items-center justify-center mb-8 mt-4'>

                                <div
                                    className={`${styles.button} !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-[#000000c7] bg-[#cccccc34] ${areQuestionsUnchanged(data?.layout?.categories, categories) || isAnyQuestionEmpty(categories) ? "!cursor-not-allowed" : "!cursor-pointer !bg-[#42d383]"
                                        } !rounded `}
                                    onClick={
                                        areQuestionsUnchanged(data?.layout?.categories, categories) || isAnyQuestionEmpty(categories) ? () => null : handleEdit
                                    }
                                >
                                    Save
                                </div>

                            </div>
                        </div>
                    )
            }

        </>
    )
}

export default EditCategories
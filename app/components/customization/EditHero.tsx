import { styles } from '@/app/styles/style'
import { useEditHeroLayoutMutation, useGetHeroDataQuery } from '@/redux/features/layout/layoutApi'
import React, { FC, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { AiOutlineCamera } from 'react-icons/ai'
import { HashLoader } from 'react-spinners'

type Props = {}

const EditHero: FC<Props> = (props: Props) => {
    const [image, setImage] = useState("")
    const [title, setTitle] = useState("")
    const [subTitle, setSubTitle] = useState("")
    const [editHeroLayout, { isLoading, data: editedData, error, isSuccess }] = useEditHeroLayoutMutation()
    const { data, refetch } = useGetHeroDataQuery("Banner", { refetchOnMountOrArgChange: true })
    console.log(editedData)
    useEffect(() => {
        if (isSuccess) {
            if (editedData?.success === true) {
                toast.success('Data updated successfully.')
                
            } else if (editedData?.success === 'false') {
                toast.error('Failed to update data.')
            }
        }

        if (error) {
            if ("data" in error) {
                const errMessage = error as any
                toast.error(errMessage?.data?.message)
            }

        }

        if (data) {
            refetch()
            setImage(data?.layout?.banner?.image?.url)
            setTitle(data?.layout?.banner.title)
            setSubTitle(data?.layout?.banner.subTitle)
        }
    }, [data, editedData, error, isSuccess])

    const handleUpdate = (e: any) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e: any) => {
                if (reader.readyState === 2) {
                    setImage(e.target.result as string)
                }
            }
            reader.readAsDataURL(file)
        }


    }

    const handleEdit = async () => {
        await editHeroLayout({
            type: "Banner",
            title: title,
            subTitle: subTitle,
            image: image
        })
    }

    return (
        <>

            {isLoading ?
                <div className={`w-full h-screen flex items-center justify-center `}>
                    <HashLoader color='#37a39a' size={40} className='mx-auto' />
                </div>
                :
                <div className='w-full 1000px:flex items-center'>

                    <div className='1000px:!w-[40%] flex 1000px:min-h-screen items-center justify-center pt-[70px] 1000px:pt-[0] z-10'>

                        <div className="relative flex items-center justify-center">
                            <img src={image} alt=""
                                className='object-contain 1100px:max-w-[75%] w-[90%] 1500px:max-w-[85%] h-[auto] z-[10]'
                            />

                            <input
                                type="file"
                                name=''
                                id='banner'
                                accept='image/*'
                                onChange={handleUpdate}
                                className='hidden'
                            />
                            <label htmlFor="banner" className='absolute bottom-0 right-8 z-20 bg-[#3ccba0] rounded-full'>
                                <AiOutlineCamera
                                    className='text-black text-[23px] cursor-pointer m-[0.5rem]'
                                />
                            </label>
                        </div>
                    </div>

                    <div className='1000px:w-[60%] flex flex-col items-start 1000px:mt-[0px] text-center 1000px:text-left mt-[150px] p-6 800px:p-8'>
                        <textarea
                            className='dark:text-white text-[#000000c7] rounded-xl resize-none text-[30px] px-3 w-full 1000px:text-[50px] 1500px:text-[60px] font-Poppins'
                            placeholder=''
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            rows={4}
                        ></textarea>

                        <br />

                        <textarea
                            className='dark:text-[#edfff4] text-[#000000c7] rounded-xl font-Josefin text-[18px] px-3 py-2 1500px:!w-[55%] 1100px:!w-[90%] font-[600]'
                            placeholder=''
                            value={subTitle}
                            onChange={(e) => setSubTitle(e.target.value)}
                        ></textarea>

                        <br /><br />

                        <div
                            className={`${styles.button} !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-[#000000c7] bg-[#cccccc34] ${data?.layout?.banner?.title !== title ||
                                data?.layout?.banner?.subTitle !== subTitle ||
                                data?.layout?.banner?.image?.url !== image ? "!cursor-pointer !bg-[#42d383]" : "!cursor-not-allowed"
                                } !rounded absolute bottom-12 right-12`}

                            onClick={
                                data?.layout?.banner?.title !== title ||
                                    data?.layout?.banner?.subTitle !== subTitle ||
                                    data?.layout?.banner?.image?.url !== image ? handleEdit : () => null
                            }
                        >
                            Save
                        </div>
                    </div>

                </div>}

        </>
    )
}

export default EditHero